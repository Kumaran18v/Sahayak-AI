import React, { useState, useEffect } from 'react';
import { fetchStudyTwin } from '../api/studyTwin';
import AddSubjectModal from '../components/AddSubjectModal';

export default function StudyTwin({ onNavigate, selectedSubject = 'all', onSelectSubject }) {
  const [selectedNode, setSelectedNode] = useState('deadlocks');
  const [filterType, setFilterType] = useState('all');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [overallProgress, setOverallProgress] = useState(74);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);

  const DEFAULT_SUBJECTS = [
    { code: 'all', name: 'All Subjects (Unified)' },
    { code: 'CS-301', name: 'Operating Systems (CS-301)' },
    { code: 'CS-302', name: 'Computer Networks (CS-302)' },
    { code: 'CS-303', name: 'Database Systems (CS-303)' },
    { code: 'CS-201', name: 'Data Structures (CS-201)' },
    { code: 'CS-401', name: 'Artificial Intelligence (CS-401)' },
  ];

  const [subjectsList, setSubjectsList] = useState(DEFAULT_SUBJECTS);

  const [nodes, setNodes] = useState([
    {
      id: 'processes',
      name: 'Processes',
      mastery: '92%',
      solved: '48 Solved',
      subtext: 'PCB • IPC • Forks',
      status: 'strong',
      color: 'emerald',
      icon: 'account_tree',
    },
    {
      id: 'threads',
      name: 'Threads',
      mastery: '88%',
      solved: '32 Solved',
      subtext: 'POSIX • Mutex • Race',
      status: 'strong',
      color: 'emerald',
      icon: 'alt_route',
    },
    {
      id: 'paging',
      name: 'Memory Paging',
      mastery: '68%',
      solved: '21 Solved',
      subtext: 'TLB • Virtual Address',
      status: 'developing',
      color: 'primary',
      icon: 'grid_view',
    },
    {
      id: 'scheduling',
      name: 'CPU Scheduling',
      mastery: '70%',
      solved: '▲ +18% wk',
      subtext: 'Round Robin • CFS',
      status: 'developing',
      color: 'primary',
      icon: 'reorder',
    },
    {
      id: 'deadlocks',
      name: 'Deadlocks',
      mastery: '42%',
      solved: 'Critical Gap',
      subtext: '4 Conditions • Banker\'s',
      status: 'needs-attention',
      color: 'tertiary',
      icon: 'lock_clock',
    },
    {
      id: 'filesystems',
      name: 'File Systems',
      mastery: '51%',
      solved: '14 Solved',
      subtext: 'Inodes • Indexed Alloc',
      status: 'needs-attention',
      color: 'tertiary',
      icon: 'folder_supervised',
    },
  ]);

  const [concepts, setConcepts] = useState([
    { name: "Banker's Algorithm", proficiency: '38%', color: 'bg-tertiary-container', status: 'Priority Revision', tag: 'Safe State Vectors', type: 'needs-attention' },
    { name: 'TLB Translation', proficiency: '64%', color: 'bg-primary', status: 'Steady', tag: 'Hit Ratio Calculations', type: 'developing' },
    { name: 'Process Synchronization', proficiency: '91%', color: 'bg-emerald-400', status: 'Mastered', tag: 'Semaphores & Monitors', type: 'strong' },
    { name: 'Deadlock Prevention', proficiency: '45%', color: 'bg-tertiary-container', status: 'Needs Review', tag: 'Havender\'s Strategies', type: 'needs-attention' },
    { name: 'Multilevel Feedback Queues', proficiency: '76%', color: 'bg-primary', status: 'Consolidating', tag: 'Starvation & Aging', type: 'developing' },
    { name: 'Fork() & Exec() Flow', proficiency: '94%', color: 'bg-emerald-400', status: 'Mastered', tag: 'Copy-on-write', type: 'strong' },
  ]);

  // Orbital constellation algorithm to prevent node overlap
  const getNodeCoordinates = (index, total) => {
    if (total === 1) return { left: 50, top: 22 };
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    
    let radiusX, radiusY;
    if (total <= 5) {
      radiusX = 35;
      radiusY = 31;
    } else if (total <= 8) {
      const isOuter = index % 2 === 0;
      radiusX = isOuter ? 38 : 27;
      radiusY = isOuter ? 34 : 24;
    } else {
      const ring = index % 3;
      if (ring === 0) {
        radiusX = 40;
        radiusY = 35;
      } else if (ring === 1) {
        radiusX = 30;
        radiusY = 26;
      } else {
        radiusX = 21;
        radiusY = 18;
      }
    }
    
    const left = Math.min(88, Math.max(12, 50 + radiusX * Math.cos(angle)));
    const top = Math.min(86, Math.max(14, 50 + radiusY * Math.sin(angle)));
    return { left: Math.round(left * 10) / 10, top: Math.round(top * 10) / 10 };
  };

  const loadTwinData = () => {
    fetchStudyTwin(selectedSubject)
      .then(data => {
        if (data) {
          if (data.subjects && data.subjects.length > 0) {
            const formatted = [
              { code: 'all', name: 'All Subjects (Unified)' },
              ...data.subjects.map(s => ({ code: s.code, name: `${s.name} (${s.code})` }))
            ];
            setSubjectsList(formatted);
          }
          if (data.topics && data.topics.length > 0) {
            setNodes(data.topics);
            if (!data.topics.some(t => t.id === selectedNode)) {
              setSelectedNode(data.topics[0].id);
            }
          }
          if (data.concepts && data.concepts.length > 0) setConcepts(data.concepts);
          if (data.overall_progress) setOverallProgress(data.overall_progress);
        }
      })
      .catch(e => console.log('Using baseline Study Twin model:', e.message));
  };

  useEffect(() => {
    loadTwinData();
  }, [selectedSubject]);

  const handleSubjectCreated = (newSub) => {
    if (onSelectSubject) {
      onSelectSubject(newSub.code);
    }
    loadTwinData();
  };

  const filteredConcepts = concepts.filter(c => filterType === 'all' || c.type === filterType);

  return (
    <div className="flex flex-col w-full">
      <div className="p-space-md sm:p-space-xl lg:p-margin-lg flex flex-col gap-space-xl max-w-7xl mx-auto w-full">
        {/* Top Bar Header */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-sm border-b border-outline-variant/15">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-label-caps uppercase tracking-wider text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 font-mono text-[10px]">
                SNAPDRAGON NPU GRAPH V3.4
              </span>
              <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs">
                Cognitive State Synced
              </span>
            </div>
            <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface font-bold">
              Study Twin // Knowledge Graph
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Dynamic high-dimensional vector map representing your memory retention and exam readiness.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddSubjectOpen(true)}
              type="button"
              className="px-space-md py-2.5 rounded-lg bg-surface-container-high text-primary border border-primary/30 hover:border-primary font-headline-sm text-sm font-semibold flex items-center gap-2 hover:bg-surface-container-highest transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-lg">add_circle</span>
              <span>Add Subject</span>
            </button>
            <button
              onClick={() => onNavigate('rapid-quiz')}
              className="px-space-md py-2.5 rounded-lg bg-primary-container text-on-primary-container font-headline-sm text-sm font-semibold flex items-center gap-2 hover:shadow-[0_0_16px_rgba(0,210,255,0.4)] transition-all"
            >
              <span className="material-symbols-outlined text-lg">bolt</span>
              <span>Consolidate Memory (Quiz)</span>
            </button>
          </div>
        </section>

        {/* Subject Filter Bar with Add Subject button */}
        <section className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-on-surface-variant font-mono uppercase tracking-wider shrink-0 mr-1">
            Subject View:
          </span>
          {subjectsList.map((sub) => (
            <button
              key={sub.code}
              onClick={() => {
                if (onSelectSubject) onSelectSubject(sub.code);
              }}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 border ${
                selectedSubject === sub.code
                  ? 'bg-primary text-on-primary border-primary shadow-sm font-semibold'
                  : 'bg-surface-container text-on-surface-variant border-outline-variant/15 hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {sub.name}
            </button>
          ))}
          <button
            onClick={() => setIsAddSubjectOpen(true)}
            type="button"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-primary bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-all shrink-0 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>Add Subject</span>
          </button>
        </section>

        {/* Main Grid: 8 Cols Knowledge Graph + 4 Cols Dossier */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-xl">
          {/* Left 8 Cols: Interactive Vector Stage & Concept Matrix */}
          <section className="xl:col-span-8 flex flex-col gap-space-xl">
            {/* Interactive Vector Stage */}
            <div className="relative w-full h-[640px] bg-surface-container-lowest rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center border border-outline-variant/20">
              {/* Ambient NPU Grid & Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(#1d2026_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none"></div>
              <div className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -top-12 -left-12"></div>
              <div className="absolute w-[500px] h-[500px] bg-secondary-container/20 rounded-full blur-[100px] pointer-events-none bottom-0 right-0"></div>

              {/* Synapse Connecting Lines (Inline SVG) */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-300" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: '50% 50%' }}
              >
                {/* Synaptic paths dynamically connecting Center (50%, 50%) to each topic node */}
                {nodes.map((node, index) => {
                  const coords = getNodeCoordinates(index, nodes.length);
                  const isSelected = selectedNode === node.id;
                  const strokeColor = node.color === 'emerald' ? '#34d399' : node.color === 'tertiary' ? '#ffb148' : '#00d2ff';
                  return (
                    <g key={`synapse-${node.id || index}`}>
                      <line
                        x1="50%"
                        y1="50%"
                        x2={`${coords.left}%`}
                        y2={`${coords.top}%`}
                        stroke={strokeColor}
                        strokeWidth={isSelected ? '2.5' : '1.5'}
                        strokeOpacity={isSelected ? 0.9 : 0.35}
                        strokeDasharray={node.status === 'needs-attention' ? '4,4' : isSelected ? 'none' : '6,4'}
                      />
                      <circle
                        cx={`${coords.left}%`}
                        cy={`${coords.top}%`}
                        r={isSelected ? 4 : 2}
                        fill={strokeColor}
                        opacity={isSelected ? 1 : 0.6}
                      />
                    </g>
                  );
                })}

                {/* Cross-concept associations between neighboring nodes */}
                {nodes.length > 1 && nodes.slice(0, Math.min(nodes.length, 8)).map((node, idx) => {
                  const nextIdx = (idx + 1) % nodes.length;
                  const c1 = getNodeCoordinates(idx, nodes.length);
                  const c2 = getNodeCoordinates(nextIdx, nodes.length);
                  return (
                    <line
                      key={`arc-${idx}`}
                      x1={`${c1.left}%`}
                      y1={`${c1.top}%`}
                      x2={`${c2.left}%`}
                      y2={`${c2.top}%`}
                      stroke="#47d6ff"
                      strokeOpacity="0.12"
                      strokeWidth="1"
                      strokeDasharray="2,4"
                    />
                  );
                })}
              </svg>

              {/* ROOT HUB: Dynamic Subject Hub (centered at exactly 50%, 50%) */}
              <div 
                className="absolute z-20 flex flex-col items-center justify-center cursor-pointer group left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ transform: `translate(-50%, -50%) scale(${zoomLevel})` }}
              >
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-36 h-36 rounded-full bg-primary-container/20 animate-ping opacity-30"></span>
                  <span className="absolute w-28 h-28 rounded-full bg-primary/20 blur-md"></span>
                  <div className="relative w-24 h-24 rounded-full bg-surface-container-high flex flex-col items-center justify-center text-center p-2 shadow-2xl transition-transform transform group-hover:scale-105 border border-primary/40">
                    <span className="material-symbols-outlined text-primary text-2xl">
                      {selectedSubject === 'CS-302' ? 'hub' : selectedSubject === 'CS-303' ? 'database' : selectedSubject === 'CS-201' ? 'account_tree' : selectedSubject === 'CS-401' ? 'psychology' : selectedSubject === 'all' ? 'schema' : 'menu_book'}
                    </span>
                    <span className="font-headline-sm text-body-sm font-bold text-on-surface leading-tight mt-1">
                      {selectedSubject === 'all' ? 'CORE' : selectedSubject}
                    </span>
                    <span className="font-label-caps text-label-caps text-primary tracking-tighter font-mono text-[9px]">CORE HUB</span>
                  </div>
                </div>
                <div className="mt-2 px-space-sm py-0.5 rounded-full bg-surface-container-highest shadow-sm border border-outline-variant/20">
                  <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface font-semibold font-mono text-xs">
                    {selectedSubject === 'all' ? 'All Curriculum Subjects' : subjectsList.find(s => s.code === selectedSubject)?.name || selectedSubject}
                  </span>
                </div>
              </div>

              {/* Dynamic Orbital Rendered Nodes (Never overlapping) */}
              {nodes.map((node, index) => {
                const isSelected = selectedNode === node.id;
                const coords = getNodeCoordinates(index, nodes.length);
                return (
                  <div
                    key={node.id || index}
                    onClick={() => setSelectedNode(node.id)}
                    className="absolute z-10 flex flex-col items-center group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-30"
                    style={{
                      left: `${coords.left}%`,
                      top: `${coords.top}%`,
                      transform: `translate(-50%, -50%) scale(${zoomLevel})`,
                    }}
                  >
                    <div className={`relative p-1 rounded-xl bg-surface-container/95 backdrop-blur-md hover:bg-surface-container-high transition-all w-44 sm:w-48 border shadow-lg ${
                      isSelected
                        ? 'border-primary shadow-[0_0_32px_rgba(0,210,255,0.5)] ring-2 ring-primary/60 scale-[1.03]'
                        : node.color === 'emerald'
                        ? 'border-emerald-500/35 shadow-[0_0_20px_rgba(52,211,153,0.2)]'
                        : node.color === 'tertiary'
                        ? 'border-tertiary-container/45 shadow-[0_0_22px_rgba(255,177,72,0.3)]'
                        : 'border-primary/35 shadow-[0_0_20px_rgba(0,210,255,0.2)]'
                    }`}>
                      <div className="flex items-center justify-between px-2 pt-1">
                        <span className={`px-1.5 py-0.5 rounded font-label-caps font-bold font-mono text-[9px] ${
                          node.color === 'emerald'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : node.color === 'tertiary'
                            ? 'bg-tertiary-container/30 text-tertiary'
                            : 'bg-primary/20 text-primary'
                        }`}>
                          {node.mastery}
                        </span>
                        <span className="font-mono text-on-surface-variant font-mono text-[9px]">
                          {node.solved}
                        </span>
                      </div>
                      <div className="p-2 flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          node.color === 'emerald'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : node.color === 'tertiary'
                            ? 'bg-tertiary-container/25 text-tertiary'
                            : 'bg-primary/15 text-primary'
                        }`}>
                          <span className="material-symbols-outlined text-base">{node.icon || 'menu_book'}</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs text-on-surface font-semibold truncate leading-tight">
                            {node.name}
                          </span>
                          <span className="text-[9px] text-on-surface-variant truncate font-mono">
                            {node.subtext}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Embedded Graph Controls Footer */}
              <div className="absolute bottom-space-md left-space-lg flex items-center gap-space-sm z-30 flex-wrap">
                <span className="font-mono-telemetry-sm text-mono-telemetry-sm px-2.5 py-1 rounded-full bg-surface-container-high/80 text-on-surface-variant font-mono text-xs border border-outline-variant/15">
                  Graph Dimensions: {nodes.length} Nodes / {nodes.length * 2} Synapses
                </span>
                <span className="font-mono-telemetry-sm text-mono-telemetry-sm px-2.5 py-1 rounded-full bg-surface-container-high/80 text-primary font-mono text-xs border border-primary/20">
                  NPU Latency: 0.8ms
                </span>
              </div>

              <div className="absolute bottom-space-md right-space-lg flex items-center gap-1 z-30 bg-surface-container-high/80 backdrop-blur p-1 rounded-lg border border-outline-variant/20">
                <button
                  onClick={() => setZoomLevel(prev => Math.min(prev + 0.1, 1.4))}
                  className="w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-variant"
                  type="button"
                  title="Zoom in"
                >
                  <span className="material-symbols-outlined text-sm">zoom_in</span>
                </button>
                <button
                  onClick={() => setZoomLevel(prev => Math.max(prev - 0.1, 0.7))}
                  className="w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-variant"
                  type="button"
                  title="Zoom out"
                >
                  <span className="material-symbols-outlined text-sm">zoom_out</span>
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-variant"
                  type="button"
                  title="Reset view"
                >
                  <span className="material-symbols-outlined text-sm">filter_center_focus</span>
                </button>
              </div>
            </div>

            {/* Concept Breakdown Filter Bar */}
            <div className="bg-surface-container p-space-lg rounded-xl flex flex-col gap-space-md border border-outline-variant/15">
              <div className="flex flex-wrap items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-sm">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Concept Vector Matrix</span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-mono-telemetry-sm text-mono-telemetry-sm font-mono text-xs">
                    Filtered by Exam Priority
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg border border-outline-variant/10 text-xs">
                  <button
                    onClick={() => setFilterType('all')}
                    className={`px-3 py-1 rounded font-body-sm ${filterType === 'all' ? 'bg-surface-container-high text-on-surface font-semibold' : 'text-on-surface-variant hover:text-on-surface'}`}
                  >
                    All ({concepts.length})
                  </button>
                  <button
                    onClick={() => setFilterType('strong')}
                    className={`px-3 py-1 rounded font-body-sm ${filterType === 'strong' ? 'bg-surface-container-high text-emerald-400 font-semibold' : 'text-on-surface-variant hover:text-on-surface'}`}
                  >
                    Strong (2)
                  </button>
                  <button
                    onClick={() => setFilterType('developing')}
                    className={`px-3 py-1 rounded font-body-sm ${filterType === 'developing' ? 'bg-surface-container-high text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'}`}
                  >
                    Developing (2)
                  </button>
                  <button
                    onClick={() => setFilterType('needs-attention')}
                    className={`px-3 py-1 rounded font-body-sm ${filterType === 'needs-attention' ? 'bg-surface-container-high text-tertiary font-semibold' : 'text-on-surface-variant hover:text-on-surface'}`}
                  >
                    Needs Attention (2)
                  </button>
                </div>
              </div>

              {/* Interactive Concept Matrix List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                {filteredConcepts.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-sm hover:bg-surface-container-high transition-colors border border-outline-variant/10"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-body-md text-body-md text-on-surface font-semibold truncate mr-2">
                        {item.name}
                      </span>
                      <span className="font-label-caps text-label-caps px-2 py-0.5 rounded bg-surface-container-highest font-mono text-[9px] shrink-0 text-on-surface">
                        {item.proficiency}
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                      <div className={`${item.color} h-full rounded-full`} style={{ width: item.proficiency }}></div>
                    </div>
                    <div className="flex items-center justify-between text-on-surface-variant font-mono-telemetry-sm text-mono-telemetry-sm pt-1 font-mono text-[11px]">
                      <span>{item.tag}</span>
                      <span className={item.type === 'needs-attention' ? 'text-tertiary' : item.type === 'strong' ? 'text-emerald-400' : 'text-primary'}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Side Intelligence Panel (Right 4 cols - Glassmorphic Dossier) */}
          <aside className="xl:col-span-4 flex flex-col gap-space-lg">
            <div className="bg-surface-container p-space-lg rounded-xl flex flex-col gap-space-lg shadow-xl relative overflow-hidden border border-outline-variant/15">
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>

              {/* Header & Live Diagnostic Badge */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-caps text-label-caps text-primary tracking-wider uppercase font-mono text-[10px]">
                    LOCAL EMBEDDING AUDIT
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Twin Insights & Synthesis</h2>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-primary border border-primary/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="font-mono-telemetry-sm text-mono-telemetry-sm font-semibold font-mono text-xs">
                    Live NPU
                  </span>
                </div>
              </div>

              {/* Twin Personality Avatar / Initials Monogram */}
              <div className="relative w-full h-44 rounded-lg overflow-hidden bg-surface-container-lowest flex items-end p-space-md group border border-outline-variant/15">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface-container to-secondary/20 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, #00d2ff 1px, transparent 1px)', backgroundSize: '20px 20px'}} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center ring-4 ring-primary/30 shadow-2xl">
                    <span className="text-3xl font-black text-on-primary tracking-tight leading-none">KK</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/20 to-transparent"></div>
                <div className="relative z-10 flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-body-md font-bold text-on-surface">Digital Replica #409</span>
                    <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-primary font-mono text-xs">
                      Synchronized 2 mins ago
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-surface-container-high/90 backdrop-blur px-2 py-1 rounded border border-outline-variant/20">
                    <span className="material-symbols-outlined text-xs text-primary">verified</span>
                    <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface font-mono text-xs">
                      99.4% Match
                    </span>
                  </div>
                </div>
              </div>

              {/* Cognitive Narrative Analysis Card */}
              <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-sm border border-outline-variant/10">
                <div className="flex items-center gap-space-xs text-secondary">
                  <span className="material-symbols-outlined text-base">psychology_alt</span>
                  <span className="font-label-caps text-label-caps uppercase tracking-wider font-mono text-[10px]">
                    Cognitive State Analysis
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                  {selectedSubject === 'CS-302' && (
                    <>“Strong grasp of <strong className="text-primary font-semibold">TCP 3-Way Handshake (89%)</strong>, but <span className="text-tertiary font-semibold">CIDR Subnetting</span> needs active drill practice before the Networks exam.”</>
                  )}
                  {selectedSubject === 'CS-303' && (
                    <>“Relational Algebra mastery is solid at <strong className="text-primary font-semibold">93%</strong>, but <span className="text-tertiary font-semibold">BCNF decomposition</span> & dependency preservation have an active knowledge gap (42%).”</>
                  )}
                  {selectedSubject === 'CS-201' && (
                    <>“Graph traversals via <strong className="text-primary font-semibold">Dijkstra Min-Heap (92%)</strong> are fully mastered, while <span className="text-tertiary font-semibold">AVL double rotations</span> need targeted review.”</>
                  )}
                  {selectedSubject === 'CS-401' && (
                    <>“Backpropagation chain rule calculus is strong at <strong className="text-primary font-semibold">86%</strong>, while <span className="text-tertiary font-semibold">Multi-Head Attention</span> projection math needs consolidation.”</>
                  )}
                  {(selectedSubject === 'CS-301' || selectedSubject === 'all') && (
                    <>“You've improved <strong className="text-primary font-semibold">18% in Process Scheduling</strong> this week, but <span className="text-tertiary font-semibold">Deadlock concepts remain inconsistent</span> — specifically Banker's Algorithm safety state validation.”</>
                  )}
                </p>
                <div className="flex items-center gap-space-md pt-space-xs text-on-surface-variant font-mono-telemetry-sm text-mono-telemetry-sm font-mono text-xs">
                  <span>Confidence: High (89%)</span>
                  <span>•</span>
                  <span>Memory Decay: 4.2d</span>
                </div>
              </div>

              {/* Recommended Next Step */}
              <div className="p-space-md rounded-lg bg-primary-container/10 flex flex-col gap-space-sm border border-primary-container/30">
                <div className="flex items-center gap-space-xs text-primary">
                  <span className="material-symbols-outlined text-base">auto_fix_high</span>
                  <span className="font-label-caps text-label-caps tracking-wider uppercase font-mono text-[10px]">
                    Optimal Learning Vector
                  </span>
                </div>
                <div className="font-headline-sm text-body-md font-semibold text-on-surface">
                  {selectedSubject === 'CS-302' && "Targeted Concept Bridge: Subnet Prefix Bits → Host Address Masking Calculations"}
                  {selectedSubject === 'CS-303' && "Targeted Concept Bridge: Non-Trivial FDs → Attribute Closure & Lossless BCNF Join"}
                  {selectedSubject === 'CS-201' && "Targeted Concept Bridge: Binary Heap Priority Queues → Greedy Dijkstra Optimization"}
                  {selectedSubject === 'CS-401' && "Targeted Concept Bridge: Dot-Product Scaling Factor → Transformer Self-Attention Heads"}
                  {(selectedSubject === 'CS-301' || selectedSubject === 'all') && "Targeted Concept Bridge: 4 Deadlock Conditions → Resource Allocation Graph Analysis"}
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Reconstructing matrix allocation tables locally via interactive NPU trace generation.
                </p>
                <div className="pt-space-xs flex flex-col gap-space-xs">
                  <button
                    onClick={() => onNavigate('ai-tutor')}
                    className="w-full py-2.5 px-space-md rounded-lg bg-primary-container text-on-primary-container font-headline-sm text-body-md font-semibold flex items-center justify-center gap-space-xs shadow-md hover:bg-primary-fixed-dim transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-lg">play_arrow</span>
                    <span>Start Recommended Revision (15 min)</span>
                  </button>
                  <button
                    onClick={() => onNavigate('rapid-quiz')}
                    className="w-full py-2 px-space-md rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-sm text-body-sm font-medium flex items-center justify-center gap-space-xs transition-colors border border-outline-variant/15"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">science</span>
                    <span>Simulate Twin Knowledge Test</span>
                  </button>
                </div>
              </div>

              {/* Hardware Acceleration Sparkline Panel */}
              <div className="flex flex-col gap-space-xs p-space-sm rounded-lg bg-surface-container-lowest border border-outline-variant/10">
                <div className="flex items-center justify-between text-on-surface-variant font-mono-telemetry-sm text-mono-telemetry-sm font-mono text-xs">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-primary">speed</span>
                    NPU Inference Speed
                  </span>
                  <span className="text-primary font-bold">114 tokens/sec</span>
                </div>
                <div className="w-full h-8 flex items-end">
                  <svg className="w-full h-full text-primary" preserveAspectRatio="none" viewBox="0 0 200 32">
                    <path d="M0,28 L20,24 L40,26 L60,18 L80,22 L100,12 L120,16 L140,8 L160,10 L180,4 L200,6" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                    <path d="M0,28 L20,24 L40,26 L60,18 L80,22 L100,12 L120,16 L140,8 L160,10 L180,4 L200,6 L200,32 L0,32 Z" fill="currentColor" fillOpacity="0.1"></path>
                  </svg>
                </div>
                <div className="flex items-center justify-between text-[10px] text-outline font-mono-telemetry-sm pt-1 font-mono">
                  <span>Model: Llama-3-8B-Q4 (Hexagon Direct)</span>
                  <span>Temp: 33.8°C</span>
                </div>
              </div>
            </div>

            {/* Quick Knowledge Ingestion Snippet */}
            <div className="bg-surface-container p-space-md rounded-xl flex items-center justify-between border border-outline-variant/15">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">add_to_photos</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-body-md text-body-md font-semibold text-on-surface">Feed Twin Notes</span>
                  <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs">
                    Instant local vector index
                  </span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('my-materials')}
                className="px-space-md py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-sm text-body-sm transition-colors border border-outline-variant/20"
                type="button"
              >
                Upload PDF
              </button>
            </div>
          </aside>
        </div>
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

