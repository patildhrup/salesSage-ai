import httpx
import logging
import os
from typing import Optional, Dict, Any
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class BrevoServiceError(Exception):
    """Base exception for BrevoService"""
    pass

class BrevoServiceAPIError(BrevoServiceError):
    """Raised when the Brevo API returns an error"""
    def __init__(self, message: str, status_code: Optional[int] = None, response: Optional[str] = None):
        super().__init__(message)
        self.status_code = status_code
        self.response = response

class BrevoService:
    """
    Service to send transactional emails via Brevo API.
    """
    
    BASE_URL = "https://api.brevo.com/v3"

    def __init__(self, api_key: Optional[str] = None, sender_name: str = "SalesSage", sender_email: str = "outreach@salessage.ai"):
        # Use 'brevo' as found in the .env or standard 'BREVO_API_KEY'
        self.api_key = api_key or os.getenv("BREVO_API_KEY") or os.getenv("brevo")
        self.sender_name = sender_name
        self.sender_email = sender_email
        
        if not self.api_key:
            logger.warning("Brevo API key not found in environment variables.")
        
        self.headers = {
            "api-key": self.api_key,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        retry=retry_if_exception_type((httpx.RequestError, httpx.HTTPStatusError)),
        reraise=True
    )
    async def send_email(
        self, 
        recipient_email: str, 
        subject: str, 
        html_content: str,
        recipient_name: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Send a transactional email.
        
        Args:
            recipient_email: Target email address.
            subject: Email subject line.
            html_content: HTML body of the email.
            recipient_name: Optional name for the recipient.
            
        Returns:
            Dict[str, Any]: Brevo API response (e.g., messageId).
        """
        if not self.api_key:
            raise BrevoServiceError("Brevo API Key is required")

        endpoint = f"{self.BASE_URL}/smtp/email"
        
        payload = {
            "sender": {"name": self.sender_name, "email": self.sender_email},
            "to": [{"email": recipient_email, "name": recipient_name or ""}],
            "subject": subject,
            "htmlContent": html_content
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            try:
                logger.info(f"Sending email to {recipient_email} via Brevo...")
                response = await client.post(
                    endpoint,
                    json=payload,
                    headers=self.headers
                )
                
                # Check for HTTP errors
                response.raise_for_status()
                
                result = response.json()
                logger.info(f"Email sent successfully. Message ID: {result.get('messageId')}")
                return result

            except httpx.HTTPStatusError as e:
                status_code = e.response.status_code
                error_msg = f"Brevo API error: {status_code} - {e.response.text}"
                logger.error(error_msg)
                raise BrevoServiceAPIError(error_msg, status_code=status_code, response=e.response.text)
            except httpx.RequestError as e:
                logger.error(f"Network error while calling Brevo: {str(e)}")
                raise BrevoServiceError(f"Network error: {str(e)}")
            except Exception as e:
                logger.error(f"Unexpected error in BrevoService: {str(e)}")
                raise BrevoServiceError(f"Unexpected error: {str(e)}")
