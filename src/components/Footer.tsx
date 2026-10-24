import React from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';

interface FooterProps {
  onSelectSkillById: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectSkillById }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">Verdaura Skills Hub</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              A comprehensive technical repository unifying 87 verified engineering playbooks, responsive design tokens, cloud edge microservices, and identity architectures for production systems.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Vite 5.4 + Tailwind CSS 3.4
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                React 18 + TS
              </span>
            </div>
          </div>

          {/* Core Foundations */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Core Foundations
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onSelectSkillById('fullstack-backend-engineering')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Fullstack Backend Engineering
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSkillById('responsive-design-mastery')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Responsive Design Mastery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSkillById('website-creation-design')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Website Creation & Design
                </button>
              </li>
            </ul>
          </div>

          {/* Ecosystem Highlights */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Ecosystem Playbooks
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Cloudflare Workers & Durable Objects</li>
              <li>Better-Auth Identity & 2FA</li>
              <li>Sentry Tracing & Monitoring</li>
              <li>Vercel React Best Practices</li>
              <li>Security Audits & Hardening</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© 2026 Verdaura. Designed strictly adhering to Responsive Design Mastery & Clean Architecture.</span>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
