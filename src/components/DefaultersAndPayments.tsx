import React from 'react';
import { AlertCircle, RotateCcw, Zap, Printer } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DefaultersAndPayments: React.FC = () => {
  const { students, payments, openQuickCollect, setActiveReceipt, setActiveTab } = useApp();

  // Defaulters: students with dueFee > 0
  const defaulters = students
    .filter((s) => s.dueFee > 0)
    .sort((a, b) => b.dueFee - a.dueFee)
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      {/* 1. Top Fee Defaulters */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-bold">
                !
              </span>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Top Fee Defaulters
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('fee_collection')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold tracking-wider">
                  <th className="pb-2 font-semibold">STUDENT</th>
                  <th className="pb-2 font-semibold">CLASS</th>
                  <th className="pb-2 font-semibold text-right">DUE</th>
                  <th className="pb-2 font-semibold text-center pl-3">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {defaulters.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-2.5 font-bold text-slate-900 uppercase">
                      {student.name}
                    </td>
                    <td className="py-2.5 text-slate-600 font-medium">
                      {student.class}
                    </td>
                    <td className="py-2.5 text-right font-bold text-rose-600 font-mono-num">
                      ₹{student.dueFee.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 text-center pl-3">
                      <button
                        onClick={() => openQuickCollect(student)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#10b981] hover:bg-[#059669] text-white text-[11px] font-semibold transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                      >
                        <Zap className="w-3 h-3 fill-white" />
                        <span>Collect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2. Recent Payments */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Recent Payments
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('fee_collection')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold tracking-wider">
                  <th className="pb-2 font-semibold">RECEIPT</th>
                  <th className="pb-2 font-semibold">STUDENT</th>
                  <th className="pb-2 font-semibold text-right">AMOUNT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.slice(0, 5).map((pay) => (
                  <tr
                    key={pay.id}
                    onClick={() => setActiveReceipt(pay)}
                    className="hover:bg-slate-50/60 transition-colors cursor-pointer group"
                  >
                    <td className="py-2.5 font-medium text-slate-700 flex items-center gap-1.5 font-mono-num">
                      <span>{pay.receiptNo}</span>
                      <Printer className="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </td>
                    <td className="py-2.5 font-bold text-slate-900 uppercase">
                      {pay.studentName}
                    </td>
                    <td className="py-2.5 text-right font-bold text-emerald-600 font-mono-num">
                      ₹{pay.amount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
