from datetime import date
from typing import Optional, List, Dict
from pydantic import BaseModel, Field, constr, conint


PhoneNumberStr = constr(min_length=8, max_length=15)


class RegisterRequest(BaseModel):
    phone_number: PhoneNumberStr
    name: Optional[str] = None
    language: Optional[str] = Field(default="en", pattern=r"^[a-z]{2}(-[A-Z]{2})?$")
    latitude: Optional[float] = Field(default=None, ge=-90, le=90)
    longitude: Optional[float] = Field(default=None, ge=-180, le=180)


class VerifyRequest(BaseModel):
    phone_number: PhoneNumberStr
    otp: constr(min_length=4, max_length=8)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str


class AdminLoginRequest(BaseModel):
    username: str
    password: str


class PredictionResponse(BaseModel):
    region_id: int
    risk_level: str
    risk_score: conint(ge=0, le=100)
    factors: Dict[str, float | str]
    valid_until: date


class AlertRequest(BaseModel):
    region_id: int
    risk_level: str
    message: constr(min_length=1, max_length=300)


class AlertHistoryItem(BaseModel):
    id: int
    region_id: int
    message: str
    risk_level: Optional[str]
    sent_to_count: int
    sent_at: str
    created_by: Optional[str]

    class Config:
        from_attributes = True


class RegionSummary(BaseModel):
    id: int
    name: str
    state: Optional[str]
    latest_risk_level: Optional[str] = None
    latest_risk_score: Optional[int] = None


class DashboardStats(BaseModel):
    total_users: int
    total_regions: int
    alerts_sent_24h: int




