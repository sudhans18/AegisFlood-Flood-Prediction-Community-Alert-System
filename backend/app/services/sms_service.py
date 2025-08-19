import os
import logging
from typing import Optional
from twilio.rest import Client
from twilio.base.exceptions import TwilioException

logger = logging.getLogger(__name__)

class SMSService:
    def __init__(self):
        self.account_sid = os.getenv('TWILIO_ACCOUNT_SID')
        self.auth_token = os.getenv('TWILIO_AUTH_TOKEN')
        self.phone_number = os.getenv('TWILIO_PHONE_NUMBER')
        self.mock_enabled = os.getenv('MOCK_SMS_ENABLED', 'true').lower() == 'true'
        
        if not self.mock_enabled and (self.account_sid and self.auth_token and self.phone_number):
            self.client = Client(self.account_sid, self.auth_token)
        else:
            self.client = None
            logger.info("SMS service initialized in mock mode")

    def send_sms(self, to_number: str, message: str) -> bool:
        """
        Send SMS using Twilio or mock mode
        """
        try:
            if self.mock_enabled or not self.client:
                logger.info(f"[MOCK SMS] To: {to_number}, Message: {message}")
                return True
            
            message = self.client.messages.create(
                body=message,
                from_=self.phone_number,
                to=to_number
            )
            logger.info(f"SMS sent successfully. SID: {message.sid}")
            return True
            
        except TwilioException as e:
            logger.error(f"Twilio SMS error: {e}")
            return False
        except Exception as e:
            logger.error(f"SMS service error: {e}")
            return False

class WhatsAppService:
    def __init__(self):
        self.account_sid = os.getenv('TWILIO_ACCOUNT_SID')
        self.auth_token = os.getenv('TWILIO_AUTH_TOKEN')
        self.whatsapp_number = os.getenv('TWILIO_WHATSAPP_PHONE_NUMBER')
        self.mock_enabled = os.getenv('MOCK_WHATSAPP_ENABLED', 'true').lower() == 'true'
        
        if not self.mock_enabled and (self.account_sid and self.auth_token and self.whatsapp_number):
            self.client = Client(self.account_sid, self.auth_token)
        else:
            self.client = None
            logger.info("WhatsApp service initialized in mock mode")

    def send_whatsapp(self, to_number: str, message: str) -> bool:
        """
        Send WhatsApp message using Twilio or mock mode
        """
        try:
            if self.mock_enabled or not self.client:
                logger.info(f"[MOCK WhatsApp] To: {to_number}, Message: {message}")
                return True
            
            # Format number for WhatsApp
            if not to_number.startswith('whatsapp:'):
                to_number = f"whatsapp:{to_number}"
            
            message = self.client.messages.create(
                body=message,
                from_=self.whatsapp_number,
                to=to_number
            )
            logger.info(f"WhatsApp message sent successfully. SID: {message.sid}")
            return True
            
        except TwilioException as e:
            logger.error(f"Twilio WhatsApp error: {e}")
            return False
        except Exception as e:
            logger.error(f"WhatsApp service error: {e}")
            return False

# Global instances
sms_service = SMSService()
whatsapp_service = WhatsAppService()
