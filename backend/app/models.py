from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey, Boolean, JSON, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from geoalchemy2 import Geography

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    phone_number = Column(String(15), unique=True, nullable=False, index=True)
    name = Column(String(255), nullable=True)
    # Geography Point (lon, lat)
    location = Column(Geography(geometry_type='POINT', srid=4326), nullable=True)
    language = Column(String(10), nullable=False, default='en')
    role = Column(String(20), nullable=False, default='citizen')  # citizen, authority
    sms_alerts = Column(Boolean, nullable=False, default=True)
    whatsapp_alerts = Column(Boolean, nullable=False, default=False)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)


class Region(Base):
    __tablename__ = "regions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    state = Column(String(100), nullable=True)
    geometry = Column(Geography(geometry_type='POLYGON', srid=4326), nullable=True)
    population = Column(Integer, nullable=True)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)

    predictions = relationship("FloodPrediction", back_populates="region")


class FloodPrediction(Base):
    __tablename__ = "flood_predictions"

    id = Column(Integer, primary_key=True, index=True)
    region_id = Column(Integer, ForeignKey("regions.id"), nullable=False)
    prediction_date = Column(Date, server_default=func.current_date(), nullable=False)
    risk_level = Column(String(20), nullable=False)
    risk_score = Column(Integer, nullable=False)
    weather_data = Column(JSON, nullable=True)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)

    region = relationship("Region", back_populates="predictions")


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    region = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    risk_level = Column(String(20), nullable=False)  # low, medium, high, critical
    created_by = Column(String(100), nullable=True)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)


class AlertHistory(Base):
    __tablename__ = "alert_history"

    id = Column(Integer, primary_key=True, index=True)
    region_id = Column(Integer, ForeignKey("regions.id"), nullable=False)
    message = Column(String, nullable=False)
    risk_level = Column(String(20), nullable=True)
    sent_to_count = Column(Integer, nullable=False, default=0)
    sent_at = Column(DateTime, server_default=func.now(), nullable=False)
    created_by = Column(String(100), nullable=True)




