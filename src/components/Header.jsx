import React, { useState, useEffect, useRef } from 'react';
import { fetchSubjects } from '../api/studyTwin';
import AddSubjectModal from './AddSubjectModal';

export default function Header({
  currentView,
  setCurrentView,
  selectedSubject = 'all',
  onSelectSubject,
  onOpenSearch,
  onToggleMobile
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHubModal, setShowHubModal] = useState(false);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);

  const dropdownRef = useRef(null);

  const DEFAULT_SUBJECTS = [
    { code: 'all', name: 'All Subjects (Unified)', short: 'All Subjects' },
    { code: 'CS-301', name: 'Operating Systems', short: 'CS-301 • OS' },
    { code: 'CS-302', name: 'Computer Networks', short: 'CS-302 • Networks' },
    { code: 'CS-303', name: 'Database Management Systems', short: 'CS-303 • DBMS' },
    { code: 'CS-201', name: 'Data Structures & Algorithms', short: 'CS-201 • DSA' },
    { code: 'CS-401', name: 'Artificial Intelligence & ML', short: 'CS-401 • AI/ML' },
  ];

  const [subjectsList, setSubjectsList] = useState(DEFAULT_SUBJECTS);

  const loadHeaderSubjects = () => {
    fetchSubjects()
      .then(subs => {
        if (subs && subs.length > 0) {
          const formatted = [
            { code: 'all', name: 'All Subjects (Unified)', short: 'All Subjects' },
            ...subs.map(s => ({
              code: s.code,
              name: s.name,
              short: `${s.code} • ${s.shortName || s.name}`
            }))
          ];
          setSubjectsList(formatted);
        }
      })
      .catch(e => console.log('Using baseline header subjects:', e.message));
  };

  useEffect(() => {
    loadHeaderSubjects();
  }, []);

  // Dismiss dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSubjectDropdown(false);
        setShowNotifications(false);
        setShowHubModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubjectCreated = (newSub) => {
    if (onSelectSubject) onSelectSubject(newSub.code);
    loadHeaderSubjects();
  };

  const currentSubjectObj = subjectsList.find(s => s.code === selectedSubject) || subjectsList[0];

  const topNavItems = [
    { id: 'dashboard', label: 'Console' },
    { id: 'study-twin', label: 'Twin Sync' },
    { id: 'snapdragon-ai', label: 'Hexagon Telemetry' },
    { id: 'settings', label: 'Substrate' },
  ];

  return (
    <header ref={dropdownRef} className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface/85 backdrop-blur-xl z-40 flex items-center justify-between px-space-md lg:px-space-xl border-b border-outline-variant/15 shadow-[0_1px_8px_rgba(0,0,0,0.3)]">
      {/* Left side: Mobile Toggle & Hardware badges & Subject Switcher */}
      <div className="flex items-center gap-space-sm lg:gap-space-md">
        <button
          onClick={onToggleMobile}
          type="button"
          className="lg:hidden p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface"
        >
          <span className="material-symbols-outlined text-xl">menu</span>
        </button>

        <div className="flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-low border border-primary/20 shadow-sm">
          <span className="material-symbols-outlined text-base text-primary">security</span>
          <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant hidden sm:inline">
            Zero-Cloud Transmission
          </span>
          <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-primary sm:hidden text-[10px]">
            100% Local
          </span>
        </div>

        {/* Global Subject Selector Pill */}
        <div className="relative">
          <button
            onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high border border-primary/30 hover:border-primary/60 transition-all text-body-sm shadow-sm"
            title="Switch Active Subject"
          >
            <span className="material-symbols-outlined text-sm text-primary">menu_book</span>
            <span className="font-semibold text-primary text-xs tracking-wide">
              {currentSubjectObj.short}
            </span>
            <span className="material-symbols-outlined text-xs text-on-surface-variant">
              expand_more
            </span>
          </button>

          {showSubjectDropdown && (
            <div className="absolute left-0 mt-2 w-64 rounded-xl bg-surface-container-high border border-outline-variant/30 shadow-2xl p-2 z-50 animate-fade-in backdrop-blur-2xl">
              <div className="px-3 py-1.5 text-[10px] font-mono-telemetry uppercase text-on-surface-variant tracking-wider border-b border-outline-variant/15 flex items-center justify-between">
                <span>Curriculum Subjects</span>
                <span className="text-[9px] font-mono text-primary">{subjectsList.length - 1} ACTIVE</span>
              </div>
              <div className="py-1 space-y-0.5 max-h-60 overflow-y-auto">
                {subjectsList.map((sub) => (
                  <button
                    key={sub.code}
                    onClick={() => {
                      if (onSelectSubject) onSelectSubject(sub.code);
                      setShowSubjectDropdown(false);
                    }}
                    type="button"
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-all ${
                      selectedSubject === sub.code
                        ? 'bg-primary/15 text-primary font-semibold'
                        : 'text-on-surface hover:bg-surface-container-highest hover:text-primary'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm opacity-70">
                        {sub.code === 'all' ? 'dashboard' : 'school'}
                      </span>
                      <div>
                        <div className="font-medium leading-tight">{sub.name}</div>
                        {sub.code !== 'all' && (
                          <div className="text-[10px] text-on-surface-variant">{sub.code}</div>
                        )}
                      </div>
                    </div>
                    {selectedSubject === sub.code && (
                      <span className="material-symbols-outlined text-sm text-primary">check</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Add Subject Option */}
              <div className="pt-1.5 mt-1 border-t border-outline-variant/15">
                <button
                  onClick={() => {
                    setShowSubjectDropdown(false);
                    setIsAddSubjectOpen(true);
                  }}
                  type="button"
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs text-primary hover:bg-primary/10 transition-colors font-medium"
                >
                  <span className="material-symbols-outlined text-sm">add_circle</span>
                  <span>+ Add New Subject</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="hidden xl:flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-low border border-secondary/20">
          <span className="material-symbols-outlined text-base text-secondary">speed</span>
          <span className="font-mono-telemetry-sm text-mono-telemetry-sm text-on-surface-variant">
            Thermal: 34°C
          </span>
        </div>
      </div>

      {/* Right side: Top nav tabs + actions */}
      <div className="flex items-center gap-space-md lg:gap-space-lg">
        <nav className="hidden xl:flex items-center gap-space-xs">
          {topNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`px-3 py-1.5 rounded-lg text-body-sm transition-all ${
                currentView === item.id
                  ? 'bg-surface-container-high text-primary font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-space-xs sm:gap-space-sm relative">
          {/* Notification Button */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-lg bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors relative border border-outline-variant/15"
            type="button"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-lg">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary ring-2 ring-surface"></span>
          </button>

          {/* Hub Button */}
          <button
            onClick={() => setShowHubModal(!showHubModal)}
            className="w-9 h-9 rounded-lg bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors border border-outline-variant/15"
            type="button"
            title="Local Neural Hub"
          >
            <span className="material-symbols-outlined text-lg">hub</span>
          </button>

          <div className="h-6 w-px bg-outline-variant/30 mx-space-xs hidden sm:block"></div>

          {/* Profile Quick Click */}
          <button
            onClick={() => setCurrentView('settings')}
            className="flex items-center gap-space-xs p-1 rounded-full hover:ring-2 hover:ring-primary/40 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center ring-1 ring-outline-variant">
              <span className="text-xs font-bold text-on-primary leading-none">KK</span>
            </div>
          </button>

          {/* Notification dropdown */}
          {showNotifications && (
            <div className="absolute top-12 right-0 w-80 rounded-xl bg-surface-container-high border border-outline-variant/30 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20 mb-3">
                <span className="font-headline-sm text-body-md font-semibold text-on-surface">Local Event Log</span>
                <span className="text-[10px] font-mono text-primary px-2 py-0.5 rounded-full bg-primary/10">3 NEW</span>
              </div>
              <div className="space-y-2 text-body-sm">
                <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/10">
                  <div className="flex items-center justify-between text-[11px] text-primary font-mono">
                    <span>NPU Hexagon v75</span>
                    <span>Just now</span>
                  </div>
                  <p className="text-on-surface text-xs mt-1">L1 Tensor cache re-indexed for OS Unit 3.</p>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/10">
                  <div className="flex items-center justify-between text-[11px] text-tertiary font-mono">
                    <span>Study Twin Alert</span>
                    <span>15m ago</span>
                  </div>
                  <p className="text-on-surface text-xs mt-1">Virtual Memory decay predicted in 36 hours. Quick review recommended.</p>
                </div>
              </div>
            </div>
          )}

          {/* Hub Modal */}
          {showHubModal && (
            <div className="absolute top-12 right-0 w-84 rounded-xl bg-surface-container-high border border-primary/30 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20 mb-3">
                <span className="font-headline-sm text-body-md font-semibold text-on-surface">Air-Gapped Mesh Hub</span>
                <span className="text-[10px] font-mono text-secondary px-2 py-0.5 rounded-full bg-secondary-container/20">PEER DISCOVERY</span>
              </div>
              <p className="text-xs text-on-surface-variant mb-3">
                Zero internet required. Bluetooth Low Energy & Wi-Fi Direct peer synchronization ready for study group flashcards.
              </p>
              <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest font-mono text-xs text-primary">
                <span>Nearby Companions:</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Subject Modal */}
      <AddSubjectModal
        isOpen={isAddSubjectOpen}
        onClose={() => setIsAddSubjectOpen(false)}
        onSubjectCreated={handleSubjectCreated}
      />
    </header>
  );
}

