import pytest
from fastapi.testclient import TestClient
import sys
from pathlib import Path

# Add backend directory to sys.path
backend_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(backend_dir))

from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["app"] == "Sahayak AI"

def test_system_status():
    response = client.get("/api/system/status")
    assert response.status_code == 200
    data = response.json()
    assert data["local_ai"] is True
    assert "vault_documents_count" in data

def test_system_performance():
    response = client.get("/api/system/performance")
    assert response.status_code == 200
    data = response.json()
    assert "cpu_percent" in data
    assert "memory_total_gb" in data
    assert "onnx_providers" in data
    assert "npu_status" in data

def test_demo_seed():
    response = client.post("/api/demo/seed")
    assert response.status_code == 200
    assert response.json()["status"] == "seeded"

def test_list_documents():
    response = client.get("/api/documents")
    assert response.status_code == 200
    docs = response.json()
    assert isinstance(docs, list)
    assert len(docs) >= 1

def test_study_twin():
    response = client.get("/api/study-twin")
    assert response.status_code == 200
    data = response.json()
    assert "overall_progress" in data
    assert "topics" in data
    assert len(data["topics"]) >= 1

def test_chat_deadlocks():
    payload = {
        "message": "Explain Deadlock and Coffman conditions from my notes",
        "subject": "CS-301"
    }
    response = client.post("/api/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "content" in data
    assert "intro" in data["content"]
    assert "Deadlock" in data["content"]["intro"]
    assert data["content"]["conditions"] is not None
    assert len(data["content"]["conditions"]) >= 4

def test_quiz_and_scoring():
    # 1. Fetch questions
    q_resp = client.get("/api/quiz/questions")
    assert q_resp.status_code == 200
    questions = q_resp.json()
    assert len(questions) > 0

    first_q = questions[0]
    # 2. Submit correct answer
    submit_payload = {
        "question_id": first_q["id"],
        "selected_key": first_q["correctKey"]
    }
    sub_resp = client.post("/api/quiz/submit", json=submit_payload)
    assert sub_resp.status_code == 200
    result = sub_resp.json()
    assert result["is_correct"] is True
    assert "new_topic_mastery" in result

def test_exam_plan():
    payload = {
        "subject": "Operating Systems",
        "available_minutes": 45,
        "exam_date": "in 2 days"
    }
    response = client.post("/api/exam-plan", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["total_minutes"] == 45
    assert len(data["blocks"]) == 4

def test_multi_subject_study_twin():
    # Test all subjects returns 5 configured subjects
    response = client.get("/api/study-twin")
    assert response.status_code == 200
    data = response.json()
    assert len(data.get("subjects", [])) == 5
    codes = [s["code"] for s in data["subjects"]]
    assert "CS-301" in codes
    assert "CS-302" in codes
    assert "CS-303" in codes
    assert "CS-201" in codes
    assert "CS-401" in codes

    # Test filtering by specific subject
    filtered_resp = client.get("/api/study-twin?subject_code=CS-302")
    assert filtered_resp.status_code == 200
    filtered_data = filtered_resp.json()
    assert len(filtered_data["topics"]) == 4
    for topic in filtered_data["topics"]:
        assert topic["name"] in ["OSI 7 Layers", "TCP / IP Handshake", "Subnet Masking", "BGP & OSPF Routing"]

def test_multi_subject_quiz():
    # Test DBMS quiz questions
    resp = client.get("/api/quiz/questions?subject_code=CS-303")
    assert resp.status_code == 200
    questions = resp.json()
    assert len(questions) >= 1
    assert "BCNF" in questions[0]["question"] or "DBMS" in questions[0]["topic"]

def test_multi_subject_chat():
    # Test Networks prompt
    resp = client.post("/api/chat", json={
        "message": "Explain TCP 3-way handshake SYN, SYN-ACK, and ACK sequence numbers",
        "subject": "CS-302"
    })
    assert resp.status_code == 200
    data = resp.json()
    assert "TCP" in data["content"]["intro"] or "Handshake" in data["content"]["intro"]

def test_multi_subject_exam_plan():
    # Test Computer Networks exam plan
    resp = client.post("/api/exam-plan", json={
        "subject": "Computer Networks",
        "available_minutes": 60,
        "exam_date": "in 5 days"
    })
    assert resp.status_code == 200
    data = resp.json()
    assert "Computer Networks" in data["subject"]
    assert any("TCP" in b["title"] or "Subnet" in b["topics"] or "TCP" in b["topics"] for b in data["blocks"])

def test_create_custom_subject_and_list():
    # Test GET /api/subjects
    resp = client.get("/api/subjects")
    assert resp.status_code == 200
    initial_subs = resp.json()
    assert len(initial_subs) >= 5

    # Test POST /api/subjects to add custom subject
    new_sub = {
        "name": "Compiler Design",
        "code": "CS-305",
        "shortName": "Compilers",
        "icon": "terminal",
        "color": "primary",
        "examDate": "Exam in 24 days",
        "credits": 4,
        "initialTopics": ["Lexical Analysis", "Syntax Directed Translation", "Code Optimization"]
    }
    post_resp = client.post("/api/subjects", json=new_sub)
    assert post_resp.status_code == 200
    created = post_resp.json()
    assert created["code"] == "CS-305"
    assert created["name"] == "Compiler Design"

    # Verify that Study Twin reflects the new subject
    twin_resp = client.get("/api/study-twin?subject_code=CS-305")
    assert twin_resp.status_code == 200
    twin_data = twin_resp.json()
    assert len(twin_data["topics"]) == 3
    assert any("Lexical Analysis" in t["name"] for t in twin_data["topics"])

