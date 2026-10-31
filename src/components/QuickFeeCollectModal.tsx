import React, { useState, useEffect } from 'react';
import { X, Zap, Search, User, CreditCard, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Student } from '../types';
import { validatePositiveAmount } from '../services/validation';

export const QuickFeeCollectModal: React.FC = () => {
  const {
    isQuickCollectOpen,
    setIsQuickCollectOpen,
    quickCollectStudent,
    students,
    handleCollectFee,
    handleWhatsAppReminder,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [paymentMode, setPaymentMode] = useState<'Cash' | 'UPI' | 'Card' | 'Cheque'>('Cash');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (quickCollectStudent) {
      setSelectedStudent(quickCollectStudent);
      setAmount(quickCollectStudent.dueFee > 0 ? String(quickCollectStudent.dueFee) : '');
    } else if (students.length > 0 && !selectedStudent) {
      const firstDefaulter = students.find((s) => s.dueFee > 0) || students[0];
      setSelectedStudent(firstDefaulter);
      setAmount(firstDefaulter.dueFee > 0 ? String(firstDefaulter.dueFee) : '');
    }
  }, [quickCollectStudent, students]);

  if (!isQuickCollectOpen) return null;

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.includes(searchTerm)
  );

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    setAmount(student.dueFee > 0 ? String(student.dueFee) : '');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) {
      setError('Please select a student');
      return;
    }

    const validation = validatePositiveAmount(amount);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid amount');
      return;
    }

    const numAmount = parseFloat(amount);
    setIsSubmitting(true);
    setError(null);

    const success = await handleCollectFee(
      selectedStudent.id,
      numAmount,
      paymentMode,
      notes
    );

    setIsSubmitting(false);
    if (success) {
      setIsQuickCollectOpen(false);
      setAmount('');
      setNotes('');
    } else {
      setError('Failed to record fee collection.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Modal Header */}
        <div className="bg-[#083327] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Zap className="w-4 h-4 fill-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold leading-tight">Quick Fee Collect</h3>
              <p className="text-xs text-[#a3c9be]">Instant POS payment & thermal receipt</p>
            </div>
          </div>
          <button
            onClick={() => setIsQuickCollectOpen(false)}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Student Selector Search */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Student
            </label>
            <div className="relative mb-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by student name, roll number, or class..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#00a896] bg-slate-50"
              />
            </div>

            {/* Quick Chips list if filtered */}
            {searchTerm && (
              <div className="max-h-32 overflow-y-auto space-y-1 mb-2 p-1 bg-slate-50 rounded-lg border border-slate-100">
                {filteredStudents.length === 0 ? (
                  <p className="text-xs text-slate-400 p-2 text-center">No students found</p>
                ) : (
                  filteredStudents.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        handleStudentSelect(s);
                        setSearchTerm('');
                      }}
                      className="px-2.5 py-1.5 rounded hover:bg-teal-50 cursor-pointer flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-slate-800">{s.name} ({s.class})</span>
                      <span className="text-rose-600 font-mono-num font-bold">Due: ₹{s.dueFee}</span>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Selected Student Card */}
            {selectedStudent && (
              <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00a896] text-white flex items-center justify-center font-bold text-sm">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase">
                      {selectedStudent.name}
                    </h4>
                    <p className="text-[11px] text-slate-600">
                      {selectedStudent.class} · Roll #{selectedStudent.rollNo} · {selectedStudent.phone}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Current Due</div>
                  <div className="text-sm font-bold text-rose-600 font-mono-num">
                    ₹{selectedStudent.dueFee.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Amount Input with Strict Validation */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Collection Amount (₹) *
              </label>
              {selectedStudent && selectedStudent.dueFee > 0 && (
                <button
                  type="button"
                  onClick={() => setAmount(String(selectedStudent.dueFee))}
                  className="text-[11px] font-semibold text-teal-600 hover:text-teal-700 cursor-pointer"
                >
                  Clear Full Due (₹{selectedStudent.dueFee})
                </button>
              )}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2.5 font-bold text-slate-400">₹</span>
              <input
                type="number"
                min="1"
                step="any"
                required
                placeholder="Enter fee amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError(null);
                }}
                className="w-full pl-8 pr-4 py-2.5 text-base font-bold font-mono-num rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#00a896] text-slate-900"
              />
            </div>
          </div>

          {/* Payment Mode Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Payment Mode
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['Cash', 'UPI', 'Card', 'Cheque'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setPaymentMode(mode)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    paymentMode === mode
                      ? 'bg-[#083327] border-[#083327] text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Notes / Remarks */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Remarks / Transaction Ref
            </label>
            <input
              type="text"
              placeholder="e.g. UPI txn ID, tuition fee, term 2 exam fee"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#00a896]"
            />
          </div>

          {/* Validation Error Banner */}
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            {selectedStudent && (
              <button
                type="button"
                onClick={() => handleWhatsAppReminder(selectedStudent)}
                className="px-3 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Send WhatsApp Fee Reminder"
              >
                <Send className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#00a896] to-[#059669] hover:from-[#009b86] hover:to-[#047857] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>{isSubmitting ? 'Recording POS...' : 'Collect & Issue Receipt'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
