import os
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Dict, Any
from app.v1.services.ocean_service import OceanService, OceanServiceError, OceanServiceAPIError
from app.v1.services.prospeo_service import ProspeoService, ProspeoServiceError, ProspeoServiceAPIError, DecisionMaker
from app.v1.services.eazyreach_service import EazyReachService, EazyReachServiceError, EazyReachServiceAPIError
from pydantic import BaseModel
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="SalesSage Backend API",
    description="Backend service for SalesSage with Ocean.io, Prospeo, and Eazyreach integration",
    version="1.0.0"
)

# Configure CORS for frontend integration
# In production, you should restrict this to your frontend domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response models
class SimilarityRequest(BaseModel):
    domain: str
    limit: Optional[int] = 10
    filters: Optional[Dict[str, Any]] = None

class SimilarityResponse(BaseModel):
    seed_domain: str
    similar_domains: List[str]

class DecisionMakerRequest(BaseModel):
    domain: str
    max_pages: Optional[int] = 3

class DecisionMakerResponse(BaseModel):
    domain: str
    decision_makers: List[DecisionMaker]

class EmailEnrichmentRequest(BaseModel):
    linkedin_url: str

class EmailEnrichmentResponse(BaseModel):
    linkedin_url: str
    email: Optional[str]

@app.get("/")
async def root():
    return {"message": "SalesSage API is running"}

@app.post("/api/v1/companies/similar", response_model=SimilarityResponse)
async def get_similar_companies(request: SimilarityRequest):
    """
    Find companies similar to the provided domain using Ocean.io.
    """
    ocean_service = OceanService()

    try:
        similar_domains = await ocean_service.find_similar_companies(
            domain=request.domain,
            limit=request.limit,
            filters=request.filters
        )
        return SimilarityResponse(
            seed_domain=request.domain,
            similar_domains=similar_domains
        )
    except OceanServiceAPIError as e:
        logger.error(f"API Error from Ocean.io: {str(e)}")
        raise HTTPException(status_code=e.status_code or 502, detail=str(e))
    except OceanServiceError as e:
        logger.error(f"Service Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An internal server error occurred")

@app.post("/api/v1/companies/decision-makers", response_model=DecisionMakerResponse)
async def get_decision_makers(request: DecisionMakerRequest):
    """
    Find decision makers for the provided domain using Prospeo.
    """
    prospeo_service = ProspeoService()

    try:
        decision_makers = await prospeo_service.get_all_decision_makers(
            domain=request.domain,
            max_pages=request.max_pages
        )
        return DecisionMakerResponse(
            domain=request.domain,
            decision_makers=decision_makers
        )
    except ProspeoServiceAPIError as e:
        logger.error(f"API Error from Prospeo: {str(e)}")
        raise HTTPException(status_code=e.status_code or 502, detail=str(e))
    except ProspeoServiceError as e:
        logger.error(f"Service Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An internal server error occurred")

@app.post("/api/v1/enrich/email", response_model=EmailEnrichmentResponse)
async def get_verified_email(request: EmailEnrichmentRequest):
    """
    Get verified business email for a LinkedIn profile using Eazyreach.
    """
    eazyreach_service = EazyReachService()
    
    try:
        email = await eazyreach_service.get_verified_email(request.linkedin_url)
        return EmailEnrichmentResponse(
            linkedin_url=request.linkedin_url,
            email=email
        )
    except EazyReachServiceAPIError as e:
        logger.error(f"API Error from Eazyreach: {str(e)}")
        raise HTTPException(status_code=e.status_code or 502, detail=str(e))
    except EazyReachServiceError as e:
        logger.error(f"Service Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An internal server error occurred")


if __name__ == "__main__":
    import uvicorn
    # Use environment variables for port/host if needed, else defaults
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
