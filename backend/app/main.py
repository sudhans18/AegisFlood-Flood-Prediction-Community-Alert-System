from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from .auth import router as auth_router
from .prediction import router as prediction_router
from .alerts import router as alerts_router
from .admin import router as admin_router


def create_app() -> FastAPI:
    app = FastAPI(title="AegisFlood API (MVP)")

    frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[frontend_origin],
        allow_credentials=True,
        allow_methods=["GET", "POST"],
        allow_headers=["*"],
    )

    app.include_router(auth_router, prefix="/auth", tags=["auth"])
    app.include_router(prediction_router, prefix="/predictions", tags=["predictions"])
    app.include_router(alerts_router, prefix="/alerts", tags=["alerts"])
    app.include_router(admin_router, prefix="/dashboard", tags=["dashboard"])

    @app.get("/health")
    def health():
        return {"status": "ok"}

    return app


app = create_app()




