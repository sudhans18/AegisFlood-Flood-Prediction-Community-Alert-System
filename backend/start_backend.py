#!/usr/bin/env python3
"""
AegisFlood Backend Startup Script
Handles environment setup, database initialization, and server startup
"""
import os
import sys
import secrets
import subprocess
from pathlib import Path

def generate_secure_env():
    """Generate a secure .env file if it doesn't exist"""
    env_file = Path('.env')
    if not env_file.exists():
        print("Creating secure .env file...")
        
        # Generate secure JWT secret
        jwt_secret = secrets.token_urlsafe(32)
        
        env_content = f"""# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/aegisflood_mvp

# JWT Security
JWT_SECRET={jwt_secret}
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# CORS
FRONTEND_ORIGIN=http://localhost:5173

# Admin (CHANGE THESE IN PRODUCTION!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=SecureAdmin123!

# SMS Integration (Twilio) - Mock enabled for development
TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_PHONE_NUMBER=your_twilio_phone_number_here

# WhatsApp Integration (Twilio WhatsApp Business API)
TWILIO_WHATSAPP_PHONE_NUMBER=whatsapp:your_whatsapp_phone_number_here

# Development Mode - Mock SMS/WhatsApp
MOCK_SMS_ENABLED=true
MOCK_WHATSAPP_ENABLED=true
"""
        
        with open('.env', 'w') as f:
            f.write(env_content)
        print("✓ Secure .env file created")
    else:
        print("✓ .env file already exists")

def check_database():
    """Check if PostgreSQL database is running"""
    try:
        # Try different import methods for psycopg2
        try:
            import psycopg2
        except ImportError:
            import subprocess
            import sys
            print("Installing psycopg2-binary...")
            subprocess.check_call([sys.executable, "-m", "pip", "install", "psycopg2-binary"])
            import psycopg2
        
        conn = psycopg2.connect(
            host="localhost",
            database="aegisflood_mvp",
            user="postgres",
            password="password"
        )
        conn.close()
        print("✓ Database connection successful")
        return True
    except Exception as e:
        print(f"✗ Database connection failed: {e}")
        return False

def setup_database():
    """Initialize database tables"""
    try:
        from app.database import engine, Base
        from app.models import User, Region, FloodPrediction, AlertHistory, Alert
        
        # Create all tables
        Base.metadata.create_all(bind=engine)
        print("✓ Database tables initialized")
        return True
    except Exception as e:
        print(f"✗ Database setup failed: {e}")
        return False

def start_server():
    """Start the FastAPI server"""
    try:
        import uvicorn
        print("🚀 Starting AegisFlood Backend Server...")
        print("📍 Server will be available at: http://127.0.0.1:8000")
        print("📖 API Documentation: http://127.0.0.1:8000/docs")
        print("🔧 Health Check: http://127.0.0.1:8000/health")
        
        uvicorn.run(
            "app.main:app",
            host="127.0.0.1",
            port=8000,
            reload=True,
            log_level="info"
        )
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"✗ Server startup failed: {e}")

def main():
    """Main startup sequence"""
    print("🌊 AegisFlood Backend Startup")
    print("=" * 40)
    
    # Step 1: Generate secure environment
    generate_secure_env()
    
    # Step 2: Check database connectivity
    if not check_database():
        print("\n💡 Database not available. Starting with Docker...")
        try:
            os.chdir('..')
            subprocess.run(['docker-compose', 'up', '-d', 'postgres'], check=True)
            os.chdir('backend')
            print("✓ PostgreSQL started with Docker")
            
            # Wait a moment for database to be ready
            import time
            time.sleep(3)
            
            if not check_database():
                print("✗ Database still not available. Please check Docker setup.")
                return
        except Exception as e:
            print(f"✗ Failed to start database: {e}")
            return
    
    # Step 3: Setup database tables
    if not setup_database():
        return
    
    # Step 4: Start the server
    start_server()

if __name__ == "__main__":
    main()
