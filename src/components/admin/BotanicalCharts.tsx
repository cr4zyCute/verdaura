import React from 'react';
import { PipelineStageStat, SourceStat } from '../../lib/services/analyticsService';

export const PipelineBarChart: React.FC<{ stages: PipelineStageStat[] }> = ({ stages }) => {
  const maxValue = Math.max(...stages.map((s) => s.value), 1000);

  return (
    <div className="space-y-3.5">
      {stages.map((stage) => {
        const percentage = Math.round((stage.value / maxValue) * 100);

        return (
          <div key={stage.stage} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-forest-950 flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: stage.color }}
                />
                {stage.label} ({stage.count})
              </span>
              <span className="font-semibold text-charcoal-800">
                ${stage.value.toLocaleString()} USD
              </span>
            </div>

            <div className="h-3 w-full bg-sand-200/60 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${Math.max(percentage, stage.value > 0 ? 4 : 0)}%`,
                  backgroundColor: stage.color,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const LeadSourcesChart: React.FC<{ sources: SourceStat[] }> = ({ sources }) => {
  const colors = ['#24392A', '#5C6B46', '#D7A22F', '#8C542C', '#756F65', '#9FB18D'];

  return (
    <div className="space-y-3">
      {sources.map((item, idx) => {
        const color = colors[idx % colors.length];

        return (
          <div key={item.source} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-charcoal-800 font-medium flex items-center gap-2 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="truncate">{item.source}</span>
              </span>
              <span className="font-semibold text-forest-900 shrink-0">
                {item.count} leads ({item.percentage}%)
              </span>
            </div>

            <div className="h-2 w-full bg-sand-200/60 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: color,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const ConversionGauge: React.FC<{ rate: number; label: string; subtitle: string }> = ({
  rate,
  label,
  subtitle,
}) => {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (rate / 100) * circumference;

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            className="stroke-sand-200"
            strokeWidth="9"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            className="stroke-forest-700 transition-all duration-700 ease-out"
            strokeWidth="9"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <span className="absolute font-serif font-bold text-lg text-forest-950">{rate}%</span>
      </div>

      <div className="space-y-1">
        <h4 className="font-serif font-bold text-sm text-forest-950 leading-tight">{label}</h4>
        <p className="text-[11px] text-charcoal-600 leading-snug">{subtitle}</p>
      </div>
    </div>
  );
};
