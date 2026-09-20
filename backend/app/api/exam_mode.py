from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..services.exam_service import ExamService
from ..schemas.pydantic_schemas import ExamPlanRequest, ExamPlanResponse

router = APIRouter(prefix="/api", tags=["Exam Mode"])

@router.post("/exam-plan", response_model=ExamPlanResponse)
def create_exam_revision_plan(payload: ExamPlanRequest, db: Session = Depends(get_db)):
    return ExamService.generate_plan(
        db=db,
        subject=payload.subject or "Operating Systems",
        available_minutes=payload.available_minutes or 45,
        exam_date=payload.exam_date or "in 2 days"
    )
