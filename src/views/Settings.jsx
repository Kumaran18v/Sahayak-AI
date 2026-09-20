import React, { useState } from 'react';

export default function Settings() {
  const [selectedModel, setSelectedModel] = useState('qwen');
  const [inferMode, setInferMode] = useState('ultra');
  const [persona, setPersona] = useState('academic');
  const [airgapEnabled, setAirgapEnabled] = useState(true);
  const [accentColor, setAccentColor] = useState('cyan');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="p-space-md sm:p-space-xl lg:p-margin-lg flex flex-col gap-space-xl max-w-7xl mx-auto w-full">
        {/* Top Header */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pb-space-sm border-b border-outline-variant/15">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-label-caps uppercase tracking-wider text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 font-mono text-[10px]">
                LOCAL PREFERENCES // SUBSTRATE
              </span>
              <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs">
                Zero Cloud Sync
              </span>
            </div>
            <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface font-bold">
              Settings & Hardware Architecture
            </h1>
          </div>
          <button
            onClick={handleSave}
            className="px-space-lg py-2 rounded-lg bg-primary-container text-on-primary-container font-headline-sm text-sm font-semibold flex items-center gap-2 hover:shadow-[0_0_16px_rgba(0,210,255,0.4)] transition-all"
          >
            <span className="material-symbols-outlined text-base">save</span>
            <span>Save Configurations</span>
          </button>
        </section>

        {savedNotice && (
          <div className="p-3 rounded-xl bg-primary-container/20 border border-primary text-primary flex items-center gap-2 font-mono text-xs animate-in fade-in">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>Configuration parameters flushed to local persistent storage!</span>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-xl items-start">
          {/* Left Column / Silicon Profile (Span 3) */}
          <div className="xl:col-span-3 flex flex-col gap-space-md">
            <div className="p-space-lg rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-sm overflow-hidden relative border border-outline-variant/15">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-label-caps text-label-caps text-primary uppercase text-[10px]">Silicon Profile</span>
                <span className="text-on-surface-variant">4nm ARM64</span>
              </div>
              <div className="flex items-center gap-space-sm mt-1">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary shadow-sm border border-outline-variant/15 shrink-0">
                  <span className="material-symbols-outlined text-2xl">developer_board</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-sm text-body-md font-semibold text-on-surface truncate">
                    Snapdragon X Elite
                  </span>
                  <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs truncate">
                    Hexagon NPU Tier-1
                  </span>
                </div>
              </div>

              <div className="mt-space-xs pt-space-xs flex flex-col gap-1 font-mono text-xs border-t border-outline-variant/10">
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>Context Cache Efficiency</span>
                  <span className="text-primary font-semibold">99.4%</span>
                </div>
                <svg className="w-full h-8 text-primary overflow-visible" fill="none" viewBox="0 0 200 32">
                  <path d="M0,28 L30,22 L60,25 L90,14 L120,18 L150,8 L180,10 L200,4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  <path d="M0,28 L30,22 L60,25 L90,14 L120,18 L150,8 L180,10 L200,4 L200,32 L0,32 Z" fill="currentColor" fillOpacity="0.1"></path>
                </svg>
              </div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/15 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span>Kernel Driver</span>
                <span className="text-on-surface">v4.2.11-qc</span>
              </div>
              <div className="flex items-center justify-between text-on-surface-variant">
                <span>INT4 Weight Matrix</span>
                <span className="text-primary font-bold">Enabled</span>
              </div>
              <div className="flex items-center justify-between text-on-surface-variant">
                <span>Zero-Data Egress</span>
                <span className="text-primary font-bold">Verified</span>
              </div>
            </div>
          </div>

          {/* Right Column / Settings Modules (Span 9) */}
          <div className="xl:col-span-9 flex flex-col gap-space-xl">
            {/* 1. AI & MODEL ENGINE */}
            <section className="p-space-lg sm:p-space-xl rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-lg border border-outline-variant/15">
              <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/15">
                <div className="flex items-center gap-space-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">psychology</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">AI & Model Engine</h2>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Calibrate runtime precision and cognitive reasoning structures
                    </span>
                  </div>
                </div>
                <span className="font-label-caps text-label-caps px-2 py-0.5 rounded-full bg-surface-container-high text-primary uppercase font-mono text-[10px]">
                  Engine Active
                </span>
              </div>

              {/* Local Model Select */}
              <div className="flex flex-col gap-space-xs">
                <label className="font-body-sm text-body-sm font-semibold text-on-surface flex items-center justify-between" htmlFor="model-select">
                  <span>Local Model Checkpoint</span>
                  <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-primary font-mono text-xs">
                    Resident in LPDDR5x RAM
                  </span>
                </label>
                <div className="relative">
                  <select
                    id="model-select"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full h-11 px-space-md pr-10 rounded-lg bg-surface-container-highest text-on-surface font-mono text-xs appearance-none focus:outline-none focus:ring-2 focus:ring-primary shadow-sm cursor-pointer border border-outline-variant/20"
                  >
                    <option value="qwen">Qwen3-4B-Instruct-Q4 (Recommended for 45 TOPS NPU)</option>
                    <option value="llama">Llama-3.2-3B-Instruct-INT4 (Low Footprint Core)</option>
                    <option value="deepseek">DeepSeek-R1-Distill-7B-INT4 (Reasoning Heavy)</option>
                    <option value="mistral">Mistral-Nemo-8B-Q4_K_M (Expanded Context 128k)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none text-base">
                    expand_more
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                  Model executes entirely within local memory space with zero cloud tokenization overhead.
                </p>
              </div>

              {/* Inference Mode Control */}
              <div className="flex flex-col gap-space-xs pt-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm font-semibold text-on-surface">Inference Execution Mode</span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-mono text-[10px]">
                    Runtime Strategy
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-1 rounded-xl bg-surface-container-lowest border border-outline-variant/15">
                  <button
                    type="button"
                    onClick={() => setInferMode('ultra')}
                    className={`py-2.5 px-3 rounded-lg text-center transition-all flex flex-col items-center ${
                      inferMode === 'ultra'
                        ? 'bg-surface-container-high text-primary font-semibold shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span className="font-body-sm text-body-sm font-semibold">Ultra-Low Latency</span>
                    <span className="font-mono text-xs text-on-surface-variant">&lt; 14ms first-token</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInferMode('balanced')}
                    className={`py-2.5 px-3 rounded-lg text-center transition-all flex flex-col items-center ${
                      inferMode === 'balanced'
                        ? 'bg-surface-container-high text-primary font-semibold shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span className="font-body-sm text-body-sm font-semibold">Balanced</span>
                    <span className="font-mono text-xs text-on-surface-variant">Optimal thermal load</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInferMode('cot')}
                    className={`py-2.5 px-3 rounded-lg text-center transition-all flex flex-col items-center ${
                      inferMode === 'cot'
                        ? 'bg-surface-container-high text-primary font-semibold shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span className="font-body-sm text-body-sm font-semibold">Deep Chain-of-Thought</span>
                    <span className="font-mono text-xs text-on-surface-variant">Multi-pass derivation</span>
                  </button>
                </div>
              </div>

              {/* Persona Selector */}
              <div className="flex flex-col gap-space-xs pt-space-xs">
                <span className="font-body-sm text-body-sm font-semibold text-on-surface">Tutor Cognitive Persona</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                  <label
                    onClick={() => setPersona('academic')}
                    className={`p-space-md rounded-xl cursor-pointer transition-all flex flex-col gap-space-xs border ${
                      persona === 'academic'
                        ? 'bg-surface-container-high border-primary'
                        : 'bg-surface-container-highest border-transparent hover:bg-surface-container-high'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-body-md font-semibold text-on-surface">Academic & Rigorous</span>
                      <input
                        type="radio"
                        name="persona"
                        checked={persona === 'academic'}
                        onChange={() => setPersona('academic')}
                        className="text-primary accent-primary w-4 h-4 cursor-pointer"
                      />
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                      Formal formulations, IEEE derivations, and uncompromising scientific syntax.
                    </p>
                  </label>

                  <label
                    onClick={() => setPersona('intuitive')}
                    className={`p-space-md rounded-xl cursor-pointer transition-all flex flex-col gap-space-xs border ${
                      persona === 'intuitive'
                        ? 'bg-surface-container-high border-primary'
                        : 'bg-surface-container-highest border-transparent hover:bg-surface-container-high'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-body-md font-semibold text-on-surface">Simplified & Intuitive</span>
                      <input
                        type="radio"
                        name="persona"
                        checked={persona === 'intuitive'}
                        onChange={() => setPersona('intuitive')}
                        className="text-primary accent-primary w-4 h-4 cursor-pointer"
                      />
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                      First-principles intuition, visual analogies, and mental friction minimization.
                    </p>
                  </label>

                  <label
                    onClick={() => setPersona('socratic')}
                    className={`p-space-md rounded-xl cursor-pointer transition-all flex flex-col gap-space-xs border ${
                      persona === 'socratic'
                        ? 'bg-surface-container-high border-primary'
                        : 'bg-surface-container-highest border-transparent hover:bg-surface-container-high'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-body-md font-semibold text-on-surface">Socratic Exam Prep</span>
                      <input
                        type="radio"
                        name="persona"
                        checked={persona === 'socratic'}
                        onChange={() => setPersona('socratic')}
                        className="text-primary accent-primary w-4 h-4 cursor-pointer"
                      />
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                      Guided questioning, simulated gatekeeper prompts, and mistake analysis.
                    </p>
                  </label>
                </div>
              </div>
            </section>

            {/* 2. PRIVACY & DATA VAULT */}
            <section className="p-space-lg sm:p-space-xl rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-lg border border-outline-variant/15">
              <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/15">
                <div className="flex items-center gap-space-sm">
                  <div className="w-8 h-8 rounded-lg bg-secondary-container/30 text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">shield</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Privacy & Data Vault</h2>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Cryptographic local perimeter and storage controls
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-high text-secondary font-mono text-[10px]">
                  <span className="material-symbols-outlined text-xs">lock</span>
                  <span className="font-label-caps text-label-caps uppercase">Hardware Encrypted</span>
                </div>
              </div>

              {/* Air-Gapped Toggle */}
              <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-highest border border-outline-variant/10">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-body-md text-body-md font-semibold text-on-surface">Local Processing Guardrail</span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-primary-container/10 text-primary uppercase">
                      Hardware Enforced
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                    Strictly enforce air-gapped execution. All networking sockets are hard-killed at socket level during model queries.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input
                    type="checkbox"
                    checked={airgapEnabled}
                    onChange={(e) => setAirgapEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-primary-container after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                </label>
              </div>

              {/* Storage Meter Card */}
              <div className="p-space-md rounded-xl bg-surface-container-highest flex flex-col gap-space-sm border border-outline-variant/10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-on-surface-variant text-base">hard_drive</span>
                    <span className="font-body-sm text-body-sm font-semibold text-on-surface">Data Storage Utilization</span>
                  </div>
                  <span className="font-mono text-xs text-on-surface-variant">
                    Local NVMe Vault: <span className="text-primary font-semibold">47.9 MB</span> used of <span className="text-on-surface font-semibold">8.0 GB</span> allocated
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-surface-container overflow-hidden flex">
                  <div className="h-full bg-primary" style={{ width: '8.5%' }}></div>
                  <div className="h-full bg-secondary" style={{ width: '4.2%' }}></div>
                  <div className="h-full bg-tertiary-container" style={{ width: '2.1%' }}></div>
                </div>
              </div>
            </section>

            {/* 3. HARDWARE & ACCELERATION */}
            <section className="p-space-lg sm:p-space-xl rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-lg border border-outline-variant/15">
              <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/15">
                <div className="flex items-center gap-space-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">developer_board</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Hardware & Co-Processor</h2>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Direct Hexagon NPU allocation and dispatch tuning
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md font-mono text-xs">
                <div className="p-3 rounded-lg bg-surface-container-highest border border-outline-variant/10">
                  <span className="text-outline block text-[10px]">NPU Core Allocation</span>
                  <span className="text-primary font-bold text-base mt-1 block">12 Cores (Max)</span>
                  <span className="text-on-surface-variant text-[10px]">All Hexagon units engaged</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-highest border border-outline-variant/10">
                  <span className="text-outline block text-[10px]">Thermal Budget Cap</span>
                  <span className="text-secondary font-bold text-base mt-1 block">42.0°C</span>
                  <span className="text-on-surface-variant text-[10px]">Throttling safety guardrail</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-highest border border-outline-variant/10">
                  <span className="text-outline block text-[10px]">Direct Memory Access</span>
                  <span className="text-tertiary font-bold text-base mt-1 block">Zero-Copy DMA</span>
                  <span className="text-on-surface-variant text-[10px]">Low latency tensor pipe</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
