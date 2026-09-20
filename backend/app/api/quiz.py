from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..services.quiz_service import QuizService
from ..schemas.pydantic_schemas import (
    QuizQuestionItem, QuizSubmitRequest, QuizSubmitResponse, QuizGenerateRequest
)

router = APIRouter(prefix="/api/quiz", tags=["Rapid Quiz & Recall"])

@router.get("/questions", response_model=List[QuizQuestionItem])
def get_quiz_questions(
    limit: int = 10,
    subject_code: Optional[str] = None,
    db: Session = Depends(get_db)
):
    return QuizService.get_questions(db, limit=limit, subject_code=subject_code)

@router.post("/submit", response_model=QuizSubmitResponse)
def submit_quiz_answer(payload: QuizSubmitRequest, db: Session = Depends(get_db)):
    try:
        return QuizService.submit_answer(db, payload.question_id, payload.selected_key)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.post("/generate", response_model=List[QuizQuestionItem])
def generate_custom_quiz(payload: QuizGenerateRequest, db: Session = Depends(get_db)):
    # Returns generated questions
    return QuizService.get_questions(db, limit=payload.number_of_questions or 3)
