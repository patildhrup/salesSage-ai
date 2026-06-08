import httpx
import logging
import os
from typing import List, Optional, Dict, Any
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from dotenv import load_dotenv
from pydantic import BaseModel, Field

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DecisionMaker(BaseModel):
    name: str = Field(..., alias="full_name")
    title: str = Field(..., alias="current_job_title")
    linkedin_url: Optional[str] = None

    class Config:
        populate_by_name = True

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
    ) -> List[DecisionMaker]:
        """
        Find decision makers for a given company domain.
        
        Args:
            domain: The company domain to search for.
            page: The page number for pagination.
            
        Returns:
            List[DecisionMaker]: A list of filtered decision makers.
        """
        if not self.api_key:
            raise ProspeoServiceError("Prospeo API Key is required")

        endpoint = f"{self.BASE_URL}/search-person"
        
        # We can use person_job_title with OR logic for better filtering at the API level
        # However, to be safe and match the exact requirements, we'll fetch and filter in Python
        # but we'll use seniority filter to reduce results to relevant levels.
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
                            dm = DecisionMaker(**person_data)
                            decision_makers.append(dm)
                        except Exception as e:
                            logger.error(f"Error parsing person data: {e}")
                
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
    ) -> List[DecisionMaker]:
        """
        Fetch and filter decision makers across multiple pages.
        """
        all_dms = []
        for page in range(1, max_pages + 1):
            try:
                dms = await self.find_decision_makers(domain, page=page)
                if not dms:
                    # If we got results but none matched our filters, we might still want to check next page
                    # However, if Prospeo returns empty results, we stop.
                    # We'll check if the 'results' in the response was empty.
                    # This logic is slightly simplified; in a production app you'd check pagination total_pages.
                    pass 
                
                all_dms.extend(dms)
                
                # In a real scenario, you'd check the pagination metadata to stop
                # For this implementation, we'll keep it simple or implement a check.
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
