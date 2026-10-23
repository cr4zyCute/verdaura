import { useState, useEffect, useMemo } from 'react';
import { SKILLS_DATA, SkillItem } from './data/skillsData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryFilter } from './components/CategoryFilter';
import { SkillCard } from './components/SkillCard';
import { SkillDetailModal } from './components/SkillDetailModal';
import { ArchitectureMatrix } from './components/ArchitectureMatrix';
import { InteractivePromptBuilder } from './components/InteractivePromptBuilder';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { Footer } from './components/Footer';
import { SearchX, CheckCircle } from 'lucide-react';

export function App() {
  const [activeView, setActiveView] = useState<'catalog' | 'matrix' | 'prompts'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'tags'>('name');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('soothers_bookmarked_skills');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('soothers_bookmarked_skills', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from saved playbooks');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to quick bookmarks');
        return [...prev, id];
      }
    });
  };

  const clearAllBookmarks = () => {
    setBookmarkedIds([]);
    showToast('All bookmarks cleared');
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: SKILLS_DATA.length,
      core: SKILLS_DATA.filter((s) => s.category === 'Core Foundations').length,
      frontend: SKILLS_DATA.filter((s) => s.category === 'Frontend Engineering').length,
      backend: SKILLS_DATA.filter((s) => s.category === 'Backend Systems').length,
    };
  }, []);

  // Available subcategories for current category
  const availableSubcategories = useMemo(() => {
    const pool =
      selectedCategory === 'all'
        ? SKILLS_DATA
        : SKILLS_DATA.filter((s) => s.category === selectedCategory);
    return Array.from(new Set(pool.map((s) => s.subcategory))).sort();
  }, [selectedCategory]);

  // Filtered and sorted skills
  const filteredSkills = useMemo(() => {
    let result = SKILLS_DATA;

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((s) => s.category === selectedCategory);
    }

    // Subcategory filter
    if (selectedSubcategory !== 'all') {
      result = result.filter((s) => s.subcategory === selectedSubcategory);
    }

    // Search query filter (multi-token search)
    if (searchQuery.trim()) {
      const tokens = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
      result = result.filter((skill) => {
        const targetStr = `${skill.name} ${skill.description} ${skill.subcategory} ${skill.category} ${skill.tags.join(' ')} ${skill.triggers.join(' ')} ${skill.path}`.toLowerCase();
        return tokens.every((token) => targetStr.includes(token));
      });
    }

    // Sorting
    return [...result].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'category') {
        return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
      } else {
        return b.tags.length - a.tags.length;
      }
    });
  }, [selectedCategory, selectedSubcategory, searchQuery, sortBy]);

  const bookmarkedSkills = useMemo(() => {
    return SKILLS_DATA.filter((s) => bookmarkedIds.includes(s.id));
  }, [bookmarkedIds]);

  const handleSelectSkillById = (id: string) => {
    const target = SKILLS_DATA.find((s) => s.id === id);
    if (target) {
      setSelectedSkill(target);
    }
  };

  const handleCopyTrigger = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied trigger: "${text}"`);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 text-xs font-medium shadow-2xl shadow-black animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        bookmarksCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsFavoritesOpen(true)}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {activeView === 'catalog' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              totalSkills={SKILLS_DATA.length}
              coreCount={categoryCounts.core}
              frontendCount={categoryCounts.frontend}
              backendCount={categoryCounts.backend}
              onQuickFilter={(kw) => {
                setSearchQuery(kw);
                setSelectedCategory('all');
                setSelectedSubcategory('all');
              }}
            />

            {/* Catalog Grid Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <CategoryFilter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSubcategory={selectedSubcategory}
                setSelectedSubcategory={setSelectedSubcategory}
                subcategories={availableSubcategories}
                totalFilteredCount={filteredSkills.length}
                categoryCounts={categoryCounts}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />

              {/* Skills Grid */}
              {filteredSkills.length > 0 ? (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredSkills.map((skill) => (
                    <SkillCard
                      key={skill.id}
                      skill={skill}
                      isBookmarked={bookmarkedIds.includes(skill.id)}
                      onToggleBookmark={toggleBookmark}
                      onSelect={(s) => setSelectedSkill(s)}
                      onCopyTrigger={handleCopyTrigger}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-16 text-center py-12 px-4 rounded-2xl bg-slate-900/40 border border-slate-800">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-400 mx-auto mb-4">
                    <SearchX className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white">No playbooks found</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    No skills matched "{searchQuery}". Try searching for broader terms like "cloudflare", "auth", "design", or "sentry".
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedSubcategory('all');
                    }}
                    className="mt-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-400 transition-colors"
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeView === 'matrix' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <ArchitectureMatrix
              skills={SKILLS_DATA}
              onSelectSkill={(s) => setSelectedSkill(s)}
            />
          </div>
        )}

        {activeView === 'prompts' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <InteractivePromptBuilder
              skills={SKILLS_DATA}
              onOpenSkill={(s) => setSelectedSkill(s)}
            />
          </div>
        )}
      </main>

      {/* Skill Detail Modal */}
      <SkillDetailModal
        skill={selectedSkill}
        allSkills={filteredSkills}
        isBookmarked={selectedSkill ? bookmarkedIds.includes(selectedSkill.id) : false}
        onToggleBookmark={toggleBookmark}
        onClose={() => setSelectedSkill(null)}
        onNavigate={(next) => setSelectedSkill(next)}
      />

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        bookmarkedSkills={bookmarkedSkills}
        onSelectSkill={(s) => setSelectedSkill(s)}
        onRemoveBookmark={toggleBookmark}
        onClearAll={clearAllBookmarks}
      />

      {/* Footer */}
      <Footer onSelectSkillById={handleSelectSkillById} />
    </div>
  );
}

export default App;
