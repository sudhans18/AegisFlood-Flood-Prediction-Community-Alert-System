import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import text
from sqlalchemy.exc import OperationalError
from app.database import engine, Base
from app.models import User, Region, FloodPrediction, AlertHistory, Alert


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




