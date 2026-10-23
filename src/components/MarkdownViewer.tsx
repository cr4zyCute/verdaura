import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface MarkdownViewerProps {
  content: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  // Strip YAML frontmatter
  let cleanContent = content;
  if (cleanContent.startsWith('---')) {
    const end = cleanContent.indexOf('---', 3);
    if (end !== -1) {
      cleanContent = cleanContent.substring(end + 3).trim();
    }
  }

  // Parse lines into tokens
  const lines = cleanContent.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLanguage = '';
  let inTable = false;
  let tableBuffer: string[] = [];
  let codeBlockCounter = 0;

  const flushCodeBlock = () => {
    if (codeBuffer.length > 0) {
      const codeText = codeBuffer.join('\n');
      const idx = codeBlockCounter++;
      elements.push(
        <div key={`code-${idx}`} className="my-5 rounded-xl border border-slate-700/60 bg-[#0d131f] overflow-hidden shadow-lg">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/60 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-mono text-emerald-400">
              <Terminal className="w-3.5 h-3.5" />
              {codeLanguage || 'shell'}
            </span>
            <button
              onClick={() => copyToClipboard(codeText, idx)}
              className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              {copiedCodeIndex === idx ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 text-xs md:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed">
            <code>{codeText}</code>
          </pre>
        </div>
      );
      codeBuffer = [];
      codeLanguage = '';
    }
  };

  const flushTable = () => {
    if (tableBuffer.length > 0) {
      const rows = tableBuffer.map(r => 
        r.split('|')
         .map(c => c.trim())
         .filter((c, i, arr) => !(i === 0 && c === '') && !(i === arr.length - 1 && c === ''))
      );
      
      const header = rows[0];
      const bodyRows = rows.slice(2); // Skip separator row

      elements.push(
        <div key={`table-${elements.length}`} className="my-5 overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-800/80 text-slate-200">
                {header.map((col, ci) => (
                  <th key={ci} className="py-2.5 px-4 font-semibold border-b border-slate-700">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
              {bodyRows.map((row, ri) => (
                <tr key={ri} className="hover:bg-slate-800/30 transition-colors">
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-2.5 px-4 text-slate-300">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableBuffer = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle code blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        inCodeBlock = false;
        flushCodeBlock();
      } else {
        if (inTable) {
          inTable = false;
          flushTable();
        }
        inCodeBlock = true;
        codeLanguage = line.trim().replace(/^```/, '').trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Handle tables
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      inTable = true;
      tableBuffer.push(line);
      continue;
    } else if (inTable) {
      inTable = false;
      flushTable();
    }

    // Handle headings
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={i} className="text-2xl md:text-3xl font-extrabold text-white mt-8 mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
          {line.replace(/^#\s+/, '')}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-lg md:text-xl font-bold text-emerald-400 mt-6 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-emerald-500 rounded-full inline-block"></span>
          {line.replace(/^##\s+/, '')}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-base md:text-lg font-semibold text-slate-200 mt-5 mb-2">
          {line.replace(/^###\s+/, '')}
        </h3>
      );
    } else if (line.startsWith('#### ')) {
      elements.push(
        <h4 key={i} className="text-sm font-semibold text-slate-300 mt-3 mb-1 uppercase tracking-wider">
          {line.replace(/^####\s+/, '')}
        </h4>
      );
    } else if (line.startsWith('> [!NOTE]') || line.startsWith('> [!TIP]') || line.startsWith('> [!IMPORTANT]')) {
      const type = line.includes('NOTE') ? 'NOTE' : line.includes('TIP') ? 'TIP' : 'IMPORTANT';
      const color = type === 'TIP' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' :
                    type === 'NOTE' ? 'border-blue-500 bg-blue-500/10 text-blue-300' :
                    'border-amber-500 bg-amber-500/10 text-amber-300';
      elements.push(
        <div key={i} className={`p-4 rounded-xl border-l-4 my-4 ${color}`}>
          <div className="font-bold text-xs uppercase tracking-wide mb-1">{type}</div>
          <p className="text-sm text-slate-200">
            {lines[i + 1]?.replace(/^>\s*/, '') || ''}
          </p>
        </div>
      );
      i++; // skip next line
    } else if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={i} className="border-l-2 border-emerald-500/60 pl-4 py-1.5 my-3 text-slate-300 italic text-sm bg-slate-900/30 rounded-r">
          {line.replace(/^>\s*/, '')}
        </blockquote>
      );
    } else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const rawText = line.trim().replace(/^[-*]\s+/, '');
      // Format inline bold and code
      elements.push(
        <li key={i} className="flex items-start gap-2 text-sm text-slate-300 my-1 ml-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
          <span dangerouslySetInnerHTML={{
            __html: rawText
              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-medium">$1</strong>')
              .replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-emerald-300 px-1 py-0.5 rounded text-xs font-mono">$1</code>')
          }} />
        </li>
      );
    } else if (line.trim().length > 0) {
      elements.push(
        <p key={i} className="text-sm md:text-base text-slate-300 my-3 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: line
              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-medium">$1</strong>')
              .replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-emerald-300 px-1 py-0.5 rounded text-xs font-mono">$1</code>')
          }}
        />
      );
    }
  }

  // Clean remaining
  if (inCodeBlock) flushCodeBlock();
  if (inTable) flushTable();

  return (
    <div className="markdown-body text-slate-200 space-y-1">
      {elements}
    </div>
  );
};
