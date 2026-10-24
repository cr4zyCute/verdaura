import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Task, TaskStatus, PriorityLevel } from '../../lib/db/schema';
import { crmService } from '../../lib/services/crmService';
import { storage } from '../../lib/db/storageEngine';
import { DataTable } from '../../components/admin/DataTable';
import { TaskModal } from '../../components/admin/TaskModal';
import {
  CalendarCheck,
  Plus,
  CheckCircle2,
  Circle,
  Calendar,
  Edit,
  Trash2,
} from 'lucide-react';

export const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(crmService.getTasks());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const loadData = () => {
    setTasks(crmService.getTasks());
  };

  useEffect(() => {
    const unsub = storage.subscribe(loadData);
    return () => unsub();
  }, []);

  const handleToggle = (id: string) => {
    crmService.toggleTaskComplete(id);
    loadData();
  };

  const handleEdit = (t: Task) => {
    setEditingTask(t);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this task?')) {
      crmService.deleteTask(id);
      loadData();
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  const columns: ColumnDef<Task, any>[] = [
    {
      id: 'completeToggle',
      header: '',
      cell: ({ row }: { row: any }) => {
        const t = row.original;
        const isDone = t.status === 'completed';
        return (
          <button
            onClick={() => handleToggle(t.id)}
            className="p-1 rounded-md text-forest hover:bg-forest-50 transition-colors"
            title={isDone ? 'Mark as pending' : 'Mark as complete'}
          >
            {isDone ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <Circle className="w-4 h-4 text-charcoal-300" />
            )}
          </button>
        );
      },
    },
    {
      accessorKey: 'title',
      header: 'Task Action & Details',
      cell: ({ row }: { row: any }) => {
        const t = row.original;
        const isDone = t.status === 'completed';
        return (
          <div className="space-y-0.5">
            <span
              className={`font-serif font-bold text-sm ${
                isDone ? 'line-through text-charcoal-400' : 'text-forest-950'
              }`}
            >
              {t.title}
            </span>
            {t.description && (
              <p className="text-[11px] text-charcoal-500 line-clamp-1">{t.description}</p>
            )}
            <div className="flex items-center gap-2 text-[10.5px] text-charcoal-500">
              {t.contactName && <span>Client: {t.contactName}</span>}
              {t.assignedToName && <span>• Assigned: {t.assignedToName}</span>}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }: { row: any }) => {
        const p = row.original.priority as PriorityLevel;
        const map: Record<PriorityLevel, string> = {
          low: 'text-charcoal-500 bg-sand-100',
          medium: 'text-olive-800 bg-olive-50',
          high: 'text-amber-800 bg-amber-50',
          urgent: 'text-red-800 bg-red-50 font-bold',
        };
        return (
          <span className={`px-2 py-0.5 rounded-md text-[10.5px] capitalize font-medium ${map[p] || 'bg-sand-100'}`}>
            {p}
          </span>
        );
      },
    },
    {
      accessorKey: 'dueDate',
      header: 'Due Date',
      cell: ({ row }: { row: any }) => {
        const t = row.original;
        const isOverdue = t.status !== 'completed' && t.dueDate < todayStr;
        const isToday = t.status !== 'completed' && t.dueDate === todayStr;

        return (
          <div className="flex items-center gap-1.5 text-xs">
            <Calendar className="w-3.5 h-3.5 text-charcoal-400" />
            <span
              className={
                isOverdue
                  ? 'text-red-700 font-bold'
                  : isToday
                  ? 'text-amber-800 font-semibold'
                  : 'text-charcoal-700'
              }
            >
              {t.dueDate}
            </span>
            {isOverdue && (
              <span className="text-[9.5px] px-1 rounded bg-red-100 text-red-800 font-bold">
                Overdue
              </span>
            )}
            {isToday && (
              <span className="text-[9.5px] px-1 rounded bg-amber-100 text-amber-800 font-semibold">
                Today
              </span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: { row: any }) => {
        const s = row.original.status as TaskStatus;
        const map: Record<TaskStatus, string> = {
          pending: 'bg-sand-100 text-charcoal-700',
          in_progress: 'bg-blue-50 text-blue-800',
          completed: 'bg-emerald-50 text-emerald-800 font-medium',
          cancelled: 'bg-charcoal-100 text-charcoal-500',
        };
        return (
          <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${map[s] || 'bg-sand-100'}`}>
            {s.replace('_', ' ')}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: { row: any }) => {
        const t = row.original;
        return (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleEdit(t)}
              className="p-1.5 rounded-lg text-charcoal-400 hover:text-forest hover:bg-sand-100 transition-colors"
              title="Edit Task"
            >
              <Edit className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleDelete(t.id)}
              className="p-1.5 rounded-lg text-charcoal-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Delete Task"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="botanical-badge text-[11px] py-0.5 px-2.5">
            <CalendarCheck className="w-3.5 h-3.5 text-forest" />
            Operational Queue
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-950 mt-1">
            Follow-up Tasks &amp; Schedule
          </h1>
          <p className="text-xs text-charcoal-600">
            Apothecary consultations, scent sample prep, and contract follow-ups.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingTask(null);
            setModalOpen(true);
          }}
          className="btn-primary text-xs px-4 py-2 min-h-[38px] gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      <DataTable
        data={tasks}
        columns={columns}
        searchPlaceholder="Search tasks by title, contact, or assignee..."
        filterColumnId="status"
        filterOptions={[
          { label: 'Pending', value: 'pending' },
          { label: 'In Progress', value: 'in_progress' },
          { label: 'Completed', value: 'completed' },
        ]}
      />

      <TaskModal
        isOpen={modalOpen}
        task={editingTask}
        onClose={() => setModalOpen(false)}
        onSaved={loadData}
      />
    </div>
  );
};
