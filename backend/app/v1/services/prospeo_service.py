import httpx
import logging
import os
from typing import List, Optional, Dict, Any
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from dotenv import load_dotenv
from app.v1.models import Contact

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ProspeoServiceError(Exception):
    """Base exception for ProspeoService"""
    pass

class ProspeoServiceAPIError(ProspeoServiceError):
    """Raised when the Prospeo API returns an error"""
    def __init__(self, message: str, status_code: Optional[int] = None, response: Optional[str] = None):
        super().__init__(message)
        self.status_code = status_code
        self.response = response

class ProspeoService:
    """
    Service to interact with Prospeo API to find decision makers.
    """
    
    BASE_URL = "https://api.prospeo.io"
    
    # Titles to filter for as requested by the user
    TARGET_TITLES = [
        "CEO", "Founder", "CTO", "VP Engineering", 
        "VP Product", "Head of Growth"
    ]

    def __init__(self, api_key: Optional[str] = None):
        # Fallback to 'prospeo' as seen in the .env or standard 'PROSPEO_API_KEY'
        self.api_key = api_key or os.getenv("PROSPEO_API_KEY") or os.getenv("prospeo")
        if not self.api_key:
            logger.warning("Prospeo API key not found in environment variables.")
        
        self.headers = {
            "X-KEY": self.api_key,
            "Content-Type": "application/json"
        }

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        retry=retry_if_exception_type((httpx.RequestError, httpx.HTTPStatusError)),
        reraise=True
    )
    async def find_decision_makers(
        self, 
        domain: str, 
        page: int = 1
    ) -> List[Contact]:
        """
        Find decision makers for a given company domain.
        
        Args:
            domain: The company domain to search for.
            page: The page number for pagination.
            
        Returns:
            List[Contact]: A list of filtered decision makers.
        """
        if not self.api_key:
            raise ProspeoServiceError("Prospeo API Key is required")

        endpoint = f"{self.BASE_URL}/search-person"
        
        payload = {
            "filters": {
                "person_search": domain,
                "person_seniority": {
                    "include": ["Owner", "Founder", "C-Level", "VP", "Director"]
                }
            },
            "page": page
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            try:
                logger.info(f"Searching for decision makers at {domain} (Page {page})...")
                response = await client.post(
                    endpoint,
                    json=payload,
                    headers=self.headers
                )
                
                response.raise_for_status()
                data = response.json()
                
                results = data.get("results", [])
                decision_makers = []
                
                for item in results:
                    person_data = item.get("person", {})
                    title = person_data.get("current_job_title", "").upper()
                    
                    # Filter based on user's specific requirements
                    is_match = any(target.upper() in title for target in self.TARGET_TITLES)
                    
                    if is_match:
                        try:
                            # Map Prospeo data to our standardized Contact model
                            dm = Contact(
                                company_domain=domain,
                                name=person_data.get("full_name"),
                                title=person_data.get("current_job_title"),
                                linkedin_url=person_data.get("linkedin_url"),
                                verified=False # search-person doesn't provide verified email by default
                            )
                            decision_makers.append(dm)
                        except Exception as e:
                            logger.error(f"Error parsing person data into Contact model: {e}")
                
                logger.info(f"Found {len(decision_makers)} matching decision makers on page {page}.")
                return decision_makers

            except httpx.HTTPStatusError as e:
                status_code = e.response.status_code
                error_msg = f"Prospeo API error: {status_code} - {e.response.text}"
                logger.error(error_msg)
                raise ProspeoServiceAPIError(error_msg, status_code=status_code, response=e.response.text)
            except httpx.RequestError as e:
                logger.error(f"Network error while calling Prospeo: {str(e)}")
                raise ProspeoServiceError(f"Network error: {str(e)}")
            except Exception as e:
                logger.error(f"Unexpected error in ProspeoService: {str(e)}")
                raise ProspeoServiceError(f"Unexpected error: {str(e)}")

    async def get_all_decision_makers(
        self,
        domain: str,
        max_pages: int = 5
    ) -> List[Contact]:
        """
        Fetch and filter decision makers across multiple pages.
        """
        all_dms = []
        for page in range(1, max_pages + 1):
            try:
                dms = await self.find_decision_makers(domain, page=page)
                if not dms:
                    pass 
                
                all_dms.extend(dms)
                
            except Exception as e:
                logger.error(f"Stopping pagination due to error: {e}")
                break
                
        # Deduplicate by LinkedIn URL if present
        seen_urls = set()
        unique_dms = []
        for dm in all_dms:
            if dm.linkedin_url:
                if dm.linkedin_url not in seen_urls:
                    seen_urls.add(dm.linkedin_url)
                    unique_dms.append(dm)
            else:
                unique_dms.append(dm)
                
        return unique_dms
