import React from 'react';
import {
  Zap,
  UserPlus,
  CalendarCheck,
  Receipt,
  FileSpreadsheet,
  BarChart3,
  Bell,
  Download,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const QuickActions: React.FC = () => {
  const {
    openQuickCollect,
    setIsAdmissionOpen,
    setIsAttendanceOpen,
    setIsExpenseOpen,
    setIsNoticeOpen,
    setActiveTab,
    handleExportData,
  } = useApp();

  const actions = [
    {
      id: 'admission',
      label: 'New Admission',
      icon: UserPlus,
      color: 'text-teal-700',
      bgColor: 'bg-[#e6f7f5]',
      borderColor: 'border-[#c1eae5]',
      onClick: () => setIsAdmissionOpen(true),
    },
    {
      id: 'quick_collect',
      label: 'Quick Collect',
      icon: Zap,
      color: 'text-emerald-700',
      bgColor: 'bg-[#eaf8f0]',
      borderColor: 'border-[#c7edd6]',
      onClick: () => openQuickCollect(),
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: CalendarCheck,
      color: 'text-teal-700',
      bgColor: 'bg-[#e8f6f8]',
      borderColor: 'border-[#c3e9ee]',
      onClick: () => setIsAttendanceOpen(true),
    },
    {
      id: 'fee_structure',
      label: 'Fee Structure',
      icon: Receipt,
      color: 'text-orange-700',
      bgColor: 'bg-[#fff5eb]',
      borderColor: 'border-[#fde3c7]',
      onClick: () => setActiveTab('fee_structure'),
    },
    {
      id: 'add_expense',
      label: 'Add Expense',
      icon: FileSpreadsheet,
      color: 'text-amber-800',
      bgColor: 'bg-[#fff7e6]',
      borderColor: 'border-[#fde8b8]',
      onClick: () => setIsExpenseOpen(true),
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart3,
      color: 'text-purple-700',
      bgColor: 'bg-[#f5eefb]',
      borderColor: 'border-[#e4d0f6]',
      onClick: () => setActiveTab('all_reports'),
    },
    {
      id: 'post_notice',
      label: 'Post Notice',
      icon: Bell,
      color: 'text-rose-700',
      bgColor: 'bg-[#fdebee]',
      borderColor: 'border-[#f9c7cf]',
      onClick: () => setIsNoticeOpen(true),
    },
    {
      id: 'export_data',
      label: 'Export Data',
      icon: Download,
      color: 'text-teal-700',
      bgColor: 'bg-[#eaf6f7]',
      borderColor: 'border-[#c3e8eb]',
      onClick: () => handleExportData('all'),
    },
  ];

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">
          Quick Actions
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={act.onClick}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border ${act.bgColor} ${act.borderColor} hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-2xs group`}
            >
              <div className="mb-2 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                <Icon className={`w-5 h-5 ${act.color}`} />
              </div>
              <span className="text-xs font-semibold text-slate-800 text-center">
                {act.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
