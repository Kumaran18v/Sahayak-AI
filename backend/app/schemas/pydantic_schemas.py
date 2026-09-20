from typing import List, Optional, Any, Dict
from pydantic import BaseModel

# Documents
class DocumentItem(BaseModel):
    id: int
    title: str
    type: str
    pages: str
    size: str
    updated: str
    concepts: str
    tags: str
    status: str
    actionText: str
    actionIcon: str
    image: str
    actionTarget: str

    class Config:
        from_attributes = True

class DocumentDetail(BaseModel):
    id: int
    title: str
    type: str
    pages: str
    size: str
    updated: str
    concepts: str
    tags: str
    status: str
    text_sample: Optional[str] = None
    chunks_count: int

# Chat
class CitationItem(BaseModel):
    icon: str
    color: str
    label: str

class ConditionItem(BaseModel):
    title: str
    desc: str

class AiContent(BaseModel):
    intro: str
    conditions: Optional[List[ConditionItem]] = None
    citations: Optional[List[CitationItem]] = None
    codeSnippet: Optional[str] = None

class ChatMessage(BaseModel):
    sender: str
    text: Optional[str] = None
    time: str
    tokensPerSec: Optional[str] = None
    grounded: Optional[bool] = True
    content: Optional[AiContent] = None

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[int] = None
    document_ids: Optional[List[int]] = None
    subject: Optional[str] = "CS-301"

class ChatResponse(BaseModel):
    answer: str
    tokens_per_sec: str
    processing_mode: str
    sources: List[Dict[str, Any]]
    conditions: Optional[List[ConditionItem]] = None
    code_snippet: Optional[str] = None

# Study Twin
class StudyTwinNode(BaseModel):
    id: str
    name: str
    mastery: str
    solved: str
    subtext: str
    status: str
    color: str
    positionClass: str
    icon: str

class StudyTwinConcept(BaseModel):
    name: str
    proficiency: str
    color: str
    status: str
    tag: str
    type: str
    subject: Optional[str] = None

class SubjectOverview(BaseModel):
    code: str
    name: str
    shortName: str
    icon: str
    color: str
    examDate: str
    credits: int
    mastery: int
    topicsCount: Optional[int] = 5

class SubjectCreateRequest(BaseModel):
    code: str
    name: str
    shortName: Optional[str] = None
    icon: Optional[str] = "menu_book"
    color: Optional[str] = "primary"
    examDate: Optional[str] = "Exam in 30 days"
    credits: Optional[int] = 3
    initialTopics: Optional[List[str]] = None

class StudyTwinResponse(BaseModel):
    overall_progress: int
    subjects: List[SubjectOverview] = []
    topics: List[StudyTwinNode]
    concepts: List[StudyTwinConcept]
    weak_topics: List[str]
    strong_topics: List[str]
    recommendations: List[Dict[str, str]]

# Rapid Quiz
class QuizOption(BaseModel):
    key: str
    label: str
    desc: str

class QuizQuestionItem(BaseModel):
    id: int
    topic: str
    weight: str
    question: str
    options: List[QuizOption]
    correctKey: str
    explanation: str
    source: str
    cosineSimilarity: str

class QuizSubmitRequest(BaseModel):
    question_id: int
    selected_key: str

class QuizSubmitResponse(BaseModel):
    is_correct: bool
    correct_key: str
    explanation: str
    new_topic_mastery: int
    topic_node_id: str
    recommendation: Optional[str] = None

class QuizGenerateRequest(BaseModel):
    topic: Optional[str] = None
    difficulty: Optional[str] = "medium"
    number_of_questions: Optional[int] = 3

# Exam Mode
class ExamPlanRequest(BaseModel):
    subject: Optional[str] = "Operating Systems"
    available_minutes: int = 45
    exam_date: Optional[str] = "in 2 days"

class ExamStudyBlock(BaseModel):
    title: str
    duration: str
    type: str
    weight: str
    topics: str
    status: str
    priority: str

class ExamPlanResponse(BaseModel):
    subject: str
    total_minutes: int
    target_date: str
    confidence_pct: float
    blocks: List[ExamStudyBlock]
    recommendation: str

# Hardware Telemetry
class HardwarePerformanceResponse(BaseModel):
    device: str
    processor: str
    cpu_percent: float
    memory_used_gb: float
    memory_total_gb: float
    memory_percent: float
    onnx_providers: List[str]
    npu_status: str
    npu_allocation: str
    inference_velocity: float
    time_to_first_token: str
    thermal_status: str
    air_gapped: bool
    cloud_requests: int
    model_name: str
    execution_mode: str

# System Status
class SystemStatusResponse(BaseModel):
    status: str
    local_ai: bool
    network_status: str # "OFFLINE (AIR-GAPPED)" or "ONLINE"
    active_model: str
    vault_documents_count: int
    chunks_count: int
    vector_cache_synced: bool
