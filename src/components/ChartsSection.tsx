import React from 'react';
import { TrendingUp, Users } from 'lucide-react';
import { monthlyCollectionData, studentsByClassData } from '../services/mockLaravelData';

export const ChartsSection: React.FC = () => {
  const maxCollection = 15000;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      {/* 1. Monthly Fee Collection */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-4 h-4 text-teal-600" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Monthly Fee Collection
          </h3>
        </div>

        {/* Bar Chart Container */}
        <div className="h-48 flex items-end justify-center gap-16 px-6 pb-2 border-b border-slate-100">
          {monthlyCollectionData.map((item, idx) => {
            const heightPercent = Math.max(8, (item.amount / maxCollection) * 100);
            return (
              <div key={idx} className="flex flex-col items-center gap-2 group">
                <span className="text-xs font-semibold text-slate-700 font-mono-num group-hover:text-blue-600 transition-colors">
                  {item.label}
                </span>
                <div className="w-14 bg-slate-100 rounded-t-sm flex items-end justify-center h-36">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full bg-[#3b82f6] rounded-t-sm transition-all duration-500 group-hover:bg-[#2563eb]"
                  />
                </div>
                <span className="text-xs text-slate-500 font-medium">{item.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Students by Class */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-teal-600" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Students by Class
          </h3>
        </div>

        <div className="space-y-2.5">
          {studentsByClassData.map((item, idx) => {
            // max class count is 2 in this sample
            const widthPercent = (item.count / 3) * 100;
            return (
              <div key={idx} className="flex items-center gap-3 text-xs">
                <span className="w-20 text-slate-600 font-medium truncate">{item.className}</span>
                <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    style={{
                      width: `${widthPercent}%`,
                      backgroundColor: item.color,
                    }}
                    className="h-full rounded-full transition-all duration-500"
                  />
                </div>
                <span className="w-4 text-right font-bold text-slate-700 font-mono-num">
                  {item.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
