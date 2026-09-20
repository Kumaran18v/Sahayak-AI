from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base, SessionLocal
from .api import (
    health, system, documents, chat, quiz, study_twin,
    progress, exam_mode, voice, vision, demo
)
from .services.study_twin_service import StudyTwinService
from .services.quiz_service import QuizService
from .api.demo import seed_demo_environment

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SAHAYAK AI — Backend",
    description="Privacy-first, on-device multimodal AI study companion API",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
app.include_router(health.router)
app.include_router(system.router)
app.include_router(documents.router)
app.include_router(chat.router)
app.include_router(quiz.router)
app.include_router(study_twin.router)
app.include_router(progress.router)
app.include_router(exam_mode.router)
app.include_router(voice.router)
app.include_router(vision.router)
app.include_router(demo.router)

@app.on_event("startup")
def on_startup():
    db = SessionLocal()
    try:
        # Seed initial demo state if empty
        seed_demo_environment(db)
    finally:
        db.close()
