import React, { useState } from 'react';
import { CreditCard, Printer, Search, Download, Zap, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FeeCollectionView: React.FC = () => {
  const { payments, openQuickCollect, setActiveReceipt, handleExportData, summary } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [modeFilter, setModeFilter] = useState('all');

  const filtered = payments.filter((p) => {
    const matchesSearch =
      p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.receiptNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMode = modeFilter === 'all' || p.paymentMode === modeFilter;
    return matchesSearch && matchesMode;
  });

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-teal-600" />
            <span>Fee Collection Register</span>
          </h2>
          <p className="text-xs text-slate-500">
            Total Collected: <span className="font-bold text-emerald-600 font-mono-num">₹{summary.totalCollected.toLocaleString('en-IN')}</span> · Pending Dues: <span className="font-bold text-rose-600 font-mono-num">₹{summary.pendingFees.toLocaleString('en-IN')}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExportData('payments')}
            className="px-3 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => openQuickCollect()}
            className="px-4 py-2 rounded-lg bg-[#00a896] hover:bg-[#009282] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>New POS Collection</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by receipt no, student name, class..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#00a896] bg-slate-50"
          />
        </div>

        <select
          value={modeFilter}
          onChange={(e) => setModeFilter(e.target.value)}
          className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-[#00a896]"
        >
          <option value="all">All Payment Modes</option>
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
          <option value="Cheque">Cheque</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 font-bold tracking-wider">
              <th className="pb-3">RECEIPT NO</th>
              <th className="pb-3">STUDENT</th>
              <th className="pb-3">CLASS</th>
              <th className="pb-3">DATE / TIME</th>
              <th className="pb-3">MODE</th>
              <th className="pb-3">COLLECTED BY</th>
              <th className="pb-3 text-right">AMOUNT</th>
              <th className="pb-3 text-center">PRINT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((pay) => (
              <tr key={pay.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 font-semibold text-slate-800 font-mono-num">
                  {pay.receiptNo}
                </td>
                <td className="py-3 font-bold text-slate-900 uppercase">
                  {pay.studentName}
                </td>
                <td className="py-3 text-slate-600 font-medium">{pay.class}</td>
                <td className="py-3 text-slate-500 font-mono-num">{pay.date}</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                    {pay.paymentMode}
                  </span>
                </td>
                <td className="py-3 text-slate-600">{pay.collectedBy}</td>
                <td className="py-3 text-right font-bold text-emerald-600 font-mono-num text-sm">
                  ₹{pay.amount.toLocaleString('en-IN')}
                </td>
                <td className="py-3 text-center">
                  <button
                    onClick={() => setActiveReceipt(pay)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                    title="View & Print Thermal Receipt"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
