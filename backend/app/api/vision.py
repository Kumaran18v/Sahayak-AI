from pathlib import Path
from fastapi import APIRouter, UploadFile, File, HTTPException
from ..config import UPLOADS_DIR
from ..services.vision_service import VisionService

router = APIRouter(prefix="/api/image", tags=["Vision & OCR"])

@router.post("/analyze")
async def analyze_image_note(image: UploadFile = File(...)):
    try:
        filename = Path(image.filename).name
        dest_path = UPLOADS_DIR / filename
        content = await image.read()
        with open(dest_path, "wb") as f:
            f.write(content)
        return VisionService.analyze_image(str(dest_path))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image analysis failed: {str(e)}")
