import React from 'react';
import { Menu, Calendar, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DashboardHeader: React.FC = () => {
  const {
    session,
    setSession,
    isOnline,
    offlineQueueCount,
    syncOfflineQueue,
    setIsMobileSidebarOpen,
    setIsApiConfigOpen,
  } = useApp();

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-2">
      {/* Title & Greeting */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
            Dashboard
          </h2>
          <p className="text-xs md:text-sm text-slate-500 font-medium mt-0.5">
            Welcome back, Super Administrator!
          </p>
        </div>
      </div>

      {/* Right Controls: Session dropdown, Offline status, Theme circles */}
      <div className="flex items-center gap-3 self-end sm:self-auto">
        {/* Offline / Online Sync Indicator */}
        {!isOnline && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            <WifiOff className="w-3.5 h-3.5" />
            <span>Offline POS Mode</span>
          </div>
        )}

        {offlineQueueCount > 0 && (
          <button
            onClick={() => syncOfflineQueue()}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium hover:bg-amber-100 transition-colors"
            title="Click to sync pending transactions with Laravel API"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>{offlineQueueCount} Pending Sync</span>
          </button>
        )}

        {isOnline && offlineQueueCount === 0 && (
          <div
            onClick={() => setIsApiConfigOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium cursor-pointer hover:bg-emerald-100 transition-colors"
            title="Laravel REST API synchronized"
          >
            <Wifi className="w-3.5 h-3.5 text-emerald-600" />
            <span>API Online</span>
          </div>
        )}

        {/* Academic Session Selector */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-700">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="bg-transparent border-none outline-hidden cursor-pointer font-bold text-slate-800"
          >
            <option value="2027-28">2027-28</option>
            <option value="2026-27">2026-27</option>
            <option value="2025-26">2025-26</option>
          </select>
        </div>

        {/* 3 Color Accents as shown in the top right of wireframe screenshot */}
        <div className="flex items-center gap-1.5 pl-1">
          <button
            type="button"
            className="w-5 h-5 rounded-full bg-[#7c3aed] ring-2 ring-transparent hover:ring-purple-300 transition-all cursor-pointer"
            title="Purple Theme"
          />
          <button
            type="button"
            className="w-5 h-5 rounded-full bg-[#00a896] ring-2 ring-emerald-300 transition-all cursor-pointer"
            title="Teal Theme (Active)"
          />
          <button
            type="button"
            className="w-5 h-5 rounded-full bg-[#0b382c] ring-2 ring-transparent hover:ring-emerald-700 transition-all cursor-pointer"
            title="Deep Green Theme"
          />
        </div>
      </div>
    </header>
  );
};
