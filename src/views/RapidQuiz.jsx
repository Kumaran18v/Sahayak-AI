import React, { useState, useEffect } from 'react';
import { fetchQuizQuestions, submitQuizAnswer } from '../api/quiz';
import { fetchSubjects } from '../api/studyTwin';

export default function RapidQuiz({ onNavigate, selectedSubject = 'all', onSelectSubject }) {
  const [quizSubject, setQuizSubject] = useState(selectedSubject || 'all');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(3);
  const [streak, setStreak] = useState(3);
  const [timer, setTimer] = useState(102); // 1m 42s
  const [feedbackNote, setFeedbackNote] = useState(null);
  const [quizSubjectsList, setQuizSubjectsList] = useState([
    { code: 'all', label: 'All Subjects (Unified)' },
    { code: 'CS-301', label: 'CS-301 • OS' },
    { code: 'CS-302', label: 'CS-302 • Networks' },
    { code: 'CS-303', label: 'CS-303 • DBMS' },
    { code: 'CS-201', label: 'CS-201 • DSA' },
    { code: 'CS-401', label: 'CS-401 • AI/ML' },
  ]);

  const [questions, setQuestions] = useState([
    {
      id: 1,
      topic: 'Deadlocks // Operating Systems (CS-301)',
      weight: '4 Marks',
      question: "Which of the following is a necessary condition for a deadlock to occur in a system, where a resource cannot be forcibly confiscated from a process holding it?",
      options: [
        { key: 'A', label: 'Mutual Exclusion', desc: 'Resources are held in non-shareable mode by concurrent processes' },
        { key: 'B', label: 'No Preemption', desc: 'Process releases resources exclusively through autonomous voluntary completion' },
        { key: 'C', label: 'Circular Wait', desc: 'P0 waiting for P1 waiting for Pn in closed chain sequence' },
        { key: 'D', label: 'Hold and Wait', desc: 'Process holds R1 while requesting additional resource allocation R2' },
      ],
      correctKey: 'B',
      explanation: "No Preemption dictates that resources cannot be forcibly seized from a process; they can only be released voluntarily by the process holding them after it has completed its task.",
      source: "Unit 3 Notes, Page 19 § Deadlock Prevention Rules",
      cosineSimilarity: "0.984"
    },
    {
      id: 2,
      topic: 'TCP Handshake // Computer Networks (CS-302)',
      weight: '4 Marks',
      question: "In the TCP 3-way handshake, if client sends SYN with seq=1000, what control flags and acknowledgment number does the server reply with?",
      options: [
        { key: 'A', label: 'SYN only, ack=1000', desc: 'Server echoes raw client sequence' },
        { key: 'B', label: 'SYN-ACK, ack=1001', desc: 'Server acknowledges client ISN+1 with its own initial sequence' },
        { key: 'C', label: 'ACK only, ack=1000', desc: 'Immediate acknowledgment without server SYN' },
        { key: 'D', label: 'FIN-ACK, ack=1001', desc: 'Premature connection termination sequence' },
      ],
      correctKey: 'B',
      explanation: "The server responds with SYN-ACK, incrementing client's sequence number by 1 (ack=1001) while establishing its own starting sequence number.",
      source: "Computer Networks.pdf, Page 14 § Transport Layer Protocols",
      cosineSimilarity: "0.988"
    },
    {
      id: 3,
      topic: 'Relational Normalization // DBMS (CS-303)',
      weight: '5 Marks',
      question: "A relation R is in Boyce-Codd Normal Form (BCNF) if and only if for every non-trivial functional dependency X -> Y:",
      options: [
        { key: 'A', label: 'Y is a prime attribute', desc: 'Standard 3rd Normal Form condition' },
        { key: 'B', label: 'X is a candidate / superkey', desc: 'Strict determinant condition for BCNF' },
        { key: 'C', label: 'X and Y are disjoint', desc: 'Orthogonal decomposition criterion' },
        { key: 'D', label: 'Relation has no composite keys', desc: 'Second normal form restriction' },
      ],
      correctKey: 'B',
      explanation: "BCNF strictly requires that the left-hand side X of every non-trivial FD X -> Y must be a superkey of the relation.",
      source: "Database Management Systems.pdf, Page 18 § Normalization",
      cosineSimilarity: "0.993"
    },
    {
      id: 4,
      topic: 'Shortest Path // DSA (CS-201)',
      weight: '4 Marks',
      question: "What is the time complexity of Dijkstra's algorithm when implemented with an adjacency list and a Binary Min-Heap?",
      options: [
        { key: 'A', label: 'O(V^2)', desc: 'Adjacency matrix unoptimized implementation' },
        { key: 'B', label: 'O((V + E) log V)', desc: 'Binary heap priority queue optimization' },
        { key: 'C', label: 'O(E log E)', desc: 'Kruskal minimum spanning tree' },
        { key: 'D', label: 'O(V * E)', desc: 'Bellman-Ford negative edge algorithm' },
      ],
      correctKey: 'B',
      explanation: "Using a binary min-heap with an adjacency list allows vertex extraction in O(log V) and edge relaxation in O(log V), yielding O((V + E) log V).",
      source: "Data Structures & Algorithms.pdf, Page 28 § Graph Traversals",
      cosineSimilarity: "0.991"
    },
    {
      id: 5,
      topic: 'Transformer Architecture // AI & ML (CS-401)',
      weight: '5 Marks',
      question: "In the Scaled Dot-Product Attention formula Attention(Q,K,V) = softmax(QK^T / sqrt(d_k))V, what is the mathematical purpose of dividing by sqrt(d_k)?",
      options: [
        { key: 'A', label: 'Prevent vanishing gradients in Softmax', desc: 'Avoids extremely small gradients when dot products grow large' },
        { key: 'B', label: 'Normalize token embedding length to 1.0', desc: 'Unit vector normalization' },
        { key: 'C', label: 'Convert matrix multiplications into INT4', desc: 'Hardware quantization scaling' },
        { key: 'D', label: 'Enforce causal future token masking', desc: 'Decoder mask implementation' },
      ],
      correctKey: 'A',
      explanation: "For large values of d_k, dot products grow large in magnitude, pushing softmax into regions with extremely small gradients. Dividing by sqrt(d_k) stabilizes the gradient flow.",
      source: "Artificial Intelligence & ML.pdf, Page 15 § Attention Mechanisms",
      cosineSimilarity: "0.995"
    }
  ]);

  useEffect(() => {
    let mounted = true;
    fetchSubjects()
      .then(subs => {
        if (mounted && subs && subs.length > 0) {
          setQuizSubjectsList([
            { code: 'all', label: 'All Subjects (Unified)' },
            ...subs.map(s => ({ code: s.code, label: `${s.code} • ${s.shortName || s.name}` }))
          ]);
        }
      })
      .catch(e => console.log('Using baseline quiz subjects:', e.message));

    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    fetchQuizQuestions(10, quizSubject)
      .then(fetched => {
        if (mounted && fetched && fetched.length > 0) {
          setQuestions(fetched);
          setCurrentQIndex(0);
          setSelectedOption(null);
          setHasAnswered(false);
        }
      })
      .catch(e => console.log('Using baseline quiz questions:', e.message));
    return () => { mounted = false; };
  }, [quizSubject]);

  const currentQ = questions[currentQIndex % questions.length];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSelect = async (key) => {
    if (hasAnswered) return;
    setSelectedOption(key);
    setHasAnswered(true);

    try {
      const res = await submitQuizAnswer(currentQ.id, key);
      if (res.is_correct) {
        setScore(prev => prev + 1);
        setStreak(prev => prev + 1);
        setFeedbackNote(`Correct! Topic mastery updated to ${res.new_topic_mastery}% in Study Twin.`);
      } else {
        setStreak(0);
        setFeedbackNote(`Incorrect. Weak topic detected: ${currentQ.topic}. Mastery lowered to ${res.new_topic_mastery}%. Added to Exam Mode priority.`);
      }
    } catch (e) {
      if (key === currentQ.correctKey) {
        setScore(prev => prev + 1);
        setStreak(prev => prev + 1);
      } else {
        setStreak(0);
      }
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setHasAnswered(false);
    setFeedbackNote(null);
    setCurrentQIndex(prev => (prev + 1) % questions.length);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="p-space-md sm:p-space-xl lg:p-margin-lg flex flex-col gap-space-xl max-w-7xl mx-auto w-full">
        {/* Top Header & Streak Bar */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pb-space-sm border-b border-outline-variant/15">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-label-caps uppercase tracking-wider text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 font-mono text-[10px]">
                RAPID RECALL COCKPIT
              </span>
              <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs">
                Snapdragon NPU Assessment
              </span>
            </div>
            <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface font-bold">
              Rapid Drill Quiz // High Stakes
            </h1>
          </div>

          <div className="flex items-center gap-space-sm">
            <div className="flex items-center gap-2 px-space-md py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/15">
              <span className="material-symbols-outlined text-primary-container text-lg">local_fire_department</span>
              <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface font-mono font-bold">
                {streak} Streak
              </span>
            </div>
            <div className="flex items-center gap-2 px-space-md py-1.5 rounded-xl bg-surface-container-low border border-primary/20">
              <span className="material-symbols-outlined text-primary text-lg">timer</span>
              <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-primary font-mono font-bold">
                {formatTimer(timer)}
              </span>
            </div>
          </div>
        </section>

        {/* Subject Filter Tabs */}
        <section className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-on-surface-variant font-mono uppercase tracking-wider shrink-0 mr-1">
            Drill by Subject:
          </span>
          {quizSubjectsList.map((sub) => (
            <button
              key={sub.code}
              onClick={() => {
                setQuizSubject(sub.code);
                if (onSelectSubject) onSelectSubject(sub.code);
              }}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 border ${
                quizSubject === sub.code
                  ? 'bg-primary text-on-primary border-primary shadow-sm font-semibold'
                  : 'bg-surface-container text-on-surface-variant border-outline-variant/15 hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </section>

        {/* Main Grid: Quiz Question (8) + Live Telemetry Rail (4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Question Stage (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-space-lg">
            <div className="rounded-2xl bg-surface-container-low p-space-md sm:p-space-xl shadow-xl flex flex-col gap-space-lg border border-outline-variant/15 relative overflow-hidden">
              {/* Question Metadata Header */}
              <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-sm border-b border-outline-variant/10">
                <div className="flex items-center gap-space-sm flex-wrap">
                  <span className="px-space-sm py-1 rounded-full bg-primary-container/15 text-primary font-label-caps text-label-caps uppercase font-mono text-[10px] font-bold">
                    Question 0{currentQIndex + 1}/10
                  </span>
                  <span className="px-space-sm py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-caps text-label-caps uppercase font-mono text-[10px]">
                    {currentQ.weight}
                  </span>
                  <span className="text-xs text-outline font-mono">
                    {currentQ.topic}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-primary font-mono-telemetry-sm text-mono-telemetry-sm font-mono text-xs">
                  <span className="material-symbols-outlined text-sm">memory</span>
                  NPU Verified
                </span>
              </div>

              {/* Question Prompt */}
              <h2 className="font-headline-lg text-xl sm:text-2xl text-on-surface font-semibold leading-snug">
                {currentQ.question}
              </h2>

              {/* Options Group */}
              <div className="flex flex-col gap-space-sm pt-space-xs">
                {currentQ.options.map((opt) => {
                  const isChosen = selectedOption === opt.key;
                  const isCorrect = opt.key === currentQ.correctKey;
                  const showResult = hasAnswered;

                  let borderClass = 'border-outline-variant/15 bg-surface-container hover:bg-surface-container-high';
                  let badge = null;

                  if (showResult) {
                    if (isCorrect) {
                      borderClass = 'border-primary bg-primary-container/10 ring-1 ring-primary shadow-[0_0_20px_rgba(0,210,255,0.2)]';
                      badge = (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-mono text-[9px] font-bold">
                          <span className="material-symbols-outlined text-xs">check</span> CORRECT ANSWER
                        </span>
                      );
                    } else if (isChosen && !isCorrect) {
                      borderClass = 'border-error bg-error/10 ring-1 ring-error';
                      badge = (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error text-white font-mono text-[9px] font-bold">
                          <span className="material-symbols-outlined text-xs">close</span> INCORRECT
                        </span>
                      );
                    }
                  }

                  return (
                    <div
                      key={opt.key}
                      onClick={() => handleSelect(opt.key)}
                      className={`flex items-start justify-between p-space-md rounded-xl transition-all duration-200 cursor-pointer border ${borderClass}`}
                    >
                      <div className="flex items-start gap-space-md">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-semibold shrink-0 mt-0.5 ${
                          showResult && isCorrect
                            ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                            : showResult && isChosen && !isCorrect
                            ? 'bg-error text-white'
                            : 'bg-surface-container-highest text-on-surface'
                        }`}>
                          {opt.key}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-headline-sm text-body-md sm:text-headline-sm text-on-surface font-semibold">
                              {opt.label}
                            </span>
                            {badge}
                          </div>
                          <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                            {opt.desc}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 mt-1">
                        {showResult && isCorrect ? (
                          <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-sm">
                            <span className="material-symbols-outlined text-sm font-bold">done</span>
                          </div>
                        ) : showResult && isChosen && !isCorrect ? (
                          <div className="w-6 h-6 rounded-full bg-error text-white flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm font-bold">close</span>
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-surface-container-highest"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* AI Explanation Box */}
              {hasAnswered && (
                <div className="mt-space-sm bg-surface-container-lowest/90 p-space-lg rounded-xl flex flex-col gap-space-sm shadow-inner border border-outline-variant/15 animate-in fade-in">
                  <div className="flex items-center justify-between flex-wrap gap-space-xs">
                    <div className="flex items-center gap-space-xs text-primary font-mono text-xs">
                      <span className="material-symbols-outlined text-base">auto_awesome</span>
                      <span className="font-label-caps text-label-caps uppercase tracking-wider font-semibold">
                        AI Explanation (Grounded in Local Vault)
                      </span>
                    </div>
                    <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-outline font-mono text-[10px]">
                      Cosine Similarity: {currentQ.cosineSimilarity}
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                    {currentQ.explanation}
                  </p>
                  <div className="flex items-center gap-space-sm pt-space-xs text-on-surface-variant font-mono text-xs">
                    <span className="material-symbols-outlined text-sm text-primary">bookmark</span>
                    <span className="font-body-sm text-body-sm italic">Source: {currentQ.source}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Question Action Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md bg-surface-container-low p-space-md rounded-xl shadow-sm border border-outline-variant/15">
              <button
                onClick={() => onNavigate('ai-tutor')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface transition-colors font-body-md text-body-md font-medium border border-outline-variant/20"
                type="button"
              >
                <span className="material-symbols-outlined text-lg text-primary">smart_toy</span>
                <span>Explain This Topic in AI Tutor</span>
              </button>

              <button
                onClick={handleNext}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-space-sm rounded-lg bg-gradient-to-r from-primary-container to-primary text-on-primary-container font-headline-sm text-headline-sm font-semibold shadow-[0_0_20px_rgba(0,210,255,0.35)] hover:shadow-[0_0_28px_rgba(0,210,255,0.5)] transition-all cursor-pointer"
                type="button"
              >
                <span>Next Question (0{((currentQIndex + 1) % questions.length) + 1}/10)</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>

            {/* Bottom Latency Indicator */}
            <div className="flex items-center justify-between px-space-sm font-mono-telemetry-sm text-mono-telemetry-sm text-outline font-mono text-xs">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-primary">bolt</span>
                <span>NPU Latency: 4.1ms per answer verification</span>
              </div>
              <span>Quantization: INT4 Snapdragon NPU</span>
            </div>
          </div>

          {/* Right Rail: Telemetry & Unit 3 Map (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            {/* Live Telemetry */}
            <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-md shadow-sm border border-outline-variant/15">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Live Telemetry</span>
                <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-primary font-mono text-xs">
                  45 TOPS Hexagon
                </span>
              </div>
              <div className="flex flex-col gap-space-xs">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-on-surface-variant">Accuracy Trajectory</span>
                  <span className="text-primary font-semibold">
                    {Math.round((score / Math.max(currentQIndex + (hasAnswered ? 1 : 0), 1)) * 100)}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${Math.round((score / Math.max(currentQIndex + (hasAnswered ? 1 : 0), 1)) * 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
                <div className="bg-surface-container p-space-sm rounded-lg flex flex-col border border-outline-variant/10">
                  <span className="font-label-caps text-label-caps text-outline uppercase font-mono text-[9px]">Drill Velocity</span>
                  <span className="font-mono-telemetry-lg text-mono-telemetry-lg text-on-surface font-semibold font-mono">18.4s / Q</span>
                </div>
                <div className="bg-surface-container p-space-sm rounded-lg flex flex-col border border-outline-variant/10">
                  <span className="font-label-caps text-label-caps text-outline uppercase font-mono text-[9px]">Confidence</span>
                  <span className="font-mono-telemetry-lg text-mono-telemetry-lg text-primary font-semibold font-mono">High (94%)</span>
                </div>
              </div>
            </div>

            {/* Unit 3 Concept Map */}
            <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-sm shadow-sm border border-outline-variant/15">
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Unit 3 Concept Map</span>
              <div className="relative w-full h-44 rounded-lg bg-surface-container-lowest overflow-hidden flex items-center justify-center p-space-sm border border-outline-variant/10">
                <svg className="w-full h-full text-outline-variant" fill="none" viewBox="0 0 280 140">
                  <path d="M 60 70 L 140 30" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1.5"></path>
                  <path d="M 60 70 L 140 110" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1.5"></path>
                  <path d="M 140 30 L 220 70" stroke="currentColor" strokeWidth="1.5"></path>
                  <path d="M 140 110 L 220 70" stroke="currentColor" strokeWidth="1.5"></path>
                  
                  <circle className="fill-surface-container-high stroke-outline" cx="60" cy="70" r="14"></circle>
                  <text className="fill-on-surface font-mono text-[8px]" textAnchor="middle" x="60" y="73">RAG</text>
                  
                  <circle className="fill-primary-container/20 stroke-primary" cx="140" cy="30" r="18"></circle>
                  <text className="fill-primary font-mono text-[9px] font-bold" textAnchor="middle" x="140" y="33">P-Lock</text>
                  
                  <circle className="fill-surface-container-high stroke-outline" cx="140" cy="110" r="14"></circle>
                  <text className="fill-on-surface font-mono text-[8px]" textAnchor="middle" x="140" y="113">Banker</text>
                  
                  <circle className="fill-surface-container-highest stroke-secondary" cx="220" cy="70" r="16"></circle>
                  <text className="fill-secondary font-mono text-[8px]" textAnchor="middle" x="220" y="73">Safe</text>
                </svg>
                <div className="absolute bottom-2 left-3 font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs">
                  Node: Coffman Conditions
                </div>
              </div>
            </div>

            {/* Offline Engine Badge */}
            <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-xs shadow-sm border border-outline-variant/15">
              <div className="flex items-center gap-space-xs text-primary font-mono text-xs">
                <span className="material-symbols-outlined text-base">offline_pin</span>
                <span className="font-headline-sm text-body-md font-semibold text-on-surface">Offline Exam Engine</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Zero internet connection required. All question generation and evaluation executed on Qualcomm Snapdragon NPU.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
