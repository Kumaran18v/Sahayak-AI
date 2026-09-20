from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.schema_models import Document, DocumentChunk, Topic, QuizQuestion
from ..services.study_twin_service import StudyTwinService
from ..services.quiz_service import QuizService
from ..services.vector_service import VectorService

router = APIRouter(prefix="/api/demo", tags=["Demo Management"])

@router.post("/seed")
def seed_demo_environment(db: Session = Depends(get_db)):
    """
    Populates demo environment with complete Operating Systems syllabus,
    Unit 3 handwritten notes, previous exam papers, and knowledge graph.
    """
    # Seed topics & questions
    StudyTwinService.seed_default_topics(db)
    QuizService.seed_default_questions(db)

    # Check if documents exist
    if db.query(Document).count() == 0:
        docs_data = [
            {
                "title": "Operating Systems.pdf",
                "file_type": "pdf",
                "file_size": "14.2 MB",
                "pages": "24 pages",
                "updated": "Updated 2h ago",
                "concepts": "38 Concepts • 14 Diagrams",
                "tags": "Kernel, Virtual Memory, IPC, Round-Robin",
                "status": "Indexed Locally",
                "action_text": "Inspect Knowledge Graph",
                "action_icon": "account_tree",
                "action_target": "study-twin",
                "image_url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80",
                "chunks": [
                    {
                        "page": 1,
                        "text": "Chapter 6: Process Synchronization and Deadlocks. A process must request resources before using them and release them when done. In a deadlock, processes never finish executing and system resources are tied up.",
                        "concepts": "Deadlock, Concurrency"
                    },
                    {
                        "page": 18,
                        "text": "Section 6.2: Deadlock Characterization. A deadlock situation can arise if and only if four Coffman conditions hold simultaneously: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait.",
                        "concepts": "Coffman Conditions, Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait"
                    },
                    {
                        "page": 24,
                        "text": "Section 6.8: Banker's Algorithm. Safe state verification using Available, Max, Allocation, and Need vectors. If Need[i] <= Work, then Work = Work + Allocation[i].",
                        "concepts": "Banker's Algorithm, Safe State"
                    }
                ]
            },
            {
                "title": "Computer Networks.pdf",
                "file_type": "pdf",
                "file_size": "22.8 MB",
                "pages": "38 pages",
                "updated": "Updated Yesterday",
                "concepts": "52 Concepts • 21 Topology Maps",
                "tags": "OSI Layers, TCP/IP, Sliding Window, BGP",
                "status": "Indexed Locally",
                "action_text": "Inspect Knowledge Graph",
                "action_icon": "account_tree",
                "action_target": "study-twin",
                "image_url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&auto=format&fit=crop&q=80",
                "chunks": [
                    {
                        "page": 5,
                        "text": "OSI Reference Model: Physical, Data Link, Network, Transport, Session, Presentation, Application layers.",
                        "concepts": "OSI Layers, TCP/IP"
                    }
                ]
            },
            {
                "title": "Database Management Systems.pdf",
                "file_type": "pdf",
                "file_size": "18.4 MB",
                "pages": "32 pages",
                "updated": "Updated 3h ago",
                "concepts": "44 Concepts • 19 ER Diagrams",
                "tags": "BCNF, 3NF, SQL Transactions, ACID, Indexing",
                "status": "Indexed Locally",
                "action_text": "Inspect Knowledge Graph",
                "action_icon": "account_tree",
                "action_target": "study-twin",
                "image_url": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&auto=format&fit=crop&q=80",
                "chunks": [
                    {
                        "page": 12,
                        "text": "Chapter 4: Relational Database Normalization. Boyce-Codd Normal Form (BCNF) strictly requires that for every non-trivial functional dependency X -> Y, X must be a superkey. Lossless join decomposition is guaranteed by computing attribute closures.",
                        "concepts": "BCNF, Normalization, Functional Dependency, Superkey"
                    }
                ]
            },
            {
                "title": "Data Structures & Algorithms.pdf",
                "file_type": "pdf",
                "file_size": "26.1 MB",
                "pages": "45 pages",
                "updated": "Updated 1d ago",
                "concepts": "60 Concepts • 34 Graph Traces",
                "tags": "Dijkstra, Min-Heap, Red-Black Trees, Dynamic Programming",
                "status": "Indexed Locally",
                "action_text": "Inspect Knowledge Graph",
                "action_icon": "account_tree",
                "action_target": "study-twin",
                "image_url": "https://images.unsplash.com/photo-1516116211227-bbc154ba4e4e?w=500&auto=format&fit=crop&q=80",
                "chunks": [
                    {
                        "page": 28,
                        "text": "Chapter 9: Shortest Path Algorithms. Dijkstra's Algorithm finds the single-source shortest path on graphs with non-negative edge weights. Using a Binary Min-Heap priority queue, the time complexity is O((V + E) log V).",
                        "concepts": "Dijkstra Algorithm, Priority Queue, Min-Heap, Shortest Path"
                    }
                ]
            },
            {
                "title": "Artificial Intelligence & ML.pdf",
                "file_type": "pdf",
                "file_size": "31.5 MB",
                "pages": "50 pages",
                "updated": "Updated 4h ago",
                "concepts": "58 Concepts • 28 Neural Architectures",
                "tags": "Transformers, Self-Attention, Backprop, CNN, NPU Kernels",
                "status": "Indexed Locally",
                "action_text": "Inspect Knowledge Graph",
                "action_icon": "account_tree",
                "action_target": "study-twin",
                "image_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80",
                "chunks": [
                    {
                        "page": 15,
                        "text": "Chapter 3: Transformer Networks and Scaled Dot-Product Attention. Attention(Q, K, V) = softmax(Q K^T / sqrt(d_k)) V. The scaling factor prevents vanishing gradients in large dimensional embedding spaces.",
                        "concepts": "Transformer, Self-Attention, Softmax, Query-Key-Value"
                    }
                ]
            },
            {
                "title": "Unit 3 Notes.jpg",
                "file_type": "image",
                "file_size": "4.8 MB",
                "pages": "Handwritten OCR",
                "updated": "Hexagon OCR (0.4s)",
                "concepts": "9 Concepts (Deadlock & Semaphore)",
                "tags": "Banker's Algorithm, Mutual Exclusion",
                "status": "Vision Processed (Local NPU)",
                "action_text": "View Extracted Text",
                "action_icon": "visibility",
                "action_target": "ai-tutor",
                "image_url": "https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&auto=format&fit=crop&q=80",
                "chunks": [
                    {
                        "page": 1,
                        "text": "Unit 3 Lecture Notes: Deadlock occurs when processes are blocked waiting for non-shareable resources. Verified four conditions. Banker's safe state formula: Need = Max - Allocation.",
                        "concepts": "Deadlock, Banker's Algorithm"
                    }
                ]
            },
            {
                "title": "Previous Questions.pdf",
                "file_type": "pdf",
                "file_size": "6.1 MB",
                "pages": "12 pages",
                "updated": "2022-2024 Exam Set",
                "concepts": "28 Exam Questions • 6 Key Themes",
                "tags": "Subnetting, Paging, Semaphore, HTTP/3, BCNF",
                "status": "Indexed Locally",
                "action_text": "Generate Practice Quiz",
                "action_icon": "psychology_alt",
                "action_target": "rapid-quiz",
                "image_url": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=80",
                "chunks": [
                    {
                        "page": 7,
                        "text": "Question 7 (2023 End-Sem): Discuss the four necessary Coffman conditions for a deadlock. Write an algorithm to verify whether a given state in Banker's algorithm is safe. [10 Marks]",
                        "concepts": "Deadlock, Banker's Algorithm, Coffman Conditions"
                    }
                ]
            }
        ]

        for d in docs_data:
            chunks = d.pop("chunks")
            doc = Document(**d)
            db.add(doc)
            db.commit()
            db.refresh(doc)
            for c in chunks:
                chunk = DocumentChunk(
                    document_id=doc.id,
                    chunk_index=c["page"],
                    page_number=c["page"],
                    text_content=c["text"],
                    concepts=c["concepts"]
                )
                db.add(chunk)
                db.commit()
                db.refresh(chunk)
                VectorService.index_chunk(db, chunk.id, chunk.text_content)

    return {
        "status": "seeded",
        "message": "Demo materials, Study Twin nodes, and Rapid Quiz questions successfully seeded."
    }
