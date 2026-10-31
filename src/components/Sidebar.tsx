import React from 'react';
import {
  LayoutDashboard,
  UserPlus,
  Users,
  Archive,
  GraduationCap,
  FileSpreadsheet,
  Receipt,
  CreditCard,
  Zap,
  Send,
  Trash2,
  CalendarCheck,
  FileBarChart,
  BookOpen,
  PenTool,
  Award,
  BookMarked,
  Layers,
  Calendar,
  Wallet,
  FileText,
  PieChart,
  Briefcase,
  DollarSign,
  TrendingUp,
  Bell,
  Shield,
  Sliders,
  KeyRound,
  LogOut,
  X,
  Server,
  Smartphone,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NavigationTab } from '../types';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    openQuickCollect,
    setIsAdmissionOpen,
    setIsAttendanceOpen,
    setIsExpenseOpen,
    setIsNoticeOpen,
    setIsApiConfigOpen,
    isAndroidPosMode,
    setIsAndroidPosMode,
  } = useApp();

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    setIsMobileSidebarOpen(false);

    // Open corresponding direct modals if clicked
    if (tab === 'new_admission') {
      setIsAdmissionOpen(true);
    } else if (tab === 'quick_fee_collect') {
      openQuickCollect();
    } else if (tab === 'attendance') {
      setIsAttendanceOpen(true);
    } else if (tab === 'expenses') {
      setIsExpenseOpen(true);
    } else if (tab === 'notices') {
      setIsNoticeOpen(true);
    } else if (tab === 'settings' || tab === 'admin_settings') {
      setIsApiConfigOpen(true);
    }
  };

  const navItemClass = (tab: NavigationTab, customActiveColor?: string) => {
    const isActive = activeTab === tab;
    return `flex items-center gap-3 px-4 py-2 text-xs font-medium transition-colors cursor-pointer rounded-r-lg mr-2 ${
      isActive
        ? customActiveColor || 'bg-[#009b86] text-white font-semibold'
        : 'text-[#a3c9be] hover:text-white hover:bg-[#124536]'
    }`;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#083327] text-white flex flex-col transition-transform duration-300 ease-in-out border-r border-[#124536] lg:translate-x-0 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header / Branding */}
        <div className="p-4 border-b border-[#124536] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-inner">
              <span className="text-white font-bold text-lg leading-none">DC</span>
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white leading-tight">
                Data Click IT HUB
              </h1>
              <p className="text-[11px] text-[#86bba8]">Management System</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="lg:hidden text-[#86bba8] hover:text-white p-1"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-3 mx-3 my-2 rounded-lg bg-[#0d3f31] border border-[#165140] flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-100 text-[#083327] font-bold text-sm flex items-center justify-center shrink-0">
            S
          </div>
          <div className="overflow-hidden flex-1">
            <div className="text-xs font-semibold text-white truncate">Super Administrator</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-[#7c3aed] text-white">
                ⭐ Super Admin
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto py-2 space-y-4">
          {/* MAIN */}
          <div>
            <div className="px-4 text-[10px] font-bold tracking-wider text-[#699a8a] uppercase mb-1">
              MAIN
            </div>
            <div
              onClick={() => handleNavClick('dashboard')}
              className={navItemClass('dashboard')}
            >
              <LayoutDashboard className="w-4 h-4 text-[#48dbb4]" />
              <span>Dashboard</span>
            </div>
          </div>

          {/* STUDENTS */}
          <div>
            <div className="px-4 text-[10px] font-bold tracking-wider text-[#699a8a] uppercase mb-1">
              STUDENTS
            </div>
            <div
              onClick={() => handleNavClick('admission_enquiry')}
              className={navItemClass('admission_enquiry')}
            >
              <FileSpreadsheet className="w-4 h-4 text-[#86bba8]" />
              <span>Admission Enquiry</span>
            </div>
            <div
              onClick={() => handleNavClick('new_admission')}
              className={navItemClass('new_admission')}
            >
              <UserPlus className="w-4 h-4 text-[#48dbb4]" />
              <span>+ New Admission</span>
            </div>
            <div
              onClick={() => handleNavClick('all_students')}
              className={navItemClass('all_students')}
            >
              <Users className="w-4 h-4 text-[#86bba8]" />
              <span>All Students</span>
            </div>
            <div
              onClick={() => handleNavClick('passed_out')}
              className={navItemClass('passed_out')}
            >
              <Archive className="w-4 h-4 text-[#86bba8]" />
              <span>Passed Out Archive</span>
            </div>
            <div
              onClick={() => handleNavClick('promotion')}
              className={navItemClass('promotion')}
            >
              <GraduationCap className="w-4 h-4 text-[#86bba8]" />
              <span>Promotion</span>
            </div>
            <div
              onClick={() => handleNavClick('session_report')}
              className={navItemClass('session_report')}
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-400" />
              <span>Session Report</span>
            </div>
          </div>

          {/* FEES */}
          <div>
            <div className="px-4 text-[10px] font-bold tracking-wider text-[#699a8a] uppercase mb-1">
              FEES
            </div>
            <div
              onClick={() => handleNavClick('fee_structure')}
              className={navItemClass('fee_structure')}
            >
              <Receipt className="w-4 h-4 text-[#86bba8]" />
              <span>Fee Structure</span>
            </div>
            <div
              onClick={() => handleNavClick('fee_collection')}
              className={navItemClass('fee_collection')}
            >
              <CreditCard className="w-4 h-4 text-[#86bba8]" />
              <span>Fee Collection</span>
            </div>
            <div
              onClick={() => handleNavClick('quick_fee_collect')}
              className={navItemClass('quick_fee_collect')}
            >
              <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              <span className="text-emerald-300 font-semibold">Quick Fee Collect</span>
            </div>
            <div
              onClick={() => handleNavClick('whatsapp_reminder')}
              className={navItemClass('whatsapp_reminder')}
            >
              <Send className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300">WhatsApp Reminder</span>
            </div>
            <div
              onClick={() => handleNavClick('fee_deletion_log')}
              className={navItemClass('fee_deletion_log')}
            >
              <Trash2 className="w-4 h-4 text-red-400" />
              <span className="text-red-400">Fee Deletion Log</span>
            </div>
          </div>

          {/* ACADEMICS */}
          <div>
            <div className="px-4 text-[10px] font-bold tracking-wider text-[#699a8a] uppercase mb-1">
              ACADEMICS
            </div>
            <div
              onClick={() => handleNavClick('attendance')}
              className={navItemClass('attendance')}
            >
              <CalendarCheck className="w-4 h-4 text-[#86bba8]" />
              <span>Attendance</span>
            </div>
            <div
              onClick={() => handleNavClick('attendance_report')}
              className={navItemClass('attendance_report')}
            >
              <FileBarChart className="w-4 h-4 text-[#86bba8]" />
              <span>Attendance Report</span>
            </div>
            <div
              onClick={() => handleNavClick('exams')}
              className={navItemClass('exams')}
            >
              <BookOpen className="w-4 h-4 text-[#86bba8]" />
              <span>Exams</span>
            </div>
            <div
              onClick={() => handleNavClick('marks_entry')}
              className={navItemClass('marks_entry')}
            >
              <PenTool className="w-4 h-4 text-[#86bba8]" />
              <span>Marks Entry</span>
            </div>
            <div
              onClick={() => handleNavClick('class_result')}
              className={navItemClass('class_result')}
            >
              <Award className="w-4 h-4 text-[#86bba8]" />
              <span>Class Result</span>
            </div>
            <div
              onClick={() => handleNavClick('subjects')}
              className={navItemClass('subjects')}
            >
              <BookMarked className="w-4 h-4 text-[#86bba8]" />
              <span>Subjects</span>
            </div>
            <div
              onClick={() => handleNavClick('class_subject_map')}
              className={navItemClass('class_subject_map')}
            >
              <Layers className="w-4 h-4 text-[#86bba8]" />
              <span>Class-Subject Map</span>
            </div>
            <div
              onClick={() => handleNavClick('exam_schedule')}
              className={navItemClass('exam_schedule')}
            >
              <Calendar className="w-4 h-4 text-[#86bba8]" />
              <span>Exam Schedule</span>
            </div>
          </div>

          {/* FINANCE */}
          <div>
            <div className="px-4 text-[10px] font-bold tracking-wider text-[#699a8a] uppercase mb-1">
              FINANCE
            </div>
            <div
              onClick={() => handleNavClick('expenses')}
              className={navItemClass('expenses')}
            >
              <Wallet className="w-4 h-4 text-[#86bba8]" />
              <span>Expenses</span>
            </div>
            <div
              onClick={() => handleNavClick('all_reports')}
              className={navItemClass('all_reports')}
            >
              <FileText className="w-4 h-4 text-[#86bba8]" />
              <span>All Reports</span>
            </div>
            <div
              onClick={() => handleNavClick('income_vs_expense')}
              className={navItemClass('income_vs_expense')}
            >
              <PieChart className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300">Income vs Expense</span>
            </div>
          </div>

          {/* STAFF / PAYROLL */}
          <div>
            <div className="px-4 text-[10px] font-bold tracking-wider text-[#699a8a] uppercase mb-1">
              STAFF / PAYROLL
            </div>
            <div
              onClick={() => handleNavClick('staff_management')}
              className={navItemClass('staff_management')}
            >
              <Briefcase className="w-4 h-4 text-[#86bba8]" />
              <span>Staff Management</span>
            </div>
            <div
              onClick={() => handleNavClick('salary_management')}
              className={navItemClass('salary_management')}
            >
              <DollarSign className="w-4 h-4 text-[#86bba8]" />
              <span>Salary Management</span>
            </div>
            <div
              onClick={() => handleNavClick('salary_report')}
              className={navItemClass('salary_report')}
            >
              <TrendingUp className="w-4 h-4 text-[#86bba8]" />
              <span>Salary Report</span>
            </div>
          </div>

          {/* COMMUNICATION */}
          <div>
            <div className="px-4 text-[10px] font-bold tracking-wider text-[#699a8a] uppercase mb-1">
              COMMUNICATION
            </div>
            <div
              onClick={() => handleNavClick('notices')}
              className={navItemClass('notices')}
            >
              <Bell className="w-4 h-4 text-[#86bba8]" />
              <span>Notices</span>
            </div>
          </div>

          {/* ADMIN */}
          <div>
            <div className="px-4 text-[10px] font-bold tracking-wider text-[#699a8a] uppercase mb-1">
              ADMIN
            </div>
            <div
              onClick={() => setIsApiConfigOpen(true)}
              className={navItemClass('admin_settings')}
            >
              <Shield className="w-4 h-4 text-[#86bba8]" />
              <span>Admin Settings (Laravel API)</span>
            </div>
            <div
              onClick={() => setIsApiConfigOpen(true)}
              className={navItemClass('settings')}
            >
              <Sliders className="w-4 h-4 text-[#86bba8]" />
              <span>Settings</span>
            </div>
          </div>

          {/* ACCOUNT */}
          <div>
            <div className="px-4 text-[10px] font-bold tracking-wider text-[#699a8a] uppercase mb-1">
              ACCOUNT
            </div>
            <div
              onClick={() => handleNavClick('password_change')}
              className={navItemClass('password_change')}
            >
              <KeyRound className="w-4 h-4 text-[#86bba8]" />
              <span>Password Change</span>
            </div>
            <div
              onClick={() => {
                if (confirm('Are you sure you want to log out of Data Click IT HUB?')) {
                  alert('Session logged out.');
                }
              }}
              className="flex items-center gap-3 px-4 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 cursor-pointer rounded-r-lg mr-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </div>
          </div>
        </div>

        {/* Bottom Mode Switch & Connection indicator */}
        <div className="p-3 border-t border-[#124536] bg-[#06261d] space-y-2">
          <button
            onClick={() => setIsAndroidPosMode(!isAndroidPosMode)}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded bg-[#104032] hover:bg-[#165140] text-[11px] font-medium text-emerald-300 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android POS Mode</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded ${isAndroidPosMode ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
              {isAndroidPosMode ? 'ON' : 'OFF'}
            </span>
          </button>

          <button
            onClick={() => setIsApiConfigOpen(true)}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded bg-[#104032] hover:bg-[#165140] text-[11px] font-medium text-[#a3c9be] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Server className="w-3.5 h-3.5 text-cyan-400" />
              <span>Laravel API</span>
            </div>
            <span className="text-[10px] text-emerald-400">Connected</span>
          </button>
        </div>
      </aside>
    </>
  );
};
