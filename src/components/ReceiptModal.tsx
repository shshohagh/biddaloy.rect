import React from 'react';
import { X, Printer, Share2, CheckCircle2, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReceiptModal: React.FC = () => {
  const { activeReceipt, setActiveReceipt, students } = useApp();

  if (!activeReceipt) return null;

  const student = students.find((s) => s.id === activeReceipt.studentId);

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*DATA CLICK IT HUB - FEE RECEIPT*\n` +
      `Receipt No: ${activeReceipt.receiptNo}\n` +
      `Student: ${activeReceipt.studentName}\n` +
      `Class: ${activeReceipt.class}\n` +
      `Amount Paid: ₹${activeReceipt.amount.toLocaleString('en-IN')}\n` +
      `Mode: ${activeReceipt.paymentMode}\n` +
      `Date: ${activeReceipt.date}\n` +
      `Remaining Due: ₹${student ? student.dueFee.toLocaleString('en-IN') : '0'}\n` +
      `Thank you for your payment!`
    );
    const phone = student?.phone ? (student.phone.length === 10 ? `91${student.phone}` : student.phone) : '';
    const url = phone ? `https://wa.me/${phone}?text=${text}` : `https://wa.me/?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-sm w-full border border-slate-200 shadow-2xl overflow-hidden my-6">
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold tracking-tight">Receipt Generated</span>
          </div>
          <button
            onClick={() => setActiveReceipt(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Thermal Receipt Paper Layout */}
        <div className="p-6 bg-[#fffdf9] font-mono text-slate-800 text-xs selection:bg-teal-100">
          {/* Header */}
          <div className="text-center border-b border-dashed border-slate-300 pb-3 mb-3">
            <h2 className="font-bold text-sm text-slate-900 tracking-tight uppercase">
              Data Click IT HUB
            </h2>
            <p className="text-[10px] text-slate-500 uppercase">Management System</p>
            <p className="text-[10px] text-slate-600 mt-1">Helpline: +91 7310095239</p>
            <div className="inline-block px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-700 mt-1">
              FEE PAYMENT VOUCHER
            </div>
          </div>

          {/* Metadata */}
          <div className="space-y-1 border-b border-dashed border-slate-300 pb-2.5 mb-2.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Receipt No:</span>
              <span className="font-bold">{activeReceipt.receiptNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Date/Time:</span>
              <span>{activeReceipt.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Cashier:</span>
              <span>{activeReceipt.collectedBy}</span>
            </div>
          </div>

          {/* Student Info */}
          <div className="space-y-1 border-b border-dashed border-slate-300 pb-2.5 mb-2.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Student:</span>
              <span className="font-bold uppercase">{activeReceipt.studentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Class:</span>
              <span className="font-semibold">{activeReceipt.class}</span>
            </div>
            {student?.rollNo && (
              <div className="flex justify-between">
                <span className="text-slate-500">Roll No:</span>
                <span>{student.rollNo}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-500">Mode:</span>
              <span className="font-bold text-slate-900">{activeReceipt.paymentMode}</span>
            </div>
          </div>

          {/* Itemized / Total */}
          <div className="space-y-2 border-b border-dashed border-slate-300 pb-3 mb-3">
            <div className="flex justify-between font-medium text-slate-700">
              <span>Tuition / POS Collection</span>
              <span className="font-mono-num font-bold">₹{activeReceipt.amount.toLocaleString('en-IN')}</span>
            </div>
            {activeReceipt.notes && (
              <div className="text-[10px] text-slate-500 italic">
                Note: {activeReceipt.notes}
              </div>
            )}
            <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
              <span>TOTAL PAID</span>
              <span className="font-mono-num text-emerald-700">₹{activeReceipt.amount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Balance Remaining */}
          {student && (
            <div className="flex justify-between text-[11px] mb-4 text-slate-600">
              <span>Remaining Balance:</span>
              <span className="font-mono-num font-bold text-rose-600">
                ₹{student.dueFee.toLocaleString('en-IN')}
              </span>
            </div>
          )}

          {/* Barcode Mock */}
          <div className="text-center space-y-1">
            <div className="h-9 w-44 mx-auto bg-repeat-x flex items-center justify-center tracking-widest text-[16px] font-bold text-slate-800 select-none">
              ||||| | |||| ||||| ||| |||| |
            </div>
            <p className="text-[9px] text-slate-400">Computer generated valid receipt</p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-2 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
          <button
            onClick={handleShareWhatsApp}
            className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
