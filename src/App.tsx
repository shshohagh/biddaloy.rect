import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { DashboardHeader } from './components/DashboardHeader';
import { StatCards } from './components/StatCards';
import { ChartsSection } from './components/ChartsSection';
import { QuickActions } from './components/QuickActions';
import { DefaultersAndPayments } from './components/DefaultersAndPayments';
import { NoticesCard } from './components/NoticesCard';
import { FooterBar } from './components/FooterBar';
import { QuickFeeCollectModal } from './components/QuickFeeCollectModal';
import { NewAdmissionModal } from './components/NewAdmissionModal';
import { AddExpenseModal } from './components/AddExpenseModal';
import { PostNoticeModal } from './components/PostNoticeModal';
import { AttendanceModal } from './components/AttendanceModal';
import { ReceiptModal } from './components/ReceiptModal';
import { ApiConfigModal } from './components/ApiConfigModal';
import { AndroidPosBar } from './components/AndroidPosBar';
import { StudentListView } from './components/StudentListView';
import { FeeCollectionView } from './components/FeeCollectionView';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-[#f4f7f6] text-slate-900 flex flex-col antialiased selection:bg-teal-200">
      {/* Left Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
        <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto pb-20 lg:pb-8">
          {/* Top Bar / Header */}
          <DashboardHeader />

          {/* Conditional View Rendering */}
          {activeTab === 'dashboard' && (
            <>
              {/* 4 Metric KPI Cards */}
              <StatCards />

              {/* Monthly Fee Collection & Students by Class */}
              <ChartsSection />

              {/* 8 Quick Actions Grid */}
              <QuickActions />

              {/* Defaulters and Recent Payments Tables */}
              <DefaultersAndPayments />

              {/* Notice Board */}
              <NoticesCard />
            </>
          )}

          {(activeTab === 'all_students' ||
            activeTab === 'admission_enquiry' ||
            activeTab === 'passed_out' ||
            activeTab === 'promotion') && <StudentListView />}

          {(activeTab === 'fee_collection' ||
            activeTab === 'fee_structure' ||
            activeTab === 'all_reports' ||
            activeTab === 'income_vs_expense') && <FeeCollectionView />}

          {activeTab === 'whatsapp_reminder' && <StudentListView />}
        </main>

        {/* Footer Bar */}
        <FooterBar />
      </div>

      {/* Android POS Handheld Bottom Touch Bar */}
      <AndroidPosBar />

      {/* Interactive Modals */}
      <QuickFeeCollectModal />
      <NewAdmissionModal />
      <AddExpenseModal />
      <PostNoticeModal />
      <AttendanceModal />
      <ReceiptModal />
      <ApiConfigModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
