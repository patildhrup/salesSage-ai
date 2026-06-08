# SalesSage Backend

Backend service for SalesSage with Ocean.io, Prospeo, and Eazyreach integration.

## Features
- **OceanService**: Integration with Ocean.io API to find similar companies.
- **ProspeoService**: Integration with Prospeo API to find key decision makers (CEO, Founders, VPs, etc.).
- **EazyReachService**: Integration with Eazyreach API to find verified business emails from LinkedIn profiles.
- **FastAPI**: Modern, fast (high-performance) web framework.
- **Retries & Error Handling**: Robust API calls with `tenacity`.
- **CORS Support**: Integrated for frontend-backend communication.

## Setup

1. **Environment Variables**
   Update the `.env` file with your API keys:
   ```env
   OCEAN_IO_API_KEY=your_ocean_io_key
   PROSPEO_API_KEY=your_prospeo_key
   EAZYREACH_API_KEY=your_eazyreach_key
   ```

2. **Installation**
   Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. **Running the Server**
   Start the FastAPI server:
   ```bash
   python main.py
   ```
   The server will be available at `http://localhost:8000`.

## API Endpoints

### Find Similar Companies
- **URL**: `/api/v1/companies/similar`
- **Method**: `POST`
- **Body**: `{"domain": "stripe.com", "limit": 10}`

### Find Decision Makers
- **URL**: `/api/v1/companies/decision-makers`
- **Method**: `POST`
- **Body**: `{"domain": "google.com", "max_pages": 3}`

### Enrich LinkedIn Email
- **URL**: `/api/v1/enrich/email`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "linkedin_url": "https://www.linkedin.com/in/williamhgates"
  }
  ```
- **Response**:
  ```json
  {
    "linkedin_url": "https://www.linkedin.com/in/williamhgates",
    "email": "bill.gates@microsoft.com"
  }
  ```

## Project Structure
- `main.py`: Entry point and API routes.
- `app/v1/services/ocean_service.py`: Business logic for Ocean.io integration.
- `app/v1/services/prospeo_service.py`: Business logic for Prospeo integration.
- `app/v1/services/eazyreach_service.py`: Business logic for Eazyreach integration.
- `.env`: Configuration for API keys.
- `requirements.txt`: Project dependencies.
