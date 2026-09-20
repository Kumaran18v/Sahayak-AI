import React, { useState, useEffect } from 'react';
import { fetchExamPlan } from '../api/examMode';
import { fetchSubjects } from '../api/studyTwin';

export default function ExamMode({ onNavigate, selectedSubject = 'all', onSelectSubject }) {
  const DEFAULT_SUBJECTS_EXAM = [
    { name: 'Operating Systems', code: 'CS-301', days: '2 Days', hours: '~48 Hours', date: 'in 2 days', weight: '38% marks in Deadlocks & Scheduling' },
    { name: 'Computer Networks', code: 'CS-302', days: '5 Days', hours: '~120 Hours', date: 'in 5 days', weight: '32% marks in TCP/IP & CIDR Subnetting' },
    { name: 'Database Management Systems', code: 'CS-303', days: '8 Days', hours: '~192 Hours', date: 'in 8 days', weight: '35% marks in BCNF & Transactions' },
    { name: 'Data Structures & Algorithms', code: 'CS-201', days: '12 Days', hours: '~288 Hours', date: 'in 12 days', weight: '40% marks in Dijkstra & Dynamic Programming' },
    { name: 'Artificial Intelligence & ML', code: 'CS-401', days: '15 Days', hours: '~360 Hours', date: 'in 15 days', weight: '36% marks in Transformers & Backpropagation' },
    { name: 'All Subjects', code: 'ALL', days: '2 Days', hours: 'Curriculum Sprint', date: 'in 2 days', weight: 'Cross-subject comprehensive revision sprint' },
  ];

  const [subjectsExam, setSubjectsExam] = useState(DEFAULT_SUBJECTS_EXAM);
  const [examSubject, setExamSubject] = useState('Operating Systems');
  const [selectedDuration, setSelectedDuration] = useState('45m');
  const [activeTab, setActiveTab] = useState('plan'); // 'plan' or 'live-drill'
  const [drillActive, setDrillActive] = useState(false);
  const [drillQuestionIndex, setDrillQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [planData, setPlanData] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchSubjects()
      .then(subs => {
        if (mounted && subs && subs.length > 0) {
          const formatted = subs.map(s => ({
            name: s.name,
            code: s.code,
            days: s.examDate || '30 Days',
            hours: `~${s.credits * 24} Hours`,
            date: s.examDate || 'in 30 days',
            weight: `High yield focus for ${s.code}`
          }));
          const merged = [
            ...formatted,
            { name: 'All Subjects', code: 'ALL', days: '2 Days', hours: 'Curriculum Sprint', date: 'in 2 days', weight: 'Cross-subject comprehensive revision sprint' }
          ];
          setSubjectsExam(merged);

          // If selectedSubject is passed, find matching subject
          const match = merged.find(m => m.code === selectedSubject);
          if (match) {
            setExamSubject(match.name);
          }
        }
      })
      .catch(e => console.log('Using default exam subjects:', e.message));

    return () => { mounted = false; };
  }, [selectedSubject]);

  const currentSubjectMeta = subjectsExam.find(s => s.name === examSubject) || subjectsExam[0];

  useEffect(() => {
    let mounted = true;
    const minutes = parseInt(selectedDuration.replace('m', '')) || 45;
    fetchExamPlan(examSubject, minutes, currentSubjectMeta?.date || 'in 2 days')
      .then(res => {
        if (mounted && res) {
          setPlanData(res);
        }
      })
      .catch(e => console.log('Using baseline exam plan:', e.message));
    return () => { mounted = false; };
  }, [examSubject, selectedDuration]);

  const drillQuestions = [
    {
      id: 1,
      topic: 'Deadlocks',
      question: "Which of the following is NOT one of Coffman's four conditions required simultaneously for a deadlock to occur?",
      options: [
        "Mutual Exclusion",
        "Hold and Wait",
        "Preemptive Resource Revocation",
        "Circular Wait"
      ],
      correct: 2,
      explanation: "The condition is 'No Preemption', meaning resources cannot be preempted forcibly."
    },
    {
      id: 2,
      topic: 'Banker\'s Algorithm',
      question: "In Banker's Algorithm safety check, if Need[i] <= Work, what happens when process Pi finishes?",
      options: [
        "Work = Work - Allocation[i]",
        "Work = Work + Allocation[i]",
        "Available = Available - Need[i]",
        "Process is placed in wait queue"
      ],
      correct: 1,
      explanation: "When process Pi finishes, it releases all of its allocated resources back to Work (Work = Work + Allocation[i])."
    }
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="p-space-md sm:p-space-xl lg:p-margin-lg flex flex-col gap-space-xl max-w-7xl mx-auto w-full">
        {/* Priority Advisory Banner */}
        <section className="p-space-md rounded-2xl bg-surface-container-low border border-tertiary-container/30 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
          <div className="flex items-start gap-space-md">
            <div className="w-10 h-10 rounded-xl bg-tertiary-container/20 text-tertiary flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-2xl">alarm_on</span>
            </div>
            <div>
              <div className="flex items-center gap-space-xs">
                <span className="font-label-caps text-label-caps text-tertiary uppercase tracking-wider font-semibold font-mono text-[10px]">
                  Priority Advisory
                </span>
                <span className="px-1.5 py-0.2 rounded bg-tertiary/10 text-tertiary text-[10px] font-mono-telemetry-sm font-mono">
                  {currentSubjectMeta.code}
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface mt-0.5">
                {examSubject} exam scheduled {currentSubjectMeta.date}. Historical analysis indicates{' '}
                <span className="font-semibold text-primary">{currentSubjectMeta.weight}</span>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-sm shrink-0">
            <div className="px-space-md py-1.5 rounded-lg bg-surface-container-lowest flex items-center gap-space-xs border border-outline-variant/15">
              <span className="font-label-caps text-label-caps text-on-surface-variant font-mono text-[10px]">PAPER CONFIDENCE</span>
              <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-primary font-semibold font-mono">94.2%</span>
            </div>
          </div>
        </section>

        {/* Tactical War-Room Dial & Parameters */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
          {/* Parameter 1: Target Exam & T-Minus */}
          <div className="md:col-span-4 rounded-xl bg-surface-container p-space-lg shadow-md flex flex-col justify-between group hover:bg-surface-container-high transition-colors border border-outline-variant/15">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider font-mono text-[10px]">
                  Target Exam
                </span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">
                  {currentSubjectMeta.code}
                </span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
                schedule
              </span>
            </div>
            <div className="mt-space-sm">
              <select
                value={examSubject}
                onChange={(e) => {
                  setExamSubject(e.target.value);
                  const found = subjectsExam.find(s => s.name === e.target.value);
                  if (found && onSelectSubject && found.code !== 'ALL') {
                    onSelectSubject(found.code);
                  }
                }}
                className="w-full bg-surface-container-lowest text-on-surface text-xs font-semibold rounded-lg px-2.5 py-1.5 border border-outline-variant/20 focus:outline-none focus:border-primary cursor-pointer mb-2"
              >
                {subjectsExam.map(s => (
                  <option key={s.name} value={s.name} className="bg-surface-container text-on-surface">
                    {s.code}: {s.name} ({s.days})
                  </option>
                ))}
              </select>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-headline-lg text-2xl sm:text-headline-lg font-bold text-on-surface tracking-tight">
                    {currentSubjectMeta.days}
                  </span>
                  <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-tertiary ml-2 font-mono text-xs">
                    {currentSubjectMeta.hours}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-space-sm w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary-container h-full rounded-full" style={{ width: '35%' }}></div>
            </div>
          </div>

          {/* Parameter 2: Time Budget */}
          <div className="md:col-span-5 rounded-xl bg-surface-container p-space-lg shadow-md flex flex-col justify-between group hover:bg-surface-container-high transition-colors border border-outline-variant/15">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider font-mono text-[10px]">
                  Session Time Budget
                </span>
                <span className="font-mono-telemetry-sm text-[10px] px-1.5 rounded bg-primary/10 text-primary uppercase font-mono">
                  Active Dial
                </span>
              </div>
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">timelapse</span>
            </div>
            <div className="mt-space-md flex items-baseline justify-between">
              <div className="flex items-baseline gap-space-xs">
                <span className="font-headline-lg text-3xl font-bold text-primary tracking-tight drop-shadow-[0_0_12px_rgba(0,210,255,0.3)]">
                  {selectedDuration.replace('m', '')}
                </span>
                <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">Minutes</span>
              </div>
              <div className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-lg border border-outline-variant/15">
                {['30m', '45m', '60m', '90m'].map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedDuration(time)}
                    className={`px-2 py-0.5 rounded font-mono text-xs transition-colors ${
                      selectedDuration === time
                        ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-space-md w-full flex items-center gap-1">
              <div className="h-1.5 flex-1 bg-primary rounded-full"></div>
              <div className="h-1.5 flex-1 bg-primary rounded-full"></div>
              <div className="h-1.5 flex-1 bg-primary rounded-full"></div>
              <div className="h-1.5 flex-1 bg-surface-container-lowest rounded-full"></div>
            </div>
          </div>

          {/* Parameter 3: Predicted Yield */}
          <div className="md:col-span-3 rounded-xl bg-gradient-to-br from-surface-container to-surface-container-high p-space-lg shadow-md flex flex-col justify-between border border-outline-variant/15">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider font-mono text-[10px]">
                Predicted Yield
              </span>
              <span className="material-symbols-outlined text-tertiary">trending_up</span>
            </div>
            <div className="mt-space-md">
              <div className="flex items-baseline gap-1">
                <span className="font-headline-lg text-2xl sm:text-headline-lg font-bold text-tertiary tracking-tight">85%+</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-mono text-[10px]">Target</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-xs">
                Score trajectory delta: <span className="text-primary font-mono-telemetry-sm font-semibold font-mono">+19%</span> after revision.
              </p>
            </div>
            <div className="mt-space-md flex items-center justify-between text-on-surface-variant font-mono-telemetry-sm text-xs font-mono">
              <span>Current: 66%</span>
              <span className="text-tertiary font-semibold">Goal: 85%</span>
            </div>
          </div>
        </section>

        {/* Generated Revision Plan Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm pt-space-xs">
          <div>
            <div className="flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-caps text-label-caps uppercase tracking-wider text-primary font-mono text-[10px]">
                SYNTHESIS ENGINE COMPLETE
              </span>
            </div>
            <h2 className="font-headline-md text-xl sm:text-headline-md text-on-surface font-bold mt-1">
              YOUR {selectedDuration.toUpperCase()} REVISION PLAN
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
              Synthesized by <span className="text-on-surface font-semibold">Study Twin</span> based on your{' '}
              <span className="text-tertiary font-semibold">42% Deadlocks weak spot</span> and weighted 5-year frequency distribution.
            </p>
          </div>

          <div className="flex items-center gap-space-sm bg-surface-container px-space-md py-space-sm rounded-lg shrink-0 border border-outline-variant/15">
            <div className="flex flex-col text-right">
              <span className="font-label-caps text-label-caps text-on-surface-variant font-mono text-[10px]">ALLOCATED TOPICS</span>
              <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface font-semibold font-mono text-xs">
                4 High-Impact Modules
              </span>
            </div>
            <div className="w-px h-6 bg-surface-container-high"></div>
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-on-surface-variant font-mono text-[10px]">ESTIMATED YIELD</span>
              <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-primary font-semibold font-mono text-xs">
                +25 Potential Marks
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Step-by-Step Timeline Cards */}
        <div className="grid grid-cols-1 gap-space-md">
          {/* Block 01 */}
          <div className="relative rounded-xl bg-surface-container p-space-lg shadow-lg overflow-hidden group hover:bg-surface-container-high transition-all border border-outline-variant/15">
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-tertiary-container shadow-[0_0_10px_rgba(255,177,72,0.5)]"></div>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pl-space-xs">
              <div className="flex items-start gap-space-md">
                <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center shrink-0 border border-outline-variant/20">
                  <span className="font-mono-telemetry-lg text-mono-telemetry-lg font-bold text-tertiary font-mono">01</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Deadlocks</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-container/15 text-primary text-xs font-mono font-semibold">
                      <span className="material-symbols-outlined text-xs">timer</span> 10 min
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary text-xs font-mono font-semibold">
                      <span className="material-symbols-outlined text-xs">warning</span> Needs Attention (42% Mastery)
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1.5">
                    <span className="text-on-surface font-medium">Core Diagnostic Focus:</span> 4 Conditions for Deadlock, Resource Allocation Graphs (RAG), Banker's Safety Algorithm verification cycles.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between lg:justify-end gap-space-lg shrink-0 pt-space-xs lg:pt-0 border-t border-surface-container-high lg:border-t-0">
                <div className="flex flex-col items-start lg:items-end">
                  <span className="font-label-caps text-label-caps uppercase text-on-surface-variant font-mono text-[10px]">Expected Gain</span>
                  <span className="font-headline-sm text-headline-sm font-bold text-tertiary">+8 Marks</span>
                </div>
                <button
                  onClick={() => onNavigate('ai-tutor')}
                  className="px-space-md py-2 rounded-lg bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-on-surface transition-all font-body-sm font-semibold flex items-center gap-space-xs shadow-sm border border-outline-variant/15 text-xs"
                >
                  <span>View Summary Drill</span>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>

            <div className="mt-space-md pt-space-sm border-t border-surface-container-lowest/40 flex flex-wrap items-center justify-between gap-space-sm pl-space-xs text-xs font-mono">
              <div className="flex items-center gap-space-md text-on-surface-variant">
                <span>Historical Weight: <span className="text-on-surface">12% of total exam</span></span>
                <span>NPU Acceleration: <span className="text-primary">Instant synthesis primed</span></span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span>Current Confidence:</span>
                <div className="w-24 h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                  <div className="bg-tertiary-container h-full rounded-full" style={{ width: '42%' }}></div>
                </div>
                <span className="text-tertiary font-semibold">42%</span>
              </div>
            </div>
          </div>

          {/* Block 02 */}
          <div className="relative rounded-xl bg-surface-container p-space-lg shadow-md overflow-hidden group hover:bg-surface-container-high transition-all border border-outline-variant/15">
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-tertiary/70"></div>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pl-space-xs">
              <div className="flex items-start gap-space-md">
                <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center shrink-0 border border-outline-variant/20">
                  <span className="font-mono-telemetry-lg text-mono-telemetry-lg font-bold text-on-surface font-mono">02</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">CPU Scheduling</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-container/15 text-primary text-xs font-mono font-semibold">
                      <span className="material-symbols-outlined text-xs">timer</span> 10 min
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary text-xs font-mono font-semibold">
                      <span className="material-symbols-outlined text-xs">priority_high</span> Needs Attention (51% Mastery)
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1.5">
                    <span className="text-on-surface font-medium">Core Diagnostic Focus:</span> Round Robin calculation tricks, Context Switch penalty math, Gantt Chart timeline exercises.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between lg:justify-end gap-space-lg shrink-0 pt-space-xs lg:pt-0 border-t border-surface-container-high lg:border-t-0">
                <div className="flex flex-col items-start lg:items-end">
                  <span className="font-label-caps text-label-caps uppercase text-on-surface-variant font-mono text-[10px]">Expected Gain</span>
                  <span className="font-headline-sm text-headline-sm font-bold text-tertiary">+6 Marks</span>
                </div>
                <button
                  onClick={() => onNavigate('ai-tutor')}
                  className="px-space-md py-2 rounded-lg bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-on-surface transition-all font-body-sm font-semibold flex items-center gap-space-xs shadow-sm border border-outline-variant/15 text-xs"
                >
                  <span>View Summary Drill</span>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>

            <div className="mt-space-md pt-space-sm border-t border-surface-container-lowest/40 flex flex-wrap items-center justify-between gap-space-sm pl-space-xs text-xs font-mono">
              <div className="flex items-center gap-space-md text-on-surface-variant">
                <span>Historical Weight: <span className="text-on-surface">14% of total exam</span></span>
                <span>Formula Vault: <span className="text-primary">3 speed shortcuts stored</span></span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span>Current Confidence:</span>
                <div className="w-24 h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full rounded-full" style={{ width: '51%' }}></div>
                </div>
                <span className="text-tertiary font-semibold">51%</span>
              </div>
            </div>
          </div>

          {/* Block 03 */}
          <div className="relative rounded-xl bg-surface-container p-space-lg shadow-md overflow-hidden group hover:bg-surface-container-high transition-all border border-outline-variant/15">
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-primary-container"></div>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pl-space-xs">
              <div className="flex items-start gap-space-md">
                <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center shrink-0 border border-outline-variant/20">
                  <span className="font-mono-telemetry-lg text-mono-telemetry-lg font-bold text-on-surface font-mono">03</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Memory Management</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-container/15 text-primary text-xs font-mono font-semibold">
                      <span className="material-symbols-outlined text-xs">timer</span> 10 min
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-mono font-semibold">
                      <span className="material-symbols-outlined text-xs">trending_up</span> Developing (68% Mastery)
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1.5">
                    <span className="text-on-surface font-medium">Core Diagnostic Focus:</span> TLB Hit Ratio arithmetic, Multi-level Paging table address translation equations, Inverted Page Tables.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between lg:justify-end gap-space-lg shrink-0 pt-space-xs lg:pt-0 border-t border-surface-container-high lg:border-t-0">
                <div className="flex flex-col items-start lg:items-end">
                  <span className="font-label-caps text-label-caps uppercase text-on-surface-variant font-mono text-[10px]">Expected Gain</span>
                  <span className="font-headline-sm text-headline-sm font-bold text-primary">+5 Marks</span>
                </div>
                <button
                  onClick={() => onNavigate('ai-tutor')}
                  className="px-space-md py-2 rounded-lg bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-on-surface transition-all font-body-sm font-semibold flex items-center gap-space-xs shadow-sm border border-outline-variant/15 text-xs"
                >
                  <span>View Summary Drill</span>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>

            <div className="mt-space-md pt-space-sm border-t border-surface-container-lowest/40 flex flex-wrap items-center justify-between gap-space-sm pl-space-xs text-xs font-mono">
              <div className="flex items-center gap-space-md text-on-surface-variant">
                <span>Historical Weight: <span className="text-on-surface">18% of total exam</span></span>
                <span>Math Engine: <span className="text-primary">Interactive formula tester</span></span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span>Current Confidence:</span>
                <div className="w-24 h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '68%' }}></div>
                </div>
                <span className="text-primary font-semibold">68%</span>
              </div>
            </div>
          </div>

          {/* Block 04 */}
          <div className="relative rounded-xl bg-surface-container p-space-lg shadow-md overflow-hidden group hover:bg-surface-container-high transition-all border border-outline-variant/15">
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-secondary-fixed-dim"></div>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pl-space-xs">
              <div className="flex items-start gap-space-md">
                <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center shrink-0 border border-outline-variant/20">
                  <span className="font-mono-telemetry-lg text-mono-telemetry-lg font-bold text-secondary font-mono">04</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Rapid Drill Quiz</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-container/15 text-primary text-xs font-mono font-semibold">
                      <span className="material-symbols-outlined text-xs">timer</span> 15 min
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container/30 text-secondary text-xs font-mono font-semibold">
                      <span className="material-symbols-outlined text-xs">verified</span> Consolidation & Recall
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1.5">
                    <span className="text-on-surface font-medium">Simulated Examination:</span> 10 high-probability questions directly harvested from Previous 5 Years Papers with timer pressure simulation.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between lg:justify-end gap-space-lg shrink-0 pt-space-xs lg:pt-0 border-t border-surface-container-high lg:border-t-0">
                <div className="flex flex-col items-start lg:items-end">
                  <span className="font-label-caps text-label-caps uppercase text-on-surface-variant font-mono text-[10px]">Synthesis Assessment</span>
                  <span className="font-headline-sm text-headline-sm font-bold text-secondary">10 PyQs</span>
                </div>
                <button
                  onClick={() => onNavigate('rapid-quiz')}
                  className="px-space-md py-2 rounded-lg bg-surface-container-lowest hover:bg-secondary hover:text-on-secondary text-on-surface transition-all font-body-sm font-semibold flex items-center gap-space-xs shadow-sm border border-outline-variant/15 text-xs"
                >
                  <span>Inspect Questions</span>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>

            <div className="mt-space-md pt-space-sm border-t border-surface-container-lowest/40 flex flex-wrap items-center justify-between gap-space-sm pl-space-xs text-xs font-mono">
              <div className="flex items-center gap-space-md text-on-surface-variant">
                <span>Target Speed: <span className="text-on-surface">90s / question</span></span>
                <span>Evaluation: <span className="text-secondary">Instant NPU scoring</span></span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span>Predicted Clearance:</span>
                <div className="w-24 h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                  <div className="bg-secondary-fixed-dim h-full rounded-full" style={{ width: '82%' }}></div>
                </div>
                <span className="text-secondary font-semibold">82%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Exam Telemetry & Knowledge Distribution */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
          <div className="lg:col-span-2 rounded-xl bg-surface-container p-space-lg shadow-md flex flex-col justify-between border border-outline-variant/15">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-xl">account_tree</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Paper Topic Weight & Mastery Map
                </span>
              </div>
              <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs">
                Model: Llama-3-8B Local
              </span>
            </div>

            <div className="my-space-md">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm">
                <div className="rounded-lg bg-surface-container-lowest p-space-sm flex flex-col gap-1 border border-outline-variant/10">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-on-surface-variant">Deadlocks</span>
                    <span className="text-tertiary">42%</span>
                  </div>
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div className="bg-tertiary-container h-full rounded-full" style={{ width: '42%' }}></div>
                  </div>
                  <span className="text-[10px] text-tertiary font-mono uppercase mt-1">Deficit: -18%</span>
                </div>

                <div className="rounded-lg bg-surface-container-lowest p-space-sm flex flex-col gap-1 border border-outline-variant/10">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-on-surface-variant">Scheduling</span>
                    <span className="text-tertiary">51%</span>
                  </div>
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div className="bg-tertiary h-full rounded-full" style={{ width: '51%' }}></div>
                  </div>
                  <span className="text-[10px] text-tertiary font-mono uppercase mt-1">Deficit: -9%</span>
                </div>

                <div className="rounded-lg bg-surface-container-lowest p-space-sm flex flex-col gap-1 border border-outline-variant/10">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-on-surface-variant">Memory Mgmt</span>
                    <span className="text-primary">68%</span>
                  </div>
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <span className="text-[10px] text-primary font-mono uppercase mt-1">Growth: +14%</span>
                </div>

                <div className="rounded-lg bg-surface-container-lowest p-space-sm flex flex-col gap-1 border border-outline-variant/10">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-on-surface-variant">File Systems</span>
                    <span className="text-secondary">88%</span>
                  </div>
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div className="bg-secondary-fixed-dim h-full rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  <span className="text-[10px] text-secondary font-mono uppercase mt-1">Optimized</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-space-sm border-t border-surface-container-high text-xs text-on-surface-variant font-mono">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Curriculum Delta: Synchronized with Mumbai University Syllabus
              </span>
              <span onClick={() => onNavigate('study-twin')} className="text-primary hover:underline cursor-pointer">
                Deep Vector Search →
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-surface-container p-space-lg shadow-md flex flex-col justify-between border border-outline-variant/15">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider font-mono text-[10px]">
                  ON-DEVICE NPU ENGINE
                </span>
                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono text-xs font-semibold">
                  Snapdragon 45 TOPS
                </span>
              </div>
              <div className="mt-space-md flex flex-col gap-space-sm font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant font-sans">Vector Retrieval:</span>
                  <span className="text-on-surface font-semibold">0.4ms (Instant)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant font-sans">Offline Cache Integrity:</span>
                  <span className="text-primary font-semibold">100% (Air-Gapped)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant font-sans">Thermal Profile:</span>
                  <span className="text-on-surface">33.8°C Nominal</span>
                </div>
              </div>
            </div>

            <div className="mt-space-md p-space-sm rounded-lg bg-surface-container-lowest flex items-center gap-space-sm border border-outline-variant/10">
              <span className="material-symbols-outlined text-xl text-tertiary">offline_bolt</span>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-on-surface">Zero Data Leaves This Laptop</span>
                <span className="text-[11px] text-on-surface-variant font-mono">Private weights loaded in VRAM</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Launch CTA Bar */}
        <section className="rounded-2xl bg-surface-container-lowest/90 backdrop-blur-2xl p-space-lg shadow-2xl flex flex-col md:flex-row items-center justify-between gap-space-md border border-outline-variant/20">
          <div className="flex items-center gap-space-sm">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </div>
            <div>
              <div className="font-headline-sm text-headline-sm font-bold text-on-surface leading-tight">
                Ready for Deployment
              </div>
              <div className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs">
                Estimated retention boost: <span className="text-primary font-semibold">+24%</span> • Local cache primed
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-space-md w-full md:w-auto">
            <button
              onClick={() => setSelectedDuration(prev => prev === '45m' ? '60m' : '45m')}
              className="flex-1 md:flex-none px-space-lg py-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors font-body-md font-semibold flex items-center justify-center gap-space-xs shadow-sm border border-outline-variant/20"
              type="button"
            >
              <span className="material-symbols-outlined text-lg text-on-surface-variant">tune</span>
              <span>Rebalance Time Budget</span>
            </button>
            <button
              onClick={() => onNavigate('rapid-quiz')}
              className="flex-1 md:flex-none px-space-xl py-3 rounded-lg bg-gradient-to-r from-primary to-primary-container hover:shadow-[0_0_24px_rgba(0,210,255,0.45)] text-surface-container-lowest font-headline-sm text-body-lg font-bold transition-all flex items-center justify-center gap-space-sm"
              type="button"
            >
              <span>Start Revision (Block 1: Deadlocks)</span>
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
