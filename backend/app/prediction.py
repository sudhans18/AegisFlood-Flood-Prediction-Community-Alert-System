import random
from datetime import date, timedelta
from typing import Dict

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .database import get_db
from .models import FloodPrediction, Region
from .schemas import PredictionResponse
from .services.weather_service import IntegratedWeatherService, IMDWeatherService, CWCService


router = APIRouter()


class SimplePredictionEngine:
    def predict_flood_risk(self, region_id: int, weather_data: Dict) -> Dict:
        rainfall_24h = weather_data.get('rainfall_24h', random.uniform(0, 150))
        if rainfall_24h > 100:
            risk_level = 'high'
            risk_score = min(90, 60 + int(rainfall_24h - 100))
        elif rainfall_24h > 50:
            risk_level = 'medium'
            risk_score = 30 + int(rainfall_24h - 50)
        else:
            risk_level = 'low'
            risk_score = max(10, int(rainfall_24h))
        return {
            'region_id': region_id,
            'risk_level': risk_level,
            'risk_score': risk_score,
            'factors': {
                'rainfall_24h': rainfall_24h,
                'prediction_method': 'simple_rules'
            },
            'valid_until': date.today() + timedelta(days=1)
        }


@router.get("/{region_id}", response_model=PredictionResponse)
def get_prediction(region_id: int, db: Session = Depends(get_db)):
    region = db.query(Region).filter(Region.id == region_id).one_or_none()
    if region is None:
        raise HTTPException(status_code=404, detail="Region not found")

    engine = SimplePredictionEngine()
    weather_data = {
        'rainfall_24h': random.uniform(0, 150),
        'temperature': random.uniform(20, 35)
    }
    prediction = engine.predict_flood_risk(region_id, weather_data)

    db_prediction = FloodPrediction(
        region_id=region_id,
        risk_level=prediction['risk_level'],
        risk_score=prediction['risk_score'],
        weather_data=weather_data,
    )
    db.add(db_prediction)
    db.commit()

    return prediction


@router.get("/location")
def get_prediction_by_location(lat: float, lon: float, db: Session = Depends(get_db)):
    # MVP: naive mapping to nearest region by ID for demo purposes
    region = db.query(Region).first()
    if region is None:
        raise HTTPException(status_code=404, detail="No regions available")
    return get_prediction(region.id, db)


@router.get("/imd/nowcast")
async def get_imd_nowcast(lat: float, lon: float):
    """Get IMD nowcast data for a specific location"""
    try:
        imd_service = IMDWeatherService()
        nowcast_data = await imd_service.get_nowcast_data(lat, lon)
        return {
            "status": "success",
            "data": nowcast_data,
            "source": "IMD Nowcast API"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch IMD nowcast: {str(e)}")


@router.get("/imd/rainfall")
async def get_imd_rainfall(lat: float, lon: float, days: int = 7):
    """Get IMD historical rainfall data for a specific location"""
    try:
        imd_service = IMDWeatherService()
        rainfall_data = await imd_service.get_rainfall_data(lat, lon, days)
        return {
            "status": "success",
            "data": rainfall_data,
            "source": "IMD Rainfall API"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch IMD rainfall: {str(e)}")


@router.get("/cwc/water-level/{station_id}")
async def get_cwc_water_level(station_id: str):
    """Get CWC water level data for a specific monitoring station"""
    try:
        cwc_service = CWCService()
        water_level_data = await cwc_service.get_water_level_data(station_id)
        return {
            "status": "success",
            "data": water_level_data,
            "source": "CWC Water Level API"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch CWC water level: {str(e)}")


@router.get("/cwc/flood-forecast/{basin_id}")
async def get_cwc_flood_forecast(basin_id: str):
    """Get CWC flood forecast data for a specific river basin"""
    try:
        cwc_service = CWCService()
        forecast_data = await cwc_service.get_flood_forecast(basin_id)
        return {
            "status": "success",
            "data": forecast_data,
            "source": "CWC Flood Forecast API"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch CWC flood forecast: {str(e)}")


@router.get("/comprehensive/{lat}/{lon}")
async def get_comprehensive_flood_data(
    lat: float, 
    lon: float, 
    station_id: str = None,
    db: Session = Depends(get_db)
):
    """Get comprehensive flood prediction data combining IMD and CWC data"""
    try:
        # Get the nearest region for database storage
        region = db.query(Region).first()
        if region is None:
            raise HTTPException(status_code=404, detail="No regions available")
        
        # Get comprehensive data from integrated service
        weather_service = IntegratedWeatherService()
        comprehensive_data = await weather_service.get_comprehensive_flood_data(lat, lon, station_id)
        
        # Store prediction in database
        risk_assessment = comprehensive_data.get('flood_risk_assessment', {})
        db_prediction = FloodPrediction(
            region_id=region.id,
            risk_level=risk_assessment.get('risk_level', 'unknown'),
            risk_score=risk_assessment.get('risk_score', 0),
            weather_data=comprehensive_data,
        )
        db.add(db_prediction)
        db.commit()
        
        return {
            "status": "success",
            "data": comprehensive_data,
            "source": "Integrated IMD + CWC Data",
            "region_id": region.id
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate comprehensive data: {str(e)}")




