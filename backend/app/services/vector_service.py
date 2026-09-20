import json
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from ..models.schema_models import DocumentChunk, Document
from .embedding_service import EmbeddingService

class VectorService:
    @staticmethod
    def index_chunk(db: Session, chunk_id: int, text: str) -> None:
        chunk = db.query(DocumentChunk).filter(DocumentChunk.id == chunk_id).first()
        if chunk:
            embedding = EmbeddingService.get_embedding(text)
            chunk.embedding_json = json.dumps(embedding)
            db.commit()

    @staticmethod
    def search(db: Session, query: str, top_k: int = 4, document_ids: Optional[List[int]] = None) -> List[Dict[str, Any]]:
        """
        Retrieves top-k most relevant chunks across indexed documents.
        Returns list of {document_title, page, text, similarity, concepts}.
        """
        query_vec = EmbeddingService.get_embedding(query)
        chunks_query = db.query(DocumentChunk).join(Document)
        if document_ids:
            chunks_query = chunks_query.filter(DocumentChunk.document_id.in_(document_ids))

        chunks = chunks_query.all()
        scored_results = []

        query_terms = set(query.lower().split())

        for ch in chunks:
            similarity = 0.0
            if ch.embedding_json:
                try:
                    ch_vec = json.loads(ch.embedding_json)
                    similarity = EmbeddingService.cosine_similarity(query_vec, ch_vec)
                except Exception:
                    pass

            # Keyword presence bonus
            ch_text_lower = ch.text_content.lower()
            keyword_hits = sum(1 for term in query_terms if term in ch_text_lower)
            adjusted_score = similarity + (keyword_hits * 0.15)

            scored_results.append({
                "chunk_id": ch.id,
                "document_id": ch.document_id,
                "document_title": ch.document.title if ch.document else "Local Document",
                "page": ch.page_number,
                "text": ch.text_content,
                "concepts": ch.concepts or "",
                "similarity": round(adjusted_score, 3)
            })

        scored_results.sort(key=lambda x: x["similarity"], reverse=True)
        return scored_results[:top_k]
