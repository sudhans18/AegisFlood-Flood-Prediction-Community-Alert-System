from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from .database import get_db
from .models import User, Region, AlertHistory, FloodPrediction
from .schemas import RegionSummary, DashboardStats


router = APIRouter()


@router.get("/regions", response_model=list[RegionSummary])
def list_regions(db: Session = Depends(get_db)):
    regions = db.query(Region).limit(200).all()
    items: list[RegionSummary] = []
    for r in regions:
        latest = db.query(FloodPrediction).filter(FloodPrediction.region_id == r.id).order_by(FloodPrediction.created_at.desc()).first()
        items.append(RegionSummary(
            id=r.id,
            name=r.name,
            state=r.state,
            latest_risk_level=latest.risk_level if latest else None,
            latest_risk_score=latest.risk_score if latest else None,
        ))
    return items


@router.get("/stats", response_model=DashboardStats)
def basic_stats(db: Session = Depends(get_db)):
    total_users = db.query(func.count(User.id)).scalar() or 0
    total_regions = db.query(func.count(Region.id)).scalar() or 0
    alerts_sent_24h = db.query(func.count(AlertHistory.id)).scalar() or 0
    return DashboardStats(
        total_users=total_users,
        total_regions=total_regions,
        alerts_sent_24h=alerts_sent_24h,
    )




