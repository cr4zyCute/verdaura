import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { analyticsService, DashboardMetrics, PipelineStageStat, SourceStat } from '../../lib/services/analyticsService';
import { storage } from '../../lib/db/storageEngine';
import { PipelineBarChart, LeadSourcesChart, ConversionGauge } from '../../components/admin/BotanicalCharts';
import { ActivityTimeline } from '../../components/admin/ActivityTimeline';
import { LeadModal } from '../../components/admin/LeadModal';
import { ContactModal } from '../../components/admin/ContactModal';
import { DealModal } from '../../components/admin/DealModal';
import { TaskModal } from '../../components/admin/TaskModal';
import {
  Users,
  DollarSign,
  CalendarCheck,
  MessageSquare,
  Plus,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  RefreshCw,
} from 'lucide-react';

export const DashboardOverviewPage: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>(analyticsService.getSummaryMetrics());
  const [stages, setStages] = useState<PipelineStageStat[]>(analyticsService.getPipelineStageStats());
  const [sources, setSources] = useState<SourceStat[]>(analyticsService.getLeadSourceStats());
  const [activities, setActivities] = useState(storage.getActivities());

  // Modal states
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [dealModalOpen, setDealModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  const refreshData = () => {
    setMetrics(analyticsService.getSummaryMetrics());
    setStages(analyticsService.getPipelineStageStats());
    setSources(analyticsService.getLeadSourceStats());
    setActivities(storage.getActivities());
  };

  useEffect(() => {
    const unsubscribe = storage.subscribe(refreshData);
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-sand-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="botanical-badge text-[11px] py-0.5 px-2.5">
              <Sparkles className="w-3.5 h-3.5 text-sunflower-600" />
              Executive Operations
            </span>
          </div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-950 mt-1">
            Verdaura Command Center
          </h1>
          <p className="text-xs text-charcoal-600">
            Real-time pipeline, customer inquiries, and holistic apothecary operations.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setLeadModalOpen(true)}
            className="btn-primary text-xs px-3.5 py-2 min-h-[36px] gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Lead</span>
          </button>

          <button
            onClick={() => setDealModalOpen(true)}
            className="btn-secondary text-xs px-3.5 py-2 min-h-[36px] gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 text-forest" />
            <span>New Deal</span>
          </button>

          <button
            onClick={() => setTaskModalOpen(true)}
            className="p-2 rounded-full border border-sand-300 text-charcoal-600 hover:text-forest hover:bg-white transition-colors"
            title="Schedule Task"
          >
            <CalendarCheck className="w-4 h-4" />
          </button>

          <button
            onClick={refreshData}
            className="p-2 rounded-full border border-sand-300 text-charcoal-600 hover:text-forest hover:bg-white transition-colors"
            title="Refresh Metrics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Active Pipeline Value */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-sand-200 shadow-xs space-y-2 hover:border-forest-200 transition-colors">
          <div className="flex items-center justify-between text-charcoal-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-600">
              Active Pipeline
            </span>
            <div className="w-7 h-7 rounded-full bg-forest-50 text-forest flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-serif font-bold text-2xl sm:text-3xl text-forest-950">
              ${metrics.totalPipelineValue.toLocaleString()}
            </div>
            <p className="text-[11px] text-charcoal-600 mt-0.5">
              {metrics.activeDealsCount} open deals • ${metrics.weightedPipelineValue.toLocaleString()} weighted
            </p>
          </div>
        </div>

        {/* KPI 2: Total Clients & Leads */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-sand-200 shadow-xs space-y-2 hover:border-forest-200 transition-colors">
          <div className="flex items-center justify-between text-charcoal-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-600">
              Client Network
            </span>
            <div className="w-7 h-7 rounded-full bg-olive-50 text-olive flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-serif font-bold text-2xl sm:text-3xl text-forest-950">
              {metrics.totalContacts}
            </div>
            <p className="text-[11px] text-charcoal-600 mt-0.5">
              {metrics.totalLeads} total leads ({metrics.newLeadsCount} new)
            </p>
          </div>
        </div>

        {/* KPI 3: Pending Inquiries */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-sand-200 shadow-xs space-y-2 hover:border-forest-200 transition-colors">
          <div className="flex items-center justify-between text-charcoal-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-600">
              Website Inquiries
            </span>
            <div className="w-7 h-7 rounded-full bg-sunflower-50 text-sunflower-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-serif font-bold text-2xl sm:text-3xl text-forest-950 flex items-center gap-2">
              <span>{metrics.pendingInquiriesCount}</span>
              {metrics.pendingInquiriesCount > 0 && (
                <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  Action Required
                </span>
              )}
            </div>
            <p className="text-[11px] text-charcoal-600 mt-0.5">
              From contact form &amp; consultation bookings
            </p>
          </div>
        </div>

        {/* KPI 4: Closed Won Revenue */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-sand-200 shadow-xs space-y-2 hover:border-forest-200 transition-colors">
          <div className="flex items-center justify-between text-charcoal-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-600">
              Closed Won
            </span>
            <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-serif font-bold text-2xl sm:text-3xl text-forest-950">
              ${metrics.wonDealsValue.toLocaleString()}
            </div>
            <p className="text-[11px] text-charcoal-600 mt-0.5">
              {metrics.wonDealsCount} contracts confirmed • {metrics.leadConversionRate}% conv. rate
            </p>
          </div>
        </div>
      </div>

      {/* Main 2-Column Analytics & CRM Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Pipeline & Lead Sources (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Pipeline Breakdown Card */}
          <div className="bg-white p-5 rounded-2xl border border-sand-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-sand-200">
              <div className="space-y-0.5">
                <h3 className="font-serif font-bold text-base text-forest-950">
                  Deal Pipeline by Stage
                </h3>
                <p className="text-[11px] text-charcoal-600">
                  Current opportunity distribution across active deal stages.
                </p>
              </div>
              <Link
                to="/admin/crm/deals"
                className="text-xs font-semibold text-forest hover:text-forest-800 flex items-center gap-1"
              >
                <span>Pipeline Board</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <PipelineBarChart stages={stages} />
          </div>

          {/* Lead Acquisition & Efficiency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Lead Sources Breakdown */}
            <div className="bg-white p-5 rounded-2xl border border-sand-200 shadow-xs space-y-3">
              <h3 className="font-serif font-bold text-sm text-forest-950">
                Inquiry &amp; Lead Channels
              </h3>
              <LeadSourcesChart sources={sources} />
            </div>

            {/* Performance Gauges */}
            <div className="bg-white p-5 rounded-2xl border border-sand-200 shadow-xs flex flex-col justify-around gap-4">
              <ConversionGauge
                rate={metrics.leadConversionRate}
                label="Lead Conversion"
                subtitle="Qualified leads converted into active contacts and clients."
              />
              <div className="pt-3 border-t border-sand-100">
                <ConversionGauge
                  rate={metrics.taskCompletionRate}
                  label="Follow-up Execution"
                  subtitle={`${metrics.tasksDueTodayCount} tasks due today requiring staff outreach.`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Activity Feed (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-sand-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-sand-200">
            <div className="space-y-0.5">
              <h3 className="font-serif font-bold text-base text-forest-950">
                Recent CRM Events
              </h3>
              <p className="text-[11px] text-charcoal-600">
                Automatic customer touchpoints, stage changes, and inquiries.
              </p>
            </div>
            <Link
              to="/admin/crm/activities"
              className="text-xs font-semibold text-forest hover:text-forest-800 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <ActivityTimeline activities={activities} maxItems={6} showFilters={false} />
        </div>
      </div>

      {/* Modals */}
      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        onSaved={refreshData}
      />
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        onSaved={refreshData}
      />
      <DealModal
        isOpen={dealModalOpen}
        onClose={() => setDealModalOpen(false)}
        onSaved={refreshData}
      />
      <TaskModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        onSaved={refreshData}
      />
    </div>
  );
};
