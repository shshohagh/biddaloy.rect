import React from 'react';
import { Users, AlertTriangle, ReceiptText } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StatCards: React.FC = () => {
  const { summary, openQuickCollect, setIsAdmissionOpen, setIsExpenseOpen } = useApp();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* 1. Active Students */}
      <div
        onClick={() => setIsAdmissionOpen(true)}
        className="bg-white rounded-xl p-4 border border-slate-200 border-t-4 border-t-[#00a896] shadow-xs hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-[#00a896]">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono-num">
              {summary.activeStudents}
            </div>
            <div className="text-xs font-medium text-slate-600">Active Students</div>
            <div className="text-[11px] text-slate-400 font-medium">
              +{summary.newStudentsThisMonth} this month
            </div>
          </div>
        </div>
      </div>

      {/* 2. Total Collected */}
      <div
        onClick={() => openQuickCollect()}
        className="bg-white rounded-xl p-4 border border-slate-200 border-t-4 border-t-[#10b981] shadow-xs hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-xl">
            ₹
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono-num">
              ₹{summary.totalCollected.toLocaleString('en-IN')}
            </div>
            <div className="text-xs font-medium text-slate-600">Total Collected</div>
            <div className="text-[11px] text-slate-400 font-medium">
              Today: ₹{summary.collectedToday.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Pending Fees */}
      <div
        onClick={() => openQuickCollect()}
        className="bg-white rounded-xl p-4 border border-slate-200 border-t-4 border-t-[#ef4444] shadow-xs hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono-num">
              ₹{summary.pendingFees.toLocaleString('en-IN')}
            </div>
            <div className="text-xs font-medium text-slate-600">Pending Fees</div>
            <div className="text-[11px] text-rose-500 font-medium">Needs collection</div>
          </div>
        </div>
      </div>

      {/* 4. Total Expenses */}
      <div
        onClick={() => setIsExpenseOpen(true)}
        className="bg-white rounded-xl p-4 border border-slate-200 border-t-4 border-t-[#f59e0b] shadow-xs hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <ReceiptText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono-num">
              ₹{summary.totalExpenses.toLocaleString('en-IN')}
            </div>
            <div className="text-xs font-medium text-slate-600">Total Expenses</div>
            <div className="text-[11px] text-slate-400 font-medium">All time</div>
          </div>
        </div>
      </div>
    </div>
  );
};
