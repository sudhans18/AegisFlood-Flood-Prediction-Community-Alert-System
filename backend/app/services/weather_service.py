import requests
import json
from datetime import datetime, timedelta
from typing import Dict, List, Optional
from fastapi import HTTPException
import logging

logger = logging.getLogger(__name__)

class IMDWeatherService:
    """Service for integrating with India Meteorological Department (IMD) APIs"""
    
    def __init__(self):
        # IMD API endpoints (these would need to be updated with actual endpoints)
        self.base_url = "https://mausam.imd.gov.in/api"
        self.nowcast_url = f"{self.base_url}/nowcast"
        self.rainfall_url = f"{self.base_url}/rainfall"
        
    async def get_nowcast_data(self, lat: float, lon: float) -> Dict:
        """
        Get nowcast data from IMD for a specific location
        Nowcast provides short-term weather predictions (0-6 hours)
        """
        try:
            # IMD API call for nowcast data
            params = {
                'lat': lat,
                'lon': lon,
                'format': 'json'
            }
            
            # For demo purposes, we'll simulate the API response
            # In production, this would be the actual API call
            # response = requests.get(self.nowcast_url, params=params, timeout=10)
            
            # Simulated IMD nowcast response
            nowcast_data = {
                'timestamp': datetime.now().isoformat(),
                'location': {'lat': lat, 'lon': lon},
                'nowcast': {
                    'rainfall_1h': self._simulate_rainfall(),
                    'rainfall_3h': self._simulate_rainfall(3),
                    'rainfall_6h': self._simulate_rainfall(6),
                    'intensity': self._get_intensity_level(),
                    'probability': self._get_probability(),
                    'valid_until': (datetime.now() + timedelta(hours=6)).isoformat()
                },
                'weather_conditions': {
                    'temperature': self._simulate_temperature(),
                    'humidity': self._simulate_humidity(),
                    'wind_speed': self._simulate_wind_speed(),
                    'visibility': self._simulate_visibility()
                }
            }
            
            return nowcast_data
            
        except Exception as e:
            logger.error(f"Error fetching IMD nowcast data: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to fetch IMD nowcast data")
    
    async def get_rainfall_data(self, lat: float, lon: float, days: int = 7) -> Dict:
        """
        Get historical rainfall data from IMD
        """
        try:
            # Simulated historical rainfall data
            rainfall_data = {
                'location': {'lat': lat, 'lon': lon},
                'period': f"Last {days} days",
                'data': []
            }
            
            for i in range(days):
                date = datetime.now() - timedelta(days=i)
                rainfall_data['data'].append({
                    'date': date.strftime('%Y-%m-%d'),
                    'rainfall_mm': self._simulate_rainfall(),
                    'normal_mm': 15.5,  # Historical average
                    'departure_percent': self._simulate_departure()
                })
            
            return rainfall_data
            
        except Exception as e:
            logger.error(f"Error fetching IMD rainfall data: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to fetch IMD rainfall data")
    
    def _simulate_rainfall(self, hours: int = 1) -> float:
        """Simulate rainfall data for demo purposes"""
        import random
        if hours == 1:
            return round(random.uniform(0, 25), 1)
        elif hours == 3:
            return round(random.uniform(0, 50), 1)
        else:  # 6 hours
            return round(random.uniform(0, 100), 1)
    
    def _get_intensity_level(self) -> str:
        """Get rainfall intensity level"""
        import random
        levels = ['light', 'moderate', 'heavy', 'very_heavy', 'extreme']
        weights = [0.4, 0.3, 0.2, 0.08, 0.02]  # Probability weights
        return random.choices(levels, weights=weights)[0]
    
    def _get_probability(self) -> int:
        """Get probability of rainfall"""
        import random
        return random.randint(30, 95)
    
    def _simulate_temperature(self) -> float:
        """Simulate temperature data"""
        import random
        return round(random.uniform(20, 35), 1)
    
    def _simulate_humidity(self) -> int:
        """Simulate humidity data"""
        import random
        return random.randint(40, 90)
    
    def _simulate_wind_speed(self) -> float:
        """Simulate wind speed data"""
        import random
        return round(random.uniform(0, 20), 1)
    
    def _simulate_visibility(self) -> float:
        """Simulate visibility data"""
        import random
        return round(random.uniform(2, 10), 1)
    
    def _simulate_departure(self) -> float:
        """Simulate departure from normal rainfall"""
        import random
        return round(random.uniform(-50, 100), 1)


class CWCService:
    """Service for integrating with Central Water Commission (CWC) APIs"""
    
    def __init__(self):
        # CWC API endpoints (these would need to be updated with actual endpoints)
        self.base_url = "https://cwc.gov.in/api"
        self.water_level_url = f"{self.base_url}/water-level"
        self.flood_forecast_url = f"{self.base_url}/flood-forecast"
        
    async def get_water_level_data(self, station_id: str) -> Dict:
        """
        Get real-time water level data from CWC monitoring stations
        """
        try:
            # Simulated CWC water level data
            water_level_data = {
                'station_id': station_id,
                'timestamp': datetime.now().isoformat(),
                'water_level': {
                    'current_m': self._simulate_water_level(),
                    'danger_level_m': 8.5,
                    'warning_level_m': 7.0,
                    'normal_level_m': 5.0
                },
                'flow_rate': {
                    'current_cumecs': self._simulate_flow_rate(),
                    'normal_cumecs': 150.0
                },
                'status': self._get_water_status(),
                'trend': self._get_water_trend()
            }
            
            return water_level_data
            
        except Exception as e:
            logger.error(f"Error fetching CWC water level data: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to fetch CWC water level data")
    
    async def get_flood_forecast(self, basin_id: str) -> Dict:
        """
        Get flood forecast data from CWC
        """
        try:
            # Simulated CWC flood forecast data
            forecast_data = {
                'basin_id': basin_id,
                'timestamp': datetime.now().isoformat(),
                'forecast_period': '24 hours',
                'risk_assessment': {
                    'flood_probability': self._simulate_flood_probability(),
                    'severity_level': self._get_severity_level(),
                    'affected_areas': self._get_affected_areas()
                },
                'water_level_forecast': {
                    '6h': self._simulate_water_level(),
                    '12h': self._simulate_water_level(),
                    '24h': self._simulate_water_level()
                },
                'recommendations': self._get_recommendations()
            }
            
            return forecast_data
            
        except Exception as e:
            logger.error(f"Error fetching CWC flood forecast: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to fetch CWC flood forecast")
    
    def _simulate_water_level(self) -> float:
        """Simulate water level data"""
        import random
        return round(random.uniform(4.0, 9.0), 2)
    
    def _simulate_flow_rate(self) -> float:
        """Simulate flow rate data"""
        import random
        return round(random.uniform(50, 300), 1)
    
    def _get_water_status(self) -> str:
        """Get water level status"""
        import random
        statuses = ['normal', 'above_normal', 'warning', 'danger', 'flood']
        weights = [0.5, 0.2, 0.15, 0.1, 0.05]
        return random.choices(statuses, weights=weights)[0]
    
    def _get_water_trend(self) -> str:
        """Get water level trend"""
        import random
        return random.choice(['rising', 'falling', 'stable'])
    
    def _simulate_flood_probability(self) -> int:
        """Simulate flood probability"""
        import random
        return random.randint(10, 80)
    
    def _get_severity_level(self) -> str:
        """Get flood severity level"""
        import random
        levels = ['low', 'moderate', 'high', 'severe']
        weights = [0.4, 0.3, 0.2, 0.1]
        return random.choices(levels, weights=weights)[0]
    
    def _get_affected_areas(self) -> List[str]:
        """Get list of potentially affected areas"""
        areas = [
            'Low-lying areas near riverbanks',
            'Agricultural fields in floodplains',
            'Roads and bridges in vulnerable zones',
            'Residential areas in low-lying regions'
        ]
        import random
        return random.sample(areas, random.randint(1, 3))
    
    def _get_recommendations(self) -> List[str]:
        """Get flood preparedness recommendations"""
        recommendations = [
            'Monitor water levels continuously',
            'Prepare evacuation plans for vulnerable areas',
            'Ensure emergency response teams are ready',
            'Issue public warnings for affected regions',
            'Coordinate with local authorities'
        ]
        import random
        return random.sample(recommendations, random.randint(2, 4))


class IntegratedWeatherService:
    """Main service that integrates IMD and CWC data for comprehensive flood prediction"""
    
    def __init__(self):
        self.imd_service = IMDWeatherService()
        self.cwc_service = CWCService()
    
    async def get_comprehensive_flood_data(self, lat: float, lon: float, station_id: str = None) -> Dict:
        """
        Get comprehensive flood prediction data by combining IMD and CWC data
        """
        try:
            # Get IMD nowcast data
            imd_data = await self.imd_service.get_nowcast_data(lat, lon)
            
            # Get CWC water level data (if station_id provided)
            cwc_data = None
            if station_id:
                cwc_data = await self.cwc_service.get_water_level_data(station_id)
            
            # Combine data for comprehensive analysis
            comprehensive_data = {
                'timestamp': datetime.now().isoformat(),
                'location': {'lat': lat, 'lon': lon},
                'imd_data': imd_data,
                'cwc_data': cwc_data,
                'flood_risk_assessment': self._assess_flood_risk(imd_data, cwc_data),
                'recommendations': self._generate_recommendations(imd_data, cwc_data)
            }
            
            return comprehensive_data
            
        except Exception as e:
            logger.error(f"Error in comprehensive flood data: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to generate comprehensive flood data")
    
    def _assess_flood_risk(self, imd_data: Dict, cwc_data: Dict = None) -> Dict:
        """Assess flood risk based on combined IMD and CWC data"""
        risk_score = 0
        risk_factors = []
        
        # Analyze IMD rainfall data
        if imd_data and 'nowcast' in imd_data:
            rainfall_6h = imd_data['nowcast'].get('rainfall_6h', 0)
            if rainfall_6h > 80:
                risk_score += 40
                risk_factors.append(f"High rainfall: {rainfall_6h}mm in 6h")
            elif rainfall_6h > 50:
                risk_score += 25
                risk_factors.append(f"Moderate rainfall: {rainfall_6h}mm in 6h")
            elif rainfall_6h > 20:
                risk_score += 15
                risk_factors.append(f"Light rainfall: {rainfall_6h}mm in 6h")
        
        # Analyze CWC water level data
        if cwc_data and 'water_level' in cwc_data:
            current_level = cwc_data['water_level'].get('current_m', 0)
            danger_level = cwc_data['water_level'].get('danger_level_m', 8.5)
            
            if current_level >= danger_level:
                risk_score += 50
                risk_factors.append(f"Water level at danger: {current_level}m")
            elif current_level >= cwc_data['water_level'].get('warning_level_m', 7.0):
                risk_score += 30
                risk_factors.append(f"Water level warning: {current_level}m")
        
        # Determine risk level
        if risk_score >= 70:
            risk_level = 'critical'
        elif risk_score >= 50:
            risk_level = 'high'
        elif risk_score >= 30:
            risk_level = 'moderate'
        elif risk_score >= 15:
            risk_level = 'low'
        else:
            risk_level = 'minimal'
        
        return {
            'risk_score': min(100, risk_score),
            'risk_level': risk_level,
            'risk_factors': risk_factors,
            'assessment_time': datetime.now().isoformat()
        }
    
    def _generate_recommendations(self, imd_data: Dict, cwc_data: Dict = None) -> List[str]:
        """Generate recommendations based on weather and water level data"""
        recommendations = []
        
        if imd_data and 'nowcast' in imd_data:
            rainfall_6h = imd_data['nowcast'].get('rainfall_6h', 0)
            if rainfall_6h > 80:
                recommendations.append("Issue severe weather warnings")
                recommendations.append("Prepare for potential flash floods")
            elif rainfall_6h > 50:
                recommendations.append("Monitor rainfall patterns closely")
                recommendations.append("Alert vulnerable communities")
        
        if cwc_data and 'water_level' in cwc_data:
            current_level = cwc_data['water_level'].get('current_m', 0)
            if current_level >= cwc_data['water_level'].get('danger_level_m', 8.5):
                recommendations.append("Immediate evacuation of low-lying areas")
                recommendations.append("Deploy emergency response teams")
            elif current_level >= cwc_data['water_level'].get('warning_level_m', 7.0):
                recommendations.append("Prepare evacuation plans")
                recommendations.append("Monitor water levels continuously")
        
        if not recommendations:
            recommendations.append("Continue normal monitoring")
            recommendations.append("Update flood preparedness plans")
        
        return recommendations






