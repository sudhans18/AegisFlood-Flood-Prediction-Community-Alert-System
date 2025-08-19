import os
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .database import get_db
from .models import Alert, User
from .schemas import AlertCreate, AlertResponse
from .auth import get_current_user
from .services.sms_service import sms_service, whatsapp_service
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/alerts/", response_model=AlertResponse)
def create_alert(alert: AlertCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Create a new alert and send notifications to users"""
    if current_user.role != "authority":
        raise HTTPException(status_code=403, detail="Only authorities can create alerts")
    
    # Create alert in database
    db_alert = Alert(**alert.dict())
    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)
    
    # Get all users in the affected region
    users = db.query(User).filter(User.location.contains(alert.region)).all()
    
    # Send notifications based on user preferences
    for user in users:
        try:
            message = f"FLOOD ALERT: {alert.message} - Risk Level: {alert.risk_level}"
            
            # Send SMS if user has opted in
            if user.sms_alerts:
                sms_service.send_sms(user.phone_number, message)
            
            # Send WhatsApp if user has opted in
            if user.whatsapp_alerts:
                whatsapp_service.send_whatsapp(user.phone_number, message)
                
        except Exception as e:
            logger.error(f"Failed to send alert to user {user.id}: {e}")
    
    return db_alert

@router.get("/alerts/", response_model=List[AlertResponse])
def get_alerts(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Get all alerts for the current user's region"""
    alerts = db.query(Alert).filter(Alert.region.contains(current_user.location)).all()
    return alerts

@router.post("/alerts/{alert_id}/confirm")
def confirm_alert(alert_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Mark an alert as confirmed by the user"""
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    # In a real implementation, you might want to track confirmations
    # For now, we'll just return success
    return {"message": "Alert confirmed successfully"}

@router.post("/alerts/test-sms")
def test_sms(phone_number: str, message: str = "Test SMS from AegisFlood", current_user: User = Depends(get_current_user)):
    """Test SMS functionality (for development)"""
    if current_user.role != "authority":
        raise HTTPException(status_code=403, detail="Only authorities can test SMS")
    
    success = sms_service.send_sms(phone_number, message)
    if success:
        return {"message": "Test SMS sent successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to send test SMS")

@router.post("/alerts/test-whatsapp")
def test_whatsapp(phone_number: str, message: str = "Test WhatsApp from AegisFlood", current_user: User = Depends(get_current_user)):
    """Test WhatsApp functionality (for development)"""
    if current_user.role != "authority":
        raise HTTPException(status_code=403, detail="Only authorities can test WhatsApp")
    
    success = whatsapp_service.send_whatsapp(phone_number, message)
    if success:
        return {"message": "Test WhatsApp sent successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to send test WhatsApp")




