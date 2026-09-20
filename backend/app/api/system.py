from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.schema_models import Document, DocumentChunk
from ..services.telemetry_service import TelemetryService
from ..schemas.pydantic_schemas import HardwarePerformanceResponse, SystemStatusResponse

router = APIRouter(prefix="/api/system", tags=["System & Telemetry"])

@router.get("/status", response_model=SystemStatusResponse)
def get_status(db: Session = Depends(get_db)):
    doc_count = db.query(Document).count()
    chunk_count = db.query(DocumentChunk).count()
    return TelemetryService.get_system_status(vault_docs_count=doc_count, chunks_count=chunk_count)

@router.get("/performance", response_model=HardwarePerformanceResponse)
def get_performance():
    return TelemetryService.get_hardware_telemetry()
