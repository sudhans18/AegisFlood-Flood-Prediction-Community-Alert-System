# AegisFlood MVP Backend Structure (10-Day Hackathon)

## Document Overview
**Product:** AegisFlood MVP - Simple Flood Alert System  
**Version:** MVP v1.0  
**Timeline:** 10 days  
**Team:** 3-4 developers  

---

## 1. MVP Scope (Keep It Simple!)

### What We're Building (MVP Only):
- ✅ Basic flood risk prediction (simple model)
- ✅ SMS alerts to registered users
- ✅ Simple web dashboard showing risk zones
- ✅ User registration via phone number
- ✅ Admin panel to send manual alerts

### What We're NOT Building (Post-MVP):
- ❌ Complex ML models with multiple data sources
- ❌ Mobile app (web-only for MVP)
- ❌ WhatsApp/Push notifications (SMS only)
- ❌ Citizen reporting
- ❌ Real-time data ingestion
- ❌ Advanced analytics

---

## 2. Simple Tech Stack

### Backend Framework
```python
# Single FastAPI application (monolith for MVP)
FastAPI + Uvicorn
Python 3.11+
```

### Database
```python
# Just PostgreSQL (no Redis, no InfluxDB, no Elasticsearch)
PostgreSQL 15+ with PostGIS extension
SQLAlchemy ORM
```

### Background Tasks
```python
# Simple background tasks (no Celery for MVP)
FastAPI BackgroundTasks
or simple cron jobs
```

### External Services
```python
# Minimal external dependencies
Twilio for SMS (free trial)
OpenStreetMap for maps (free)
IMD API for weather data (if available)
```

---

## 3. Simplified Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Weather API   │────│   FastAPI App   │────│   PostgreSQL    │
│   (IMD/Mock)    │    │                 │    │   Database      │
└─────────────────┘    │  - Auth         │    └─────────────────┘
                       │  - Predictions  │            
┌─────────────────┐    │  - Alerts       │    ┌─────────────────┐
│   Twilio SMS    │────│  - Admin        │    │   React         │
│   Gateway       │    │  - Dashboard    │    │   Frontend      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 4. Database Schema (Minimal)

```sql
-- Just 4 essential tables for MVP

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    name VARCHAR(255),
    location GEOGRAPHY(POINT, 4326),
    language VARCHAR(10) DEFAULT 'en',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Regions table (pre-populated with major districts)
CREATE TABLE regions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    state VARCHAR(100),
    geometry GEOGRAPHY(POLYGON, 4326),
    population INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Simple predictions table
CREATE TABLE flood_predictions (
    id SERIAL PRIMARY KEY,
    region_id INTEGER REFERENCES regions(id),
    prediction_date DATE DEFAULT CURRENT_DATE,
    risk_level VARCHAR(20), -- low, medium, high, critical
    risk_score INTEGER CHECK (risk_score >= 0 AND risk_score <= 100),
    weather_data JSONB, -- store raw weather data
    created_at TIMESTAMP DEFAULT NOW()
);

-- Alert history
CREATE TABLE alert_history (
    id SERIAL PRIMARY KEY,
    region_id INTEGER REFERENCES regions(id),
    message TEXT NOT NULL,
    risk_level VARCHAR(20),
    sent_to_count INTEGER DEFAULT 0,
    sent_at TIMESTAMP DEFAULT NOW(),
    created_by VARCHAR(100) -- admin username
);
```

---

## 5. Simple API Structure

### Single FastAPI App Structure
```
mvp_backend/
├── app/
│   ├── main.py              # FastAPI app entry point
│   ├── database.py          # Database connection
│   ├── models.py            # SQLAlchemy models (all in one file)
│   ├── schemas.py           # Pydantic schemas (all in one file)
│   ├── auth.py              # Simple phone-based auth
│   ├── prediction.py        # Simple prediction logic
│   ├── alerts.py            # Alert sending logic
│   └── admin.py             # Admin endpoints
├── data/
│   ├── regions.json         # Pre-populated region data
│   └── sample_weather.json  # Mock weather data for testing
├── scripts/
│   ├── setup_db.py          # Database setup script
│   └── load_regions.py      # Load initial region data
├── requirements.txt         # Minimal dependencies
├── docker-compose.yml       # Simple local setup
└── README.md
```

### Essential API Endpoints (Only These!)
```python
# Authentication (Simple)
POST /auth/register          # Register with phone number
POST /auth/verify           # Verify OTP (mock for MVP)

# Predictions (Simple)
GET  /predictions/{region_id}  # Get current prediction for region
GET  /predictions/location     # Get prediction by lat/lon

# Alerts (Simple)
POST /admin/alerts/send      # Admin: Send alert to region
GET  /alerts/history        # Get alert history

# Dashboard Data (Simple)
GET  /dashboard/regions     # Get all regions with current risk
GET  /dashboard/stats       # Basic stats for admin dashboard
```

---

## 6. Minimal Dependencies

```txt
# requirements.txt (Keep it minimal!)
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
geoalchemy2==0.14.2
pydantic==2.5.0
python-multipart==0.0.6
twilio==8.10.0
requests==2.31.0
python-dotenv==1.0.0
```

---

## 7. Simple Prediction Logic (MVP)

```python
# app/prediction.py - Dead simple prediction logic
import random
from datetime import date, timedelta
from typing import Dict

class SimplePredictionEngine:
    """MVP: Simple rule-based prediction (no ML yet!)"""
    
    def predict_flood_risk(self, region_id: int, weather_data: Dict) -> Dict:
        """
        MVP prediction logic:
        - If rainfall > 100mm in 24h: High risk
        - If rainfall > 50mm in 24h: Medium risk  
        - Otherwise: Low risk
        """
        
        # Get rainfall (mock data for MVP)
        rainfall_24h = weather_data.get('rainfall_24h', random.uniform(0, 150))
        
        # Simple rules
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

# Usage in FastAPI endpoint
@app.get("/predictions/{region_id}")
async def get_prediction(region_id: int):
    engine = SimplePredictionEngine()
    
    # Mock weather data (replace with real API later)
    weather_data = {
        'rainfall_24h': random.uniform(0, 150),
        'temperature': random.uniform(20, 35)
    }
    
    prediction = engine.predict_flood_risk(region_id, weather_data)
    
    # Store in database
    db_prediction = FloodPrediction(**prediction)
    db.add(db_prediction)
    db.commit()
    
    return prediction
```

---

## 8. Simple Alert System

```python
# app/alerts.py - Simple SMS alerts
from twilio.rest import Client
import os

class SimpleAlertSystem:
    def __init__(self):
        self.twilio_client = Client(
            os.getenv('TWILIO_ACCOUNT_SID'),
            os.getenv('TWILIO_AUTH_TOKEN')
        )
        self.from_number = os.getenv('TWILIO_PHONE_NUMBER')
    
    def send_alert(self, region_id: int, risk_level: str, message: str):
        """Send SMS alert to all users in region"""
        
        # Get users in region (simple query)
        users = db.query(User).join(Region).filter(
            Region.id == region_id,
            User.is_active == True
        ).all()
        
        sent_count = 0
        
        for user in users:
            try:
                # Send SMS
                message_body = f"⚠️ Flood Alert ({risk_level.upper()}):\n{message}\n- AegisFlood"
                
                self.twilio_client.messages.create(
                    body=message_body,
                    from_=self.from_number,
                    to=user.phone_number
                )
                
                sent_count += 1
                
            except Exception as e:
                print(f"Failed to send SMS to {user.phone_number}: {e}")
        
        # Log alert
        alert_log = AlertHistory(
            region_id=region_id,
            message=message,
            risk_level=risk_level,
            sent_to_count=sent_count
        )
        db.add(alert_log)
        db.commit()
        
        return {"sent_count": sent_count, "total_users": len(users)}

# FastAPI endpoint
@app.post("/admin/alerts/send")
async def send_alert(alert_data: AlertRequest):
    alert_system = SimpleAlertSystem()
    
    result = alert_system.send_alert(
        region_id=alert_data.region_id,
        risk_level=alert_data.risk_level,
        message=alert_data.message
    )
    
    return result
```

---

## 9. Development Setup (Simple)

### Docker Compose for Local Development
```yaml
# docker-compose.yml - Just 2 services!
version: '3.8'

services:
  postgres:
    image: postgis/postgis:15-3.3
    environment:
      POSTGRES_DB: aegisflood_mvp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/aegisflood_mvp
      - TWILIO_ACCOUNT_SID=your_twilio_sid
      - TWILIO_AUTH_TOKEN=your_twilio_token
      - TWILIO_PHONE_NUMBER=your_twilio_number
    depends_on:
      - postgres
    volumes:
      - ./app:/app
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --reload

volumes:
  postgres_data:
```

### Simple Dockerfile
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## 10. Quick Start Guide

### Day 1-2: Setup & Database
```bash
# 1. Setup environment
git clone your-repo
cd aegisflood-mvp
python -m venv venv
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt

# 2. Setup database
docker-compose up postgres -d
python scripts/setup_db.py
python scripts/load_regions.py

# 3. Test basic API
uvicorn app.main:app --reload
curl http://localhost:8000/dashboard/regions
```

### Day 3-4: Basic APIs
- Implement user registration
- Simple prediction endpoint
- Basic alert sending

### Day 5-6: Frontend Integration
- React dashboard showing risk map
- Admin panel for sending alerts
- User registration form

### Day 7-8: Testing & Polish
- Test SMS delivery
- Fix bugs
- Add basic error handling

### Day 9-10: Demo Prep
- Deploy to cloud (Heroku/Railway)
- Prepare demo data
- Practice presentation

---

## 11. What Makes This MVP (Not Over-Engineering):

### ✅ MVP Characteristics:
- **Single codebase** (no microservices)
- **One database** (just PostgreSQL)
- **Simple prediction** (rule-based, no ML training)
- **Manual processes** (admin sends alerts manually)
- **Basic UI** (functional, not pretty)
- **Minimal dependencies** (< 10 packages)
- **No complex features** (offline support, real-time updates, etc.)

### 📈 Post-MVP Roadmap (Later):
- **Phase 2** (Months 1-2): Add ML models, mobile app, real-time data
- **Phase 3** (Months 3-6): Microservices, advanced features, scaling
- **Phase 4** (Months 6-12): Multi-state rollout, partnerships

---

## 12. Success Metrics for MVP Demo:

1. ✅ **Register 50+ test users** via web form
2. ✅ **Generate predictions** for 5+ regions
3. ✅ **Send SMS alerts** to registered users
4. ✅ **Display risk map** on web dashboard  
5. ✅ **Admin can trigger alerts** manually
6. ✅ **Demo runs without crashes** for 10+ minutes

---

## 13. MVP Limitations (Acknowledge These):

- **Prediction accuracy**: Very basic (will improve with ML)
- **Data sources**: Limited (will add more sources)
- **Manual processes**: Admin has to send alerts manually
- **Limited features**: No mobile app, no citizen reporting
- **Simple UI**: Functional but not polished
- **No real-time updates**: Refresh required

---