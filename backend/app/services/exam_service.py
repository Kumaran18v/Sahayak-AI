from typing import Dict, Any, List
from sqlalchemy.orm import Session
from ..models.schema_models import Topic

class ExamService:
    @staticmethod
    def generate_plan(
        db: Session,
        subject: str = "Operating Systems",
        available_minutes: int = 45,
        exam_date: str = "in 2 days"
    ) -> Dict[str, Any]:
        sub_lower = subject.lower()
        total_m = available_minutes

        block1_m = max(int(total_m * 0.35), 10)
        block2_m = max(int(total_m * 0.25), 8)
        block3_m = max(int(total_m * 0.25), 8)
        block4_m = max(total_m - (block1_m + block2_m + block3_m), 5)

        if "network" in sub_lower:
            subject_title = "Computer Networks (CS-302)"
            blocks = [
                {
                    "title": "01 // High Priority Crucible: IP Subnetting & CIDR",
                    "duration": f"{block1_m} min",
                    "type": "Targeted Revision & Weakness Repair",
                    "weight": "35% Paper Weight",
                    "topics": "CIDR Prefixes • Usable Host Calculations • Subnet Masks (/24 to /30) • Broadcast Addresses",
                    "status": "Ready",
                    "priority": "Critical"
                },
                {
                    "title": "02 // Protocol Deep-Dive: TCP 3-Way Handshake & Flow",
                    "duration": f"{block2_m} min",
                    "type": "Protocol State Machine Practice",
                    "weight": "25% Paper Weight",
                    "topics": "SYN-ACK Flags • Sliding Window Buffer • Selective Repeat vs Go-Back-N",
                    "status": "Queued",
                    "priority": "High"
                },
                {
                    "title": "03 // Routing Architecture: BGP & OSPF",
                    "duration": f"{block3_m} min",
                    "type": "Network Topology Recall",
                    "weight": "22% Paper Weight",
                    "topics": "Dijkstra Link-State • Autonomous Systems • Distance Vector Count-to-Infinity",
                    "status": "Queued",
                    "priority": "Medium"
                },
                {
                    "title": "04 // Final Comprehensive Recall Drill",
                    "duration": f"{block4_m} min",
                    "type": "Simulated Flash Quiz",
                    "weight": "18% Paper Weight",
                    "topics": "Mixed 10-Question Random Network Protocol Recall Drill",
                    "status": "Locked",
                    "priority": "Consolidation"
                }
            ]
            recommendation = f"Dedicate {block1_m} minutes immediately to Subnetting (CIDR calculations) to secure full numerical marks."

        elif "database" in sub_lower or "dbms" in sub_lower:
            subject_title = "Database Management Systems (CS-303)"
            blocks = [
                {
                    "title": "01 // High Priority Crucible: Normalization & BCNF",
                    "duration": f"{block1_m} min",
                    "type": "Schema Decomposition Weakness Repair",
                    "weight": "38% Paper Weight",
                    "topics": "Lossless Join Verification • Functional Dependency Preservation • 3NF vs BCNF Determinants",
                    "status": "Ready",
                    "priority": "Critical"
                },
                {
                    "title": "02 // Concurrency Control: ACID & 2PL Locks",
                    "duration": f"{block2_m} min",
                    "type": "Transaction Serializability Practice",
                    "weight": "24% Paper Weight",
                    "topics": "Conflict vs View Serializability • Strict 2-Phase Locking • Deadlock Recovery",
                    "status": "Queued",
                    "priority": "High"
                },
                {
                    "title": "03 // Storage Engine: B+ Tree Indexing",
                    "duration": f"{block3_m} min",
                    "type": "Algorithmic Tree Structure Recall",
                    "weight": "22% Paper Weight",
                    "topics": "Fanout Calculation • Clustered vs Secondary Index • Disk Block Reads",
                    "status": "Queued",
                    "priority": "Medium"
                },
                {
                    "title": "04 // Final High-Stakes SQL & Theory Drill",
                    "duration": f"{block4_m} min",
                    "type": "Flash Quiz Assessment",
                    "weight": "16% Paper Weight",
                    "topics": "Mixed 10-Question Normalization & Indexing Flash Drill",
                    "status": "Locked",
                    "priority": "Consolidation"
                }
            ]
            recommendation = f"Focus {block1_m} minutes immediately on BCNF decomposition proofs to eliminate your highest mark penalty risk."

        elif "algorithm" in sub_lower or "dsa" in sub_lower:
            subject_title = "Data Structures & Algorithms (CS-201)"
            blocks = [
                {
                    "title": "01 // High Priority Crucible: Dynamic Programming",
                    "duration": f"{block1_m} min",
                    "type": "Optimal Substructure Drill",
                    "weight": "36% Paper Weight",
                    "topics": "0/1 Knapsack • Longest Common Subsequence (LCS) • Matrix Chain Multiplication",
                    "status": "Ready",
                    "priority": "Critical"
                },
                {
                    "title": "02 // Graph Algorithms: Dijkstra & MST",
                    "duration": f"{block2_m} min",
                    "type": "Greedy Choice Verification",
                    "weight": "26% Paper Weight",
                    "topics": "Dijkstra with Min-Heap • Prim's vs Kruskal's • Topological Sort",
                    "status": "Queued",
                    "priority": "High"
                },
                {
                    "title": "03 // Self-Balancing Trees: AVL & Red-Black",
                    "duration": f"{block3_m} min",
                    "type": "Rotations & Complexity Practice",
                    "weight": "20% Paper Weight",
                    "topics": "LL, RR, LR, RL Rotations • Balance Factor Updates • Binary Heap Sift",
                    "status": "Queued",
                    "priority": "Medium"
                },
                {
                    "title": "04 // Algorithmic Speed Drill",
                    "duration": f"{block4_m} min",
                    "type": "Complexity Flash Quiz",
                    "weight": "18% Paper Weight",
                    "topics": "Time & Space Asymptotic Bounds Flash Quiz",
                    "status": "Locked",
                    "priority": "Consolidation"
                }
            ]
            recommendation = f"Master DP recurrence relations in the first {block1_m} minutes before coding graph traversals."

        elif "ai" in sub_lower or "machine learning" in sub_lower or "ml" in sub_lower:
            subject_title = "Artificial Intelligence & ML (CS-401)"
            blocks = [
                {
                    "title": "01 // High Priority Crucible: Transformers & Self-Attention",
                    "duration": f"{block1_m} min",
                    "type": "Attention Subspace Matrix Drill",
                    "weight": "38% Paper Weight",
                    "topics": "Scaled Dot-Product • Multi-Head Projection • Positional Encodings",
                    "status": "Ready",
                    "priority": "Critical"
                },
                {
                    "title": "02 // Backpropagation & Optimization",
                    "duration": f"{block2_m} min",
                    "type": "Calculus & Gradient Descent Practice",
                    "weight": "25% Paper Weight",
                    "topics": "Chain Rule Vectorization • Adam vs SGD with Momentum • Vanishing Gradients",
                    "status": "Queued",
                    "priority": "High"
                },
                {
                    "title": "03 // Regularization & Overfitting",
                    "duration": f"{block3_m} min",
                    "type": "Generalization Theory Recall",
                    "weight": "21% Paper Weight",
                    "topics": "Dropout • L1/L2 Weight Decay • Batch Normalization Shifts",
                    "status": "Queued",
                    "priority": "Medium"
                },
                {
                    "title": "04 // Final ML Concept Drill",
                    "duration": f"{block4_m} min",
                    "type": "Flash Concept Drill",
                    "weight": "16% Paper Weight",
                    "topics": "10-Question Neural Architectures Flash Quiz",
                    "status": "Locked",
                    "priority": "Consolidation"
                }
            ]
            recommendation = f"Dedicate {block1_m} minutes to Query-Key-Value attention formulas and scale factors."

        elif "all" in sub_lower:
            subject_title = "All Subjects Combined (Crucible Mode)"
            blocks = [
                {
                    "title": "01 // OS Critical Weakness: Deadlocks & Banker's",
                    "duration": f"{block1_m} min",
                    "type": "Syllabus Repair Block",
                    "weight": "28% Overall Weight",
                    "topics": "4 Coffman Conditions • Safe State Vectors • Allocation Matrices",
                    "status": "Ready",
                    "priority": "Critical"
                },
                {
                    "title": "02 // DBMS Crucible: BCNF Normalization",
                    "duration": f"{block2_m} min",
                    "type": "Syllabus Repair Block",
                    "weight": "26% Overall Weight",
                    "topics": "Lossless Decompositions • Determinant Superkeys • Functional Dependencies",
                    "status": "Queued",
                    "priority": "Critical"
                },
                {
                    "title": "03 // Networks: Subnetting & Handshake",
                    "duration": f"{block3_m} min",
                    "type": "Rapid Protocol Drill",
                    "weight": "24% Overall Weight",
                    "topics": "CIDR Host Math • TCP SYN-ACK Sequence • Sliding Window",
                    "status": "Queued",
                    "priority": "High"
                },
                {
                    "title": "04 // Cross-Disciplinary Verification Flash Drill",
                    "duration": f"{block4_m} min",
                    "type": "Mixed Curriculum Drill",
                    "weight": "22% Overall Weight",
                    "topics": "Mixed 10-Question Random Drill across all 5 courses",
                    "status": "Locked",
                    "priority": "Consolidation"
                }
            ]
            recommendation = f"Balance {block1_m} min on OS Deadlocks and {block2_m} min on DBMS Normalization to eliminate your two primary gap vectors."

        else: # Default: Operating Systems
            subject_title = "Operating Systems (CS-301)"
            blocks = [
                {
                    "title": "01 // High Priority Crucible: Deadlocks",
                    "duration": f"{block1_m} min",
                    "type": "Targeted Revision & Weakness Repair",
                    "weight": "38% Paper Weight",
                    "topics": "Coffman Conditions • Banker's Safe-State Verification • Resource Graph Cycles",
                    "status": "Ready",
                    "priority": "Critical"
                },
                {
                    "title": "02 // Algorithmic Drills: CPU Scheduling",
                    "duration": f"{block2_m} min",
                    "type": "Numerical & Formula Practice",
                    "weight": "24% Paper Weight",
                    "topics": "Round Robin Quantum • Multi-level Queue Aging • Gantt Chart Calculations",
                    "status": "Queued",
                    "priority": "High"
                },
                {
                    "title": "03 // High-Retention Polish: Virtual Memory & TLB",
                    "duration": f"{block3_m} min",
                    "type": "Conceptual Architecture Recall",
                    "weight": "22% Paper Weight",
                    "topics": "Effective Memory Access Time (EMAT) • Inverted Page Tables • Thrashing Prevention",
                    "status": "Queued",
                    "priority": "Medium"
                },
                {
                    "title": "04 // Final High-Stakes Verification Drill",
                    "duration": f"{block4_m} min",
                    "type": "Simulated Exam Flash Quiz",
                    "weight": "16% Paper Weight",
                    "topics": "Mixed 10-Question Random Vault Drill across all weak vectors",
                    "status": "Locked",
                    "priority": "Consolidation"
                }
            ]
            recommendation = f"Focus {block1_m} minutes immediately on Deadlocks to eliminate your highest mark penalty risk before exam day."

        return {
            "subject": subject_title,
            "total_minutes": total_m,
            "target_date": exam_date,
            "confidence_pct": 94.2,
            "blocks": blocks,
            "recommendation": recommendation
        }
