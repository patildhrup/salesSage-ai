# SalesSage Backend

Backend service for SalesSage with Ocean.io, Prospeo, Eazyreach, and Brevo integration.

## Features
- **OceanService**: Find similar companies using Ocean.io.
- **ProspeoService**: Find key decision makers using Prospeo.
- **EazyReachService**: Enrich LinkedIn profiles with verified business emails.
- **EmailGenerator**: Generate personalized, B2B cold outreach email content.
- **BrevoService**: Send transactional emails via Brevo API.
- **FastAPI**: Modern, high-performance web framework.
- **Retries & Error Handling**: Robust implementations using `tenacity`.
- **Standardized Models**: Pydantic models for `Company` and `Contact` with validation.

## Setup

1. **Environment Variables**
   Update the `.env` file with your API keys:
   ```env
   OCEAN_IO_API_KEY=your_ocean_io_key
   PROSPEO_API_KEY=your_prospeo_key
   EAZYREACH_API_KEY=your_eazyreach_key
   BREVO_API_KEY=your_brevo_key
   ```

2. **Installation**
   ```bash
   pip install -r requirements.txt
   ```

3. **Running the Server**
   ```bash
   python main.py
   ```
   Server runs at `http://localhost:8000`.

## API Endpoints

### 1. Similar Companies
`POST /api/v1/companies/similar`
- Body: `{"domain": "stripe.com", "limit": 10}`

### 2. Decision Makers
`POST /api/v1/companies/decision-makers`
- Body: `{"domain": "google.com", "max_pages": 3}`

### 3. Email Enrichment
`POST /api/v1/enrich/email`
- Body: `{"linkedin_url": "https://www.linkedin.com/in/..."}`

### 4. Generate Outreach Email
`POST /api/v1/generate-email`
- Body:
  ```json
  {
    "company_name": "SalesSage",
    "contact_name": "John Doe",
    "contact_title": "VP of Product",
    "template_type": "value"
  }
  ```

### 5. Send Email (Brevo)
`POST /api/v1/send-email`
- Body:
  ```json
  {
    "recipient_email": "target@company.com",
    "subject": "Personalized Subject",
    "html_content": "<p>Your email body</p>",
    "recipient_name": "John"
  }
  ```

## Project Structure
- `main.py`: Entry point and API routes.
- `app/v1/models.py`: Pydantic data models.
- `app/v1/services/`: Service implementations for third-party APIs.
- `.env`: API keys and configuration.
- `requirements.txt`: Python dependencies.
