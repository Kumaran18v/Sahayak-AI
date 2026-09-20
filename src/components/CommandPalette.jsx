import React, { useState, useEffect } from 'react';

export default function CommandPalette({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');

  const actions = [
    { id: 'dashboard', title: 'Open Dashboard', category: 'Navigation', icon: 'dashboard' },
    { id: 'study-twin', title: 'Study Twin Cognitive Knowledge Graph', category: 'Cognition', icon: 'psychology' },
    { id: 'ai-tutor', title: 'Start AI Tutor Session', category: 'AI Learning', icon: 'smart_toy' },
    { id: 'my-materials', title: 'Browse Local Materials & Vault', category: 'Vault', icon: 'folder_open' },
    { id: 'exam-mode', title: 'Simulate Mock Exam', category: 'Assessments', icon: 'timer' },
    { id: 'rapid-quiz', title: 'Launch Rapid Recall Quiz', category: 'Assessments', icon: 'flash_on' },
    { id: 'progress', title: 'View Cognitive Progress & Analytics', category: 'Analytics', icon: 'insights' },
    { id: 'snapdragon-ai', title: 'Inspect Snapdragon NPU Telemetry', category: 'Hardware', icon: 'memory' },
    { id: 'offline-mode', title: 'Offline Air-Gapped Controls', category: 'Hardware', icon: 'wifi_off' },
    { id: 'settings', title: 'Personalization & Settings', category: 'Preferences', icon: 'settings' },
  ];

  const filtered = actions.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-start justify-center pt-24 px-4">
      <div 
        className="w-full max-w-xl rounded-2xl bg-surface-container-high border border-primary/30 shadow-[0_0_50px_rgba(0,210,255,0.2)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-outline-variant/20 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-xl">search</span>
          <input
            type="text"
            placeholder="Type a command or jump to screen..."
            className="w-full bg-transparent border-none outline-none text-on-surface text-body-md placeholder:text-outline font-medium"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="text-[11px] font-mono text-outline-variant bg-surface-container-low px-2 py-1 rounded">
            ESC to exit
          </span>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-outline text-body-sm">
              No matching commands in local neural workspace.
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose(false);
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container-highest transition-colors text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  </div>
                  <div>
                    <span className="text-body-md font-medium text-on-surface block">{item.title}</span>
                    <span className="text-[11px] font-mono text-outline block">{item.category}</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-sm">
                  arrow_forward
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
