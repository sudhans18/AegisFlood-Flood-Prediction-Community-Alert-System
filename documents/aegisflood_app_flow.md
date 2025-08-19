# AegisFlood App Flow Document

## Document Overview
**Product:** AegisFlood - AI-Powered Flood Prediction & Community Alert System  
**Version:** v2.0  
**Created by:** Product Manager - Sudhan S  
**Date:** August 2025

---

## 1. System Architecture Flow

### Data Pipeline Flow
```
[Data Sources] → [ETL Layer] → [Prediction Engine] → [API Layer] → [Frontend/Alerts]
     ↓              ↓              ↓               ↓            ↓
- IMD Weather    Python       ML + Hydrology    FastAPI    Web Dashboard
- CWC Rivers     Scripts      Risk Scoring      REST API   Mobile App
- NWIC Data      Scheduled    Confidence        JSON       SMS/WhatsApp
- NASA GPM       Jobs         Levels            Response   IVR System
- DEM Terrain    PostgreSQL                     Cache      Push Notifications
```

---

## 2. User Journey Flows

### 2.1 Citizen User Journey

#### **Registration & Onboarding**
1. **Entry Points:**
   - Web dashboard visit
   - SMS keyword registration
   - Mobile app download
   - Community referral

2. **Registration Flow:**
   ```
   Landing Page → Location Input → Phone Verification → Language Selection → Alert Preferences → Dashboard Access
   ```

3. **Onboarding Steps:**
   - Welcome screen with value proposition
   - Location permission request
   - Alert channel preferences (SMS/WhatsApp/Push)
   - Language selection (Hindi/Assamese/Bengali/English)
   - Tutorial walkthrough of key features

#### **Daily Usage Flow**
1. **Proactive Check:**
   ```
   App Launch → Location Detection → Risk Dashboard → Current Alerts → Weekly Forecast
   ```

2. **Alert Response:**
   ```
   Alert Received → Alert Details → Safety Instructions → Confirm Receipt → Share with Family → Report Ground Truth (Optional)
   ```

### 2.2 Authority User Journey (SDMA/DDMA/NGO)

#### **Admin Dashboard Flow**
1. **Login & Overview:**
   ```
   Authentication → Regional Dashboard → Risk Overview → Active Alerts → Historical Trends
   ```

2. **Alert Management:**
   ```
   Risk Detection → Review Prediction → Customize Alert → Select Recipients → Schedule/Send → Monitor Delivery
   ```

3. **Citizen Report Review:**
   ```
   New Reports Queue → Verify Authenticity → Update Risk Models → Respond to Citizens → Archive Report
   ```

---

## 3. Feature-Specific Flows

### 3.1 Prediction & Alert Generation Flow

#### **Backend Process (Automated)**
```
[Every 6 Hours]
↓
Data Collection → Data Validation → Feature Engineering → ML Prediction → Risk Scoring → Threshold Check
↓
[If Risk > Threshold]
↓
Alert Generation → Language Translation → Channel Routing → Delivery Confirmation → Success Logging
```

#### **Alert Delivery Flow**
```
Risk Score Generated → Alert Template Selection → Multi-language Generation → Channel Selection
↓
SMS (Primary) → WhatsApp (Secondary) → Push Notification (Tertiary) → IVR (Fallback)
↓
Delivery Confirmation → User Response Tracking → Analytics Update
```

### 3.2 Mobile App Flows (Extended Version)

#### **Offline-First Architecture**
```
App Launch → Check Connectivity → [Online: Sync Data] / [Offline: Load Cache] → Display Interface
↓
User Interaction → [Online: Real-time Update] / [Offline: Queue Action] → Auto-sync when Connected
```

#### **Citizen Reporting Flow**
```
Report Button → Location Detection → Incident Type Selection → Photo Capture (Optional) → Description Input
↓
Severity Rating → Submit → [Online: Immediate Send] / [Offline: Queue] → Confirmation Message
```

### 3.3 Web Dashboard Flows

#### **Public Dashboard**
```
Homepage → Region Selection → Risk Map View → Layer Toggle (Rainfall/Rivers/Risk Zones) → Detailed Forecast
↓
Historical Data → Trends Analysis → Export Data → Share Report
```

#### **Admin Console**
```
Login → User Management → Alert History → Delivery Analytics → System Health → Report Management
```

---

## 4. Data Flow Architecture

### 4.1 Real-time Data Pipeline
```
External APIs → Data Validation → PostgreSQL/PostGIS Storage → Feature Calculation → ML Model → Risk Score
↓
API Cache → Frontend Requests → User Interface Update → Alert Triggers → Delivery Services
```

### 4.2 User Data Flow
```
User Registration → Profile Storage → Location Tracking → Preference Management → Alert History
↓
Engagement Analytics → Feedback Collection → Model Improvement → Personalization
```

---

## 5. Technical Integration Flows

### 5.1 Third-Party Service Integration

#### **SMS/WhatsApp Flow (Twilio)**
```
Alert Trigger → Message Queue → Twilio API → Delivery Status Webhook → Database Update → User Notification
```

#### **Mapping Services Flow**
```
Location Request → Geocoding API → Coordinate Validation → Risk Zone Mapping → Visual Rendering → User Display
```

### 5.2 API Flow Structure
```
Frontend Request → Authentication Check → Rate Limiting → Route Handler → Database Query → Response Formatting → Client Response
```

---

## 6. Error Handling & Fallback Flows

### 6.1 Alert Delivery Failures
```
Primary SMS Failure → WhatsApp Retry → Push Notification Backup → IVR Fallback → Community Radio Alert → Manual Notification
```

### 6.2 Data Source Failures
```
Primary Data Source Down → Secondary Source Activation → Historical Data Fallback → Reduced Confidence Alert → System Status Update
```

### 6.3 Offline Mobile App Handling
```
Connection Lost → Offline Mode Activation → Cache Data Display → Queue User Actions → Auto-sync on Reconnection → Conflict Resolution
```

---

## 7. Analytics & Monitoring Flows

### 7.1 Real-time Monitoring
```
System Metrics → Alert Dashboard → Performance Tracking → Error Detection → Automated Alerts → Team Notification
```

### 7.2 User Analytics
```
User Actions → Event Logging → Data Aggregation → Insight Generation → Dashboard Updates → Product Decisions
```

---

## 8. Security & Privacy Flows

### 8.1 Data Protection Flow
```
Data Collection → Encryption → Anonymization → Storage → Access Control → Audit Logging → Compliance Check
```

### 8.2 User Authentication Flow
```
Login Request → Credential Validation → Multi-factor Authentication → Session Management → Token Refresh → Logout Cleanup
```

---

## 9. Scalability Considerations

### 9.1 Load Balancing Flow
```
User Request → Load Balancer → Available Server → Resource Check → Response Generation → Cache Update → User Response
```

### 9.2 Database Scaling Flow
```
Data Growth → Performance Monitoring → Threshold Detection → Auto-scaling Trigger → Resource Allocation → Performance Validation
```

---

## 10. Success Metrics Tracking

### 10.1 Performance Metrics Flow
```
System Event → Metric Collection → Data Aggregation → Threshold Comparison → Alert Generation → Dashboard Update
```

### 10.2 User Engagement Flow
```
User Action → Event Tracking → Engagement Calculation → Trend Analysis → Improvement Recommendations → Feature Updates
```

---

## 11. Future State Flows (Scale Phase)

### 11.1 Multi-State Expansion
```
New Region → Data Source Integration → Model Training → Pilot Testing → Full Deployment → Monitoring & Optimization
```

### 11.2 Partnership Integration
```
Partner Identification → API Integration → Data Sharing → Joint Alert System → Performance Monitoring → Relationship Management
```

---

## 12. Critical Decision Points

### 12.1 Alert Threshold Management
- **Low Risk (0-30%):** Information only
- **Medium Risk (31-60%):** Preparation advisory
- **High Risk (61-85%):** Immediate action required
- **Critical Risk (86-100%):** Emergency evacuation

### 12.2 Language & Localization Routing
```
User Location → Language Detection → Cultural Context → Message Adaptation → Channel Optimization → Delivery
```

---

This app flow document provides the foundation for development teams to understand the complete user journey, technical architecture, and system interactions required for AegisFlood's successful implementation.