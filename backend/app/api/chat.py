import json
import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.schema_models import Conversation, Message
from ..services.llm_service import LlmService
from ..schemas.pydantic_schemas import ChatRequest, ChatMessage, AiContent, CitationItem, ConditionItem

router = APIRouter(prefix="/api", tags=["AI Tutor & Chat"])

@router.post("/chat")
def chat_with_tutor(payload: ChatRequest, db: Session = Depends(get_db)):
    conv = None
    if payload.conversation_id:
        conv = db.query(Conversation).filter(Conversation.id == payload.conversation_id).first()
    if not conv:
        conv = Conversation(title=payload.message[:30] + "...", subject=payload.subject or "CS-301")
        db.add(conv)
        db.commit()
        db.refresh(conv)

    time_str = datetime.datetime.now().strftime("%I:%M %p")

    # Save User message
    user_msg = Message(
        conversation_id=conv.id,
        sender="user",
        text=payload.message,
        time_str=time_str,
        grounded=True
    )
    db.add(user_msg)
    db.commit()

    # Generate AI response via on-device RAG
    ai_res = LlmService.generate_response(
        db=db,
        message=payload.message,
        document_ids=payload.document_ids,
        subject=payload.subject or "CS-301"
    )

    # Save AI message
    ai_msg = Message(
        conversation_id=conv.id,
        sender="ai",
        text=ai_res["intro"],
        time_str=time_str,
        tokens_per_sec=ai_res["tokens_per_sec"],
        grounded=True,
        intro=ai_res["intro"],
        conditions_json=json.dumps(ai_res.get("conditions")) if ai_res.get("conditions") else None,
        citations_json=json.dumps(ai_res.get("citations")) if ai_res.get("citations") else None,
        code_snippet=ai_res.get("code_snippet")
    )
    db.add(ai_msg)
    db.commit()

    return {
        "conversation_id": conv.id,
        "sender": "ai",
        "time": time_str,
        "tokensPerSec": ai_res["tokens_per_sec"],
        "content": {
            "intro": ai_res["intro"],
            "conditions": ai_res.get("conditions"),
            "citations": ai_res.get("citations"),
            "codeSnippet": ai_res.get("code_snippet")
        },
        "sources": ai_res.get("sources", []),
        "processing_mode": "local"
    }

@router.get("/conversations")
def get_conversations(db: Session = Depends(get_db)):
    convs = db.query(Conversation).order_by(Conversation.id.desc()).all()
    results = []
    for c in convs:
        last_msg = db.query(Message).filter(Message.conversation_id == c.id).order_by(Message.id.desc()).first()
        results.append({
            "id": c.id,
            "title": c.title,
            "subject": c.subject,
            "created_at": c.created_at.isoformat(),
            "last_message": last_msg.text if last_msg else ""
        })
    return results

@router.get("/conversations/{conv_id}/messages")
def get_conversation_messages(conv_id: int, db: Session = Depends(get_db)):
    msgs = db.query(Message).filter(Message.conversation_id == conv_id).order_by(Message.id.asc()).all()
    output = []
    for m in msgs:
        if m.sender == "user":
            output.append({
                "sender": "user",
                "text": m.text,
                "time": m.time_str,
                "grounded": m.grounded
            })
        else:
            conditions = json.loads(m.conditions_json) if m.conditions_json else None
            citations = json.loads(m.citations_json) if m.citations_json else None
            output.append({
                "sender": "ai",
                "time": m.time_str,
                "tokensPerSec": m.tokens_per_sec,
                "content": {
                    "intro": m.intro or m.text,
                    "conditions": conditions,
                    "citations": citations,
                    "codeSnippet": m.code_snippet
                }
            })
    return output
