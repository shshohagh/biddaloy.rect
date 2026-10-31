import React, { useState } from 'react';
import { Users, Search, Plus, Send, Zap, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StudentListView: React.FC = () => {
  const { students, openQuickCollect, setIsAdmissionOpen, handleWhatsAppReminder } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.includes(searchTerm) ||
      s.phone.includes(searchTerm);
    const matchesClass = classFilter === 'all' || s.class.toLowerCase() === classFilter.toLowerCase();
    return matchesSearch && matchesClass;
  });

  const uniqueClasses = Array.from(new Set(students.map((s) => s.class)));

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-600" />
            <span>All Enrolled Students ({students.length})</span>
          </h2>
          <p className="text-xs text-slate-500">Student master register and fee status</p>
        </div>

        <button
          onClick={() => setIsAdmissionOpen(true)}
          className="px-4 py-2 rounded-lg bg-[#00a896] hover:bg-[#009282] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Admission</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, roll no, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#00a896] bg-slate-50"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-[#00a896]"
          >
            <option value="all">All Classes</option>
            {uniqueClasses.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 font-bold tracking-wider">
              <th className="pb-3">STUDENT NAME</th>
              <th className="pb-3">CLASS</th>
              <th className="pb-3">ROLL</th>
              <th className="pb-3">PARENT CONTACT</th>
              <th className="pb-3 text-right">TOTAL FEE</th>
              <th className="pb-3 text-right">PAID</th>
              <th className="pb-3 text-right">DUE</th>
              <th className="pb-3 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 font-bold text-slate-900 uppercase">
                  <div>{s.name}</div>
                  <div className="text-[10px] text-slate-400 font-normal">{s.id}</div>
                </td>
                <td className="py-3 text-slate-700 font-medium">{s.class}</td>
                <td className="py-3 text-slate-600 font-mono-num">{s.rollNo}</td>
                <td className="py-3 text-slate-700">
                  <div>{s.parentName}</div>
                  <div className="text-[11px] text-slate-400 font-mono-num">{s.phone}</div>
                </td>
                <td className="py-3 text-right font-mono-num font-semibold text-slate-700">
                  ₹{s.totalFee.toLocaleString('en-IN')}
                </td>
                <td className="py-3 text-right font-mono-num font-bold text-emerald-600">
                  ₹{s.paidFee.toLocaleString('en-IN')}
                </td>
                <td className="py-3 text-right font-mono-num font-bold">
                  {s.dueFee > 0 ? (
                    <span className="text-rose-600">₹{s.dueFee.toLocaleString('en-IN')}</span>
                  ) : (
                    <span className="text-slate-400 font-normal">Paid</span>
                  )}
                </td>
                <td className="py-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    {s.dueFee > 0 && (
                      <button
                        onClick={() => openQuickCollect(s)}
                        className="px-2.5 py-1 rounded bg-[#10b981] hover:bg-[#059669] text-white text-[11px] font-semibold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                        title="Collect Fee via POS"
                      >
                        <Zap className="w-3 h-3 fill-white" />
                        <span>Collect</span>
                      </button>
                    )}
                    {s.dueFee > 0 && (
                      <button
                        onClick={() => handleWhatsAppReminder(s)}
                        className="p-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors cursor-pointer"
                        title="Send WhatsApp Reminder"
                      >
                        <Send className="w-3.5 h-3.5 text-emerald-600" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
