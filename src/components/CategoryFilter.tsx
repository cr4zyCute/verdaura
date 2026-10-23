import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (sub: string) => void;
  subcategories: string[];
  totalFilteredCount: number;
  categoryCounts: {
    all: number;
    core: number;
    frontend: number;
    backend: number;
  };
  sortBy: 'name' | 'category' | 'tags';
  setSortBy: (sort: 'name' | 'category' | 'tags') => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  subcategories,
  totalFilteredCount,
  categoryCounts,
  sortBy,
  setSortBy,
}) => {
  const categories = [
    { id: 'all', label: 'All Playbooks', count: categoryCounts.all },
    { id: 'Core Foundations', label: 'Core Foundations', count: categoryCounts.core },
    { id: 'Frontend Engineering', label: 'Frontend & UI', count: categoryCounts.frontend },
    { id: 'Backend Systems', label: 'Backend & Edge', count: categoryCounts.backend },
  ];

  return (
    <div className="space-y-4">
      {/* Top category tabs & sort controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Main tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800/80 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedSubcategory('all');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700/80'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-slate-800 text-slate-500'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Sort and Count */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-400">
          <span className="font-mono text-slate-400">
            Showing <strong className="text-white font-semibold">{totalFilteredCount}</strong> playbooks
          </span>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-slate-700"
            >
              <option value="name">Sort: A-Z</option>
              <option value="category">Sort: Category</option>
              <option value="tags">Sort: Tags</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subcategory Pills */}
      {subcategories.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5">
          <button
            onClick={() => setSelectedSubcategory('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedSubcategory === 'all'
                ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                : 'bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            All Subcategories
          </button>
          {subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubcategory(sub)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedSubcategory === sub
                  ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                  : 'bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
