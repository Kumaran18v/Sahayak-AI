from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from ..models.schema_models import Topic, QuizAttempt, QuizQuestion

SUBJECTS_CONFIG = [
    {
        "code": "CS-301",
        "name": "Operating Systems",
        "shortName": "OS",
        "icon": "memory",
        "color": "primary",
        "examDate": "Exam in 2 days",
        "credits": 4,
        "mastery": 74
    },
    {
        "code": "CS-302",
        "name": "Computer Networks",
        "shortName": "Networks",
        "icon": "hub",
        "color": "secondary",
        "examDate": "Exam in 5 days",
        "credits": 4,
        "mastery": 82
    },
    {
        "code": "CS-303",
        "name": "Database Management Systems",
        "shortName": "DBMS",
        "icon": "database",
        "color": "tertiary",
        "examDate": "Exam in 8 days",
        "credits": 3,
        "mastery": 65
    },
    {
        "code": "CS-201",
        "name": "Data Structures & Algorithms",
        "shortName": "DSA",
        "icon": "account_tree",
        "color": "emerald",
        "examDate": "Exam in 12 days",
        "credits": 4,
        "mastery": 88
    },
    {
        "code": "CS-401",
        "name": "Artificial Intelligence & ML",
        "shortName": "AI & ML",
        "icon": "psychology",
        "color": "surface-tint",
        "examDate": "Exam in 15 days",
        "credits": 3,
        "mastery": 71
    }
]

class StudyTwinService:
    @staticmethod
    def get_study_twin_data(db: Session, subject_code: Optional[str] = None) -> Dict[str, Any]:
        topics_query = db.query(Topic)
        
        # Check if database has multi-subject topics
        count = topics_query.count()
        if count < 10:
            StudyTwinService.seed_default_topics(db)
            topics_query = db.query(Topic)

        if subject_code and subject_code.lower() != 'all':
            code_upper = subject_code.upper()
            filtered_topics = topics_query.filter(Topic.subject_code == code_upper).all()
            if not filtered_topics:
                # Fallback to fuzzy match or all
                filtered_topics = [t for t in topics_query.all() if t.subject_code.lower() in subject_code.lower()]
            topics = filtered_topics if filtered_topics else topics_query.all()
        else:
            topics = topics_query.all()

        topic_nodes = []
        weak_topics = []
        strong_topics = []
        total_mastery = 0

        for t in topics:
            total_mastery += t.mastery_pct
            node = {
                "id": t.node_id,
                "subjectCode": t.subject_code,
                "subjectName": t.subject_name,
                "name": t.name,
                "mastery": f"{t.mastery_pct}%",
                "masteryNum": t.mastery_pct,
                "solved": t.solved_text,
                "subtext": t.subtext,
                "status": t.status,
                "color": t.color,
                "positionClass": t.position_class,
                "icon": t.icon,
            }
            topic_nodes.append(node)
            if t.status == "needs-attention":
                weak_topics.append(f"{t.name} ({t.subject_code})")
            elif t.status == "strong":
                strong_topics.append(f"{t.name} ({t.subject_code})")

        overall_progress = round(total_mastery / len(topics)) if topics else 76

        # Subject-specific concepts
        concepts_by_subject = {
            "CS-301": [
                {"name": "Banker's Algorithm", "proficiency": "38%", "color": "bg-tertiary-container", "status": "Priority Revision", "tag": "Safe State Vectors", "type": "needs-attention", "subject": "CS-301"},
                {"name": "TLB Translation", "proficiency": "64%", "color": "bg-primary", "status": "Steady", "tag": "Hit Ratio Calculations", "type": "developing", "subject": "CS-301"},
                {"name": "Process Synchronization", "proficiency": "91%", "color": "bg-emerald-400", "status": "Mastered", "tag": "Semaphores & Monitors", "type": "strong", "subject": "CS-301"},
                {"name": "Deadlock Prevention", "proficiency": "45%", "color": "bg-tertiary-container", "status": "Needs Review", "tag": "Havender's Strategies", "type": "needs-attention", "subject": "CS-301"},
                {"name": "CPU Scheduling Queues", "proficiency": "76%", "color": "bg-primary", "status": "Consolidating", "tag": "Starvation & Aging", "type": "developing", "subject": "CS-301"},
                {"name": "Fork() & Exec() Flow", "proficiency": "94%", "color": "bg-emerald-400", "status": "Mastered", "tag": "Copy-on-write", "type": "strong", "subject": "CS-301"}
            ],
            "CS-302": [
                {"name": "TCP 3-Way Handshake", "proficiency": "89%", "color": "bg-emerald-400", "status": "Mastered", "tag": "SYN-ACK Sequence", "type": "strong", "subject": "CS-302"},
                {"name": "Subnet Masking (CIDR)", "proficiency": "58%", "color": "bg-tertiary-container", "status": "Needs Review", "tag": "IP Prefixes & Broadcast", "type": "needs-attention", "subject": "CS-302"},
                {"name": "BGP Routing Policy", "proficiency": "72%", "color": "bg-primary", "status": "Developing", "tag": "Autonomous Systems", "type": "developing", "subject": "CS-302"},
                {"name": "Sliding Window Protocol", "proficiency": "85%", "color": "bg-emerald-400", "status": "Mastered", "tag": "Go-Back-N & Selective", "type": "strong", "subject": "CS-302"}
            ],
            "CS-303": [
                {"name": "BCNF Decomposition", "proficiency": "42%", "color": "bg-tertiary-container", "status": "Critical Gap", "tag": "Lossless & Dependency", "type": "needs-attention", "subject": "CS-303"},
                {"name": "ACID Isolation Levels", "proficiency": "68%", "color": "bg-primary", "status": "Developing", "tag": "Dirty Reads & Phantom", "type": "developing", "subject": "CS-303"},
                {"name": "B+ Tree Index Traversals", "proficiency": "74%", "color": "bg-primary", "status": "Developing", "tag": "Disk Blocks & Fanout", "type": "developing", "subject": "CS-303"},
                {"name": "SQL Joins & Relational Algebra", "proficiency": "93%", "color": "bg-emerald-400", "status": "Mastered", "tag": "Natural & Theta Joins", "type": "strong", "subject": "CS-303"}
            ],
            "CS-201": [
                {"name": "Dijkstra's Algorithm", "proficiency": "92%", "color": "bg-emerald-400", "status": "Mastered", "tag": "Min-Heap Optimization", "type": "strong", "subject": "CS-201"},
                {"name": "Dynamic Programming (DP)", "proficiency": "79%", "color": "bg-primary", "status": "Developing", "tag": "Memoization & Tabulation", "type": "developing", "subject": "CS-201"},
                {"name": "AVL Tree Rotations", "proficiency": "62%", "color": "bg-primary", "status": "Reviewing", "tag": "Balance Factors", "type": "developing", "subject": "CS-201"}
            ],
            "CS-401": [
                {"name": "Multi-Head Attention", "proficiency": "68%", "color": "bg-primary", "status": "Developing", "tag": "Query-Key-Value Vectors", "type": "developing", "subject": "CS-401"},
                {"name": "Backpropagation & Gradients", "proficiency": "86%", "color": "bg-emerald-400", "status": "Mastered", "tag": "Chain Rule Calculus", "type": "strong", "subject": "CS-401"},
                {"name": "Overfitting Regularization", "proficiency": "74%", "color": "bg-primary", "status": "Developing", "tag": "Dropout & L2 Norm", "type": "developing", "subject": "CS-401"}
            ]
        }

        if subject_code and subject_code.upper() in concepts_by_subject:
            selected_concepts = concepts_by_subject[subject_code.upper()]
        else:
            # Flatten all concepts
            selected_concepts = []
            for sub_list in concepts_by_subject.values():
                selected_concepts.extend(sub_list)

        recommendations = [
            {
                "topic": "Deadlocks (CS-301 OS)",
                "action": "Complete Banker's Algorithm Flash Recall Drill",
                "priority": "Critical Gap",
                "reason": "Mastery at 42% with high exam probability (38% syllabus weight)"
            },
            {
                "topic": "BCNF Decomposition (CS-303 DBMS)",
                "action": "Review Lossless Join & Dependency Preserving Rules",
                "priority": "High Priority",
                "reason": "Mastery at 42% — High probability 10-mark question"
            },
            {
                "topic": "Subnet Masking (CS-302 Networks)",
                "action": "Practice 5 CIDR subnet allocation calculations",
                "priority": "Medium",
                "reason": "Recent quiz accuracy dropped to 58%"
            }
        ]

        # Calculate live subjects overview
        subjects_overview = []
        for s in SUBJECTS_CONFIG:
            sub_topics = [t for t in topics_query.filter(Topic.subject_code == s["code"]).all()]
            if sub_topics:
                sub_mastery = round(sum(t.mastery_pct for t in sub_topics) / len(sub_topics))
            else:
                sub_mastery = s["mastery"]
            subjects_overview.append({
                **s,
                "mastery": sub_mastery,
                "topicsCount": len(sub_topics) or 5
            })

        return {
            "overall_progress": overall_progress,
            "subjects": subjects_overview,
            "topics": topic_nodes,
            "concepts": selected_concepts,
            "weak_topics": weak_topics,
            "strong_topics": strong_topics,
            "recommendations": recommendations
        }

    @staticmethod
    def update_topic_from_quiz(db: Session, topic_node_id: str, is_correct: bool) -> int:
        topic = db.query(Topic).filter(Topic.node_id == topic_node_id).first()
        if not topic:
            return 50

        topic.total_quizzed += 1
        if is_correct:
            topic.total_correct += 1
            topic.mastery_pct = min(topic.mastery_pct + 4, 98)
            topic.solved_text = f"{topic.total_correct} Solved"
        else:
            topic.mastery_pct = max(topic.mastery_pct - 6, 25)
            topic.solved_text = "Critical Gap"

        if topic.mastery_pct >= 80:
            topic.status = "strong"
            topic.color = "emerald"
        elif topic.mastery_pct >= 60:
            topic.status = "developing"
            topic.color = "primary"
        else:
            topic.status = "needs-attention"
            topic.color = "tertiary"

        db.commit()
        return topic.mastery_pct

    @staticmethod
    def get_subjects_list(db: Session) -> List[Dict[str, Any]]:
        subjects_overview = []
        for s in SUBJECTS_CONFIG:
            sub_topics = db.query(Topic).filter(Topic.subject_code == s["code"]).all()
            if sub_topics:
                sub_mastery = round(sum(t.mastery_pct for t in sub_topics) / len(sub_topics))
            else:
                sub_mastery = s.get("mastery", 50)
            subjects_overview.append({
                **s,
                "mastery": sub_mastery,
                "topicsCount": len(sub_topics) or s.get("topicsCount", 5)
            })
        return subjects_overview

    @staticmethod
    def add_custom_subject(db: Session, data: Any) -> Dict[str, Any]:
        code = data.code.strip().upper()
        existing = next((s for s in SUBJECTS_CONFIG if s["code"] == code), None)
        short_name = data.shortName or (code.split("-")[-1] if "-" in code else code)
        
        subject_dict = {
            "code": code,
            "name": data.name.strip(),
            "shortName": short_name,
            "icon": data.icon or "menu_book",
            "color": data.color or "primary",
            "examDate": data.examDate or "Exam in 30 days",
            "credits": data.credits or 3,
            "mastery": 55,
            "topicsCount": len(data.initialTopics) if data.initialTopics else 4
        }
        
        if not existing:
            SUBJECTS_CONFIG.append(subject_dict)
        else:
            existing.update(subject_dict)

        topics = data.initialTopics or [
            f"Foundations of {data.name}",
            f"{data.name} Core Architecture",
            f"{data.name} Advanced Analysis",
            f"{data.name} Applied Synthesis"
        ]

        for i, t_name in enumerate(topics):
            node_id = f"{code.lower()}-topic-{i+1}"
            existing_t = db.query(Topic).filter(Topic.node_id == node_id).first()
            if not existing_t:
                new_topic = Topic(
                    subject_code=code,
                    subject_name=data.name.strip(),
                    node_id=node_id,
                    name=t_name.strip(),
                    mastery_pct=50 + (i * 8),
                    solved_text="0 Solved",
                    subtext="Curriculum Syllabus Node",
                    status="developing" if i < 2 else "needs-attention",
                    color=data.color or "primary",
                    icon=data.icon or "menu_book"
                )
                db.add(new_topic)
        db.commit()

        # Add document to Documents table so it shows in My Materials
        from ..models.schema_models import Document, DocumentChunk
        doc_title = f"{data.name}.pdf"
        existing_doc = db.query(Document).filter(Document.title == doc_title).first()
        if not existing_doc:
            doc = Document(
                title=doc_title,
                file_type="pdf",
                file_size="16.2 MB",
                pages="35 pages",
                updated="Added Just Now",
                concepts=f"{len(topics)} Core Concepts • Local Syllabus",
                tags=f"{code}, {', '.join(topics[:2])}",
                status="Indexed Locally",
                action_text="Inspect Knowledge Graph",
                action_icon="account_tree",
                action_target="study-twin",
                image_url="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&auto=format&fit=crop&q=80"
            )
            db.add(doc)
            db.commit()
            db.refresh(doc)
            chunk = DocumentChunk(
                document_id=doc.id,
                chunk_index=1,
                page_number=1,
                text_content=f"Syllabus and curriculum overview for {data.name} ({code}). Focus areas: {', '.join(topics)}.",
                concepts=', '.join(topics)
            )
            db.add(chunk)
            db.commit()

        return subject_dict

    @staticmethod
    def seed_default_topics(db: Session):
        defaults = [
            # CS-301: Operating Systems
            {
                "subject_code": "CS-301", "subject_name": "Operating Systems",
                "node_id": "processes", "name": "Processes", "mastery_pct": 92,
                "solved_text": "48 Solved", "subtext": "PCB • IPC • Forks", "status": "strong",
                "color": "emerald", "position_class": "top-[20%] left-[16%]", "icon": "account_tree"
            },
            {
                "subject_code": "CS-301", "subject_name": "Operating Systems",
                "node_id": "threads", "name": "Threads", "mastery_pct": 88,
                "solved_text": "32 Solved", "subtext": "POSIX • Mutex • Race", "status": "strong",
                "color": "emerald", "position_class": "bottom-[22%] left-[15%]", "icon": "alt_route"
            },
            {
                "subject_code": "CS-301", "subject_name": "Operating Systems",
                "node_id": "paging", "name": "Memory Paging", "mastery_pct": 68,
                "solved_text": "21 Solved", "subtext": "TLB • Virtual Address", "status": "developing",
                "color": "primary", "position_class": "top-[18%] right-[14%]", "icon": "grid_view"
            },
            {
                "subject_code": "CS-301", "subject_name": "Operating Systems",
                "node_id": "scheduling", "name": "CPU Scheduling", "mastery_pct": 70,
                "solved_text": "▲ +18% wk", "subtext": "Round Robin • CFS", "status": "developing",
                "color": "primary", "position_class": "bottom-[10%] left-[40%]", "icon": "reorder"
            },
            {
                "subject_code": "CS-301", "subject_name": "Operating Systems",
                "node_id": "deadlocks", "name": "Deadlocks", "mastery_pct": 42,
                "solved_text": "Critical Gap", "subtext": "4 Conditions • Banker's", "status": "needs-attention",
                "color": "tertiary", "position_class": "bottom-[20%] right-[12%]", "icon": "lock_clock"
            },
            {
                "subject_code": "CS-301", "subject_name": "Operating Systems",
                "node_id": "filesystems", "name": "File Systems", "mastery_pct": 51,
                "solved_text": "14 Solved", "subtext": "Inodes • Indexed Alloc", "status": "needs-attention",
                "color": "tertiary", "position_class": "top-[8%] left-[44%]", "icon": "folder_supervised"
            },

            # CS-302: Computer Networks
            {
                "subject_code": "CS-302", "subject_name": "Computer Networks",
                "node_id": "osi-layers", "name": "OSI 7 Layers", "mastery_pct": 94,
                "solved_text": "38 Solved", "subtext": "Encapsulation • Headers", "status": "strong",
                "color": "emerald", "position_class": "top-[15%] left-[20%]", "icon": "layers"
            },
            {
                "subject_code": "CS-302", "subject_name": "Computer Networks",
                "node_id": "tcp-ip", "name": "TCP / IP Handshake", "mastery_pct": 89,
                "solved_text": "28 Solved", "subtext": "SYN-ACK • Flow Control", "status": "strong",
                "color": "emerald", "position_class": "bottom-[25%] left-[22%]", "icon": "handshake"
            },
            {
                "subject_code": "CS-302", "subject_name": "Computer Networks",
                "node_id": "subnetting", "name": "Subnet Masking", "mastery_pct": 58,
                "solved_text": "Critical Gap", "subtext": "CIDR • VLSM Prefixes", "status": "needs-attention",
                "color": "tertiary", "position_class": "bottom-[18%] right-[18%]", "icon": "network_node"
            },
            {
                "subject_code": "CS-302", "subject_name": "Computer Networks",
                "node_id": "bgp-routing", "name": "BGP & OSPF Routing", "mastery_pct": 74,
                "solved_text": "18 Solved", "subtext": "Link-State • Distance Vector", "status": "developing",
                "color": "primary", "position_class": "top-[20%] right-[22%]", "icon": "router"
            },

            # CS-303: Database Management Systems
            {
                "subject_code": "CS-303", "subject_name": "Database Management Systems",
                "node_id": "normalization", "name": "Normalization (BCNF)", "mastery_pct": 42,
                "solved_text": "Critical Gap", "subtext": "1NF, 2NF, 3NF, BCNF", "status": "needs-attention",
                "color": "tertiary", "position_class": "top-[22%] left-[18%]", "icon": "schema"
            },
            {
                "subject_code": "CS-303", "subject_name": "Database Management Systems",
                "node_id": "acid-transactions", "name": "ACID Transactions", "mastery_pct": 68,
                "solved_text": "19 Solved", "subtext": "Concurrency • 2PL Lock", "status": "developing",
                "color": "primary", "position_class": "bottom-[20%] left-[25%]", "icon": "lock_reset"
            },
            {
                "subject_code": "CS-303", "subject_name": "Database Management Systems",
                "node_id": "btree-indexing", "name": "B+ Tree Indexing", "mastery_pct": 74,
                "solved_text": "22 Solved", "subtext": "Clustered • Hash Index", "status": "developing",
                "color": "primary", "position_class": "bottom-[15%] right-[20%]", "icon": "table_rows"
            },

            # CS-201: Data Structures & Algorithms
            {
                "subject_code": "CS-201", "subject_name": "Data Structures & Algorithms",
                "node_id": "dijkstra-graph", "name": "Graph Algorithms", "mastery_pct": 92,
                "solved_text": "45 Solved", "subtext": "Dijkstra • BFS/DFS • MST", "status": "strong",
                "color": "emerald", "position_class": "top-[18%] left-[24%]", "icon": "polyline"
            },
            {
                "subject_code": "CS-201", "subject_name": "Data Structures & Algorithms",
                "node_id": "dynamic-programming", "name": "Dynamic Programming", "mastery_pct": 79,
                "solved_text": "34 Solved", "subtext": "Knapsack • LCS • Memoization", "status": "developing",
                "color": "primary", "position_class": "bottom-[22%] right-[24%]", "icon": "grid_on"
            },

            # CS-401: Artificial Intelligence & ML
            {
                "subject_code": "CS-401", "subject_name": "Artificial Intelligence & ML",
                "node_id": "transformers-attention", "name": "Transformers & Attention", "mastery_pct": 68,
                "solved_text": "16 Solved", "subtext": "Self-Attention • QKV Matrix", "status": "developing",
                "color": "primary", "position_class": "top-[16%] right-[26%]", "icon": "psychology"
            },
            {
                "subject_code": "CS-401", "subject_name": "Artificial Intelligence & ML",
                "node_id": "backpropagation", "name": "Neural Backprop", "mastery_pct": 86,
                "solved_text": "29 Solved", "subtext": "Chain Rule • Gradient Descent", "status": "strong",
                "color": "emerald", "position_class": "bottom-[18%] left-[28%]", "icon": "tune"
            }
        ]

        for d in defaults:
            existing = db.query(Topic).filter(Topic.node_id == d["node_id"]).first()
            if not existing:
                db.add(Topic(**d))
            else:
                existing.subject_code = d["subject_code"]
                existing.subject_name = d["subject_name"]
        db.commit()
