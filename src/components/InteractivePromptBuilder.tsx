import React, { useState } from 'react';
import { Terminal, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';
import { SkillItem } from '../data/skillsData';

interface InteractivePromptBuilderProps {
  skills: SkillItem[];
  onOpenSkill: (skill: SkillItem) => void;
}

export const InteractivePromptBuilder: React.FC<InteractivePromptBuilderProps> = ({
  skills,
  onOpenSkill,
}) => {
  const [selectedSkillId, setSelectedSkillId] = useState<string>(skills[0]?.id || '');
  const [userContext, setUserContext] = useState<string>('Refactor hero section and navigation bar for optimal mobile responsiveness');
  const [copied, setCopied] = useState(false);

  const selectedSkill = skills.find(s => s.id === selectedSkillId) || skills[0];

  const generatedPrompt = selectedSkill
    ? `Please use the skill [${selectedSkill.name}] (${selectedSkill.path}).\nTask Context: ${userContext}\nEnsure all guidelines regarding ${selectedSkill.tags.slice(0, 4).join(', ')} are strictly followed.`
    : '';

  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Agent Prompt & Trigger Generator</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Compose Agent Skill Directives
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Select any playbook from the 87 available standards, customize your intent, and generate ready-to-paste agent instructions.
        </p>
      </div>

      <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 backdrop-blur-md shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {/* Select Skill */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Target Playbook
            </label>
            <select
              value={selectedSkillId}
              onChange={(e) => setSelectedSkillId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-sans"
            >
              {skills.map((s) => (
                <option key={s.id} value={s.id}>
                  [{s.category.split(' ')[0]}] {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Info Box */}
          <div className="rounded-xl bg-slate-950/80 border border-slate-800/80 p-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-medium text-emerald-400">{selectedSkill.category}</span>
                <span className="font-mono text-[11px]">{selectedSkill.subcategory}</span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2">
                {selectedSkill.description}
              </p>
            </div>
            <button
              onClick={() => onOpenSkill(selectedSkill)}
              className="self-end mt-2 text-[11px] font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              View Full Playbook <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Task Context input */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Specific Task or Implementation Goal
          </label>
          <textarea
            value={userContext}
            onChange={(e) => setUserContext(e.target.value)}
            rows={3}
            placeholder="Describe what feature, refactor, or audit you need the agent to perform..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
          />
        </div>

        {/* Generated Output Preview */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              Generated Agent Directive
            </span>
            <button
              onClick={copyPrompt}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold transition-all shadow-md shadow-emerald-500/20"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Directive'}</span>
            </button>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0d131f] p-4 text-xs font-mono text-slate-200 leading-relaxed overflow-x-auto whitespace-pre-wrap">
            {generatedPrompt}
          </div>
        </div>
      </div>
    </div>
  );
};
