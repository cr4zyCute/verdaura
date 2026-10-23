import React from 'react';
import { Bookmark, ExternalLink, Zap, Terminal, FolderCode } from 'lucide-react';
import { SkillItem } from '../data/skillsData';

interface SkillCardProps {
  skill: SkillItem;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onSelect: (skill: SkillItem) => void;
  onCopyTrigger: (text: string) => void;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  isBookmarked,
  onToggleBookmark,
  onSelect,
  onCopyTrigger,
}) => {
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'Core Foundations':
        return {
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          dot: 'bg-emerald-400',
          hoverBorder: 'hover:border-emerald-500/40',
          accent: 'text-emerald-400',
        };
      case 'Frontend Engineering':
        return {
          badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
          dot: 'bg-cyan-400',
          hoverBorder: 'hover:border-cyan-500/40',
          accent: 'text-cyan-400',
        };
      case 'Backend Systems':
      default:
        return {
          badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
          dot: 'bg-indigo-400',
          hoverBorder: 'hover:border-indigo-500/40',
          accent: 'text-indigo-400',
        };
    }
  };

  const theme = getCategoryTheme(skill.category);

  return (
    <div
      onClick={() => onSelect(skill)}
      className={`group relative flex flex-col justify-between rounded-2xl p-5 bg-slate-900/50 backdrop-blur-md border border-slate-800/80 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 ${theme.hoverBorder}`}
    >
      <div>
        {/* Top Header: Category & Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${theme.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`}></span>
              {skill.category}
            </span>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/50">
              {skill.subcategory}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(skill.id);
            }}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            className={`p-1.5 rounded-lg border transition-all ${
              isBookmarked
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                : 'bg-slate-800/40 border-slate-700/40 text-slate-400 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Skill Title */}
        <h3 className="text-base md:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors tracking-tight line-clamp-1 mb-2">
          {skill.name}
        </h3>

        {/* Description */}
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed line-clamp-2 mb-4">
          {skill.description}
        </p>

        {/* Triggers Pill / Primary Trigger */}
        {skill.triggers && skill.triggers.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400 mb-1.5">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Activation Trigger:</span>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                onCopyTrigger(skill.triggers[0]);
              }}
              className="group/pill inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/70 hover:bg-slate-800 text-[11px] font-mono text-slate-300 border border-slate-700/60 transition-colors w-full justify-between"
              title="Click to copy trigger phrase"
            >
              <span className="truncate">"{skill.triggers[0]}"</span>
              <Terminal className="w-3 h-3 text-slate-400 group-hover/pill:text-emerald-400 shrink-0" />
            </div>
          </div>
        )}
      </div>

      {/* Footer info: File path & Action */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 mt-2">
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400 truncate max-w-[65%]">
          <FolderCode className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{skill.path}</span>
        </span>
        <span className="inline-flex items-center gap-1 font-medium text-slate-300 group-hover:text-emerald-400 transition-colors">
          View <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
