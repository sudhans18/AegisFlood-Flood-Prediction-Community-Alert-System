import os
from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from .database import get_db
from .models import User
from .schemas import RegisterRequest, VerifyRequest, TokenResponse, AdminLoginRequest


router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

JWT_SECRET = os.getenv("JWT_SECRET", "change_me")
JWT_ALG = "HS256"
JWT_EXPIRE_HOURS = int(os.getenv("JWT_EXPIRE_HOURS", "24"))


def create_access_token(subject: str, role: str, expires_delta: Optional[timedelta] = None) -> str:
    expire = datetime.utcnow() + (expires_delta or timedelta(hours=JWT_EXPIRE_HOURS))
    to_encode = {"sub": subject, "role": role, "exp": expire}
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALG)


def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        phone = payload.get("sub")
        role = payload.get("role")
        if phone is None or role is None:
            raise credentials_exception
        return {"phone_number": phone, "role": role}
    except JWTError:
        raise credentials_exception


def require_role(required_role: str):
    def _role_checker(user=Depends(get_current_user)):
        if user["role"] != required_role:
            raise HTTPException(status_code=403, detail="Insufficient permissions")
        return user

    return _role_checker


@router.post("/register")
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    phone = req.phone_number
    existing = db.query(User).filter(User.phone_number == phone).one_or_none()
    if existing is None:
        user = User(
            phone_number=phone,
            name=req.name,
            language=req.language or "en",
            role="citizen",
        )
        # For MVP, store location as name if no coordinates provided
        if req.location and not req.name:
            user.name = req.location
        db.add(user)
        db.commit()
    # For MVP we mock OTP sending
    return {"otp_sent": True}


@router.post("/verify", response_model=TokenResponse)
def verify(req: VerifyRequest, db: Session = Depends(get_db)):
    # MVP: accept any OTP == "0000"
    if req.otp != "0000":
        raise HTTPException(status_code=400, detail="Invalid OTP")
    user = db.query(User).filter(User.phone_number == req.phone_number).one_or_none()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    token = create_access_token(subject=user.phone_number, role=user.role)
    return TokenResponse(access_token=token, role=user.role)


@router.post("/admin/login", response_model=TokenResponse)
def admin_login(req: AdminLoginRequest):
    admin_user = os.getenv("ADMIN_USERNAME", "admin")
    admin_pass = os.getenv("ADMIN_PASSWORD", "admin123")
    if req.username != admin_user or req.password != admin_pass:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(subject=f"admin:{req.username}", role="authority")
    return TokenResponse(access_token=token, role="authority")




