import React from 'react';
import { Bell, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NoticesCard: React.FC = () => {
  const { notices, setIsNoticeOpen } = useApp();

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-amber-500 fill-amber-500" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Latest Notices
          </h3>
        </div>
        <button
          onClick={() => setIsNoticeOpen(true)}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Manage</span>
        </button>
      </div>

      <div className="space-y-3">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2.5"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
            <div>
              <div className="text-xs font-bold text-slate-900">
                {notice.title}
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                {notice.content} <span className="text-slate-300">·</span>{' '}
                <span className="text-slate-500 font-medium">{notice.targetAudience}</span>{' '}
                <span className="text-slate-300">·</span>{' '}
                <span className="text-slate-400 font-mono-num">{notice.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
