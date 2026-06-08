import random
from typing import Dict, List, Optional
from pydantic import BaseModel

class EmailContent(BaseModel):
    subject: str
    body: str

class EmailGenerator:
    """
    Module for generating personalized B2B cold outreach emails.
    """

    @staticmethod
    def generate(company_name: str, contact_name: str, contact_title: str, template_type: Optional[str] = None) -> EmailContent:
        """
        Generate personalized email content based on contact details.
        """
        first_name = contact_name.split()[0] if contact_name else "there"
        
        templates = [
            # Template 1: Problem-Solution Focus
            {
                "subject": f"Question for {first_name} regarding {company_name}'s growth",
                "body": (
                    f"Hi {first_name},\n\n"
                    f"I've been following {company_name} and was impressed by your work as {contact_title}. "
                    f"I wanted to reach out because we've helped similar companies streamline their outreach "
                    f"and I thought you might be interested in how we could do the same for you.\n\n"
                    f"Do you have 10 minutes next week for a brief chat?\n\n"
                    f"Best regards,\n[Your Name]"
                )
            },
            # Template 2: Value-Add Focus
            {
                "subject": f"Idea for {company_name}",
                "body": (
                    f"Hi {first_name},\n\n"
                    f"I'm reaching out because I noticed {company_name} is expanding its presence in the market. "
                    f"As {contact_title}, I'm sure you're focused on maintaining that momentum.\n\n"
                    f"We recently put together a strategy that helped a peer company increase their lead conversion by 25%. "
                    f"I'd love to share some of those insights with you if you're open to it.\n\n"
                    f"Are you available for a quick sync on Tuesday or Wednesday?\n\n"
                    f"Cheers,\n[Your Name]"
                )
            },
            # Template 3: Short & Direct
            {
                "subject": f"Connecting with {first_name} @ {company_name}",
                "body": (
                    f"Hi {first_name},\n\n"
                    f"I'm [Your Name] and I help {contact_title}s like yourself solve [Specific Pain Point].\n\n"
                    f"I've got a few ideas on how {company_name} could improve [Relevant Metric]. "
                    f"Would you be open to a short introductory call sometime this week?\n\n"
                    f"Regards,\n[Your Name]"
                )
            }
        ]

        if template_type == "problem":
            selected = templates[0]
        elif template_type == "value":
            selected = templates[1]
        elif template_type == "direct":
            selected = templates[2]
        else:
            selected = random.choice(templates)

        return EmailContent(subject=selected["subject"], body=selected["body"])
