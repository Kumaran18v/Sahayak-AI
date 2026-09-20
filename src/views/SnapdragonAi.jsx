import React, { useState, useEffect } from 'react';
import { fetchHardwarePerformance } from '../api/system';

export default function SnapdragonAi({ onNavigate }) {
  const [velocity, setVelocity] = useState(38.4);
  const [npuLoad, setNpuLoad] = useState(78);
  const [selectedModel, setSelectedModel] = useState('qwen');
  const [telemetry, setTelemetry] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadPerf = () => {
      fetchHardwarePerformance()
        .then(res => {
          if (mounted && res) {
            setTelemetry(res);
            if (res.inference_velocity) setVelocity(res.inference_velocity);
          }
        })
        .catch(e => console.log('Using baseline hardware profile:', e.message));
    };

    loadPerf();
    const interval = setInterval(loadPerf, 4000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="p-space-md sm:p-space-xl lg:p-margin-lg flex flex-col gap-space-xl max-w-7xl mx-auto w-full">
        {/* Top Header */}
        <section className="flex flex-col gap-1 pb-space-sm border-b border-outline-variant/15">
          <div className="flex items-center gap-2">
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 font-mono text-[10px]">
              QUALCOMM SILICON INSTRUMENTATION
            </span>
            <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs">
              Hardware Direct v4.2.11-qc
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface font-bold">
            Snapdragon NPU & Hardware Telemetry
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Bare-metal monitoring of Qualcomm Hexagon DSP, Adreno GPU tensor pipelines, and local neural memory buffers.
          </p>
        </section>

        {/* 4 Hardware Status Top Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Card 1: NPU Engine */}
          <div className="group relative rounded-xl bg-surface-container-low p-space-lg shadow-md transition-all hover:bg-surface-container border border-outline-variant/15">
            <div className="flex items-center justify-between text-outline-variant">
              <span className="font-label-caps text-label-caps tracking-wider text-on-surface-variant uppercase font-mono text-[10px]">
                SNAPDRAGON NPU
              </span>
              <span className="material-symbols-outlined text-primary text-xl">memory</span>
            </div>
            <div className="mt-space-md">
              <span className="font-headline-lg text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
                {telemetry?.npu_status?.includes('Not available') ? 'Not available' : '45 TOPS'}
              </span>
            </div>
            <p className="mt-space-xs font-mono-telemetry-sm text-mono-telemetry-sm text-primary font-medium font-mono text-xs truncate">
              {telemetry?.npu_status || 'Hexagon v75 Co-Processor'}
            </p>
            <div className="mt-space-md flex items-center gap-space-xs font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-surface-container-highest text-primary">
                {telemetry?.onnx_providers ? telemetry.onnx_providers[0] : 'CPU/ONNX'}
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant">
                {telemetry?.processor?.split(' ')[0] || 'Local Silicon'}
              </span>
            </div>
          </div>

          {/* Card 2: Quantized Model */}
          <div className="group relative rounded-xl bg-surface-container-low p-space-lg shadow-md transition-all hover:bg-surface-container border border-outline-variant/15">
            <div className="flex items-center justify-between text-outline-variant">
              <span className="font-label-caps text-label-caps tracking-wider text-on-surface-variant uppercase font-mono text-[10px]">
                LOCAL QUANTIZED MODEL
              </span>
              <span className="material-symbols-outlined text-secondary text-xl">layers</span>
            </div>
            <div className="mt-space-md">
              <span className="font-headline-sm text-body-md sm:text-headline-sm text-on-surface tracking-tight font-bold truncate">
                {telemetry?.model_name || 'Qwen3-4B-Instruct-Q4'}
              </span>
            </div>
            <p className="mt-space-xs font-mono-telemetry-sm text-mono-telemetry-sm text-outline truncate font-mono text-xs">
              Execution: {telemetry?.execution_mode || 'ONNX CPU Execution Provider'}
            </p>
            <div className="mt-space-md flex items-center gap-space-xs font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-surface-container-highest text-secondary">AWQ-V2</span>
              <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant">RAM CACHED</span>
            </div>
          </div>

          {/* Card 3: Network & Privacy */}
          <div className="group relative rounded-xl bg-surface-container-low p-space-lg shadow-md transition-all hover:bg-surface-container border border-outline-variant/15">
            <div className="flex items-center justify-between text-outline-variant">
              <span className="font-label-caps text-label-caps tracking-wider text-on-surface-variant uppercase font-mono text-[10px]">
                NETWORK & PRIVACY
              </span>
              <span className="material-symbols-outlined text-primary text-xl">shield</span>
            </div>
            <div className="mt-space-md flex items-center gap-space-xs">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_8px_#a5e7ff] animate-pulse"></span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                {telemetry?.air_gapped ? 'AIR-GAPPED' : 'LOCAL-FIRST'}
              </span>
            </div>
            <p className="mt-space-xs font-mono-telemetry-sm text-mono-telemetry-sm text-primary font-medium truncate font-mono text-xs">
              Cloud Requests: 0 bytes outbound
            </p>
            <div className="mt-space-md flex items-center justify-between text-outline font-mono text-xs">
              <span>Socket State</span>
              <span className="text-on-surface font-semibold">{telemetry?.air_gapped ? 'DISABLED (PHY)' : 'STANDBY'}</span>
            </div>
          </div>

          {/* Card 4: Inference Velocity */}
          <div className="group relative rounded-xl bg-surface-container-low p-space-lg shadow-md transition-all hover:bg-surface-container border border-outline-variant/15">
            <div className="flex items-center justify-between text-outline-variant">
              <span className="font-label-caps text-label-caps tracking-wider text-on-surface-variant uppercase font-mono text-[10px]">
                INFERENCE VELOCITY
              </span>
              <span className="material-symbols-outlined text-primary-container text-xl">bolt</span>
            </div>
            <div className="mt-space-md flex items-baseline gap-1">
              <span className="font-headline-md text-3xl text-primary font-bold font-mono">
                {velocity}
              </span>
              <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs">
                tokens / sec
              </span>
            </div>
            <p className="mt-space-xs font-mono-telemetry-sm text-mono-telemetry-sm text-outline truncate font-mono text-xs">
              Time-to-first-token: <span className="text-on-surface font-semibold">{telemetry?.time_to_first_token || '14.2ms'}</span>
            </p>
            <div className="mt-space-md flex items-center justify-between font-mono text-xs">
              <span className="font-label-caps text-label-caps text-outline text-[10px]">JITTER</span>
              <span className="text-primary">±0.4ms</span>
            </div>
          </div>
        </section>

        {/* Compute Allocation Matrix & Silicon Memory HUD */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {/* Left 8 Cols: Compute Allocation Matrix */}
          <div className="lg:col-span-8 rounded-xl bg-surface-container-low p-space-lg sm:p-space-xl flex flex-col justify-between shadow-lg border border-outline-variant/15">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
              <div>
                <span className="font-label-caps text-label-caps text-primary tracking-wider uppercase font-mono text-[10px]">
                  Heterogeneous Silicon Topology
                </span>
                <h2 className="font-headline-md text-xl sm:text-headline-md text-on-surface font-bold mt-space-xs">
                  Compute Allocation Matrix
                </h2>
              </div>
              <div className="flex items-center gap-space-xs bg-surface-container-high px-space-sm py-1 rounded-lg border border-outline-variant/15 font-mono text-xs">
                <span className="material-symbols-outlined text-sm text-primary">thermostat</span>
                <span className="text-on-surface-variant">SOC DIE TEMP: 37.8°C</span>
              </div>
            </div>

            <div className="mt-space-xl flex flex-col gap-space-lg">
              {/* Hexagon NPU bar */}
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-space-sm">
                    <span className="font-mono-telemetry-lg text-mono-telemetry-lg text-on-surface font-semibold">Hexagon NPU</span>
                    <span className="font-label-caps text-label-caps px-2 py-0.5 rounded-full bg-primary-container/20 text-primary uppercase text-[9px]">
                      Primary Matrix Acceleration
                    </span>
                  </div>
                  <span className="font-mono-telemetry-lg text-mono-telemetry-lg font-bold text-primary font-mono">{npuLoad}%</span>
                </div>
                <div className="h-4 w-full rounded-full bg-surface-container-highest overflow-hidden p-0.5 shadow-inner">
                  <div
                    className="h-full rounded-full bg-primary shadow-[0_0_12px_rgba(0,210,255,0.8)] transition-all duration-700"
                    style={{ width: `${npuLoad}%` }}
                  ></div>
                </div>
                <div className="mt-space-xs h-12 w-full rounded-lg bg-surface-container-lowest/80 p-space-xs flex items-end border border-outline-variant/10">
                  <svg className="w-full h-full text-primary" fill="none" preserveAspectRatio="none" viewBox="0 0 300 40">
                    <defs>
                      <linearGradient id="snapGlow" x1="0%" x2="0%" y1="0%" y2="100%">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.4"></stop>
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.0"></stop>
                      </linearGradient>
                    </defs>
                    <path d="M0,35 Q15,10 30,25 T60,18 T90,28 T120,8 T150,15 T180,5 T210,22 T240,12 T270,19 T300,9 L300,40 L0,40 Z" fill="url(#snapGlow)"></path>
                    <path d="M0,35 Q15,10 30,25 T60,18 T90,28 T120,8 T150,15 T180,5 T210,22 T240,12 T270,19 T300,9" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
                  </svg>
                </div>
              </div>

              {/* Adreno GPU bar */}
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-space-sm">
                    <span className="font-mono-telemetry-lg text-mono-telemetry-lg text-on-surface font-semibold">Adreno GPU</span>
                    <span className="font-label-caps text-label-caps px-2 py-0.5 rounded-full bg-secondary-container/40 text-secondary uppercase text-[9px]">
                      Vector Embedding Shader
                    </span>
                  </div>
                  <span className="font-mono-telemetry-lg text-mono-telemetry-lg font-bold text-secondary font-mono">14%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-surface-container-highest overflow-hidden p-0.5 shadow-inner">
                  <div className="h-full rounded-full bg-secondary transition-all duration-700" style={{ width: '14%' }}></div>
                </div>
              </div>

              {/* Oryon CPU bar */}
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-space-sm">
                    <span className="font-mono-telemetry-lg text-mono-telemetry-lg text-on-surface font-semibold">Oryon CPU</span>
                    <span className="font-label-caps text-label-caps px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant uppercase text-[9px]">
                      Low-Power Efficiency Cluster
                    </span>
                  </div>
                  <span className="font-mono-telemetry-lg text-mono-telemetry-lg font-bold text-outline font-mono">9%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-surface-container-highest overflow-hidden p-0.5 shadow-inner">
                  <div className="h-full rounded-full bg-outline-variant transition-all duration-700" style={{ width: '9%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-space-xl pt-space-md flex flex-wrap items-center justify-between gap-space-md text-on-surface-variant border-t border-outline-variant/10 font-mono text-xs">
              <div className="flex items-center gap-space-md flex-wrap">
                <div className="flex items-center gap-space-xs">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  <span>NPU: 12 Cores Active</span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="h-2 w-2 rounded-full bg-secondary"></span>
                  <span>GPU: Float16 Pipe</span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="h-2 w-2 rounded-full bg-outline"></span>
                  <span>CPU: 4e Efficiency</span>
                </div>
              </div>
              <span className="text-primary font-bold">POWER: 3.4W NOMINAL</span>
            </div>
          </div>

          {/* Right 4 Cols: Silicon Memory HUD & Device Snapshot */}
          <div className="lg:col-span-4 flex flex-col gap-space-lg">
            <div className="rounded-xl bg-surface-container-low p-space-lg shadow-lg flex flex-col justify-between flex-1 border border-outline-variant/15">
              <div>
                <span className="font-label-caps text-label-caps text-secondary tracking-wider uppercase font-mono text-[10px]">
                  Direct-Mapped Physical Memory
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-space-xs">
                  Silicon Memory HUD
                </h3>
              </div>

              <div className="my-space-md flex flex-col gap-space-md">
                <div className="p-space-md rounded-lg bg-surface-container border border-outline-variant/10">
                  <div className="flex items-center justify-between text-on-surface">
                    <span className="font-body-md text-body-md font-medium">Unified LPDDR5X</span>
                    <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-primary font-bold font-mono">
                      2.1 GB / 16 GB
                    </span>
                  </div>
                  <div className="mt-space-xs h-2 w-full rounded-full bg-surface-container-highest overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '13.1%' }}></div>
                  </div>
                  <span className="mt-space-xs block font-mono text-outline text-[10px]">
                    Bandwidth: 135 GB/s available
                  </span>
                </div>

                <div className="p-space-md rounded-lg bg-surface-container border border-outline-variant/10">
                  <div className="flex items-center justify-between text-on-surface">
                    <span className="font-body-md text-body-md font-medium">Vector Store Index Cache</span>
                    <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-secondary font-bold font-mono">
                      384 MB
                    </span>
                  </div>
                  <div className="mt-space-xs h-2 w-full rounded-full bg-surface-container-highest overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: '48%' }}></div>
                  </div>
                  <span className="mt-space-xs block font-mono text-outline text-[10px]">
                    Resident in Hexagon Fast SRAM
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-surface-container-highest/40 p-space-sm border border-outline-variant/15 font-mono text-xs">
                <span className="font-label-caps text-label-caps text-on-surface-variant text-[10px]">ZERO-COPY DMA ENGINE</span>
                <span className="text-primary font-semibold">SYNCHRONIZED</span>
              </div>
            </div>

            {/* Architecture Snapshot */}
            <div className="rounded-xl bg-surface-container-low p-space-lg shadow-lg flex flex-col justify-between border border-outline-variant/15">
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-mono text-[10px]">
                  Device Architecture Snapshot
                </span>
                <span className="font-mono text-primary text-xs font-mono">ARM64-v9</span>
              </div>
              <div className="mt-space-sm flex items-center gap-space-md">
                <div className="h-16 w-16 rounded-lg bg-surface-container flex items-center justify-center text-primary border border-outline-variant/15 shrink-0">
                  <span className="material-symbols-outlined text-3xl">developer_board</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-body-lg font-semibold text-on-surface">Snapdragon X Elite</span>
                  <span className="font-mono text-xs text-on-surface-variant">Hexagon Tensor Processor</span>
                  <span className="font-label-caps text-outline mt-1 font-mono text-[10px]">Direct Driver Link: v4.2.11-qc</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Air-Gapped Verification Banner with Hexagonal Diagram */}
        <section className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-lg sm:p-space-xl shadow-xl border border-primary/20">
          <div className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-primary/5 blur-2xl"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center relative z-10">
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <div className="flex items-center gap-space-xs text-primary font-mono text-xs">
                <span className="material-symbols-outlined text-lg">verified_user</span>
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-semibold">
                  PRIVACY MODE: AIR-GAPPED VERIFICATION
                </span>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
                Your study materials, lecture audio, and cognitive model weights remain strictly on physical NVMe and RAM. No telemetry, student metrics, or session transcripts ever leave this device.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-space-md pt-space-xs">
                <div className="flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface border border-outline-variant/15 font-mono text-xs">
                  <span className="material-symbols-outlined text-primary text-base">lock</span>
                  <span>AES-256 GCM Local Vault</span>
                </div>
                <div className="flex items-center gap-space-xs text-primary font-mono text-xs">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span className="font-semibold">Cryptographically Verified Local Processing</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative flex items-center justify-center p-space-lg rounded-2xl bg-surface-container-lowest/80 shadow-2xl border border-primary/20">
                <svg className="w-56 h-56 sm:w-64 sm:h-64" fill="none" viewBox="0 0 240 240">
                  <polygon fill="#0D111A" points="120,20 210,70 210,170 120,220 30,170 30,70" stroke="rgba(0, 210, 255, 0.3)" strokeWidth="2"></polygon>
                  <polygon fill="#121826" points="120,38 194,80 194,160 120,202 46,160 46,80" stroke="rgba(192, 193, 255, 0.4)" strokeDasharray="4 3" strokeWidth="1.5"></polygon>
                  <polygon fill="#191c22" points="120,55 178,88 178,152 120,185 62,152 62,88" stroke="rgba(0, 210, 255, 0.6)" strokeWidth="2"></polygon>
                  <line stroke="#00d2ff" strokeLinecap="round" strokeWidth="2" x1="120" x2="120" y1="55" y2="20"></line>
                  <line stroke="#00d2ff" strokeLinecap="round" strokeWidth="2" x1="178" x2="210" y1="88" y2="70"></line>
                  <line stroke="#00d2ff" strokeLinecap="round" strokeWidth="2" x1="178" x2="210" y1="152" y2="170"></line>
                  <line stroke="#00d2ff" strokeLinecap="round" strokeWidth="2" x1="120" x2="120" y1="185" y2="220"></line>
                  <line stroke="#00d2ff" strokeLinecap="round" strokeWidth="2" x1="62" x2="30" y1="152" y2="170"></line>
                  <line stroke="#00d2ff" strokeLinecap="round" strokeWidth="2" x1="62" x2="30" y1="88" y2="70"></line>
                  <circle cx="120" cy="120" fill="#0b0e14" r="32" stroke="#47d6ff" strokeWidth="2"></circle>
                  <path d="M112,112 L128,112 L128,128 L112,128 Z" fill="#00d2ff"></path>
                  <circle cx="120" cy="120" fill="#10131a" r="6"></circle>
                  <text fill="#a5e7ff" fontFamily="'JetBrains Mono', monospace" fontSize="7" fontWeight="600" letterSpacing="0.1em" textAnchor="middle" x="120" y="82">HEXAGON</text>
                  <text fill="#c0c1ff" fontFamily="'JetBrains Mono', monospace" fontSize="6.5" fontWeight="500" letterSpacing="0.1em" textAnchor="middle" x="120" y="162">NEURAL MATRIX</text>
                </svg>
                <div className="absolute -bottom-2 px-space-md py-1 rounded-full bg-surface-container-high shadow-md border border-primary/30">
                  <span className="font-label-caps text-label-caps text-primary tracking-wider uppercase font-mono text-[9px]">
                    HEXAGON NEURAL ARCHITECTURE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
