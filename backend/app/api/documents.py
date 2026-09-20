import shutil
from pathlib import Path
from typing import List
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..config import UPLOADS_DIR, MAX_UPLOAD_SIZE_BYTES
from ..models.schema_models import Document, DocumentChunk
from ..services.document_service import DocumentService
from ..services.vector_service import VectorService
from ..schemas.pydantic_schemas import DocumentItem, DocumentDetail

router = APIRouter(prefix="/api/documents", tags=["Documents & Knowledge Vault"])

@router.get("", response_model=List[DocumentItem])
def list_documents(db: Session = Depends(get_db)):
    docs = db.query(Document).order_by(Document.id.desc()).all()
    results = []
    for d in docs:
        results.append(DocumentItem(
            id=d.id,
            title=d.title,
            type=d.file_type,
            pages=d.pages,
            size=d.file_size,
            updated=d.updated,
            concepts=d.concepts,
            tags=d.tags,
            status=d.status,
            actionText=d.action_text,
            actionIcon=d.action_icon,
            image=d.image_url or "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80",
            actionTarget=d.action_target or "study-twin"
        ))
    return results

@router.post("/upload", response_model=DocumentItem)
async def upload_document(
    file: UploadFile = File(...),
    tags: str = Form("General"),
    db: Session = Depends(get_db)
):
    filename = Path(file.filename).name
    # Determine type
    ext = Path(filename).suffix.lower()
    if ext == '.pdf':
        doc_type = 'pdf'
        action_text = 'Inspect Knowledge Graph'
        action_icon = 'account_tree'
        action_target = 'study-twin'
        image_url = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80'
    elif ext in ['.png', '.jpg', '.jpeg']:
        doc_type = 'image'
        action_text = 'View Extracted Text'
        action_icon = 'visibility'
        action_target = 'ai-tutor'
        image_url = 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&auto=format&fit=crop&q=80'
    elif ext in ['.wav', '.mp3', '.m4a']:
        doc_type = 'audio'
        action_text = 'Play & Transcribe'
        action_icon = 'graphic_eq'
        action_target = 'ai-tutor'
        image_url = 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop&q=80'
    else:
        doc_type = 'pdf'
        action_text = 'Inspect Knowledge Graph'
        action_icon = 'account_tree'
        action_target = 'study-twin'
        image_url = 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&auto=format&fit=crop&q=80'

    dest_path = UPLOADS_DIR / filename
    content = await file.read()

    if len(content) > MAX_UPLOAD_SIZE_BYTES:
        raise HTTPException(status_code=400, detail="File exceeds maximum allowed size (50MB).")

    with open(dest_path, "wb") as f:
        f.write(content)

    # Format file size string
    size_kb = len(content) / 1024
    size_str = f"{size_kb / 1024:.1f} MB" if size_kb > 1024 else f"{size_kb:.0f} KB"

    # Extract text
    pages_data = DocumentService.extract_text(str(dest_path), doc_type)
    total_pages = len(pages_data)
    pages_label = f"{total_pages} pages" if doc_type == 'pdf' else ("Handwritten OCR" if doc_type == 'image' else f"{total_pages} slides")

    all_concepts = set()
    for p in pages_data:
        for c in p.get("concepts", []):
            all_concepts.add(c)
    concepts_str = f"{len(all_concepts)} Concepts ({', '.join(list(all_concepts)[:2])})" if all_concepts else "Vectorized Knowledge"

    # Create document record
    doc = Document(
        title=filename,
        file_type=doc_type,
        file_size=size_str,
        file_path=str(dest_path),
        pages=pages_label,
        updated="Just now",
        concepts=concepts_str,
        tags=tags or "Kernel, Concurrency",
        status="Indexed Locally",
        action_text=action_text,
        action_icon=action_icon,
        action_target=action_target,
        image_url=image_url
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)

    # Create chunks & index
    for p in pages_data:
        chunk = DocumentChunk(
            document_id=doc.id,
            chunk_index=p["page"],
            page_number=p["page"],
            text_content=p["text"],
            concepts=", ".join(p.get("concepts", []))
        )
        db.add(chunk)
        db.commit()
        db.refresh(chunk)
        VectorService.index_chunk(db, chunk.id, chunk.text_content)

    return DocumentItem(
        id=doc.id,
        title=doc.title,
        type=doc.file_type,
        pages=doc.pages,
        size=doc.file_size,
        updated=doc.updated,
        concepts=doc.concepts,
        tags=doc.tags,
        status=doc.status,
        actionText=doc.action_text,
        actionIcon=doc.action_icon,
        image=doc.image_url,
        actionTarget=doc.action_target
    )

@router.get("/{document_id}", response_model=DocumentDetail)
def get_document(document_id: int, db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    first_chunk = db.query(DocumentChunk).filter(DocumentChunk.document_id == document_id).first()
    chunks_count = db.query(DocumentChunk).filter(DocumentChunk.document_id == document_id).count()

    return DocumentDetail(
        id=doc.id,
        title=doc.title,
        type=doc.file_type,
        pages=doc.pages,
        size=doc.file_size,
        updated=doc.updated,
        concepts=doc.concepts,
        tags=doc.tags,
        status=doc.status,
        text_sample=first_chunk.text_content[:400] if first_chunk else "",
        chunks_count=chunks_count
    )

@router.delete("/{document_id}")
def delete_document(document_id: int, db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    if doc.file_path and Path(doc.file_path).exists():
        try:
            Path(doc.file_path).unlink()
        except Exception:
            pass

    db.delete(doc)
    db.commit()
    return {"status": "deleted", "id": document_id}
