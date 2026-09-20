import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
UPLOADS_DIR = DATA_DIR / "uploads"
DEMO_DIR = DATA_DIR / "demo"

DATA_DIR.mkdir(parents=True, exist_ok=True)
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
DEMO_DIR.mkdir(parents=True, exist_ok=True)

DATABASE_URL = f"sqlite:///{DATA_DIR / 'sahayak.db'}"

# Model configurations
EMBEDDING_MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
DEFAULT_SUBJECT = "CS-301"
DEFAULT_SUBJECT_NAME = "Operating Systems (Concurrency & Deadlocks)"
MAX_UPLOAD_SIZE_BYTES = 50 * 1024 * 1024  # 50 MB
