import React, { useState } from 'react';
import { Activity, ActivityType } from '../../lib/db/schema';
import {
  Mail,
  Phone,
  Users,
  FileText,
  MessageSquare,
  GitPullRequest,
  CheckCircle2,
  Clock,
  Filter,
} from 'lucide-react';

interface ActivityTimelineProps {
  activities: Activity[];
  maxItems?: number;
  showFilters?: boolean;
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  activities,
  maxItems,
  showFilters = true,
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = activities.filter((act) => {
    if (filterType === 'all') return true;
    return act.type === filterType;
  });

  const displayList = maxItems ? filtered.slice(0, maxItems) : filtered;

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'email':
        return <Mail className="w-3.5 h-3.5 text-blue-600" />;
      case 'call':
        return <Phone className="w-3.5 h-3.5 text-emerald-600" />;
      case 'meeting':
        return <Users className="w-3.5 h-3.5 text-purple-600" />;
      case 'inquiry':
        return <MessageSquare className="w-3.5 h-3.5 text-sunflower-600" />;
      case 'deal_stage_change':
        return <GitPullRequest className="w-3.5 h-3.5 text-amber-700" />;
      case 'task_completed':
        return <CheckCircle2 className="w-3.5 h-3.5 text-forest" />;
      case 'note':
      default:
        return <FileText className="w-3.5 h-3.5 text-charcoal-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {showFilters && (
        <div className="flex items-center justify-between pb-2 border-b border-sand-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-forest-950">
            <Clock className="w-4 h-4 text-forest" />
            <span>Audit &amp; Interaction Stream</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-charcoal-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-xs py-1 px-2.5 rounded-lg border border-sand-300 bg-white text-charcoal focus:ring-1 focus:ring-forest focus:outline-none"
            >
              <option value="all">All Activities ({activities.length})</option>
              <option value="inquiry">Website Inquiries</option>
              <option value="call">Phone Calls</option>
              <option value="meeting">Meetings</option>
              <option value="deal_stage_change">Deal Updates</option>
              <option value="task_completed">Tasks Completed</option>
              <option value="note">Notes &amp; Internal</option>
            </select>
          </div>
        </div>
      )}

      {displayList.length > 0 ? (
        <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-sand-200">
          {displayList.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Bullet Node */}
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white border border-sand-300 flex items-center justify-center shadow-xs">
                {getActivityIcon(item.type)}
              </div>

              {/* Activity Card */}
              <div className="bg-white p-3.5 rounded-xl border border-sand-200/80 shadow-xs hover:border-forest-200 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-serif font-bold text-xs text-forest-950 leading-snug">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-charcoal-400 font-medium shrink-0">
                    {new Date(item.createdAt).toLocaleDateString()} •{' '}
                    {new Date(item.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                <p className="text-xs text-charcoal-700 leading-relaxed font-normal mb-1.5">
                  {item.description}
                </p>

                <div className="flex items-center gap-2 text-[10.5px] text-charcoal-500 font-medium">
                  <span className="text-forest-800 font-semibold">{item.actorName}</span>
                  {item.dealId && (
                    <span className="px-1.5 py-0.5 rounded bg-sand-100 text-charcoal-600">Deal Linked</span>
                  )}
                  {item.leadId && (
                    <span className="px-1.5 py-0.5 rounded bg-sand-100 text-charcoal-600">Lead Linked</span>
                  )}
                  {item.contactId && (
                    <span className="px-1.5 py-0.5 rounded bg-sand-100 text-charcoal-600">Contact Linked</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-charcoal-400 text-xs italic font-serif">
          No activities found for this filter.
        </div>
      )}
    </div>
  );
};
