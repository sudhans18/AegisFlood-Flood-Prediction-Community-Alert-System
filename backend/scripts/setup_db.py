import os
from sqlalchemy import text
from sqlalchemy.exc import OperationalError
from backend.app.database import engine, Base
from backend.app.models import User, Region, FloodPrediction, AlertHistory # Explicitly import all models


def ensure_postgis():
    try:
        with engine.connect() as conn:
            conn.execute(text("CREATE EXTENSION IF NOT EXISTS postgis"))
            conn.commit()
    except OperationalError as e:
        print("Database connection failed:", e)
        raise


def init_tables():
    # Drop all existing tables before creating them
    Base.metadata.drop_all(bind=engine)
    # Create all tables defined in Base.metadata
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    ensure_postgis()
    init_tables()
    print("Database initialized.")




