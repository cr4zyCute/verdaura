import React from 'react';
import { Sparkles, Bookmark, Layers, Terminal, Grid } from 'lucide-react';

interface NavbarProps {
  activeView: 'catalog' | 'matrix' | 'prompts';
  setActiveView: (view: 'catalog' | 'matrix' | 'prompts') => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  bookmarksCount,
  onOpenBookmarks,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070b14]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div 
          onClick={() => setActiveView('catalog')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500/20 via-emerald-500/10 to-teal-500/20 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-500/10 group-hover:border-emerald-400 transition-colors">
            <Sparkles className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-white tracking-tight">Soothers</span>
              <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Skills Hub
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Engineering Playbooks & Agent Architectures
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <nav className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800">
          <button
            onClick={() => setActiveView('catalog')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'catalog'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Playbooks</span>
          </button>

          <button
            onClick={() => setActiveView('matrix')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'matrix'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Architecture</span> Matrix
          </button>

          <button
            onClick={() => setActiveView('prompts')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'prompts'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Prompt</span> Generator
          </button>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Tech badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/40 border border-slate-700/50 text-[11px] font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Vite + Tailwind
          </div>

          {/* Bookmarks toggle */}
          <button
            onClick={onOpenBookmarks}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-xs font-medium text-slate-200 transition-colors"
            title="Saved Playbooks"
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarksCount > 0 ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">Saved</span>
            {bookmarksCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {bookmarksCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
