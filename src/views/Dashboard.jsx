import React, { useState, useEffect } from 'react';
import { fetchStudyTwin } from '../api/studyTwin';
import { fetchHardwarePerformance } from '../api/system';
import AddSubjectModal from '../components/AddSubjectModal';

export default function Dashboard({ onNavigate, selectedSubject = 'all', onSelectSubject }) {
  const [masteryPct, setMasteryPct] = useState(73);
  const [tokenRate, setTokenRate] = useState(38.4);
  const [telemetry, setTelemetry] = useState(null);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [subjects, setSubjects] = useState([
    { code: 'CS-301', name: 'Operating Systems', shortName: 'OS', icon: 'memory', color: 'primary', examDate: 'Exam in 2 days', credits: 4, mastery: 68, topicsCount: 6 },
    { code: 'CS-302', name: 'Computer Networks', shortName: 'Networks', icon: 'hub', color: 'secondary', examDate: 'Exam in 5 days', credits: 4, mastery: 79, topicsCount: 4 },
    { code: 'CS-303', name: 'Database Management Systems', shortName: 'DBMS', icon: 'database', color: 'tertiary', examDate: 'Exam in 8 days', credits: 3, mastery: 61, topicsCount: 3 },
    { code: 'CS-201', name: 'Data Structures & Algorithms', shortName: 'DSA', icon: 'account_tree', color: 'emerald', examDate: 'Exam in 12 days', credits: 4, mastery: 86, topicsCount: 2 },
    { code: 'CS-401', name: 'Artificial Intelligence & ML', shortName: 'AI & ML', icon: 'psychology', color: 'surface-tint', examDate: 'Exam in 15 days', credits: 3, mastery: 77, topicsCount: 2 },
  ]);

  const loadDashboardData = () => {
    fetchStudyTwin()
      .then(twin => {
        if (twin) {
          if (twin.overall_progress) setMasteryPct(twin.overall_progress);
          if (twin.subjects && twin.subjects.length > 0) setSubjects(twin.subjects);
        }
      })
      .catch(e => console.log('Baseline twin mastery:', e.message));

    fetchHardwarePerformance()
      .then(perf => {
        if (perf) {
          setTelemetry(perf);
          if (perf.inference_velocity) setTokenRate(perf.inference_velocity);
        }
      })
      .catch(e => console.log('Baseline hardware telemetry:', e.message));
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleSubjectCreated = (newSub) => {
    if (onSelectSubject) onSelectSubject(newSub.code);
    loadDashboardData();
  };


  // Determine active displayed subject details
  const activeSubjectData = subjects.find(s => s.code === selectedSubject) || subjects[0];

  return (
    <div className="flex flex-col w-full">
      <div className="p-space-md sm:p-space-xl lg:p-margin-lg flex flex-col gap-space-xl lg:gap-space-2xl max-w-7xl mx-auto w-full">
        {/* Top Bar: Greeting & Hardware Telemetry Matrix */}
        <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-sm">
              <span className="font-label-caps text-label-caps uppercase tracking-wider text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 font-mono">
                {telemetry?.processor?.split(' ')[0] || 'Hexagon v75'} Co-Processor
              </span>
              <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono">
                L1 Cache Synced
              </span>
            </div>
            <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface tracking-tight font-bold">
              Good evening, Kumaran k 👋
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant italic">
              “Let's make your next study session count.”
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="flex items-center gap-space-sm px-space-md py-space-sm rounded-xl bg-surface-container-low shadow-sm border border-outline-variant/15">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-container"></span>
              </span>
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-mono text-[10px]">
                  Local Inference Rate
                </span>
                <span className="font-mono-telemetry-lg text-mono-telemetry-lg text-primary font-semibold font-mono">
                  ⚡ {tokenRate} tokens/sec
                </span>
              </div>
            </div>

            <div className="flex items-center gap-space-sm px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface shadow-sm border border-outline-variant/20">
              <span className="material-symbols-outlined text-tertiary-container text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                alarm
              </span>
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps text-tertiary uppercase font-mono text-[10px]">
                  Target Milestone
                </span>
                <span className="font-body-md text-body-md font-semibold text-on-surface">
                  Exam in 2 days: Operating Systems
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Top Row - Signature Hero Card: MY STUDY TWIN */}
        <section className="rounded-xl bg-surface-container-lowest relative overflow-hidden shadow-xl p-space-lg sm:p-space-xl flex flex-col gap-space-xl border border-outline-variant/20">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm relative z-10">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shadow-sm border border-outline-variant/15">
                <span className="material-symbols-outlined text-2xl">neurology</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">MY STUDY TWIN</h2>
                  <span className="font-label-caps text-label-caps px-2 py-0.5 rounded-full bg-surface-container-high text-primary uppercase font-mono text-[10px]">
                    v3.4 Dynamic Embed
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Real-time neural twin modeling your cognitive retention on Snapdragon NPU
                </p>
              </div>
            </div>

            <div className="flex items-center gap-space-xs font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant px-3 py-1 rounded-full bg-surface-container border border-outline-variant/15 font-mono text-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span>Zero cloud vector sync • Fully on-device</span>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-xl items-center relative z-10">
            {/* Left Side: Circular SVG Mastery Ring */}
            <div className="xl:col-span-5 rounded-xl bg-surface-container/60 p-space-lg backdrop-blur-md flex flex-col sm:flex-row items-center gap-space-xl border border-outline-variant/15">
              <div className="relative w-44 h-44 flex-shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                  <circle
                    className="text-surface-container-highest"
                    cx="80"
                    cy="80"
                    fill="transparent"
                    r="66"
                    stroke="currentColor"
                    strokeWidth="12"
                  ></circle>
                  <circle
                    className="text-primary-container"
                    cx="80"
                    cy="80"
                    fill="transparent"
                    r="66"
                    stroke="currentColor"
                    strokeDasharray="414.69"
                    strokeDashoffset="107.82"
                    strokeLinecap="round"
                    strokeWidth="12"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-display-hero text-headline-lg font-bold text-on-surface tracking-tighter">
                    {masteryPct}%
                  </span>
                  <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase font-mono">
                    Mastery
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-space-sm w-full">
                <div>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Overall Concept Mastery
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Computed over 38 syllabus domains</p>
                </div>
                <div className="flex flex-col gap-1.5 mt-space-xs">
                  <div className="flex items-center justify-between font-body-sm text-body-sm">
                    <span className="flex items-center gap-1.5 text-on-surface">
                      <span className="w-2 h-2 rounded-full bg-primary-container"></span> Strong
                    </span>
                    <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-primary font-semibold font-mono">
                      18 topics
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary-container h-full rounded-full" style={{ width: '47%' }}></div>
                  </div>

                  <div className="flex items-center justify-between font-body-sm text-body-sm mt-1">
                    <span className="flex items-center gap-1.5 text-on-surface">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span> Developing
                    </span>
                    <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-secondary font-semibold font-mono">
                      14 topics
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full rounded-full" style={{ width: '37%' }}></div>
                  </div>

                  <div className="flex items-center justify-between font-body-sm text-body-sm mt-1">
                    <span className="flex items-center gap-1.5 text-on-surface">
                      <span className="w-2 h-2 rounded-full bg-tertiary-container"></span> Needs Attention
                    </span>
                    <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-tertiary font-semibold font-mono">
                      6 topics
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                    <div className="bg-tertiary-container h-full rounded-full" style={{ width: '16%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Vital Knowledge Statistics Grid */}
            <div className="xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div 
                onClick={() => onNavigate('my-materials')}
                className="rounded-xl bg-surface-container-low p-space-md hover:bg-surface-container transition-all group shadow-sm flex flex-col justify-between h-36 border border-outline-variant/15 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-primary text-2xl group-hover:scale-110 transition-transform">
                    article
                  </span>
                  <span className="font-label-caps text-label-caps px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase font-mono text-[10px]">
                    Vault Storage
                  </span>
                </div>
                <div>
                  <div className="font-headline-md text-headline-md text-on-surface tracking-tight font-bold">24 Documents</div>
                  <div className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs">
                    942 pages indexed locally
                  </div>
                </div>
              </div>

              <div 
                onClick={() => onNavigate('study-twin')}
                className="rounded-xl bg-surface-container-low p-space-md hover:bg-surface-container transition-all group shadow-sm flex flex-col justify-between h-36 border border-outline-variant/15 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-secondary text-2xl group-hover:scale-110 transition-transform">
                    hub
                  </span>
                  <span className="font-label-caps text-label-caps px-2 py-0.5 rounded-full bg-secondary/10 text-secondary uppercase font-mono text-[10px]">
                    Vector Graph
                  </span>
                </div>
                <div>
                  <div className="font-headline-md text-headline-md text-on-surface tracking-tight font-bold">127 Concepts</div>
                  <div className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs">
                    Extracted into vector graph
                  </div>
                </div>
              </div>

              <div 
                onClick={() => onNavigate('progress')}
                className="rounded-xl bg-surface-container-low p-space-md hover:bg-surface-container transition-all group shadow-sm flex flex-col justify-between h-36 border border-outline-variant/15 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-tertiary text-2xl group-hover:scale-110 transition-transform">
                    schema
                  </span>
                  <span className="font-label-caps text-label-caps px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary uppercase font-mono text-[10px]">
                    Curriculum
                  </span>
                </div>
                <div>
                  <div className="font-headline-md text-headline-md text-on-surface tracking-tight font-bold">38 Topics</div>
                  <div className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs">
                    Mapped to syllabus
                  </div>
                </div>
              </div>

              <div 
                onClick={() => onNavigate('rapid-quiz')}
                className="rounded-xl bg-surface-container-low p-space-md hover:bg-surface-container transition-all group shadow-sm flex flex-col justify-between h-36 border border-outline-variant/15 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-primary-container text-2xl group-hover:scale-110 transition-transform">
                    checklist
                  </span>
                  <span className="font-label-caps text-label-caps px-2 py-0.5 rounded-full bg-primary-container/10 text-primary uppercase font-mono text-[10px]">
                    Performance
                  </span>
                </div>
                <div>
                  <div className="font-headline-md text-headline-md text-on-surface tracking-tight font-bold">146 Questions</div>
                  <div className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs">
                    Practiced with 82% accuracy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multi-Subject Curriculum Track - All 5 Subjects */}
        <section className="flex flex-col gap-space-md">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-xl">school</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Curriculum Subjects ({subjects.length})
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs hidden sm:inline">
                Click any subject to filter console
              </span>
              <button
                onClick={() => onSelectSubject && onSelectSubject('all')}
                type="button"
                className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                  selectedSubject === 'all'
                    ? 'bg-primary/20 text-primary border-primary/40 font-semibold'
                    : 'bg-surface-container-low text-on-surface-variant border-outline-variant/20 hover:text-on-surface'
                }`}
              >
                All Subjects
              </button>
              <button
                onClick={() => setIsAddSubjectOpen(true)}
                type="button"
                className="text-xs px-2.5 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 font-semibold transition-all flex items-center gap-1 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Add Subject</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-space-md">
            {subjects.map((sub) => {
              const isSelected = selectedSubject === sub.code;
              return (
                <div
                  key={sub.code}
                  onClick={() => {
                    if (onSelectSubject) onSelectSubject(isSelected ? 'all' : sub.code);
                  }}
                  className={`rounded-xl p-space-md transition-all cursor-pointer flex flex-col justify-between h-40 border relative group ${
                    isSelected
                      ? 'bg-surface-container-high border-primary/60 shadow-[0_0_20px_rgba(0,210,255,0.15)] ring-1 ring-primary/40'
                      : 'bg-surface-container-lowest hover:bg-surface-container-low border-outline-variant/20 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-lg">{sub.icon || 'menu_book'}</span>
                      </div>
                      <div>
                        <div className="font-mono-telemetry-sm text-[11px] text-on-surface-variant font-mono">
                          {sub.code}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono-telemetry-sm text-xs px-2 py-0.5 rounded-full bg-surface-container text-primary font-mono font-semibold">
                      {sub.mastery}%
                    </span>
                  </div>

                  <div>
                    <h4 className="font-body-md font-bold text-on-surface group-hover:text-primary transition-colors leading-tight line-clamp-1">
                      {sub.name}
                    </h4>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                      {sub.topicsCount || 5} topics • {sub.credits} Credits
                    </p>
                  </div>

                  {/* Progress Bar & Exam Badge */}
                  <div className="flex flex-col gap-1.5 pt-1">
                    <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                      <div
                        className="bg-primary-container h-full rounded-full transition-all duration-500"
                        style={{ width: `${sub.mastery}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-tertiary font-mono">
                      <span>{sub.examDate}</span>
                      <span className="text-on-surface-variant group-hover:text-primary transition-colors">
                        Select →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Add Subject Card */}
            <div
              onClick={() => setIsAddSubjectOpen(true)}
              className="rounded-xl p-space-md transition-all cursor-pointer flex flex-col justify-center items-center h-40 border border-dashed border-outline-variant/30 hover:border-primary/60 bg-surface-container-lowest hover:bg-surface-container-low group text-center gap-2 shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 flex items-center justify-center transition-all group-hover:scale-110">
                <span className="material-symbols-outlined text-xl">add</span>
              </div>
              <div>
                <span className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors block">
                  Add Subject
                </span>
                <span className="text-[10px] text-on-surface-variant font-mono block mt-0.5">
                  New Syllabus & Graph
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Middle Section: Continue Learning Priority Card */}
        <section className="flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-xl">play_circle</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Continue Learning</h3>
            </div>
            <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs">
              Active Focus: {activeSubjectData.name} ({activeSubjectData.code})
            </span>
          </div>

          <div className="rounded-xl bg-surface-container-lowest p-space-lg sm:p-space-xl shadow-xl flex flex-col lg:flex-row justify-between gap-space-xl relative overflow-hidden border border-outline-variant/20">
            <div className="flex flex-col justify-between gap-space-lg flex-1">
              <div>
                <div className="flex flex-wrap items-center gap-space-sm mb-space-xs">
                  <span className="font-label-caps text-label-caps px-2.5 py-1 rounded bg-surface-container-high text-primary uppercase font-mono text-[10px]">
                    {activeSubjectData.code} Track
                  </span>
                  <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs">
                    {activeSubjectData.examDate} • {activeSubjectData.credits} Credit Hours
                  </span>
                </div>
                <h4 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface font-bold">
                  {activeSubjectData.name} ({activeSubjectData.code})
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  {activeSubjectData.code === 'CS-301' && "Concurrency, Deadlock Prevention, Paging, and Distributed Scheduling Algorithms"}
                  {activeSubjectData.code === 'CS-302' && "OSI Layering, TCP 3-Way Handshake, CIDR Subnetting, and BGP/OSPF Routing"}
                  {activeSubjectData.code === 'CS-303' && "Relational Algebra, BCNF Normalization, ACID Transactions, and B+ Tree Indexing"}
                  {activeSubjectData.code === 'CS-201' && "Graph Algorithms, Dijkstra Min-Heap, AVL Self-Balancing Trees, and Dynamic Programming"}
                  {activeSubjectData.code === 'CS-401' && "Transformers, Scaled Dot-Product Attention, Backpropagation Calculus, and NPU Kernels"}
                </p>
              </div>

              {/* Course Progress Bar */}
              <div className="flex flex-col gap-space-xs max-w-xl">
                <div className="flex justify-between items-center">
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">
                    {activeSubjectData.name} Mastery
                  </span>
                  <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-primary font-semibold font-mono">
                    {activeSubjectData.mastery}%
                  </span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary via-primary-container to-secondary h-full rounded-full"
                    style={{ width: `${activeSubjectData.mastery}%` }}
                  ></div>
                </div>
              </div>

              {/* Subject-Specific Weak Topic Alert Box */}
              <div className="rounded-xl bg-surface-container p-space-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md shadow-sm border border-tertiary-container/30">
                <div className="flex items-start gap-space-md">
                  <div className="w-10 h-10 rounded-lg bg-tertiary-container/20 text-tertiary-container flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-2xl">warning</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-sm flex-wrap">
                      <span className="font-headline-sm text-body-md font-semibold text-on-surface">
                        {activeSubjectData.code === 'CS-301' && "Current weak topic: Deadlocks & Banker's Algorithm"}
                        {activeSubjectData.code === 'CS-302' && "Current weak topic: Subnet Masking (CIDR Prefix)"}
                        {activeSubjectData.code === 'CS-303' && "Current weak topic: BCNF Decomposition & Superkeys"}
                        {activeSubjectData.code === 'CS-201' && "Current weak topic: AVL Tree Rotations"}
                        {activeSubjectData.code === 'CS-401' && "Current weak topic: Scaled Dot-Product Attention"}
                      </span>
                      <span className="font-label-caps text-label-caps px-2 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary font-bold uppercase font-mono text-[10px]">
                        {activeSubjectData.code === 'CS-301' && "Confidence: 42%"}
                        {activeSubjectData.code === 'CS-302' && "Confidence: 58%"}
                        {activeSubjectData.code === 'CS-303' && "Confidence: 42%"}
                        {activeSubjectData.code === 'CS-201' && "Confidence: 62%"}
                        {activeSubjectData.code === 'CS-401' && "Confidence: 68%"}
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      {activeSubjectData.code === 'CS-301' && "Last reviewed: 2 days ago • High exam weight in Unit 3 Notes"}
                      {activeSubjectData.code === 'CS-302' && "Last reviewed: Yesterday • Prefix length and broadcast address calculations"}
                      {activeSubjectData.code === 'CS-303' && "Last reviewed: 3 days ago • Lossless join and dependency preservation checks"}
                      {activeSubjectData.code === 'CS-201' && "Last reviewed: 4 days ago • Left-Right & Right-Left double rebalance cases"}
                      {activeSubjectData.code === 'CS-401' && "Last reviewed: 1 day ago • Q, K, V dimension matching and softmax scaling"}
                    </span>
                  </div>
                </div>
                <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-tertiary bg-surface-container-high px-2.5 py-1 rounded font-mono text-xs shrink-0">
                  Priority High
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                <button
                  onClick={() => onNavigate('ai-tutor')}
                  className="px-space-xl py-space-sm rounded-lg bg-primary-container text-on-primary-container font-headline-sm text-body-md font-semibold hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all flex items-center gap-space-sm"
                  type="button"
                >
                  <span>Revise with AI Tutor</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
                <button
                  onClick={() => onNavigate('rapid-quiz')}
                  className="px-space-lg py-space-sm rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-body-md text-body-md transition-colors flex items-center gap-space-sm border border-outline-variant/20"
                  type="button"
                >
                  <span className="material-symbols-outlined text-lg text-tertiary">bolt</span>
                  <span>Practice Subject Drill</span>
                </button>
              </div>
            </div>

            {/* Course Visual / Diagnostic Card */}
            <div className="lg:w-80 flex flex-col justify-between rounded-xl bg-surface-container-low p-space-lg shadow-sm border border-outline-variant/15">
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-mono text-[10px]">
                  Substrate State
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Local NPU Model</span>
                  <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-primary font-mono text-xs">
                    INT4 Quant
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                  Llama-3-8B fine-tuned with your lecture recordings and professor slides.
                </p>
              </div>

              <div className="py-space-md flex flex-col gap-space-xs">
                <div className="flex justify-between font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs">
                  <span>Memory Bandwidth</span>
                  <span className="text-on-surface">118 GB/s</span>
                </div>
                <div className="flex justify-between font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs">
                  <span>Local Context Window</span>
                  <span className="text-on-surface">32,768 tokens</span>
                </div>
                <div className="flex justify-between font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs">
                  <span>Battery Impact</span>
                  <span className="text-primary font-semibold">&lt; 1.2W</span>
                </div>
              </div>

              <div className="pt-space-sm">
                <div className="w-full py-2 px-3 rounded bg-surface-container flex items-center justify-between text-on-surface-variant font-mono-telemetry-sm text-mono-telemetry-sm font-mono text-xs border border-outline-variant/15">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    NPU Engine Ready
                  </span>
                  <span className="text-primary font-semibold">0% Cloud</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Section: Recommended For You */}
        <section className="flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Recommended For You</h3>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Curated by your On-Device Neural Profile
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {/* Card 1: Revise Deadlocks */}
            <div className="rounded-xl bg-surface-container-lowest p-space-lg flex flex-col justify-between hover:bg-surface-container-low transition-all shadow-md group border border-outline-variant/20">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-label-caps px-2.5 py-1 rounded bg-tertiary-container/15 text-tertiary uppercase font-bold font-mono text-[10px]">
                    High Impact
                  </span>
                  <span className="material-symbols-outlined text-tertiary text-xl">emergency_home</span>
                </div>
                <div className="flex flex-col gap-1 mt-space-xs">
                  <h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-semibold">
                    Revise Deadlocks
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Review 4 condition graphs & Banker's algorithm from Unit 3 Notes (12 min read)
                  </p>
                </div>
              </div>
              <div className="pt-space-lg mt-space-md flex flex-col gap-space-sm">
                <div className="flex items-center justify-between text-on-surface-variant font-mono-telemetry-sm text-mono-telemetry-sm font-mono text-xs">
                  <span>Time: ~12 mins</span>
                  <span>Weight: 14 Marks</span>
                </div>
                <button
                  onClick={() => onNavigate('ai-tutor')}
                  className="w-full py-2.5 rounded-lg bg-surface-container-high text-on-surface font-body-md text-body-md font-semibold hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center gap-space-sm"
                  type="button"
                >
                  <span>Start Revision</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Card 2: CIDR Subnetting */}
            <div className="rounded-xl bg-surface-container-lowest p-space-lg flex flex-col justify-between hover:bg-surface-container-low transition-all shadow-md group border border-outline-variant/20">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-label-caps px-2.5 py-1 rounded bg-secondary/15 text-secondary uppercase font-bold font-mono text-[10px]">
                    CS-302 Networks
                  </span>
                  <span className="material-symbols-outlined text-secondary text-xl">hub</span>
                </div>
                <div className="flex flex-col gap-1 mt-space-xs">
                  <h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-semibold">
                    CIDR Subnetting Drill
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Prefix lengths, broadcast address calculations & subnet masks with step-by-step checks
                  </p>
                </div>
              </div>
              <div className="pt-space-lg mt-space-md flex flex-col gap-space-sm">
                <div className="flex items-center justify-between text-on-surface-variant font-mono-telemetry-sm text-mono-telemetry-sm font-mono text-xs">
                  <span>8 Subnet Problems</span>
                  <span>IP Allocation</span>
                </div>
                <button
                  onClick={() => {
                    if (onSelectSubject) onSelectSubject('CS-302');
                    onNavigate('ai-tutor');
                  }}
                  className="w-full py-2.5 rounded-lg bg-surface-container-high text-on-surface font-body-md text-body-md font-semibold hover:bg-secondary hover:text-on-secondary transition-all flex items-center justify-center gap-space-sm"
                  type="button"
                >
                  <span>Practice Subnetting</span>
                  <span className="material-symbols-outlined text-sm">edit_note</span>
                </button>
              </div>
            </div>

            {/* Card 3: BCNF Normalization Drill */}
            <div className="rounded-xl bg-surface-container-lowest p-space-lg flex flex-col justify-between hover:bg-surface-container-low transition-all shadow-md group border border-outline-variant/20">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-label-caps px-2.5 py-1 rounded bg-primary-container/15 text-primary uppercase font-bold font-mono text-[10px]">
                    CS-303 DBMS
                  </span>
                  <span className="material-symbols-outlined text-primary text-xl">database</span>
                </div>
                <div className="flex flex-col gap-1 mt-space-xs">
                  <h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-semibold">
                    BCNF Decomposition Drill
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Lossless join decomposition & functional dependency closure drills targeting your 42% gap
                  </p>
                </div>
              </div>
              <div className="pt-space-lg mt-space-md flex flex-col gap-space-sm">
                <div className="flex items-center justify-between text-on-surface-variant font-mono-telemetry-sm text-mono-telemetry-sm font-mono text-xs">
                  <span>High Exam Weight</span>
                  <span>10 Marks</span>
                </div>
                <button
                  onClick={() => {
                    if (onSelectSubject) onSelectSubject('CS-303');
                    onNavigate('rapid-quiz');
                  }}
                  className="w-full py-2.5 rounded-lg bg-primary-container text-on-primary-container font-body-md text-body-md font-semibold hover:shadow-[0_0_16px_rgba(0,210,255,0.4)] transition-all flex items-center justify-center gap-space-sm"
                  type="button"
                >
                  <span>Launch DBMS Quiz</span>
                  <span className="material-symbols-outlined text-sm">bolt</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Add Subject Modal */}
      <AddSubjectModal
        isOpen={isAddSubjectOpen}
        onClose={() => setIsAddSubjectOpen(false)}
        onSubjectCreated={handleSubjectCreated}
      />
    </div>
  );
}

