import React, { useState } from 'react';
import { analyticsService } from '../../lib/services/analyticsService';
import { PipelineBarChart, LeadSourcesChart, ConversionGauge } from '../../components/admin/BotanicalCharts';
import {
  BarChart3,
  Download,
  FileSpreadsheet,
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [metrics] = useState(analyticsService.getSummaryMetrics());
  const [stages] = useState(analyticsService.getPipelineStageStats());
  const [sources] = useState(analyticsService.getLeadSourceStats());
  const [statusStats] = useState(analyticsService.getLeadsByStatus());

  const handleDownloadCsv = (type: 'leads' | 'contacts' | 'deals') => {
    const csvContent = analyticsService.exportCsvReport(type);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `verdaura_${type}_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header & Export Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-sand-200">
        <div>
          <span className="botanical-badge text-[11px] py-0.5 px-2.5">
            <BarChart3 className="w-3.5 h-3.5 text-forest" />
            Performance &amp; Pipeline Analytics
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-950 mt-1">
            Apothecary Business Intelligence
          </h1>
          <p className="text-xs text-charcoal-600">
            Real calculated metrics derived directly from relational customer and order datasets.
          </p>
        </div>

        {/* CSV Export Dropdown / Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDownloadCsv('leads')}
            className="btn-secondary text-xs px-3 py-1.5 min-h-[34px] gap-1.5"
            title="Export Leads CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Leads CSV</span>
          </button>
          <button
            onClick={() => handleDownloadCsv('contacts')}
            className="btn-secondary text-xs px-3 py-1.5 min-h-[34px] gap-1.5"
            title="Export Contacts CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Contacts CSV</span>
          </button>
          <button
            onClick={() => handleDownloadCsv('deals')}
            className="btn-primary text-xs px-3.5 py-1.5 min-h-[34px] gap-1.5"
            title="Export Deals CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export Deals CSV</span>
          </button>
        </div>
      </div>

      {/* Grid of Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Deal Valuation & Stage Health */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-sand-200 shadow-xs space-y-4">
          <div className="border-b border-sand-200 pb-2">
            <h3 className="font-serif font-bold text-base text-forest-950">
              Commercial Deal Valuation by Stage
            </h3>
            <p className="text-[11px] text-charcoal-500">
              Total active potential: ${metrics.totalPipelineValue.toLocaleString()} USD across{' '}
              {metrics.activeDealsCount} opportunities.
            </p>
          </div>
          <PipelineBarChart stages={stages} />
        </div>

        {/* Efficiency Gauges */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-sand-200 shadow-xs flex flex-col justify-between gap-6">
          <div className="border-b border-sand-200 pb-2">
            <h3 className="font-serif font-bold text-base text-forest-950">
              Conversion &amp; Execution Funnel
            </h3>
            <p className="text-[11px] text-charcoal-500">
              Operational effectiveness from inquiry to completed order.
            </p>
          </div>

          <ConversionGauge
            rate={metrics.leadConversionRate}
            label="Inquiry Conversion Rate"
            subtitle={`${metrics.totalLeads} total leads evaluated with ${metrics.totalContacts} active clients on record.`}
          />

          <div className="pt-4 border-t border-sand-100">
            <ConversionGauge
              rate={metrics.taskCompletionRate}
              label="Task Fulfillment Velocity"
              subtitle={`Follow-up adherence for consultations, phone orders, and scent sample shipments.`}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lead Source Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-xs space-y-4">
          <div className="border-b border-sand-200 pb-2">
            <h3 className="font-serif font-bold text-base text-forest-950">
              Lead Acquisition Channels
            </h3>
            <p className="text-[11px] text-charcoal-500">
              Where new clients and commercial partners discover Verdaura.
            </p>
          </div>
          <LeadSourcesChart sources={sources} />
        </div>

        {/* Status Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-xs space-y-4">
          <div className="border-b border-sand-200 pb-2">
            <h3 className="font-serif font-bold text-base text-forest-950">
              Lead Qualification Stages
            </h3>
            <p className="text-[11px] text-charcoal-500">
              Breakdown of lead records currently in progress.
            </p>
          </div>
          <div className="space-y-3">
            {statusStats.map((st) => (
              <div key={st.status} className="flex items-center justify-between text-xs p-2 rounded-xl bg-sand-50/70 border border-sand-200/80">
                <span className="font-semibold text-forest-950 capitalize">{st.label}</span>
                <span className="font-bold text-forest px-2.5 py-0.5 rounded-full bg-white border border-sand-200">
                  {st.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
