import React from 'react';
import { Search, Sparkles, Code2, Server, Layout, Zap, X } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalSkills: number;
  coreCount: number;
  frontendCount: number;
  backendCount: number;
  onQuickFilter: (keyword: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  totalSkills,
  coreCount,
  frontendCount,
  backendCount,
  onQuickFilter,
}) => {
  const quickKeywords = [
    'Cloudflare',
    'Responsive',
    'Better-Auth',
    'Design System',
    'Sentry',
    'Vercel',
    'Security',
    'Fullstack'
  ];

  return (
    <div className="relative pt-8 pb-10 sm:pt-12 sm:pb-14 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/60 via-transparent to-transparent">
      {/* Background ambient glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top pill */}
        <div className="flex items-center justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 backdrop-blur">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
            <span className="font-medium">Soothers Engineering Stack</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400 font-mono text-[11px]">87 Active Playbooks</span>
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Engineering Playbooks &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Agent Skills Hub
            </span>
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Explore the unified codebase guidelines: from responsive mobile-first UI design and design tokens, to edge serverless workers, auth hardening, and observability.
          </p>
        </div>

        {/* Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-8">
          <div className="p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-bold text-white font-mono">{totalSkills}</div>
              <div className="text-[11px] text-slate-400 font-medium">Total Skills</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-bold text-white font-mono">{coreCount}</div>
              <div className="text-[11px] text-slate-400 font-medium">Core Foundations</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Layout className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-bold text-white font-mono">{frontendCount}</div>
              <div className="text-[11px] text-slate-400 font-medium">Frontend Playbooks</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-bold text-white font-mono">{backendCount}</div>
              <div className="text-[11px] text-slate-400 font-medium">Backend & Cloud</div>
            </div>
          </div>
        </div>

        {/* Live Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-400 transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by skill name, trigger, tag, or topic (e.g., 'responsive', 'sentry', 'auth')..."
              className="w-full pl-11 pr-10 py-3.5 bg-slate-900/80 border border-slate-700/80 focus:border-emerald-500/60 rounded-2xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 shadow-lg shadow-black/40 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Tags */}
          <div className="mt-3 flex items-center gap-1.5 flex-wrap justify-center text-xs text-slate-400">
            <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400 mr-1">
              <Zap className="w-3 h-3 text-amber-400" />
              Popular:
            </span>
            {quickKeywords.map((kw) => (
              <button
                key={kw}
                onClick={() => onQuickFilter(kw)}
                className="px-2.5 py-0.5 rounded-full bg-slate-800/60 hover:bg-slate-700 border border-slate-700/50 hover:border-slate-600 text-slate-300 hover:text-white transition-colors text-[11px]"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
