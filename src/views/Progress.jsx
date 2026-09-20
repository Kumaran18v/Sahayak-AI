import React from 'react';

export default function Progress({ onNavigate }) {
  const topics = [
    { name: 'Processes', status: 'Mastered', percentage: 90, color: 'bg-primary-fixed-dim', badgeColor: 'bg-primary/10 text-primary' },
    { name: 'Threads', status: 'Mastered', percentage: 84, color: 'bg-primary-fixed-dim', badgeColor: 'bg-primary/10 text-primary' },
    { name: 'Scheduling', status: 'Developing', percentage: 65, color: 'bg-surface-tint', badgeColor: 'bg-surface-tint/20 text-surface-tint' },
    { name: 'Paging & Virtual Memory', status: 'Developing', percentage: 72, color: 'bg-surface-tint', badgeColor: 'bg-surface-tint/20 text-surface-tint' },
    { name: 'Deadlocks', status: 'Critical Weak Area', percentage: 42, color: 'bg-tertiary-container', badgeColor: 'bg-tertiary-container/20 text-tertiary' },
  ];

  const weeklyActivity = [
    { day: 'M', height: '45%', opacity: 'bg-primary-container/20' },
    { day: 'T', height: '60%', opacity: 'bg-primary-container/30' },
    { day: 'W', height: '35%', opacity: 'bg-primary-container/50' },
    { day: 'T', height: '80%', opacity: 'bg-primary-container/70' },
    { day: 'F', height: '95%', opacity: 'bg-primary-container shadow-[0_0_12px_rgba(0,210,255,0.4)]', active: true },
    { day: 'S', height: '70%', opacity: 'bg-primary-container/60' },
    { day: 'S', height: '50%', opacity: 'bg-primary-container/40' },
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="p-space-md sm:p-space-xl lg:p-margin-lg flex flex-col gap-space-xl max-w-7xl mx-auto w-full">
        {/* Top Header */}
        <section className="flex flex-col gap-1 pb-space-sm border-b border-outline-variant/15">
          <div className="flex items-center gap-2">
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 font-mono text-[10px]">
              ON-DEVICE COGNITIVE ANALYTICS
            </span>
            <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant font-mono text-xs">
              Continuous NPU Vector Tracking
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface font-bold">
            Cognitive Progress & Mastery Matrix
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Longitudinal retention velocity, syllabus coverage, and predictive exam clearance trajectories.
          </p>
        </section>

        {/* 3 Vital Metric Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {/* Metric 1 */}
          <div className="p-space-lg rounded-xl bg-surface-container-low backdrop-blur-xl shadow-md flex flex-col justify-between border border-outline-variant/15">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-mono text-[10px]">
                  Syllabus Mastery
                </span>
                <span className="px-2 py-0.5 rounded-full bg-primary-container/10 font-mono text-primary font-mono text-xs">
                  +8.4% this week
                </span>
              </div>
              <div className="flex items-baseline gap-space-xs">
                <span className="font-headline-lg text-3xl font-bold text-on-surface">74%</span>
                <span className="font-body-md text-body-md text-on-surface-variant">CS-301 Covered</span>
              </div>
            </div>
            <div className="pt-space-sm mt-space-sm border-t border-outline-variant/15">
              <div className="flex items-center gap-space-sm pt-2">
                <span className="material-symbols-outlined text-primary text-lg">schema</span>
                <span className="font-mono text-xs text-on-surface">38 total concepts mapped</span>
              </div>
              <div className="flex items-center gap-space-sm text-on-surface-variant pt-1 font-mono text-xs">
                <span className="material-symbols-outlined text-sm text-outline">check_circle</span>
                <span>18 concepts verified solid</span>
              </div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="p-space-lg rounded-xl bg-surface-container-low backdrop-blur-xl shadow-md flex flex-col justify-between border border-outline-variant/15">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-mono text-[10px]">
                  Study Velocity
                </span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-mono text-secondary font-mono text-xs">
                  Local Only
                </span>
              </div>
              <div className="flex items-baseline gap-space-xs">
                <span className="font-headline-lg text-3xl font-bold text-on-surface">14.8</span>
                <span className="font-body-md text-body-md text-on-surface-variant">Hours</span>
              </div>
            </div>
            <div className="pt-space-sm mt-space-sm border-t border-outline-variant/15">
              <div className="flex items-center gap-space-sm pt-2">
                <span className="material-symbols-outlined text-primary-fixed-dim text-lg">style</span>
                <span className="font-mono text-xs text-on-surface">324 flashcards & drills solved</span>
              </div>
              <div className="flex items-center gap-space-sm text-on-surface-variant pt-1 font-mono text-xs">
                <span className="material-symbols-outlined text-sm text-outline">timer</span>
                <span>Zero cloud dependency latency</span>
              </div>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="p-space-lg rounded-xl bg-surface-container-low backdrop-blur-xl shadow-md flex flex-col justify-between border border-outline-variant/15">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-mono text-[10px]">
                  Predicted Exam Readiness
                </span>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 font-mono text-primary font-mono text-xs">
                  Conf: High
                </span>
              </div>
              <div className="flex items-baseline gap-space-xs">
                <span className="font-headline-lg text-3xl font-bold text-on-surface">86%</span>
                <span className="font-body-md text-body-md text-on-surface-variant">Projected Score</span>
              </div>
            </div>
            <div className="space-y-space-xs pt-space-sm mt-space-sm border-t border-outline-variant/15">
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div className="bg-primary-container h-full rounded-full transition-all duration-700" style={{ width: '86%' }}></div>
              </div>
              <div className="flex justify-between items-center font-mono text-xs text-on-surface-variant">
                <span>Minimum Target: 75%</span>
                <span className="text-primary font-semibold">+11% Margin</span>
              </div>
            </div>
          </div>
        </section>

        {/* Middle Two Main Panels */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {/* Left: Topic Performance Matrix */}
          <div className="lg:col-span-6 p-space-lg rounded-xl bg-surface-container-low backdrop-blur-xl shadow-md space-y-space-lg border border-outline-variant/15">
            <div className="flex items-center justify-between">
              <div className="space-y-space-xs">
                <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider font-mono text-[10px]">
                  Operating Systems Substrate
                </span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Topic Performance Matrix</h2>
              </div>
              <button className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors border border-outline-variant/20">
                <span className="material-symbols-outlined text-base">filter_list</span>
              </button>
            </div>

            <div className="space-y-space-md">
              {topics.map((t, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center text-body-sm">
                    <span className="font-body-md text-body-md text-on-surface font-medium">{t.name}</span>
                    <div className="flex items-center gap-space-sm">
                      <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] uppercase ${t.badgeColor}`}>
                        {t.status}
                      </span>
                      <span className="font-mono text-on-surface font-semibold text-xs">{t.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                    <div className={`h-full ${t.color} rounded-full transition-all duration-700`} style={{ width: `${t.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-space-sm rounded-lg bg-surface-container flex items-center justify-between text-on-surface-variant font-mono text-xs border border-outline-variant/10">
              <span>Inference: 18ms latency</span>
              <span>Hexagon Tensor Cores Engaged</span>
            </div>
          </div>

          {/* Right: Weekly Activity & Ebbinghaus Retention Graph */}
          <div className="lg:col-span-6 p-space-lg rounded-xl bg-surface-container-low backdrop-blur-xl shadow-md space-y-space-lg flex flex-col justify-between border border-outline-variant/15">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-space-xs">
                  <span className="font-label-caps text-label-caps text-secondary uppercase tracking-wider font-mono text-[10px]">
                    Temporal Dynamics
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Weekly Activity & Retention Graph</h2>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  <span className="text-on-surface-variant">Hours Logged</span>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="h-32 flex items-end justify-between gap-2 pt-4 px-2">
                {weeklyActivity.map((bar, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div
                      className={`w-full rounded-t transition-all duration-300 ${bar.opacity}`}
                      style={{ height: bar.height }}
                    ></div>
                    <span className={`font-mono text-xs ${bar.active ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                      {bar.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ebbinghaus Decay Model */}
            <div className="p-space-md rounded-xl bg-surface-container space-y-space-sm border border-outline-variant/10">
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-mono text-[10px]">
                  Ebbinghaus Retention Decay Model
                </span>
                <span className="font-mono text-tertiary font-mono text-xs font-semibold">
                  Rapid Decay Alert
                </span>
              </div>
              <div className="relative h-16 w-full">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 300 60">
                  <path className="text-primary" d="M 0,10 Q 75,15 150,22 T 300,28" fill="none" stroke="currentColor" strokeWidth="2"></path>
                  <path className="text-tertiary-container" d="M 0,15 Q 75,30 150,45 T 300,58" fill="none" stroke="currentColor" strokeDasharray="4 4" strokeWidth="2"></path>
                </svg>
              </div>
              <div className="flex flex-wrap items-center justify-between text-on-surface-variant font-mono text-xs pt-1 gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span>CPU Scheduling (Stable Retention)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
                  <span className="text-tertiary">Deadlocks (Critical Decay)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Prescriptive Directive Bottom Banner */}
        <section className="relative p-space-lg rounded-xl bg-surface-container-low shadow-xl overflow-hidden border border-tertiary-container/30">
          <div className="absolute inset-0 bg-gradient-to-r from-tertiary-container/10 via-transparent to-transparent pointer-events-none"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg">
            <div className="space-y-space-sm max-w-3xl">
              <div className="flex flex-wrap items-center gap-space-sm">
                <span className="px-2.5 py-1 rounded-full bg-tertiary-container/20 text-tertiary font-mono text-[10px] uppercase flex items-center gap-1.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-tertiary-container animate-ping"></span>
                  AI Prescriptive Directive
                </span>
                <span className="font-mono text-xs text-on-surface-variant">Quantized Local Heuristic</span>
              </div>
              <h3 className="font-headline-md text-xl sm:text-headline-md text-on-surface flex items-center gap-2 font-bold">
                <span>🚨 Priority Focus Area: Deadlocks</span>
                <span className="text-tertiary font-mono text-base sm:text-lg">(42% Confidence)</span>
              </h3>
              <div className="p-space-md rounded-lg bg-surface-container-high/80 text-on-surface font-body-md text-body-md border border-outline-variant/15">
                <p>
                  Spend your next 10 minutes revising <span className="text-primary font-semibold">Deadlock prevention and avoidance</span> (specifically Banker's Algorithm matrix calculation) to raise your projected course grade by an estimated <span className="text-primary font-bold font-mono">+7.4%</span>.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-space-sm shrink-0 w-full lg:w-auto">
              <button
                onClick={() => onNavigate('exam-mode')}
                className="h-12 px-space-lg rounded-lg bg-primary-container text-on-primary-container font-headline-sm text-sm font-semibold flex items-center justify-center gap-space-xs hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all"
                type="button"
              >
                <span>Start Focused Revision (10 min)</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
              <button
                onClick={() => onNavigate('rapid-quiz')}
                className="h-10 px-space-md rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-variant transition-colors flex items-center justify-center gap-space-xs font-body-sm text-body-sm border border-outline-variant/20"
                type="button"
              >
                <span className="material-symbols-outlined text-base text-outline">event_repeat</span>
                <span>Schedule Spaced Drill</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
