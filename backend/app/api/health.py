from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["Health"])

@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "app": "Sahayak AI",
        "mode": "on-device-privacy-first",
        "version": "1.0.0"
    }
