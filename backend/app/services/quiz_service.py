import json
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from ..models.schema_models import QuizQuestion, QuizAttempt
from .study_twin_service import StudyTwinService

class QuizService:
    @staticmethod
    def get_questions(db: Session, limit: int = 10, subject_code: Optional[str] = None) -> List[Dict[str, Any]]:
        query = db.query(QuizQuestion)
        if query.count() < 8:
            QuizService.seed_default_questions(db)
            query = db.query(QuizQuestion)

        if subject_code and subject_code.lower() != 'all':
            code_upper = subject_code.upper()
            filtered = query.filter(QuizQuestion.subject_code == code_upper).all()
            if not filtered:
                filtered = [q for q in query.all() if q.subject_code.lower() in subject_code.lower()]
            questions = filtered if filtered else query.all()
        else:
            questions = query.all()

        results = []
        for q in questions[:limit]:
            results.append({
                "id": q.id,
                "subjectCode": q.subject_code,
                "topic": q.topic_name,
                "weight": q.weight,
                "question": q.question,
                "options": json.loads(q.options_json),
                "correctKey": q.correct_key,
                "explanation": q.explanation,
                "source": q.source_citation,
                "cosineSimilarity": q.cosine_similarity
            })
        return results

    @staticmethod
    def submit_answer(db: Session, question_id: int, selected_key: str) -> Dict[str, Any]:
        question = db.query(QuizQuestion).filter(QuizQuestion.id == question_id).first()
        if not question:
            raise ValueError(f"Question with ID {question_id} not found.")

        is_correct = (selected_key.strip().upper() == question.correct_key.strip().upper())
        
        attempt = QuizAttempt(
            question_id=question_id,
            topic_node_id=question.topic_node_id,
            selected_key=selected_key,
            is_correct=is_correct
        )
        db.add(attempt)
        db.commit()

        new_mastery = StudyTwinService.update_topic_from_quiz(
            db, question.topic_node_id, is_correct
        )

        rec = None
        if not is_correct:
            rec = f"Confidence in {question.topic_node_id} lowered to {new_mastery}%. Added to Exam Mode priority."

        return {
            "is_correct": is_correct,
            "correct_key": question.correct_key,
            "explanation": question.explanation,
            "new_topic_mastery": new_mastery,
            "topic_node_id": question.topic_node_id,
            "recommendation": rec
        }

    @staticmethod
    def seed_default_questions(db: Session):
        defaults = [
            # 1. OS: Deadlocks
            {
                "subject_code": "CS-301",
                "topic_name": "Deadlocks // Operating Systems",
                "topic_node_id": "deadlocks",
                "weight": "4 Marks",
                "question": "Which of the following is a necessary condition for a deadlock to occur in a system, where a resource cannot be forcibly confiscated from a process holding it?",
                "options_json": json.dumps([
                    {"key": "A", "label": "Mutual Exclusion", "desc": "Resources are held in non-shareable mode by concurrent processes"},
                    {"key": "B", "label": "No Preemption", "desc": "Process releases resources exclusively through autonomous voluntary completion"},
                    {"key": "C", "label": "Circular Wait", "desc": "P0 waiting for P1 waiting for Pn in closed chain sequence"},
                    {"key": "D", "label": "Hold and Wait", "desc": "Process holds R1 while requesting additional resource allocation R2"}
                ]),
                "correct_key": "B",
                "explanation": "No Preemption dictates that resources cannot be forcibly seized from a process; they can only be released voluntarily by the process holding them after it has completed its task.",
                "source_citation": "Unit 3 Notes, Page 19 § Deadlock Prevention Rules",
                "cosine_similarity": "0.984"
            },

            # 2. OS: CPU Scheduling
            {
                "subject_code": "CS-301",
                "topic_name": "CPU Scheduling // Operating Systems",
                "topic_node_id": "scheduling",
                "weight": "4 Marks",
                "question": "In a Round Robin scheduling algorithm, if the time quantum is extremely large (approaching infinity), the algorithm degenerates into which scheduling scheme?",
                "options_json": json.dumps([
                    {"key": "A", "label": "Shortest Job First (SJF)", "desc": "Processes ordered strictly by lowest CPU burst duration"},
                    {"key": "B", "label": "Priority Preemptive", "desc": "Higher priority processes immediately interrupt running processes"},
                    {"key": "C", "label": "First-Come, First-Served (FCFS)", "desc": "Processes execute to completion in strict order of arrival queue"},
                    {"key": "D", "label": "Multilevel Feedback Queue", "desc": "Processes dynamically demoted between variable priority queues"}
                ]),
                "correct_key": "C",
                "explanation": "When time quantum is arbitrarily large, every process completes its burst before quantum expiry, making Round Robin behavior identical to First-Come, First-Served (FCFS).",
                "source_citation": "Silberschatz OS §5.3.4 CPU Scheduling",
                "cosine_similarity": "0.991"
            },

            # 3. Networks: TCP Handshake
            {
                "subject_code": "CS-302",
                "topic_name": "Transport Layer // Computer Networks",
                "topic_node_id": "tcp-ip",
                "weight": "4 Marks",
                "question": "During the standard TCP 3-way connection establishment handshake, what flags are set in the second packet sent from Server to Client?",
                "options_json": json.dumps([
                    {"key": "A", "label": "SYN only", "desc": "Server requests connection without acknowledging client"},
                    {"key": "B", "label": "SYN + ACK", "desc": "Server synchronizes sequence number and acknowledges client's ISN"},
                    {"key": "C", "label": "ACK + FIN", "desc": "Server confirms connection teardown sequence"},
                    {"key": "D", "label": "RST only", "desc": "Server resets communication socket state"}
                ]),
                "correct_key": "B",
                "explanation": "In TCP 3-way handshake, the server responds to client's initial SYN with a packet containing both SYN and ACK flags enabled.",
                "source_citation": "Computer Networks §3.5 TCP Handshake",
                "cosine_similarity": "0.988"
            },

            # 4. Networks: Subnetting
            {
                "subject_code": "CS-302",
                "topic_name": "IP Subnetting // Computer Networks",
                "topic_node_id": "subnetting",
                "weight": "4 Marks",
                "question": "For the network block 192.168.10.0/26, how many usable host IP addresses can be assigned to devices?",
                "options_json": json.dumps([
                    {"key": "A", "label": "64 hosts", "desc": "Total addresses without subtracting network/broadcast"},
                    {"key": "B", "label": "62 hosts", "desc": "2^(32-26) - 2 usable host addresses"},
                    {"key": "C", "label": "30 hosts", "desc": "Subnet allocated for /27 block"},
                    {"key": "D", "label": "126 hosts", "desc": "Subnet allocated for /25 block"}
                ]),
                "correct_key": "B",
                "explanation": "A /26 subnet has 32 - 26 = 6 host bits (2^6 = 64). Subtracting 2 (network and broadcast addresses) leaves 62 usable host addresses.",
                "source_citation": "Kurose & Ross §4.3 CIDR Addressing",
                "cosine_similarity": "0.982"
            },

            # 5. DBMS: Normalization
            {
                "subject_code": "CS-303",
                "topic_name": "Relational Normalization // DBMS",
                "topic_node_id": "normalization",
                "weight": "4 Marks",
                "question": "A relation R is in Boyce-Codd Normal Form (BCNF) if and only if for every non-trivial functional dependency X -> Y:",
                "options_json": json.dumps([
                    {"key": "A", "label": "Y is a prime attribute", "desc": "Standard 3NF condition"},
                    {"key": "B", "label": "X is a superkey for R", "desc": "Determinant must be a candidate or superkey"},
                    {"key": "C", "label": "X and Y are disjoint", "desc": "Independence requirement"},
                    {"key": "D", "label": "R has no multi-valued dependencies", "desc": "4NF requirement"}
                ]),
                "correct_key": "B",
                "explanation": "BCNF requires that for every non-trivial functional dependency X -> Y, X must be a superkey of the relation.",
                "source_citation": "Navathe DBMS §14.5 Boyce-Codd Normal Form",
                "cosine_similarity": "0.995"
            },

            # 6. DSA: Graph Algorithms
            {
                "subject_code": "CS-201",
                "topic_name": "Graph Algorithms // DSA",
                "topic_node_id": "dijkstra-graph",
                "weight": "4 Marks",
                "question": "What is the worst-case time complexity of Dijkstra's single-source shortest path algorithm using a Min-Heap (priority queue) implementation?",
                "options_json": json.dumps([
                    {"key": "A", "label": "O(V^2)", "desc": "Matrix implementation without heap"},
                    {"key": "B", "label": "O((V + E) log V)", "desc": "Min-heap with adjacency list representation"},
                    {"key": "C", "label": "O(V * E)", "desc": "Bellman-Ford algorithm complexity"},
                    {"key": "D", "label": "O(E log E)", "desc": "Kruskal's MST algorithm complexity"}
                ]),
                "correct_key": "B",
                "explanation": "Using a binary min-heap and adjacency list, each vertex extraction takes O(log V) and edge relaxations take O(E log V), yielding total time O((V + E) log V).",
                "source_citation": "CLRS Algorithms §24.3 Dijkstra Algorithm",
                "cosine_similarity": "0.987"
            },

            # 7. AI & ML: Transformers
            {
                "subject_code": "CS-401",
                "topic_name": "Transformers & Attention // AI & ML",
                "topic_node_id": "transformers-attention",
                "weight": "4 Marks",
                "question": "In the scaled dot-product attention formula Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) * V, why is the dot product divided by sqrt(d_k)?",
                "options_json": json.dumps([
                    {"key": "A", "label": "Accelerate matrix multiplication", "desc": "Hardware speedup on tensor cores"},
                    {"key": "B", "label": "Prevent vanishing gradients in softmax", "desc": "Stops large dot products from pushing softmax into extremely small gradient regions"},
                    {"key": "C", "label": "Normalize embeddings to unit length", "desc": "Cosine similarity constraint"},
                    {"key": "D", "label": "Ensure causality in autoregressive models", "desc": "Masking future tokens"}
                ]),
                "correct_key": "B",
                "explanation": "Dividing by sqrt(d_k) prevents large magnitudes for large vector dimensions, avoiding extremely small softmax gradients during backpropagation.",
                "source_citation": "Vaswani et al., Attention Is All You Need §3.2",
                "cosine_similarity": "0.992"
            }
        ]
        for d in defaults:
            existing = db.query(QuizQuestion).filter(QuizQuestion.question == d["question"]).first()
            if not existing:
                db.add(QuizQuestion(**d))
        db.commit()
