# Product Requirements Document (PRD)

## Product Name

**AegisFlood** – AI-Powered Flood Prediction & Community Alert System

## Document Owner

Product Manager (PM) – Sudhan S

## Version

v2.0 – Detailed Hackathon + Scale Plan

---

## 1. Vision & Goals

**Vision:** To become India’s most reliable, hyperlocal, and community-driven flood prediction and alert system that saves lives, protects livelihoods, and empowers citizens and authorities.

**Goals:**

- Deliver short-term (1–3 day) accurate flood predictions.
- Provide multi-channel alerts accessible in low-connectivity environments.
- Foster trust via explainable AI and citizen engagement.
- Scale from pilot (Assam/Bihar) to nationwide and later global expansion.
- Create a data-driven ecosystem for disaster management stakeholders.

---

## 2. Target Users

**Primary Users:**

- Citizens in flood-prone regions (Assam, Bihar, metro flood hotspots).
- Farmers requiring early warnings for crops and livestock.

**Secondary Users:**

- State Disaster Management Authorities (SDMAs, DDMAs).
- NGOs and aid organizations.
- Insurance and logistics companies.
- Local panchayats/ward officials.

---

## 3. Key Features

### MVP (10-day Hackathon Build)

- **Data Ingestion & Prediction:** Basic model using rainfall + river-level data.
- **Alerts:** Automated SMS/WhatsApp (English + local language).
- **Web Dashboard:** Risk map (color zones), rainfall summaries, river gauges.
- **Admin Console:** Manage phone numbers, trigger alerts.

### Extended (2-month Build)

- **Advanced Prediction:**
  - ML + hydrology hybrid models.
  - Dam discharge intelligence.
  - Satellite-driven flood extent mapping.
- **Mobile App (React Native / PWA):**
  - Offline cache of maps + alerts.
  - Citizen reporting (text/photos).
- **Interactive Gov/NGO Dashboard:**
  - Historical flood trends.
  - Citizen report overlays.
- **Multi-Channel Alerts:** SMS, WhatsApp, IVR, push notifications.
- **Explainable AI:** Confidence levels + key factors driving predictions.
- **Crowdsourcing:** Incorporate citizen inputs into dashboards.

---

## 4. Functional Requirements

### Data & Prediction

- FR1: Ingest rainfall/river-level/dam data from IMD, NWIC, NASA GPM.
- FR2: Compute flood risk scores daily and update twice a day.
- FR3: Handle region-level (district/village) predictions.

### Alerts

- FR4: Generate alerts with area, risk level, timeframe, safety tips.
- FR5: Multi-lingual alerts (Hindi, Assamese, Bengali).
- FR6: Deliver via SMS/WhatsApp API (Twilio/open-source alternatives).

### Dashboard

- FR7: Map layers: risk zones, rainfall, river gauges.
- FR8: Search + filter by district/village.
- FR9: Responsive UI for desktop/mobile.

### App (Extended)

- FR10: Offline support (last synced alerts, cached maps).
- FR11: User inputs: geotagged photos + comments.

### Administration

- FR12: Contact list management.
- FR13: Alert delivery logs & analytics.

---

## 5. Non-Functional Requirements (NFRs)

- **Performance:** End-to-end prediction + alert cycle < 15 minutes.
- **Scalability:** Support 100k SMS/day initially; millions at scale.
- **Reliability:** >99% uptime.
- **Localization:** Support 5+ Indian languages.
- **Security:** Encrypt PII; anonymize user data.
- **Accessibility:** Low-bandwidth optimization.

---

## 6. System Architecture (High-Level)

**Pipeline:**

1. **Data Sources:** IMD, CWC, NWIC, NASA GPM, DEM.
2. **ETL Layer:** Scheduled Python scripts, stored in PostgreSQL/PostGIS.
3. **Prediction Engine:** ML + hydrology hybrid → risk score.
4. **API Layer:** FastAPI serving risk forecasts.
5. **Frontend:** React (dashboard, PWA app).
6. **Alerting Service:** Twilio/WhatsApp/IVR.
7. **Admin Tools:** Web console.

---

## 7. Success Metrics

**Hackathon (10 days):**

- 90% alerts successfully delivered.
- Latency < 10 minutes from forecast → SMS.
- Pilot demo with 50–100 users.

**Extended (2 months):**

-
  > 75% prediction accuracy for 1–3 days.
-
  > 60% user confirmation on alert receipt.
-
  > 10 verified citizen reports/week.

**Scale (6–12 months):**

- Coverage: 5+ flood-prone states.
- 500k+ registered users.
- Partnerships with at least 2 state governments/NGOs.

---

## 8. Dependencies

- Public datasets: IMD, CWC, NWIC, NASA.
- APIs: Twilio/WhatsApp, SMS gateways.
- Mapping: Leaflet.js, OpenStreetMap.
- Cloud hosting: AWS/GCP/Azure credits.

---

## 9. Risks & Mitigations

- **Data gaps:** Backup global datasets (NASA/NOAA).
- **Poor telecom delivery:** IVR fallback, community radio integration.
- **Low accuracy at start:** Use thresholds/heuristics, improve iteratively.
- **Language/local adoption:** Partner with local NGOs.

---

## 10. Roadmap

**Hackathon (10 Days):**

- ETL pipeline + baseline model.
- Flask/FastAPI backend + SMS integration.
- React dashboard + prototype.

**Phase 2 (2 Months):**

- Advanced ML + hydrology.
- Mobile app (offline + crowdsourcing).
- Dam discharge + satellite mapping.

**Phase 3 (6–12 Months):**

- Multi-state rollout.
- Partnerships with NDMA, NGOs, insurers.
- Scaling to millions of users.

---

## 11. Appendix

- Example alert templates (SMS, WhatsApp, IVR).
- Architecture diagram.
- Competitor matrix (Google FloodHub, CWC, NDMA, state portals).
- Dataset catalog.

