import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { SkillItem } from '../data/skillsData';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedSkills: SkillItem[];
  onSelectSkill: (skill: SkillItem) => void;
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedSkills,
  onSelectSkill,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md h-full bg-[#0a0f1c] border-l border-slate-800 p-6 flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h2 className="text-lg font-bold text-white">Saved Playbooks</h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {bookmarkedSkills.length}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close saved drawer"
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {bookmarkedSkills.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-3">
                <Bookmark className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-slate-300">No saved playbooks yet</p>
              <p className="text-xs text-slate-500 mt-1">
                Click the bookmark icon on any skill card to pin it here for rapid access.
              </p>
            </div>
          ) : (
            bookmarkedSkills.map((skill) => (
              <div
                key={skill.id}
                onClick={() => {
                  onSelectSkill(skill);
                  onClose();
                }}
                className="group p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 cursor-pointer transition-all flex items-center justify-between gap-3"
              >
                <div className="truncate">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 block mb-0.5">
                    {skill.category}
                  </span>
                  <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors truncate">
                    {skill.name}
                  </h4>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {skill.subcategory}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveBookmark(skill.id);
                    }}
                    title="Remove from saved"
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {bookmarkedSkills.length > 0 && (
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between shrink-0">
            <button
              onClick={onClearAll}
              className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
            >
              Clear all bookmarks
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
