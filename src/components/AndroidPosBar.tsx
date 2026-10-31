import React from 'react';
import {
  LayoutDashboard,
  Zap,
  UserPlus,
  CalendarCheck,
  Menu,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AndroidPosBar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    openQuickCollect,
    setIsAdmissionOpen,
    setIsAttendanceOpen,
    setIsMobileSidebarOpen,
    isAndroidPosMode,
  } = useApp();

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-[#083327] border-t border-[#124536] text-white px-4 py-2 transition-transform duration-200 ${
        isAndroidPosMode ? 'flex' : 'flex lg:hidden'
      } items-center justify-around shadow-2xl`}
    >
      {/* 1. Dashboard */}
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
          activeTab === 'dashboard' ? 'text-emerald-400 font-bold' : 'text-[#86bba8] hover:text-white'
        }`}
      >
        <LayoutDashboard className="w-4 h-4" />
        <span>Home</span>
      </button>

      {/* 2. Admission */}
      <button
        onClick={() => setIsAdmissionOpen(true)}
        className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-[#86bba8] hover:text-white transition-colors"
      >
        <UserPlus className="w-4 h-4" />
        <span>Admission</span>
      </button>

      {/* 3. Center FAB: Instant POS Quick Collect */}
      <div className="-mt-6">
        <button
          onClick={() => openQuickCollect()}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00a896] to-[#10b981] text-white flex items-center justify-center shadow-lg border-2 border-[#083327] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          aria-label="Quick POS Collect"
        >
          <Zap className="w-6 h-6 fill-white" />
        </button>
      </div>

      {/* 4. Attendance */}
      <button
        onClick={() => setIsAttendanceOpen(true)}
        className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-[#86bba8] hover:text-white transition-colors"
      >
        <CalendarCheck className="w-4 h-4" />
        <span>Attend</span>
      </button>

      {/* 5. Menu Drawer */}
      <button
        onClick={() => setIsMobileSidebarOpen(true)}
        className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-[#86bba8] hover:text-white transition-colors"
      >
        <Menu className="w-4 h-4" />
        <span>Menu</span>
      </button>
    </div>
  );
};
