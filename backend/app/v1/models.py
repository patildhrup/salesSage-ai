from pydantic import BaseModel, Field, EmailStr, HttpUrl, validator
from typing import Optional
import re

class Company(BaseModel):
    """
    Represents a company entity.
    """
    domain: str = Field(..., description="The primary domain of the company (e.g., google.com)")

    @validator("domain")
    def validate_domain(cls, v):
        # Basic domain validation regex
        domain_regex = r"^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$"
        if not re.match(domain_regex, v.lower()):
            raise ValueError("Invalid domain format")
        return v.lower()

class Contact(BaseModel):
    """
    Represents a contact/person associated with a company.
    """
    company_domain: str = Field(..., description="The domain of the company this contact belongs to")
    name: str = Field(..., description="Full name of the contact")
    title: str = Field(..., description="Job title of the contact")
    linkedin_url: Optional[str] = Field(None, description="LinkedIn profile URL")
    email: Optional[EmailStr] = Field(None, description="Verified business email address")
    verified: bool = Field(False, description="Whether the email address has been verified")

    @validator("linkedin_url")
    def validate_linkedin_url(cls, v):
        if v and "linkedin.com" not in v.lower():
            raise ValueError("Invalid LinkedIn URL")
        return v
