import React from 'react';
import { Layers, ShieldCheck, Eye, Cloud, Sparkles, ArrowUpRight } from 'lucide-react';
import { SkillItem } from '../data/skillsData';

interface ArchitectureMatrixProps {
  skills: SkillItem[];
  onSelectSkill: (skill: SkillItem) => void;
}

export const ArchitectureMatrix: React.FC<ArchitectureMatrixProps> = ({
  skills,
  onSelectSkill,
}) => {
  const layers = [
    {
      id: 'foundations',
      title: 'Layer 1: Foundational Architecture & Design Mastery',
      subtitle: 'Core cross-functional standards for responsive design, system architecture & web builds.',
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      borderColor: 'border-emerald-500/30',
      badgeColor: 'bg-emerald-500/10 text-emerald-400',
      items: skills.filter(s => s.category === 'Core Foundations'),
    },
    {
      id: 'frontend',
      title: 'Layer 2: Frontend Engineering & Design Systems',
      subtitle: 'UI styling, brand identity, layout guidelines, Vercel React best practices & view transitions.',
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      borderColor: 'border-cyan-500/30',
      badgeColor: 'bg-cyan-500/10 text-cyan-400',
      items: skills.filter(s => s.category === 'Frontend Engineering'),
    },
    {
      id: 'edge',
      title: 'Layer 3: Cloudflare Edge & Serverless Architecture',
      subtitle: 'Distributed compute, Durable Objects, Turnstile bot detection, and edge caching.',
      icon: <Cloud className="w-5 h-5 text-amber-400" />,
      borderColor: 'border-amber-500/30',
      badgeColor: 'bg-amber-500/10 text-amber-400',
      items: skills.filter(s => s.subcategory.includes('Cloudflare')),
    },
    {
      id: 'security',
      title: 'Layer 4: Authentication, Identity & Security Hardening',
      subtitle: 'Better-Auth (passwords, 2FA, organization scopes), secret serialization & code audits.',
      icon: <ShieldCheck className="w-5 h-5 text-rose-400" />,
      borderColor: 'border-rose-500/30',
      badgeColor: 'bg-rose-500/10 text-rose-400',
      items: skills.filter(s => s.subcategory.includes('Auth') || s.subcategory.includes('Security')),
    },
    {
      id: 'observability',
      title: 'Layer 5: Sentry Observability & QA Systems',
      subtitle: 'End-to-end tracing, error budgets, test-driven development, and automated bug diagnostics.',
      icon: <Eye className="w-5 h-5 text-purple-400" />,
      borderColor: 'border-purple-500/30',
      badgeColor: 'bg-purple-500/10 text-purple-400',
      items: skills.filter(s => s.subcategory.includes('Sentry') || s.subcategory.includes('Testing')),
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          System Architecture Matrix
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          A layered structural view of how each agent skill fits into the Soothers modern application stack.
        </p>
      </div>

      <div className="space-y-6">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={`rounded-2xl bg-slate-900/60 border ${layer.borderColor} p-5 sm:p-6 backdrop-blur-md`}
          >
            {/* Layer Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 shrink-0">
                  {layer.icon}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {layer.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {layer.subtitle}
                  </p>
                </div>
              </div>
              <span className={`self-start sm:self-auto px-2.5 py-1 rounded-full text-xs font-mono font-semibold border ${layer.badgeColor}`}>
                {layer.items.length} Playbooks
              </span>
            </div>

            {/* Grid of items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {layer.items.map((skill) => (
                <div
                  key={skill.id}
                  onClick={() => onSelectSkill(skill)}
                  className="group flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 cursor-pointer transition-all"
                >
                  <div className="truncate pr-2">
                    <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-300 transition-colors truncate">
                      {skill.name}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono truncate mt-0.5">
                      {skill.path.split('/').slice(0, 2).join('/')}
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 shrink-0 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
