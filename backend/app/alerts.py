import os
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from twilio.rest import Client

from .database import get_db
from .models import AlertHistory, User, Region
from .schemas import AlertRequest
from .auth import require_role


router = APIRouter()


def get_twilio_client():
    if os.getenv("TWILIO_MOCK", "true").lower() == "true":
        return None
    return Client(os.getenv('TWILIO_ACCOUNT_SID'), os.getenv('TWILIO_AUTH_TOKEN'))


@router.get("/history")
def alert_history(db: Session = Depends(get_db)):
    items = db.query(AlertHistory).order_by(AlertHistory.sent_at.desc()).limit(100).all()
    return items


@router.post("/send")
def send_alert(alert: AlertRequest, db: Session = Depends(get_db), user=Depends(require_role("authority"))):
    region = db.query(Region).filter(Region.id == alert.region_id).one_or_none()
    if region is None:
        raise HTTPException(status_code=404, detail="Region not found")

    users = db.query(User).filter(User.is_active == True).all()
    sent_count = 0

    twilio_client = get_twilio_client()
    from_number = os.getenv('TWILIO_PHONE_NUMBER')
    message_body = f"\u26a0\ufe0f Flood Alert ({alert.risk_level.upper()}):\n{alert.message}\n- AegisFlood"

    for u in users:
        try:
            if twilio_client and from_number:
                twilio_client.messages.create(body=message_body, from_=from_number, to=u.phone_number)
            sent_count += 1
        except Exception:
            continue

    log = AlertHistory(
        region_id=alert.region_id,
        message=alert.message,
        risk_level=alert.risk_level,
        sent_to_count=sent_count,
        created_by=user.get("phone_number", "admin"),
    )
    db.add(log)
    db.commit()

    return {"sent_count": sent_count, "total_users": len(users)}




