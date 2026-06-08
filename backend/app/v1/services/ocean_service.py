import httpx
import logging
import os
from typing import List, Optional, Dict, Any
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class OceanServiceError(Exception):
    """Base exception for OceanService"""
    pass

class OceanServiceAPIError(OceanServiceError):
    """Raised when the Ocean.io API returns an error"""
    def __init__(self, message: str, status_code: Optional[int] = None, response: Optional[str] = None):
        super().__init__(message)
        self.status_code = status_code
        self.response = response

class OceanService:
    """
    Service to interact with Ocean.io API to find similar companies.
    """
    
    BASE_URL = "https://api.ocean.io/v2"
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("OCEAN_IO_API_KEY")
        if not self.api_key:
            logger.warning("OCEAN_IO_API_KEY not found in environment variables.")
        
        self.headers = {
            "x-api-token": self.api_key,
            "Content-Type": "application/json"
        }

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        retry=retry_if_exception_type((httpx.RequestError, httpx.HTTPStatusError)),
        reraise=True
    )
    async def find_similar_companies(
        self, 
        domain: str, 
        limit: int = 10,
        filters: Optional[Dict[str, Any]] = None
    ) -> List[str]:
        """
        Find companies similar to the given domain.
        
        Args:
            domain: The seed domain to find lookalikes for.
            limit: Maximum number of results to return.
            filters: Optional filters (countries, industries, etc.)
            
        Returns:
            List[str]: A list of similar company domains.
        """
        if not self.api_key:
            raise OceanServiceError("API Key is required to call Ocean.io")

        endpoint = f"{self.BASE_URL}/search/companies"
        
        payload = {
            "lookalikeDomains": [domain],
            "size": limit
        }
        
        if filters:
            payload["companiesFilters"] = filters

        async with httpx.AsyncClient(timeout=30.0) as client:
            try:
                logger.info(f"Searching for companies similar to {domain}...")
                response = await client.post(
                    endpoint,
                    json=payload,
                    headers=self.headers
                )
                
                # Check for HTTP errors
                response.raise_for_status()
                
                data = response.json()
                companies = data.get("companies", [])
                
                # Extract domains
                similar_domains = [c.get("domain") for c in companies if c.get("domain")]
                
                logger.info(f"Found {len(similar_domains)} similar companies for {domain}.")
                return similar_domains

            except httpx.HTTPStatusError as e:
                status_code = e.response.status_code
                error_msg = f"Ocean.io API error: {status_code} - {e.response.text}"
                logger.error(error_msg)
                raise OceanServiceAPIError(error_msg, status_code=status_code, response=e.response.text)
            except httpx.RequestError as e:
                logger.error(f"Network error while calling Ocean.io: {str(e)}")
                raise OceanServiceError(f"Network error: {str(e)}")
            except Exception as e:
                logger.error(f"Unexpected error in OceanService: {str(e)}")
                raise OceanServiceError(f"Unexpected error: {str(e)}")

    async def find_similar_companies_paginated(
        self,
        domain: str,
        total_limit: int = 50,
        page_size: int = 10,
        filters: Optional[Dict[str, Any]] = None
    ) -> List[str]:
        """
        Find similar companies with pagination support.
        
        Ocean.io uses 'searchAfter' for pagination.
        """
        all_domains = []
        search_after = None
        
        endpoint = f"{self.BASE_URL}/search/companies"
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            while len(all_domains) < total_limit:
                payload = {
                    "lookalikeDomains": [domain],
                    "size": min(page_size, total_limit - len(all_domains))
                }
                if filters:
                    payload["companiesFilters"] = filters
                if search_after:
                    payload["searchAfter"] = search_after
                
                try:
                    response = await client.post(
                        endpoint,
                        json=payload,
                        headers=self.headers
                    )
                    response.raise_for_status()
                    data = response.json()
                    
                    companies = data.get("companies", [])
                    if not companies:
                        break
                        
                    new_domains = [c.get("domain") for c in companies if c.get("domain")]
                    all_domains.extend(new_domains)
                    
                    search_after = data.get("searchAfter")
                    if not search_after:
                        break
                        
                except Exception as e:
                    logger.error(f"Pagination error: {str(e)}")
                    break # Return what we have so far
                    
        return all_domains
