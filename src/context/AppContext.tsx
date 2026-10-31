import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  NavigationTab,
  Student,
  FeePayment,
  Expense,
  Notice,
  DashboardSummary,
  LaravelApiConfig,
  AttendanceRecord,
} from '../types';
import {
  initialSummary,
  initialStudents,
  initialRecentPayments,
  initialExpenses,
  initialNotices,
} from '../services/mockLaravelData';
import {
  getStoredApiConfig,
  saveApiConfig,
  getOfflineQueue,
  clearOfflineQueue,
} from '../services/apiClient';
import { posService } from '../services/posService';
import confetti from 'canvas-confetti';

interface AppContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  summary: DashboardSummary;
  students: Student[];
  payments: FeePayment[];
  expenses: Expense[];
  notices: Notice[];
  session: string;
  setSession: (session: string) => void;
  apiConfig: LaravelApiConfig;
  updateApiConfig: (config: LaravelApiConfig) => void;
  isOnline: boolean;
  offlineQueueCount: number;
  syncOfflineQueue: () => Promise<void>;

  // Modals & Triggers
  isQuickCollectOpen: boolean;
  setIsQuickCollectOpen: (open: boolean) => void;
  quickCollectStudent: Student | null;
  openQuickCollect: (student?: Student) => void;

  isAdmissionOpen: boolean;
  setIsAdmissionOpen: (open: boolean) => void;

  isExpenseOpen: boolean;
  setIsExpenseOpen: (open: boolean) => void;

  isNoticeOpen: boolean;
  setIsNoticeOpen: (open: boolean) => void;

  isAttendanceOpen: boolean;
  setIsAttendanceOpen: (open: boolean) => void;

  isApiConfigOpen: boolean;
  setIsApiConfigOpen: (open: boolean) => void;

  activeReceipt: FeePayment | null;
  setActiveReceipt: (payment: FeePayment | null) => void;

  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;

  isAndroidPosMode: boolean;
  setIsAndroidPosMode: (enabled: boolean) => void;

  // Actions
  handleCollectFee: (studentId: string, amount: number, paymentMode: any, notes?: string) => Promise<boolean>;
  handleNewAdmission: (data: Omit<Student, 'id'>) => Promise<boolean>;
  handleAddExpense: (data: Omit<Expense, 'id'>) => Promise<boolean>;
  handlePostNotice: (data: Omit<Notice, 'id'>) => Promise<boolean>;
  handleSaveAttendance: (records: AttendanceRecord[]) => Promise<boolean>;
  handleWhatsAppReminder: (student: Student) => void;
  handleExportData: (type: 'students' | 'payments' | 'all') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [session, setSession] = useState<string>('2027-28');
  const [summary, setSummary] = useState<DashboardSummary>(() => {
    const saved = localStorage.getItem('dataclick_summary');
    return saved ? JSON.parse(saved) : initialSummary;
  });
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('dataclick_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });
  const [payments, setPayments] = useState<FeePayment[]>(() => {
    const saved = localStorage.getItem('dataclick_payments');
    return saved ? JSON.parse(saved) : initialRecentPayments;
  });
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('dataclick_expenses');
    return saved ? JSON.parse(saved) : initialExpenses;
  });
  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('dataclick_notices');
    return saved ? JSON.parse(saved) : initialNotices;
  });

  const [apiConfig, setApiConfigState] = useState<LaravelApiConfig>(getStoredApiConfig());
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [offlineQueueCount, setOfflineQueueCount] = useState<number>(getOfflineQueue().length);

  // Modal States
  const [isQuickCollectOpen, setIsQuickCollectOpen] = useState(false);
  const [quickCollectStudent, setQuickCollectStudent] = useState<Student | null>(null);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isApiConfigOpen, setIsApiConfigOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<FeePayment | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isAndroidPosMode, setIsAndroidPosMode] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('dataclick_summary', JSON.stringify(summary));
  }, [summary]);
  useEffect(() => {
    localStorage.setItem('dataclick_students', JSON.stringify(students));
  }, [students]);
  useEffect(() => {
    localStorage.setItem('dataclick_payments', JSON.stringify(payments));
  }, [payments]);
  useEffect(() => {
    localStorage.setItem('dataclick_expenses', JSON.stringify(expenses));
  }, [expenses]);
  useEffect(() => {
    localStorage.setItem('dataclick_notices', JSON.stringify(notices));
  }, [notices]);

  // Online / Offline listener
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setOfflineQueueCount(getOfflineQueue().length);
    };
    const handleOffline = () => {
      setIsOnline(false);
    };
    const handleQueueChange = () => {
      setOfflineQueueCount(getOfflineQueue().length);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('dataclick-offline-queue-changed', handleQueueChange);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('dataclick-offline-queue-changed', handleQueueChange);
    };
  }, []);

  const updateApiConfig = (newConfig: LaravelApiConfig) => {
    saveApiConfig(newConfig);
    setApiConfigState(newConfig);
  };

  const syncOfflineQueue = async () => {
    const queue = getOfflineQueue();
    if (queue.length === 0) return;
    
    // Simulate/execute sync against Laravel API
    await new Promise((resolve) => setTimeout(resolve, 800));
    clearOfflineQueue();
    setOfflineQueueCount(0);
    updateApiConfig({
      ...apiConfig,
      lastSyncTime: new Date().toLocaleTimeString(),
    });
  };

  const openQuickCollect = (student?: Student) => {
    setQuickCollectStudent(student || null);
    setIsQuickCollectOpen(true);
  };

  // 1. Collect Fee
  const handleCollectFee = async (
    studentId: string,
    amount: number,
    paymentMode: any,
    notes?: string
  ): Promise<boolean> => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return false;

    const res = await posService.collectFee({
      studentId: student.id,
      studentName: student.name,
      studentClass: student.class,
      amount,
      paymentMode,
      collectedBy: 'Super Administrator',
      notes,
    });

    if (res.success) {
      // Update student due & paid
      setStudents((prev) =>
        prev.map((s) => {
          if (s.id === studentId) {
            const newPaid = s.paidFee + amount;
            const newDue = Math.max(0, s.dueFee - amount);
            return { ...s, paidFee: newPaid, dueFee: newDue };
          }
          return s;
        })
      );

      // Add to recent payments list
      setPayments((prev) => [res.payment, ...prev]);

      // Update Summary metrics
      setSummary((prev) => ({
        ...prev,
        totalCollected: prev.totalCollected + amount,
        collectedToday: prev.collectedToday + amount,
        pendingFees: Math.max(0, prev.pendingFees - amount),
      }));

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#0f8b8d', '#10b981', '#3b82f6', '#f59e0b'],
        });
      } catch (e) {
        // Safe fallback
      }

      // Automatically offer Receipt
      setActiveReceipt(res.payment);
      return true;
    }
    return false;
  };

  // 2. New Admission
  const handleNewAdmission = async (data: Omit<Student, 'id'>): Promise<boolean> => {
    const res = await posService.createAdmission(data);
    if (res.success) {
      setStudents((prev) => [res.student, ...prev]);
      setSummary((prev) => ({
        ...prev,
        activeStudents: prev.activeStudents + 1,
        newStudentsThisMonth: prev.newStudentsThisMonth + 1,
        pendingFees: prev.pendingFees + res.student.dueFee,
        totalCollected: prev.totalCollected + res.student.paidFee,
      }));
      return true;
    }
    return false;
  };

  // 3. Add Expense
  const handleAddExpense = async (data: Omit<Expense, 'id'>): Promise<boolean> => {
    const res = await posService.addExpense(data);
    if (res.success) {
      setExpenses((prev) => [res.expense, ...prev]);
      setSummary((prev) => ({
        ...prev,
        totalExpenses: prev.totalExpenses + res.expense.amount,
      }));
      return true;
    }
    return false;
  };

  // 4. Post Notice
  const handlePostNotice = async (data: Omit<Notice, 'id'>): Promise<boolean> => {
    const res = await posService.postNotice(data);
    if (res.success) {
      setNotices((prev) => [res.notice, ...prev]);
      return true;
    }
    return false;
  };

  // 5. Save Attendance
  const handleSaveAttendance = async (records: AttendanceRecord[]): Promise<boolean> => {
    const res = await posService.saveAttendance(records);
    return res.success;
  };

  // 6. WhatsApp Reminder
  const handleWhatsAppReminder = (student: Student) => {
    const url = posService.getWhatsAppReminderUrl(student.phone, student.name, student.dueFee, session);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // 7. Export Data
  const handleExportData = (type: 'students' | 'payments' | 'all') => {
    let content = '';
    let filename = `dataclick_${type}_${Date.now()}.csv`;

    if (type === 'students' || type === 'all') {
      const headers = ['ID', 'Name', 'Roll No', 'Class', 'Parent Name', 'Phone', 'Total Fee', 'Paid', 'Due'];
      const rows = students.map((s) => [
        s.id,
        `"${s.name}"`,
        s.rollNo,
        `"${s.class}"`,
        `"${s.parentName}"`,
        s.phone,
        s.totalFee,
        s.paidFee,
        s.dueFee,
      ]);
      content = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    } else if (type === 'payments') {
      const headers = ['Receipt No', 'Student', 'Class', 'Amount', 'Date', 'Mode', 'Collected By'];
      const rows = payments.map((p) => [
        p.receiptNo,
        `"${p.studentName}"`,
        p.class,
        p.amount,
        p.date,
        p.paymentMode,
        `"${p.collectedBy}"`,
      ]);
      content = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    }

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        summary,
        students,
        payments,
        expenses,
        notices,
        session,
        setSession,
        apiConfig,
        updateApiConfig,
        isOnline,
        offlineQueueCount,
        syncOfflineQueue,
        isQuickCollectOpen,
        setIsQuickCollectOpen,
        quickCollectStudent,
        openQuickCollect,
        isAdmissionOpen,
        setIsAdmissionOpen,
        isExpenseOpen,
        setIsExpenseOpen,
        isNoticeOpen,
        setIsNoticeOpen,
        isAttendanceOpen,
        setIsAttendanceOpen,
        isApiConfigOpen,
        setIsApiConfigOpen,
        activeReceipt,
        setActiveReceipt,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        isAndroidPosMode,
        setIsAndroidPosMode,
        handleCollectFee,
        handleNewAdmission,
        handleAddExpense,
        handlePostNotice,
        handleSaveAttendance,
        handleWhatsAppReminder,
        handleExportData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
