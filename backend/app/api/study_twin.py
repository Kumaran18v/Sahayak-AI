from typing import Optional, List
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..services.study_twin_service import StudyTwinService
from ..schemas.pydantic_schemas import StudyTwinResponse, SubjectOverview, SubjectCreateRequest

router = APIRouter(prefix="/api", tags=["Study Twin Knowledge Graph"])

@router.get("/study-twin", response_model=StudyTwinResponse)
def get_study_twin(
    subject_code: Optional[str] = Query(None, description="Optional subject code to filter (e.g. CS-301, CS-302)"),
    db: Session = Depends(get_db)
):
    return StudyTwinService.get_study_twin_data(db, subject_code=subject_code)

@router.get("/subjects", response_model=List[SubjectOverview])
def get_subjects(db: Session = Depends(get_db)):
    return StudyTwinService.get_subjects_list(db)

@router.post("/subjects", response_model=SubjectOverview)
def create_subject(payload: SubjectCreateRequest, db: Session = Depends(get_db)):
    return StudyTwinService.add_custom_subject(db, payload)
