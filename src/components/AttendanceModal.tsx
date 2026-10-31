import React, { useState } from 'react';
import { X, CalendarCheck, CheckCircle2, UserX, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AttendanceRecord } from '../types';

export const AttendanceModal: React.FC = () => {
  const { isAttendanceOpen, setIsAttendanceOpen, students, handleSaveAttendance } = useApp();

  const [selectedClass, setSelectedClass] = useState<string>('Class 10');
  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'P' | 'A' | 'L'>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isAttendanceOpen) return null;

  const classStudents = students.filter(
    (s) => s.class.toLowerCase() === selectedClass.toLowerCase()
  );

  const handleStatusChange = (studentId: string, status: 'P' | 'A' | 'L') => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleMarkAll = (status: 'P' | 'A') => {
    const updated: Record<string, 'P' | 'A' | 'L'> = {};
    classStudents.forEach((s) => {
      updated[s.id] = status;
    });
    setAttendanceMap((prev) => ({ ...prev, ...updated }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const dateStr = new Date().toISOString().split('T')[0];
    const records: AttendanceRecord[] = classStudents.map((s) => ({
      studentId: s.id,
      studentName: s.name,
      class: s.class,
      status: attendanceMap[s.id] || 'P',
      date: dateStr,
    }));

    await handleSaveAttendance(records);
    setIsSaving(false);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsAttendanceOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#083327] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold leading-tight">Daily Student Attendance</h3>
              <p className="text-xs text-[#a3c9be]">Quick register attendance by class</p>
            </div>
          </div>
          <button
            onClick={() => setIsAttendanceOpen(false)}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Class Picker and Mark All */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Select Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#00a896]"
              >
                <option value="Class 10">Class 10</option>
                <option value="CLASS 9">CLASS 9</option>
                <option value="CLASS 8">CLASS 8</option>
                <option value="Class 1">Class 1</option>
                <option value="UKG">UKG</option>
                <option value="LKG">LKG</option>
              </select>
            </div>

            <div className="flex items-center gap-2 self-end">
              <button
                type="button"
                onClick={() => handleMarkAll('P')}
                className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                All Present
              </button>
              <button
                type="button"
                onClick={() => handleMarkAll('A')}
                className="px-2.5 py-1 text-xs font-semibold rounded bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors"
              >
                All Absent
              </button>
            </div>
          </div>

          {/* Student Attendance List */}
          <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
            {classStudents.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">
                No students enrolled in {selectedClass}
              </p>
            ) : (
              classStudents.map((student) => {
                const currentStatus = attendanceMap[student.id] || 'P';
                return (
                  <div key={student.id} className="py-2.5 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-slate-900 uppercase">
                        {student.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Roll: {student.rollNo} · {student.phone}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleStatusChange(student.id, 'P')}
                        className={`w-7 h-7 rounded text-xs font-bold transition-all cursor-pointer ${
                          currentStatus === 'P'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        P
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(student.id, 'A')}
                        className={`w-7 h-7 rounded text-xs font-bold transition-all cursor-pointer ${
                          currentStatus === 'A'
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        A
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(student.id, 'L')}
                        className={`w-7 h-7 rounded text-xs font-bold transition-all cursor-pointer ${
                          currentStatus === 'L'
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        L
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {savedSuccess && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Attendance recorded successfully!</span>
            </div>
          )}

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAttendanceOpen(false)}
              className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              disabled={isSaving || classStudents.length === 0}
              onClick={handleSave}
              className="px-5 py-2.5 rounded-lg bg-[#00a896] hover:bg-[#009282] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Submit Attendance'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
