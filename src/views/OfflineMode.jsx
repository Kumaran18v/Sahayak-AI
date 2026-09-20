import React, { useState } from 'react';

export default function OfflineMode({ onNavigate }) {
  const [showBenchmark, setShowBenchmark] = useState(false);
  const [benchmarkTesting, setBenchmarkTesting] = useState(false);

  const handleTestBenchmark = () => {
    setShowBenchmark(true);
    setBenchmarkTesting(true);
    setTimeout(() => {
      setBenchmarkTesting(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="p-space-md sm:p-space-xl lg:p-margin-lg flex flex-col gap-space-xl max-w-7xl mx-auto w-full">
        {/* Top Header */}
        <section className="flex flex-col gap-1 pb-space-sm border-b border-outline-variant/15">
          <div className="flex items-center gap-2">
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 font-mono text-[10px]">
              AIR-GAPPED COMPUTE ENVIRONMENT
            </span>
            <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs">
              Zero Outbound Transmission
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface font-bold">
            Offline Mode & Local Vault Integrity
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Independent, disconnected execution verified. All AI reasoning, semantic vector search, and exam drills run natively on your laptop.
          </p>
        </section>

        {/* Big Air-Gapped Confirmation Banner */}
        <section className="p-space-lg rounded-2xl bg-surface-container-low border border-primary/20 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
              <span className="material-symbols-outlined text-3xl">wifi_off</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  100% OPERATIONAL • AIR-GAPPED READY
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                No internet connection required. Snapdragon Hexagon NPU handles 100% of the cognitive workload.
              </p>
            </div>
          </div>
          <div className="px-space-md py-1.5 rounded-full bg-surface-container-lowest border border-outline-variant/20 font-mono text-xs text-primary font-semibold">
            0 External Dependencies
          </div>
        </section>

        {/* 4 Feature Status Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Card 1 */}
          <div className="group relative flex flex-col justify-between p-space-lg rounded-xl bg-surface-container shadow-lg hover:shadow-2xl transition-all duration-300 border border-outline-variant/15">
            <div className="absolute -top-px left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-80"></div>
            <div className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    psychology
                  </span>
                </div>
                <span className="font-label-caps text-label-caps px-2.5 py-1 rounded-full bg-primary-container/20 text-primary uppercase font-bold font-mono text-[9px]">
                  100% OPERATIONAL
                </span>
              </div>
              <div className="flex flex-col gap-space-xs">
                <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-1.5 font-semibold">
                  <span className="material-symbols-outlined text-base text-primary">check_circle</span>
                  My Study Twin
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-xs leading-relaxed">
                  Vector knowledge graphs are stored and traversed in your local SQLite and memory cache.
                </p>
              </div>
            </div>
            <div className="mt-space-lg pt-space-md flex flex-col gap-space-xs bg-surface-container-low/60 -mx-space-lg -mb-space-lg p-space-md rounded-b-xl border-t border-outline-variant/10 font-mono text-xs">
              <div className="flex justify-between items-center text-on-surface-variant">
                <span>Embedding Substrate</span>
                <span className="text-primary font-semibold">Local HNSW</span>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant">
                <span>Nodes Indexed</span>
                <span className="text-on-surface font-semibold">14,280</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative flex flex-col justify-between p-space-lg rounded-xl bg-surface-container shadow-lg hover:shadow-2xl transition-all duration-300 border border-outline-variant/15">
            <div className="absolute -top-px left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-80"></div>
            <div className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    folder_open
                  </span>
                </div>
                <span className="font-label-caps text-label-caps px-2.5 py-1 rounded-full bg-primary-container/20 text-primary uppercase font-bold font-mono text-[9px]">
                  100% OPERATIONAL
                </span>
              </div>
              <div className="flex flex-col gap-space-xs">
                <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-1.5 font-semibold">
                  <span className="material-symbols-outlined text-base text-primary">check_circle</span>
                  Local Materials Vault
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-xs leading-relaxed">
                  All 24 indexed course documents, lecture slides, and formula sheets are stored on NVMe.
                </p>
              </div>
            </div>
            <div className="mt-space-lg pt-space-md flex flex-col gap-space-xs bg-surface-container-low/60 -mx-space-lg -mb-space-lg p-space-md rounded-b-xl border-t border-outline-variant/10 font-mono text-xs">
              <div className="flex justify-between items-center text-on-surface-variant">
                <span>Storage Footprint</span>
                <span className="text-on-surface font-semibold">3.8 GB Cached</span>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant">
                <span>Read Speed</span>
                <span className="text-primary font-semibold">3,400 MB/s</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative flex flex-col justify-between p-space-lg rounded-xl bg-surface-container shadow-lg hover:shadow-2xl transition-all duration-300 border border-outline-variant/15">
            <div className="absolute -top-px left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-80"></div>
            <div className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    smart_toy
                  </span>
                </div>
                <span className="font-label-caps text-label-caps px-2.5 py-1 rounded-full bg-primary-container/20 text-primary uppercase font-bold font-mono text-[9px]">
                  100% OPERATIONAL
                </span>
              </div>
              <div className="flex flex-col gap-space-xs">
                <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-1.5 font-semibold">
                  <span className="material-symbols-outlined text-base text-primary">check_circle</span>
                  AI Tutor & Reasoning
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-xs leading-relaxed">
                  Qwen3-4B runs natively on the 45 TOPS Hexagon NPU with full citation generation.
                </p>
              </div>
            </div>
            <div className="mt-space-lg pt-space-md flex flex-col gap-space-xs bg-surface-container-low/60 -mx-space-lg -mb-space-lg p-space-md rounded-b-xl border-t border-outline-variant/10 font-mono text-xs">
              <div className="flex justify-between items-center text-on-surface-variant">
                <span>Inference Throughput</span>
                <span className="text-primary font-semibold">48.2 tok/s</span>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant">
                <span>Power Draw</span>
                <span className="text-on-surface font-semibold">3.2W Active</span>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="group relative flex flex-col justify-between p-space-lg rounded-xl bg-surface-container shadow-lg hover:shadow-2xl transition-all duration-300 border border-outline-variant/15">
            <div className="absolute -top-px left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-80"></div>
            <div className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    quiz
                  </span>
                </div>
                <span className="font-label-caps text-label-caps px-2.5 py-1 rounded-full bg-primary-container/20 text-primary uppercase font-bold font-mono text-[9px]">
                  100% OPERATIONAL
                </span>
              </div>
              <div className="flex flex-col gap-space-xs">
                <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-1.5 font-semibold">
                  <span className="material-symbols-outlined text-base text-primary">check_circle</span>
                  Saved Adaptive Quizzes
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-xs leading-relaxed">
                  Generate unlimited dynamic practice questions and receive instant NPU explanations.
                </p>
              </div>
            </div>
            <div className="mt-space-lg pt-space-md flex flex-col gap-space-xs bg-surface-container-low/60 -mx-space-lg -mb-space-lg p-space-md rounded-b-xl border-t border-outline-variant/10 font-mono text-xs">
              <div className="flex justify-between items-center text-on-surface-variant">
                <span>Ready Modules</span>
                <span className="text-on-surface font-semibold">6 Complete Decks</span>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant">
                <span>Feedback Latency</span>
                <span className="text-primary font-semibold">&lt; 15ms</span>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-action & Benchmark Trigger */}
        <section className="p-space-xl rounded-xl bg-surface-container-low shadow-xl flex flex-col md:flex-row items-center justify-between gap-space-xl border border-outline-variant/15">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-xl">bolt</span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Ready to dive in?</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              Zero network requests will be dispatched. All interactions remain completely private and hardware-accelerated.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-space-md w-full md:w-auto">
            <button
              onClick={handleTestBenchmark}
              className="px-space-lg py-3 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-bright font-headline-sm text-body-md transition-colors flex items-center gap-space-xs border border-outline-variant/20"
              type="button"
            >
              <span className="material-symbols-outlined text-base text-primary">speed</span>
              <span>Test Local NPU Benchmark</span>
            </button>
            <button
              onClick={() => onNavigate('ai-tutor')}
              className="px-space-xl py-3 rounded-lg bg-primary-container text-on-primary-container font-headline-sm text-body-md font-semibold hover:opacity-95 shadow-[0_0_24px_rgba(0,210,255,0.4)] transition-all flex items-center gap-space-xs"
              type="button"
            >
              <span>Continue Learning Offline</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* Benchmark Results Panel */}
        {showBenchmark && (
          <section className="p-space-lg rounded-xl bg-surface-container-high border border-primary/30 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-lg">memory</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Hexagon NPU Diagnostic Test</span>
              </div>
              <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-primary font-mono text-xs">
                {benchmarkTesting ? 'Simulating 1,024 context tokens...' : 'Benchmark Completed Successfully'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col border border-outline-variant/10 font-mono">
                <span className="font-label-caps text-label-caps text-on-surface-variant text-[10px]">Measured Compute</span>
                <span className="font-mono-telemetry-lg text-mono-telemetry-lg text-primary font-bold text-lg">44.8 TOPS peak</span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col border border-outline-variant/10 font-mono">
                <span className="font-label-caps text-label-caps text-on-surface-variant text-[10px]">Time-to-First-Token</span>
                <span className="font-mono-telemetry-lg text-mono-telemetry-lg text-on-surface font-bold text-lg">11.4 ms</span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col border border-outline-variant/10 font-mono">
                <span className="font-label-caps text-label-caps text-on-surface-variant text-[10px]">Battery Draw Projected</span>
                <span className="font-mono-telemetry-lg text-mono-telemetry-lg text-primary font-bold text-lg">~14.2 hrs continuous</span>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
