import datetime
import json
from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    file_type = Column(String(50), nullable=False) # 'pdf', 'image', 'docx', 'pptx', 'text'
    file_size = Column(String(50), default="0 KB")
    file_path = Column(String(500), nullable=True)
    pages = Column(String(50), default="1 page")
    updated = Column(String(100), default="Just now")
    concepts = Column(String(255), default="Indexed locally")
    tags = Column(String(255), default="General")
    status = Column(String(100), default="Indexed Locally")
    action_text = Column(String(100), default="Inspect Knowledge Graph")
    action_icon = Column(String(50), default="account_tree")
    action_target = Column(String(50), default="study-twin")
    image_url = Column(String(500), default="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    chunks = relationship("DocumentChunk", back_populates="document", cascade="all, delete-orphan")

class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id", ondelete="CASCADE"), nullable=False)
    chunk_index = Column(Integer, default=0)
    page_number = Column(Integer, default=1)
    text_content = Column(Text, nullable=False)
    concepts = Column(String(255), default="")
    embedding_json = Column(Text, nullable=True) # JSON serialized list of floats

    document = relationship("Document", back_populates="chunks")

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), default="Study Session")
    subject = Column(String(100), default="CS-301")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    messages = relationship("Message", back_populates="conversation", cascade="all, delete-orphan")

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("conversations.id", ondelete="CASCADE"), nullable=False)
    sender = Column(String(50), nullable=False) # 'user' or 'ai'
    text = Column(Text, nullable=False)
    time_str = Column(String(50), default="")
    tokens_per_sec = Column(String(50), default="84.2")
    grounded = Column(Boolean, default=True)
    
    # AI response structured fields
    intro = Column(Text, nullable=True)
    conditions_json = Column(Text, nullable=True)
    citations_json = Column(Text, nullable=True)
    code_snippet = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    conversation = relationship("Conversation", back_populates="messages")

class Topic(Base):
    __tablename__ = "topics"

    id = Column(Integer, primary_key=True, index=True)
    subject_code = Column(String(50), default="CS-301", index=True) # e.g. 'CS-301', 'CS-302', 'CS-303', 'CS-201', 'CS-401'
    subject_name = Column(String(100), default="Operating Systems")
    node_id = Column(String(50), unique=True, index=True) # e.g. 'deadlocks', 'processes', 'osi-layers'
    name = Column(String(100), nullable=False)
    mastery_pct = Column(Integer, default=50) # 0 to 100
    solved_text = Column(String(100), default="0 Solved")
    subtext = Column(String(255), default="")
    status = Column(String(50), default="developing") # 'strong', 'developing', 'needs-attention'
    color = Column(String(50), default="primary")
    position_class = Column(String(100), default="")
    icon = Column(String(50), default="account_tree")
    total_quizzed = Column(Integer, default=0)
    total_correct = Column(Integer, default=0)

class QuizQuestion(Base):
    __tablename__ = "quiz_questions"

    id = Column(Integer, primary_key=True, index=True)
    subject_code = Column(String(50), default="CS-301", index=True)
    topic_name = Column(String(100), default="Deadlocks // Operating Systems")
    topic_node_id = Column(String(50), default="deadlocks")
    weight = Column(String(50), default="4 Marks")
    question = Column(Text, nullable=False)
    options_json = Column(Text, nullable=False) # list of {key, label, desc}
    correct_key = Column(String(10), nullable=False) # 'A', 'B', 'C', 'D'
    explanation = Column(Text, nullable=False)
    source_citation = Column(String(255), default="Local Vault Context")
    cosine_similarity = Column(String(50), default="0.984")

class QuizAttempt(Base):
    __tablename__ = "quiz_attempts"

    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, nullable=False)
    topic_node_id = Column(String(50), default="deadlocks")
    selected_key = Column(String(10), nullable=False)
    is_correct = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class StudySession(Base):
    __tablename__ = "study_sessions"

    id = Column(Integer, primary_key=True, index=True)
    subject = Column(String(100), default="CS-301")
    duration_minutes = Column(Integer, default=45)
    priority_topic = Column(String(100), default="Deadlocks")
    yield_prediction = Column(Float, default=94.2)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
