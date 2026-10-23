import React, { useEffect, useState } from 'react';
import { 
  X, Bookmark, Check, ChevronLeft, ChevronRight, 
  Terminal, FolderCode, Sparkles, Zap, Layers, Compass
} from 'lucide-react';
import { SkillItem } from '../data/skillsData';
import { MarkdownViewer } from './MarkdownViewer';

interface SkillDetailModalProps {
  skill: SkillItem | null;
  allSkills: SkillItem[];
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onClose: () => void;
  onNavigate: (skill: SkillItem) => void;
}

export const SkillDetailModal: React.FC<SkillDetailModalProps> = ({
  skill,
  allSkills,
  isBookmarked,
  onToggleBookmark,
  onClose,
  onNavigate,
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedPath, setCopiedPath] = useState(false);
  const [activeTab, setActiveTab] = useState<'playbook' | 'quick-ref'>('playbook');

  // Handle keyboard navigation & scroll locking
  useEffect(() => {
    if (!skill) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        const currentIndex = allSkills.findIndex(s => s.id === skill.id);
        if (currentIndex < allSkills.length - 1) {
          onNavigate(allSkills[currentIndex + 1]);
        }
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = allSkills.findIndex(s => s.id === skill.id);
        if (currentIndex > 0) {
          onNavigate(allSkills[currentIndex - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [skill, allSkills, onClose, onNavigate]);

  if (!skill) return null;

  const currentIndex = allSkills.findIndex(s => s.id === skill.id);
  const prevSkill = currentIndex > 0 ? allSkills[currentIndex - 1] : null;
  const nextSkill = currentIndex < allSkills.length - 1 ? allSkills[currentIndex + 1] : null;

  const copyPromptInstruction = () => {
    const prompt = `@skill:${skill.id} Apply guidelines from ${skill.name} (${skill.path}) for the current project task.`;
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const copySkillPath = () => {
    navigator.clipboard.writeText(skill.path);
    setCopiedPath(true);
    setTimeout(() => setCopiedPath(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-5xl h-[92vh] max-h-[92dvh] flex flex-col rounded-2xl bg-[#090e1a] border border-slate-700/80 shadow-2xl shadow-black overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Persistent Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-900/80 backdrop-blur shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              {skill.category}
            </span>
            <span className="hidden sm:inline-block text-xs font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60 truncate">
              {skill.subcategory}
            </span>
            <span className="text-xs text-slate-400">
              {currentIndex + 1} of {allSkills.length}
            </span>
          </div>

          {/* Action Buttons: Prev/Next, Bookmark, Close */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Prev / Next Keyboard Navigation */}
            <div className="flex items-center border border-slate-800 rounded-lg overflow-hidden bg-slate-950/60">
              <button
                onClick={() => prevSkill && onNavigate(prevSkill)}
                disabled={!prevSkill}
                title="Previous skill (ArrowLeft)"
                aria-label="Previous skill"
                className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-slate-800"></div>
              <button
                onClick={() => nextSkill && onNavigate(nextSkill)}
                disabled={!nextSkill}
                title="Next skill (ArrowRight)"
                aria-label="Next skill"
                className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(skill.id)}
              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              className={`p-2 rounded-lg border transition-all ${
                isBookmarked
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Close button with mandatory accessible aria-label */}
            <button
              onClick={onClose}
              aria-label="Close preview"
              className="p-2 rounded-lg bg-slate-800/60 hover:bg-red-500/20 hover:text-red-400 border border-slate-700/60 text-slate-300 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Header Title & Metadata Bar */}
        <div className="px-4 sm:px-6 py-4 bg-slate-900/40 border-b border-slate-800/60 shrink-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {skill.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
                {skill.description}
              </p>
            </div>

            {/* Quick Copy Action Bar */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={copyPromptInstruction}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-medium transition-all"
              >
                {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Terminal className="w-3.5 h-3.5" />}
                <span>{copiedPrompt ? 'Command Copied' : 'Copy Agent Trigger'}</span>
              </button>

              <button
                onClick={copySkillPath}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-mono transition-all"
                title="Copy relative file path"
              >
                {copiedPath ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FolderCode className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{skill.path.split('/').pop()}</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-3 mt-4 border-t border-slate-800/60 pt-3">
            <button
              onClick={() => setActiveTab('playbook')}
              className={`flex items-center gap-1.5 text-xs font-medium pb-1.5 border-b-2 transition-all ${
                activeTab === 'playbook'
                  ? 'border-emerald-400 text-emerald-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Full Playbook & Architecture
            </button>
            <button
              onClick={() => setActiveTab('quick-ref')}
              className={`flex items-center gap-1.5 text-xs font-medium pb-1.5 border-b-2 transition-all ${
                activeTab === 'quick-ref'
                  ? 'border-emerald-400 text-emerald-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Quick Reference & Rules
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6 space-y-6">
          {activeTab === 'playbook' ? (
            <MarkdownViewer content={skill.content} />
          ) : (
            <div className="space-y-6">
              {/* Quick Trigger Box */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
                <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Activation Triggers
                </h3>
                {skill.triggers && skill.triggers.length > 0 ? (
                  <ul className="space-y-1.5 text-xs font-mono text-slate-300">
                    {skill.triggers.map((t, idx) => (
                      <li key={idx} className="flex items-center gap-2 bg-slate-950/70 p-2 rounded border border-slate-800">
                        <Terminal className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>"{t}"</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-400">Trigger on tasks involving {skill.name.toLowerCase()}.</p>
                )}
              </div>

              {/* Major Sections */}
              {skill.sections && skill.sections.length > 0 && (
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Key Architecture Topics
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {skill.sections.map((sec, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                        <span className="font-medium">{sec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tag Cloud */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
                <h3 className="text-sm font-semibold text-white mb-2">Related Domains</h3>
                <div className="flex flex-wrap gap-1.5">
                  {skill.tags.map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-slate-800 text-xs text-slate-300 font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Persistent Toolbar */}
        <div className="px-4 sm:px-6 py-3 border-t border-slate-800 bg-slate-900/90 backdrop-blur flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Path:</span>
            <code className="text-emerald-400/90 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              {skill.path}
            </code>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 hidden sm:inline">Use Arrow keys ← → to browse</span>
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
