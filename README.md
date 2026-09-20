# SAHAYAK AI (सहायक AI)
> **“Your Knowledge. Your AI. Your Device.”**  
> Privacy-first, Multimodal, On-Device AI Study Companion for Snapdragon-Powered PCs.

---

## 📖 Overview
**Sahayak AI** is an on-device personal study companion engineered for Snapdragon X Elite / Hexagon NPU PCs and air-gapped study workstations. It enables students to build an encrypted local knowledge vault, interact with an AI Tutor grounded strictly in their course notes, analyze handwritten lecture photos, generate practice recall drills, detect weak syllabus topics via their **Study Twin**, and schedule precision revision plans for upcoming exams—all without sending a single byte of personal study material to external cloud servers.

---

## 🏛️ Architecture & Pipelines

```
[ Frontend: React + Vite + Tailwind CSS ]
                  │  ▲
         REST / SSE  │  Real Data Streams
                  ▼  │
      [ FastAPI Backend (Port 8000) ]
        │         │         │         │
        ▼         ▼         ▼         ▼
  [ SQLite DB ] [ RAG Engine ] [ Telemetry ] [ Multimodal ]
  - documents   - Chunking     - psutil       - pytesseract OCR
  - topics      - Embeddings   - ONNX QNN     - SpeechRecognition
  - quizzes     - Vectorstore  - Real Latency - Local Audio
  - study_twin  - LLM Synth    - Zero-Cloud   - Local Vision
```

### Multimodal Ingestion Pipelines
1. **Document Pipeline**: PDF (page-aware text extraction), DOCX (paragraph hierarchy), PPTX (slide notes), TXT $\rightarrow$ Overlapping chunking $\rightarrow$ Dense embeddings $\rightarrow$ SQLite Vector Store.
2. **Vision / Handwritten Notes Pipeline**: Image $\rightarrow$ OCR extraction $\rightarrow$ Concurrency concept detection $\rightarrow$ Vector store indexing $\rightarrow$ AI Tutor context.
3. **Voice Pipeline**: Microphone Audio (WAV/WEBM) $\rightarrow$ Local speech transcription $\rightarrow$ AI Tutor query stream.

---

## 📂 Project Structure

```
sahayak-ai/
├── backend/
│   ├── app/
│   │   ├── main.py                     # FastAPI application entrypoint & routers
│   │   ├── config.py                   # App paths, uploads, model configs
│   │   ├── database.py                 # SQLAlchemy engine & SQLite session
│   │   ├── api/
│   │   │   ├── health.py               # GET /api/health
│   │   │   ├── system.py               # GET /api/system/status, /performance
│   │   │   ├── documents.py            # Upload, list, delete vault documents
│   │   │   ├── chat.py                 # POST /api/chat with RAG & citations
│   │   │   ├── quiz.py                 # GET/POST /api/quiz/questions, submit
│   │   │   ├── study_twin.py           # GET /api/study-twin knowledge graph
│   │   │   ├── progress.py             # GET /api/progress analytics
│   │   │   ├── exam_mode.py            # POST /api/exam-plan scheduler
│   │   │   ├── voice.py                # POST /api/voice/transcribe
│   │   │   ├── vision.py               # POST /api/image/analyze
│   │   │   └── demo.py                 # POST /api/demo/seed
│   │   ├── services/
│   │   │   ├── document_service.py     # PDF, DOCX, PPTX & image text parsing
│   │   │   ├── embedding_service.py    # Local dense embedding vectors
│   │   │   ├── vector_service.py       # Local cosine vector retrieval
│   │   │   ├── llm_service.py          # Grounded reasoning & code inspector
│   │   │   ├── study_twin_service.py   # Dynamic node mastery & weak topics
│   │   │   ├── quiz_service.py         # MCQ scoring & streak manager
│   │   │   ├── exam_service.py         # High-yield revision plan builder
│   │   │   ├── speech_service.py       # Speech-to-text transcription
│   │   │   ├── vision_service.py       # Handwritten OCR analysis
│   │   │   └── telemetry_service.py    # Bare-metal CPU, RAM, ONNX QNN check
│   │   ├── models/
│   │   │   └── schema_models.py        # SQLAlchemy ORM definitions
│   │   └── schemas/
│   │       └── pydantic_schemas.py     # Request/response validation schemas
│   ├── data/
│   │   ├── sahayak.db                  # Local SQLite database
│   │   ├── demo/                       # Demo seed syllabus & lecture notes
│   │   └── uploads/                    # Local encrypted uploaded files
│   └── tests/
│       └── test_api.py                 # Automated pytest test suite
├── src/
│   ├── api/                            # Frontend API client layer
│   │   ├── client.js                   # Unified fetch client & error handling
│   │   ├── documents.js                # Document vault API
│   │   ├── chat.js                     # AI Tutor chat API
│   │   ├── quiz.js                     # Rapid Quiz API
│   │   ├── studyTwin.js                # Study Twin knowledge graph API
│   │   ├── examMode.js                 # Exam revision plan API
│   │   ├── progress.js                 # Progress telemetry API
│   │   ├── system.js                   # Hardware telemetry & status API
│   │   └── voice.js                    # Voice audio transcription API
│   ├── components/
│   │   ├── Sidebar.jsx                 # 72px / 288px navigation & user badge
│   │   ├── Header.jsx                  # Telemetry bar & notifications
│   │   ├── CommandPalette.jsx          # Quick switcher (Ctrl+K / ⌘K)
│   │   └── NeuralEmblem.jsx            # Dynamic gradient SVG emblem
│   ├── views/                          # 11 Dedicated views matching Stitch UI
│   │   ├── Dashboard.jsx
│   │   ├── StudyTwin.jsx
│   │   ├── AiTutor.jsx
│   │   ├── RapidQuiz.jsx
│   │   ├── MyMaterials.jsx
│   │   ├── ExamMode.jsx
│   │   ├── Progress.jsx
│   │   ├── SnapdragonAi.jsx
│   │   ├── OfflineMode.jsx
│   │   ├── Settings.jsx
│   │   └── LandingPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── requirements.txt
├── package.json
├── tailwind.config.js
└── README.md
```

---

## ⚡ Quick Start

### 1. Prerequisites
- **Node.js**: v18+ (tested with v22.20)
- **Python**: v3.10+ (tested with v3.12.10)

### 2. Backend Setup
```bash
# 1. Open terminal in project root
cd "k:\SAHAYAK AI"

# 2. Install backend dependencies
python -m pip install -r requirements.txt

# 3. Start the FastAPI backend server (Runs on port 8000)
python -m uvicorn app.main:app --app-dir backend --host 127.0.0.1 --port 8000
```
API Documentation will be immediately available at: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

### 3. Frontend Setup
```bash
# In another terminal window:
cd "k:\SAHAYAK AI"

# 1. Install frontend packages (already installed)
npm install

# 2. Launch Vite development server (Runs on port 5173)
npm run dev
```
Open your browser at: [http://localhost:5173/](http://localhost:5173/).

---

## 🧪 Automated Testing
Run the backend test suite:
```bash
python -m pytest backend/tests/test_api.py -v
```
All 9 core tests verify:
- Health & system performance telemetry
- Document upload, text extraction, chunking & vector indexing
- Grounded RAG synthesis with Coffman condition extraction
- Quiz scoring, streak updates, and Study Twin mastery recalculation
- Tactical exam revision plan generation

---

## 🚀 Step-by-Step Competition Demonstration Flow

1. **Open Application**: Navigate to `http://localhost:5173/`. The **Student Mastery Dashboard** loads with dynamic overall mastery (74%) and telemetry indicators.
2. **Inspect Grounded Vault (My Materials)**:
   - Click **My Materials** in the sidebar.
   - Observe indexed syllabus files (`Operating Systems.pdf`, `Unit 3 Notes.jpg`, `Previous Questions.pdf`).
   - Drag and drop or browse any PDF/image note to see real on-device parsing and vector indexing.
3. **Conversational AI Tutor with Exact Vault Citations**:
   - Navigate to **AI Tutor**.
   - Ask: *"Explain Deadlock and show me the 4 Coffman conditions from my Unit 3 notes."*
   - Verify grounded output:
     - Clear definition.
     - 4 Coffman conditions (Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait).
     - Exact vault citations (Page 18, Question 7).
     - Banker's Algorithm safe-state code inspector.
   - Click the **Voice** button to test local speech transcription.
4. **Interactive Rapid Recall Drill**:
   - Go to **Rapid Quiz**.
   - Answer Question 1 (Deadlocks necessary condition): Select option B ("No Preemption"). Observe score and streak increase.
   - Try an incorrect answer: Observe immediate weak topic flag notification.
5. **Study Twin Vector Knowledge Graph**:
   - Open **Study Twin**.
   - Observe interactive concept nodes (`Processes`, `Threads`, `Deadlocks`, `CPU Scheduling`, `Memory Paging`).
   - Notice Deadlocks highlighted as a critical gap needing attention.
6. **Tactical Exam Mode**:
   - Switch to **Exam Mode**.
   - Switch between **30m**, **45m**, and **60m** dials.
   - Observe real-time dynamic redistribution of study time blocks, allocating 35% time immediately to repair the Deadlocks gap.
7. **Snapdragon Telemetry Verification**:
   - Go to **Snapdragon AI**.
   - View genuine hardware stats: Real physical RAM, CPU load, and active execution providers.
   - If executed on Snapdragon silicon with QNN: confirms Hexagon NPU 45 TOPS INT4.
   - If executed on CPU fallback: accurately states `"Not available on this configuration"` without falsifying NPU execution.

---

## 🔒 Security & Privacy Guarantees
- **Zero Cloud Transmission**: All vector embeddings, document text, and chat inferences occur strictly on the local machine.
- **Air-Gapped Operation**: Functions normally when the host machine has zero internet connection.
- **Local Storage**: All files reside in `backend/data/uploads/` and `backend/data/sahayak.db`.
