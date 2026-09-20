import React from 'react';

export default function LandingPage({ onNavigate }) {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Environmental Ambient Glow Layer */}
      <div className="relative w-full px-space-md sm:px-space-xl py-space-xl lg:px-space-2xl">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-primary-container/10 blur-[130px] pointer-events-none rounded-full"></div>
        <div className="absolute top-96 right-12 w-[420px] h-[420px] bg-secondary-container/15 blur-[120px] pointer-events-none rounded-full"></div>

        {/* Header Flag / Top Banner Badge */}
        <div className="flex items-center justify-center mb-space-lg">
          <div className="group inline-flex items-center gap-space-sm px-space-md py-1.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-[0_0_24px_rgba(0,210,255,0.22)] border border-primary/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-90"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-container"></span>
            </span>
            <span className="font-label-caps text-label-caps text-primary tracking-[0.18em] uppercase font-mono">
              ON-DEVICE AI • POWERED BY SNAPDRAGON NPU
            </span>
            <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-mono-telemetry-sm text-[10px]">
              v2.4 LOCAL
            </span>
          </div>
        </div>

        {/* Hero Titles */}
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high mb-space-sm border border-outline-variant/20">
            <span className="material-symbols-outlined text-tertiary text-sm">lock</span>
            <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-tertiary">
              Learn smarter. Stay private. Work offline.
            </span>
          </div>
          <h1 className="font-display-hero text-3xl sm:text-4xl lg:text-display-hero text-on-surface tracking-tight uppercase max-w-4xl text-balance">
            YOUR KNOWLEDGE.{' '}
            <span className="bg-gradient-to-r from-primary-container via-primary to-secondary bg-clip-text text-transparent">
              YOUR AI.
            </span>{' '}
            YOUR DEVICE.
          </h1>
          <p className="mt-space-md font-body-lg text-body-lg text-on-surface-variant max-w-2xl text-balance">
            An intelligent study companion that understands your notes, learns your weak areas, and helps you prepare — privately on your device.
          </p>

          {/* Primary & Secondary CTA Buttons */}
          <div className="mt-space-xl flex flex-wrap items-center justify-center gap-space-md">
            <button
              onClick={() => onNavigate('study-twin')}
              className="relative group flex items-center gap-space-sm px-space-xl py-3.5 rounded-xl bg-gradient-to-r from-primary-container to-secondary-container text-surface-container-lowest font-headline-sm text-headline-sm tracking-wide shadow-[0_0_28px_rgba(0,210,255,0.45)] hover:shadow-[0_0_42px_rgba(0,210,255,0.7)] transition-all duration-300 font-semibold"
              type="button"
            >
              <span>Create My Study Twin</span>
              <span className="material-symbols-outlined text-surface-container-lowest group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="group flex items-center gap-space-sm px-space-lg py-3.5 rounded-xl bg-surface-container-high/60 backdrop-blur-xl text-on-surface hover:bg-surface-container-highest transition-all duration-200 border border-outline-variant/20"
              type="button"
            >
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">
                play_circle
              </span>
              <span className="font-headline-sm text-headline-sm font-medium">Explore Interactive Demo</span>
            </button>
          </div>

          {/* Metrics Telemetry Pill Bar */}
          <div className="mt-space-xl inline-flex flex-wrap items-center justify-center gap-y-2 gap-x-6 px-space-lg py-2.5 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl shadow-lg border border-outline-variant/15">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container text-sm">speed</span>
              <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface">0ms Cloud Latency</span>
            </div>
            <span className="text-outline-variant hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">verified_user</span>
              <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface">100% Local Confidentiality</span>
            </div>
            <span className="text-outline-variant hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-sm">memory</span>
              <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface">45 TOPS Hardware Acceleration</span>
            </div>
          </div>
        </div>

        {/* Centerpiece Futuristic Visual Matrix */}
        <div className="relative max-w-6xl mx-auto mt-space-2xl">
          <div className="relative rounded-2xl bg-surface-container-lowest/85 backdrop-blur-2xl p-space-md lg:p-space-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-outline-variant/20">
            {/* Subtle Top Edge Highlight */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary-container/40 to-transparent"></div>

            {/* Live Hardware Ribbon */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md border-b border-surface-container-high mb-space-md gap-2">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-base">developer_board</span>
                <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface tracking-wider font-mono">
                  HEXAGON_NPU_LOCAL_ENGINE // PIPELINE ACTIVE
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container-high font-mono-telemetry-sm text-mono-telemetry-sm text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span> INFERENCE: RUNNING
                </span>
                <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono">
                  AIR-GAP SHIELD: ENGAGED
                </span>
              </div>
            </div>

            {/* Center Diagram Canvas */}
            <div className="relative h-[480px] w-full flex items-center justify-center overflow-hidden rounded-xl bg-surface-container-low/70 border border-outline-variant/10">
              {/* Concentric Vector Orbits SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" viewBox="0 0 1000 500">
                <defs>
                  <radialGradient cx="50%" cy="50%" id="landingNeuralGlow" r="50%">
                    <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.35"></stop>
                    <stop offset="60%" stopColor="#3131C0" stopOpacity="0.1"></stop>
                    <stop offset="100%" stopColor="#000000" stopOpacity="0"></stop>
                  </radialGradient>
                  <linearGradient id="landingOrbitFade" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.6"></stop>
                    <stop offset="50%" stopColor="#C0C1FF" stopOpacity="0.2"></stop>
                    <stop offset="100%" stopColor="#00D2FF" stopOpacity="0.05"></stop>
                  </linearGradient>
                </defs>
                <circle cx="500" cy="250" fill="url(#landingNeuralGlow)" r="180"></circle>
                <ellipse className="opacity-40 animate-spin" cx="500" cy="250" rx="380" ry="170" stroke="url(#landingOrbitFade)" strokeDasharray="6 8" strokeWidth="1.2" style={{ animationDuration: '80s', transformOrigin: '500px 250px' }}></ellipse>
                <ellipse className="opacity-60 animate-spin" cx="500" cy="250" rx="270" ry="120" stroke="url(#landingOrbitFade)" strokeDasharray="4 6" strokeWidth="1.5" style={{ animationDuration: '50s', animationDirection: 'reverse', transformOrigin: '500px 250px' }}></ellipse>
                <ellipse className="opacity-50" cx="500" cy="250" rx="170" ry="80" stroke="#00D2FF" strokeWidth="1"></ellipse>
                <path className="opacity-70 animate-pulse" d="M 180 120 Q 340 180 440 230" stroke="#00D2FF" strokeDasharray="5 5" strokeWidth="1.5"></path>
                <path className="opacity-70 animate-pulse" d="M 820 130 Q 660 190 560 230" stroke="#C0C1FF" strokeDasharray="5 5" strokeWidth="1.5"></path>
                <path className="opacity-60" d="M 220 380 Q 360 340 440 270" stroke="#00D2FF" strokeDasharray="4 4" strokeWidth="1.5"></path>
                <path className="opacity-60" d="M 780 370 Q 640 330 560 270" stroke="#C0C1FF" strokeDasharray="4 4" strokeWidth="1.5"></path>
              </svg>

              {/* Core Neural Processor Hologram */}
              <div className="relative z-20 flex flex-col items-center justify-center">
                <div className="relative flex items-center justify-center w-36 h-36 rounded-3xl bg-surface-container-high/90 shadow-[0_0_50px_rgba(0,210,255,0.4)] backdrop-blur-xl border border-primary/40">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary-container/20 to-secondary-container/30 animate-pulse"></div>
                  <div className="flex flex-col items-center justify-center p-3 text-center">
                    <span className="material-symbols-outlined text-4xl text-primary-container mb-1">memory</span>
                    <span className="font-headline-sm text-xs font-bold tracking-tight text-on-surface">SNAPDRAGON</span>
                    <span className="font-mono-telemetry-sm text-[10px] text-primary font-mono">HEXAGON 45 TOPS</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/90 shadow border border-outline-variant/20">
                  <span className="h-2 w-2 rounded-full bg-primary-container animate-ping"></span>
                  <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface font-mono">
                    Core Temp: 36.4°C • Fan: 0 RPM
                  </span>
                </div>
              </div>

              {/* Orbiting Ingestion Nodes */}
              <div 
                onClick={() => onNavigate('my-materials')}
                className="hidden md:flex absolute left-4 lg:left-10 top-12 lg:top-16 z-20 items-center gap-3 p-2.5 lg:p-3 rounded-xl bg-surface-container-high/85 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-105 border border-outline-variant/20 cursor-pointer max-w-[210px] lg:max-w-xs"
              >
                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary-container shrink-0">
                  <span className="material-symbols-outlined text-lg lg:text-xl">picture_as_pdf</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-sm text-xs font-semibold text-on-surface truncate">Neuro_Pathology_v4.pdf</span>
                  <span className="font-mono-telemetry-sm text-[10px] text-on-surface-variant font-mono truncate">Embedding 1,842 vectors...</span>
                </div>
              </div>

              <div 
                onClick={() => onNavigate('my-materials')}
                className="hidden md:flex absolute left-4 lg:left-16 bottom-8 lg:bottom-14 z-20 items-center gap-3 p-2.5 lg:p-3 rounded-xl bg-surface-container-high/85 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-105 border border-outline-variant/20 cursor-pointer max-w-[210px] lg:max-w-xs"
              >
                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-lg lg:text-xl">mic</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-sm text-xs font-semibold text-on-surface truncate">Lecture_Whisper_Local.m4a</span>
                  <span className="font-mono-telemetry-sm text-[10px] text-on-surface-variant font-mono truncate">On-Device (0ms cloud)</span>
                </div>
              </div>

              <div 
                onClick={() => onNavigate('study-twin')}
                className="hidden md:flex absolute right-4 lg:right-10 top-14 lg:top-20 z-20 items-center gap-3 p-2.5 lg:p-3 rounded-xl bg-surface-container-high/85 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-105 border border-outline-variant/20 cursor-pointer max-w-[210px] lg:max-w-xs"
              >
                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-surface-container flex items-center justify-center text-tertiary shrink-0">
                  <span className="material-symbols-outlined text-lg lg:text-xl">hub</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-sm text-xs font-semibold text-on-surface truncate">Study Twin Latent Graph</span>
                  <span className="font-mono-telemetry-sm text-[10px] text-on-surface-variant font-mono truncate">Weak Area: Action Potentials</span>
                </div>
              </div>

              <div 
                onClick={() => onNavigate('exam-mode')}
                className="hidden md:flex absolute right-4 lg:right-14 bottom-10 lg:bottom-16 z-20 items-center gap-3 p-2.5 lg:p-3 rounded-xl bg-surface-container-high/85 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-105 border border-outline-variant/20 cursor-pointer max-w-[210px] lg:max-w-xs"
              >
                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-lg lg:text-xl">quiz</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-sm text-xs font-semibold text-on-surface truncate">Adaptive Exam Engine</span>
                  <span className="font-mono-telemetry-sm text-[10px] text-on-surface-variant font-mono truncate">Readiness: 94.2%</span>
                </div>
              </div>

              {/* Floating Telemetry Badges Overlay */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 lg:gap-3 z-30 flex-wrap justify-center">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-[0_0_12px_rgba(0,210,255,0.2)] border border-primary/20">
                  <span className="material-symbols-outlined text-xs text-primary">terminal</span>
                  <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface font-mono">
                    Local Model: <span className="text-primary-container font-semibold">Qwen3-4B-Instruct-Q4</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow border border-secondary/20">
                  <span className="material-symbols-outlined text-xs text-secondary">memory_alt</span>
                  <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface font-mono">
                    NPU Memory: <span className="text-secondary font-semibold">2.1 GB</span>
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow border border-outline-variant/20">
                  <span className="material-symbols-outlined text-xs text-error">cloud_off</span>
                  <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface font-mono">
                    Cloud Requests: <span className="text-primary font-semibold">0</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Diagnostic Wave Bar Footer Inside Visual Matrix */}
            <div className="mt-space-md grid grid-cols-2 md:grid-cols-4 gap-space-sm text-on-surface-variant pt-space-xs">
              <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/10">
                <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-outline font-mono">Token Gen Speed</span>
                <span className="font-mono-telemetry-lg text-mono-telemetry-lg text-primary font-bold font-mono">58.4 t/s</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/10">
                <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-outline font-mono">First-Token Latency</span>
                <span className="font-mono-telemetry-lg text-mono-telemetry-lg text-primary-container font-bold font-mono">14.2 ms</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/10">
                <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-outline font-mono">Context Window</span>
                <span className="font-mono-telemetry-lg text-mono-telemetry-lg text-on-surface font-bold font-mono">32k Tokens</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/10">
                <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-outline font-mono">Network State</span>
                <span className="font-mono-telemetry-lg text-mono-telemetry-lg text-primary flex items-center gap-1 font-bold font-mono text-xs sm:text-sm">
                  <span className="material-symbols-outlined text-sm">wifi_off</span> DISCONNECTED
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid (3 Large Glassmorphic Modules) */}
        <div className="max-w-6xl mx-auto mt-space-2xl">
          <div className="mb-space-md flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase font-mono">
                HARDWARE-GROUNDED ARCHITECTURE
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface mt-1 font-bold">
                Built to exploit Qualcomm Hexagon Silicon.
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Zero data egress. Native multimodal execution directly compiled for Snapdragon X Elite and X Plus workstations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {/* Feature Card 1: PRIVATE */}
            <div className="group relative rounded-2xl bg-surface-container-lowest/80 backdrop-blur-xl p-space-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,210,255,0.18)] hover:-translate-y-1 border border-outline-variant/20">
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary-container/50 to-transparent"></div>
              <div className="flex items-center justify-between mb-space-md">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">shield_lock</span>
                </div>
                <span className="font-mono-telemetry-sm text-mono-telemetry-sm px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-mono">
                  PRIVATE
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2 font-semibold">100% Private & Air-Gapped</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-lg">
                Your study materials, voice queries, and knowledge graphs never leave your Snapdragon PC. Zero telemetry, zero cloud surveillance.
              </p>
              <div className="pt-space-md border-t border-surface-container flex items-center justify-between">
                <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-outline font-mono">STORAGE VAULT</span>
                <span className="px-2 py-0.5 rounded bg-surface-container-high font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface font-medium font-mono text-xs">
                  Local SQLite + Vector Store
                </span>
              </div>
            </div>

            {/* Feature Card 2: MULTIMODAL */}
            <div className="group relative rounded-2xl bg-surface-container-lowest/80 backdrop-blur-xl p-space-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(192,193,255,0.22)] hover:-translate-y-1 border border-outline-variant/20">
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent"></div>
              <div className="flex items-center justify-between mb-space-md">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">neurology</span>
                </div>
                <span className="font-mono-telemetry-sm text-mono-telemetry-sm px-2.5 py-1 rounded-full bg-surface-container-high text-secondary font-mono">
                  MULTIMODAL
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2 font-semibold">Multimodal Deep Comprehension</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-lg">
                Natively ingest messy lecture slides, dense handwritten notes, textbooks, lab manuals, and spoken lectures in real time.
              </p>
              <div className="pt-space-md border-t border-surface-container flex items-center justify-between">
                <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-outline font-mono">INPUT SUPPORT</span>
                <span className="px-2 py-0.5 rounded bg-surface-container-high font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface font-medium font-mono text-xs">
                  PDF • PPTX • Audio • Images
                </span>
              </div>
            </div>

            {/* Feature Card 3: OFFLINE READY */}
            <div className="group relative rounded-2xl bg-surface-container-lowest/80 backdrop-blur-xl p-space-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,177,72,0.2)] hover:-translate-y-1 border border-outline-variant/20">
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-tertiary-container/50 to-transparent"></div>
              <div className="flex items-center justify-between mb-space-md">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">bolt</span>
                </div>
                <span className="font-mono-telemetry-sm text-mono-telemetry-sm px-2.5 py-1 rounded-full bg-surface-container-high text-tertiary font-mono">
                  OFFLINE READY
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2 font-semibold">Instant Zero-Ping Offline</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-lg">
                Full LLM reasoning and quiz generation runs directly on the local NPU during flights, library dead zones, or power outages.
              </p>
              <div className="pt-space-md border-t border-surface-container flex items-center justify-between">
                <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-outline font-mono">COPROCESSOR</span>
                <span className="px-2 py-0.5 rounded bg-surface-container-high font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface font-medium font-mono text-xs">
                  45 TOPS Hexagon NPU
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Knowledge Twin Preview Slice */}
        <div className="max-w-6xl mx-auto mt-space-2xl rounded-2xl bg-surface-container-low p-space-lg sm:p-space-xl flex flex-col lg:flex-row items-center justify-between gap-space-xl border border-outline-variant/20">
          <div className="flex flex-col max-w-xl">
            <div className="flex items-center gap-2 text-primary font-mono-telemetry-sm text-mono-telemetry-sm mb-2 font-mono">
              <span className="material-symbols-outlined text-sm">psychology_alt</span>
              <span>AUTONOMOUS STUDY COMPANION</span>
            </div>
            <h3 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface font-bold">
              Your Cognitive Twin learns how your brain memorizes.
            </h3>
            <p className="mt-space-sm font-body-md text-body-md text-on-surface-variant">
              Sahayak builds an encrypted latent representation of your syllabus mastery. It spots knowledge gaps before midterms and creates custom spaced-repetition drills without leaking an ounce of student telemetry.
            </p>
            <div className="mt-space-lg flex flex-wrap items-center gap-4">
              <button 
                onClick={() => onNavigate('study-twin')}
                className="px-space-md py-2.5 rounded-lg bg-primary-container text-on-primary-container font-headline-sm text-sm font-semibold hover:opacity-90 transition-opacity" 
                type="button"
              >
                Initialize Twin Vault
              </button>
              <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-outline font-mono">
                Encrypted with AES-256 GCM
              </span>
            </div>
          </div>

          {/* Twin Diagnostics Visual Micro-Widget */}
          <div className="w-full lg:w-96 rounded-xl bg-surface-container-lowest p-space-md flex flex-col gap-3 shadow-md border border-outline-variant/15">
            <div className="flex items-center justify-between text-xs font-mono-telemetry-sm font-mono">
              <span className="text-on-surface-variant">SUBJECT COHERENCE MATRIX</span>
              <span className="text-primary font-semibold">ACTIVE</span>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-body-sm text-body-sm text-on-surface">Data Structures & Algorithms</span>
                  <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-primary font-mono">92%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-primary-container rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-body-sm text-body-sm text-on-surface">Discrete Mathematics</span>
                  <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-tertiary font-mono">68%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-tertiary-container rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-body-sm text-body-sm text-on-surface">Operating Systems</span>
                  <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-secondary font-mono">74%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '74%' }}></div>
                </div>
              </div>
            </div>
            <div className="mt-2 p-2.5 rounded-lg bg-surface-container-high/60 flex items-center gap-2 border border-outline-variant/10">
              <span className="material-symbols-outlined text-primary text-sm">tips_and_updates</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                Recommended Drill: Virtual Memory & Paging (4 min)
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Trust & Architectural Anchor Bar */}
        <div className="max-w-6xl mx-auto mt-space-2xl pb-space-xl">
          <div className="p-space-lg rounded-2xl bg-surface-container-lowest/60 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left border border-outline-variant/15">
            <div className="flex items-center gap-space-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-xl">verified</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-body-md font-semibold text-on-surface">
                  Engineered for high-performance Snapdragon PCs
                </span>
                <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-outline font-mono text-xs">
                  Strict zero-data egress architecture • Verified on Windows on ARM & Linux NPU Runtimes
                </span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm flex-wrap justify-center">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-high font-mono-telemetry-sm text-mono-telemetry-sm text-primary font-mono text-xs">
                <span className="material-symbols-outlined text-xs">lock</span> 100% AIR-GAPPED
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-high font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs">
                <span className="material-symbols-outlined text-xs">offline_bolt</span> QUALCOMM HEXAGON
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
