import React from 'react';
import NeuralEmblem from './NeuralEmblem';

export default function Sidebar({ currentView, setCurrentView, onOpenSearch, isMobileOpen, setIsMobileOpen }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'study-twin', label: 'Study Twin', icon: 'psychology' },
    { id: 'ai-tutor', label: 'AI Tutor', icon: 'smart_toy' },
    { id: 'my-materials', label: 'My Materials', icon: 'folder_open' },
    { id: 'exam-mode', label: 'Exam Mode', icon: 'timer' },
    { id: 'rapid-quiz', label: 'Rapid Quiz', icon: 'flash_on' },
    { id: 'progress', label: 'Progress', icon: 'insights' },
    { id: 'snapdragon-ai', label: 'Snapdragon AI', icon: 'memory' },
    { id: 'offline-mode', label: 'Offline Mode', icon: 'wifi_off' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`fixed left-0 top-0 h-full w-72 bg-surface-container-lowest/95 backdrop-blur-xl z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.25)] border-r border-outline-variant/20 transition-transform duration-300 lg:translate-x-0 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Header */}
          <div className="h-16 px-space-lg flex items-center justify-between border-b border-outline-variant/10">
            <button 
              onClick={() => { setCurrentView('landing'); setIsMobileOpen && setIsMobileOpen(false); }}
              className="flex items-center gap-space-sm text-left group"
            >
              <NeuralEmblem className="h-8 w-8 object-contain transition-transform group-hover:scale-105" size={32} />
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none group-hover:text-primary transition-colors">
                  SAHAYAK AI
                </span>
                <div className="mt- space-xs flex items-center gap-space-xs">
                  <span className="font-label-caps text-label-caps px-1.5 py-0.5 rounded-full bg-primary-container/15 text-primary uppercase font-mono tracking-wider">
                    ON-DEVICE AI
                  </span>
                </div>
              </div>
            </button>
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Search Bar Dock */}
          <div className="px-space-md py-space-sm">
            <button
              onClick={onOpenSearch}
              type="button"
              className="w-full h-10 px-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container flex items-center gap-space-sm text-on-surface-variant transition-colors border border-outline-variant/15 text-left group"
            >
              <span className="material-symbols-outlined text-base group-hover:text-primary transition-colors">search</span>
              <span className="font-body-sm text-body-sm flex-1 text-outline">Search neural workspace...</span>
              <span className="font-mono-telemetry-sm text-mono-telemetry-sm px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant border border-outline-variant/20">⌘K</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 px-space-md mt-space-xs">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    if (setIsMobileOpen) setIsMobileOpen(false);
                  }}
                  className={`flex items-center gap-space-md px-space-md py-space-sm rounded-lg transition-all text-left ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-semibold shadow-[0_0_16px_rgba(0,210,255,0.25)]'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <span className={`material-symbols-outlined text-xl ${isActive ? 'text-on-primary-container' : 'text-primary/70'}`}>
                    {item.icon}
                  </span>
                  <span className="font-body-md text-body-md">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Landing View link */}
          <div className="px-space-md mt-4 pt-4 border-t border-outline-variant/15">
            <button
              onClick={() => {
                setCurrentView('landing');
                if (setIsMobileOpen) setIsMobileOpen(false);
              }}
              className={`w-full flex items-center gap-space-md px-space-md py-2 rounded-lg text-left transition-all ${
                currentView === 'landing'
                  ? 'bg-surface-container-high text-primary font-semibold'
                  : 'text-outline hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-lg">rocket_launch</span>
              <span className="font-body-sm text-body-sm">Architecture & Showcase</span>
            </button>
          </div>
        </div>

        {/* Telemetry & User Footer */}
        <div className="flex flex-col gap-space-sm p-space-md bg-surface-container-lowest border-t border-outline-variant/15">
          {/* AI Ready Telemetry */}
          <div className="flex items-center justify-between px-space-sm py-1.5 rounded-full bg-surface-container-low border border-outline-variant/20">
            <div className="flex items-center gap-space-xs pl-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-label-caps text-label-caps text-on-surface tracking-wider uppercase pl-1 font-mono">
                AI Ready
              </span>
            </div>
            <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-primary font-semibold">
              0ms Lag
            </span>
          </div>

          {/* Hardware TOPS Badge */}
          <div className="flex items-center gap-space-xs px-space-sm py-1.5 rounded-full bg-surface-container-high text-primary border border-outline-variant/15">
            <span className="material-symbols-outlined text-sm text-primary-container">bolt</span>
            <span className="font-label-caps text-label-caps text-on-surface uppercase tracking-wide font-mono text-[10px]">
              Snapdragon NPU (45 TOPS)
            </span>
          </div>

          {/* User Profile */}
          <div 
            onClick={() => { setCurrentView('settings'); if (setIsMobileOpen) setIsMobileOpen(false); }}
            className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer border border-outline-variant/10"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center ring-1 ring-primary/30 shrink-0">
              <span className="text-xs font-bold text-on-primary leading-none">KK</span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-headline-sm text-body-md font-semibold text-on-surface truncate">Kumaran k</span>
              <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant truncate">B.Tech CS | Local Vault</span>
            </div>
            <span className="material-symbols-outlined text-primary text-sm">verified_user</span>
          </div>
        </div>
      </aside>
    </>
  );
}
