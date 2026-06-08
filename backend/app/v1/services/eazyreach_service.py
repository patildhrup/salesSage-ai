import httpx
import logging
import os
from typing import Optional
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from dotenv import load_dotenv
from pydantic import BaseModel, HttpUrl

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EazyReachServiceError(Exception):
    """Base exception for EazyReachService"""
    pass

class EazyReachServiceRateLimitError(EazyReachServiceError):
    """Raised when Eazyreach API rate limit is reached (429)"""
    pass

class EazyReachServiceAPIError(EazyReachServiceError):
    """Raised when the Eazyreach API returns an error"""
    def __init__(self, message: str, status_code: Optional[int] = None, response: Optional[str] = None):
        super().__init__(message)
        self.status_code = status_code
        self.response = response

class EazyReachService:
    """
    Service to interact with Eazyreach API to find verified business emails from LinkedIn.
    """
    
    BASE_URL = "https://api.eazyreach.io/v1" # Standardized endpoint

    def __init__(self, api_key: Optional[str] = None):
        # Fallback to 'easyreach' as seen in the .env or standard 'EAZYREACH_API_KEY'
        self.api_key = api_key or os.getenv("EAZYREACH_API_KEY") or os.getenv("easyreach")
        if not self.api_key:
            logger.warning("Eazyreach API key not found in environment variables.")
        
        self.headers = {
            "X-API-KEY": self.api_key,
            "Content-Type": "application/json"
        }

    @retry(
        stop=stop_after_attempt(5),
        wait=wait_exponential(multiplier=1, min=2, max=30),
        retry=retry_if_exception_type((httpx.RequestError, EazyReachServiceRateLimitError)),
        reraise=True
    )
    async def get_verified_email(self, linkedin_url: str) -> Optional[str]:
        """
        Fetch verified business email for a LinkedIn profile URL.
        
        Args:
            linkedin_url: The LinkedIn profile URL.
            
        Returns:
            Optional[str]: Verified email address or None if not found/verified.
        """
        if not self.api_key:
            raise EazyReachServiceError("Eazyreach API Key is required")

        endpoint = f"{self.BASE_URL}/enrich"
        
        payload = {
            "profile_url": linkedin_url,
            "enrich_email": True
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            try:
                logger.info(f"Enriching LinkedIn profile: {linkedin_url}")
                response = await client.post(
                    endpoint,
                    json=payload,
                    headers=self.headers
                )
                
                # Handle rate limiting specifically for retry logic
                if response.status_code == 429:
                    logger.warning(f"Rate limit hit for Eazyreach API. Retrying...")
                    raise EazyReachServiceRateLimitError("Rate limit exceeded")
                
                response.raise_for_status()
                data = response.json()
                
                # Structure: data.get("email") and data.get("email_status")
                # Based on research, we skip if not verified
                email = data.get("email")
                status = data.get("email_status", "").lower()
                
                if email and status == "verified":
                    logger.info(f"Found verified email for {linkedin_url}: {email}")
                    return email
                else:
                    logger.info(f"No verified email found for {linkedin_url} (Status: {status})")
                    return None

            except httpx.HTTPStatusError as e:
                status_code = e.response.status_code
                error_msg = f"Eazyreach API error: {status_code} - {e.response.text}"
                logger.error(error_msg)
                raise EazyReachServiceAPIError(error_msg, status_code=status_code, response=e.response.text)
            except httpx.RequestError as e:
                logger.error(f"Network error while calling Eazyreach: {str(e)}")
                raise EazyReachServiceError(f"Network error: {str(e)}")
            except EazyReachServiceRateLimitError:
                raise # Re-raise for tenacity
            except Exception as e:
                logger.error(f"Unexpected error in EazyReachService: {str(e)}")
                raise EazyReachServiceError(f"Unexpected error: {str(e)}")
