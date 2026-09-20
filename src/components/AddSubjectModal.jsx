import React, { useState } from 'react';
import { createCustomSubject } from '../api/studyTwin';

export default function AddSubjectModal({ isOpen, onClose, onSubjectCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    shortName: '',
    icon: 'menu_book',
    color: 'primary',
    examDate: 'Exam in 28 days',
    credits: 3,
    topicsText: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const ICONS = [
    { id: 'menu_book', label: 'Book' },
    { id: 'terminal', label: 'Terminal' },
    { id: 'code', label: 'Code' },
    { id: 'database', label: 'Database' },
    { id: 'hub', label: 'Network' },
    { id: 'memory', label: 'Hardware' },
    { id: 'psychology', label: 'AI/Brain' },
    { id: 'functions', label: 'Math' },
    { id: 'science', label: 'Science' },
  ];

  const COLORS = [
    { id: 'primary', label: 'Cyan (Default)', bg: 'bg-primary' },
    { id: 'emerald', label: 'Emerald Green', bg: 'bg-emerald-400' },
    { id: 'tertiary', label: 'Amber Orange', bg: 'bg-amber-400' },
    { id: 'secondary', label: 'Purple Accent', bg: 'bg-purple-400' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) {
      setError('Subject Name and Subject Code are required.');
      return;
    }

    setLoading(true);
    setError(null);

    const topics = formData.topicsText
      ? formData.topicsText.split(',').map((t) => t.trim()).filter(Boolean)
      : null;

    const payload = {
      name: formData.name.trim(),
      code: formData.code.trim().toUpperCase(),
      shortName: formData.shortName.trim() || formData.code.trim().toUpperCase(),
      icon: formData.icon,
      color: formData.color,
      examDate: formData.examDate.trim() || 'Exam in 30 days',
      credits: Number(formData.credits) || 3,
      initialTopics: topics,
    };

    try {
      const created = await createCustomSubject(payload);
      if (onSubjectCreated) {
        onSubjectCreated(created);
      }
      onClose();
    } catch (err) {
      console.error('Failed to create subject:', err);
      setError(err.message || 'Failed to save subject. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-surface-container-high border border-outline-variant/30 rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between border-b border-outline-variant/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center border border-primary/30">
              <span className="material-symbols-outlined text-xl">library_add</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface leading-tight">
                Add Curriculum Subject
              </h3>
              <p className="text-xs text-on-surface-variant font-mono mt-0.5">
                On-device neural knowledge graph & study syllabus
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
          {error && (
            <div className="p-3 rounded-lg bg-tertiary-container/20 border border-tertiary-container/40 text-tertiary font-medium">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="font-semibold text-on-surface">Subject / Course Name *</label>
              <input
                type="text"
                placeholder="e.g. Compiler Design"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-surface-container-lowest border border-outline-variant/25 rounded-xl px-3 py-2 text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary focus:outline-none text-xs"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-on-surface">Code *</label>
              <input
                type="text"
                placeholder="e.g. CS-305"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full bg-surface-container-lowest border border-outline-variant/25 rounded-xl px-3 py-2 text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary focus:outline-none uppercase font-mono text-xs"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-on-surface">Target Exam Window</label>
              <input
                type="text"
                placeholder="e.g. Exam in 24 days"
                value={formData.examDate}
                onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                className="w-full bg-surface-container-lowest border border-outline-variant/25 rounded-xl px-3 py-2 text-on-surface focus:border-primary focus:outline-none text-xs"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-on-surface">Credit Hours</label>
              <input
                type="number"
                min="1"
                max="8"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                className="w-full bg-surface-container-lowest border border-outline-variant/25 rounded-xl px-3 py-2 text-on-surface focus:border-primary focus:outline-none text-xs"
              />
            </div>
          </div>

          {/* Initial Topics / Modules */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-on-surface">Initial Syllabus Modules / Topics</label>
              <span className="text-[10px] text-on-surface-variant font-mono">Comma-separated</span>
            </div>
            <input
              type="text"
              placeholder="e.g. Lexical Analysis, LL(1) Parsers, Code Optimization, Register Allocation"
              value={formData.topicsText}
              onChange={(e) => setFormData({ ...formData, topicsText: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant/25 rounded-xl px-3 py-2 text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary focus:outline-none text-xs"
            />
            <span className="text-[10px] text-on-surface-variant">
              These will instantly emerge as interactive neural nodes in the Study Twin graph and generate recall drills.
            </span>
          </div>

          {/* Icon Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-on-surface">Subject Icon</label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {ICONS.map((icon) => (
                <button
                  key={icon.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon: icon.id })}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all shrink-0 ${
                    formData.icon === icon.id
                      ? 'bg-primary/20 border-primary text-primary shadow-sm'
                      : 'bg-surface-container-lowest border-outline-variant/20 text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{icon.id}</span>
                  <span className="text-[9px] font-mono">{icon.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-on-surface">Vector Ring Accent</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {COLORS.map((col) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: col.id })}
                  className={`px-2.5 py-1.5 rounded-lg border text-left flex items-center gap-2 text-[11px] transition-all ${
                    formData.color === col.id
                      ? 'border-primary bg-primary/10 text-on-surface font-semibold'
                      : 'border-outline-variant/20 bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${col.bg}`} />
                  <span className="truncate">{col.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant/15 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-highest text-on-surface font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-primary text-on-primary font-bold hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-base animate-spin">refresh</span>
                  <span>Generating Graph...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">add</span>
                  <span>Add to Curriculum</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
