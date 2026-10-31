import React, { useState } from 'react';
import { X, UserPlus, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { validateAdmissionForm } from '../services/validation';

export const NewAdmissionModal: React.FC = () => {
  const { isAdmissionOpen, setIsAdmissionOpen, handleNewAdmission } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    parentName: '',
    phone: '',
    class: 'Class 10',
    section: 'A',
    rollNo: '',
    totalFee: '12000',
    initialPaid: '2000',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAdmissionOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const totalFeeNum = parseFloat(formData.totalFee) || 0;
    const initialPaidNum = parseFloat(formData.initialPaid) || 0;

    const validation = validateAdmissionForm({
      name: formData.name,
      parentName: formData.parentName,
      phone: formData.phone,
      class: formData.class,
      totalFee: totalFeeNum,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (initialPaidNum > totalFeeNum) {
      setErrors({ initialPaid: 'Initial paid fee cannot exceed total fee' });
      return;
    }

    setIsSubmitting(true);
    const due = Math.max(0, totalFeeNum - initialPaidNum);

    const success = await handleNewAdmission({
      name: formData.name.toUpperCase(),
      parentName: formData.parentName,
      phone: formData.phone,
      class: formData.class,
      section: formData.section,
      rollNo: formData.rollNo || String(Math.floor(100 + Math.random() * 899)),
      admissionDate: new Date().toISOString().split('T')[0],
      totalFee: totalFeeNum,
      paidFee: initialPaidNum,
      dueFee: due,
      status: 'active',
    });

    setIsSubmitting(false);
    if (success) {
      setIsAdmissionOpen(false);
      setFormData({
        name: '',
        parentName: '',
        phone: '',
        class: 'Class 10',
        section: 'A',
        rollNo: '',
        totalFee: '12000',
        initialPaid: '2000',
      });
      setErrors({});
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#083327] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-[#00a896] flex items-center justify-center border border-teal-500/30">
              <UserPlus className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <h3 className="text-base font-bold leading-tight">New Student Admission</h3>
              <p className="text-xs text-[#a3c9be]">Register student into POS system</p>
            </div>
          </div>
          <button
            onClick={() => setIsAdmissionOpen(false)}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Student Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Student Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#00a896]"
            />
            {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
          </div>

          {/* Parent Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Parent / Guardian *
              </label>
              <input
                type="text"
                required
                placeholder="Father / Mother name"
                value={formData.parentName}
                onChange={(e) => {
                  setFormData({ ...formData, parentName: e.target.value });
                  if (errors.parentName) setErrors({ ...errors, parentName: '' });
                }}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#00a896]"
              />
              {errors.parentName && <p className="text-[11px] text-rose-500 mt-1">{errors.parentName}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Parent Mobile (10 digits) *
              </label>
              <input
                type="tel"
                maxLength={10}
                required
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') });
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#00a896] font-mono-num"
              />
              {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Class, Section, Roll No */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Class *
              </label>
              <select
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#00a896]"
              >
                <option value="LKG">LKG</option>
                <option value="UKG">UKG</option>
                <option value="Class 1">Class 1</option>
                <option value="CLASS 8">CLASS 8</option>
                <option value="CLASS 9">CLASS 9</option>
                <option value="Class 10">Class 10</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Section
              </label>
              <input
                type="text"
                placeholder="A / Rose"
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#00a896]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Roll No
              </label>
              <input
                type="text"
                placeholder="Auto"
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#00a896] font-mono-num"
              />
            </div>
          </div>

          {/* Fee Configuration */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Annual Fee (₹) *
              </label>
              <input
                type="number"
                min="0"
                required
                value={formData.totalFee}
                onChange={(e) => setFormData({ ...formData, totalFee: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#00a896] font-mono-num font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Initial Paid (₹)
              </label>
              <input
                type="number"
                min="0"
                value={formData.initialPaid}
                onChange={(e) => {
                  setFormData({ ...formData, initialPaid: e.target.value });
                  if (errors.initialPaid) setErrors({ ...errors, initialPaid: '' });
                }}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#00a896] font-mono-num font-bold text-emerald-600"
              />
              {errors.initialPaid && <p className="text-[11px] text-rose-500 mt-1">{errors.initialPaid}</p>}
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdmissionOpen(false)}
              className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-lg bg-[#00a896] hover:bg-[#009282] text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isSubmitting ? 'Enrolling...' : 'Complete Admission'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
