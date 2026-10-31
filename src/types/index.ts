export type NavigationTab =
  | 'dashboard'
  | 'admission_enquiry'
  | 'new_admission'
  | 'all_students'
  | 'passed_out'
  | 'promotion'
  | 'session_report'
  | 'fee_structure'
  | 'fee_collection'
  | 'quick_fee_collect'
  | 'whatsapp_reminder'
  | 'fee_deletion_log'
  | 'attendance'
  | 'attendance_report'
  | 'exams'
  | 'marks_entry'
  | 'class_result'
  | 'subjects'
  | 'class_subject_map'
  | 'exam_schedule'
  | 'expenses'
  | 'all_reports'
  | 'income_vs_expense'
  | 'staff_management'
  | 'salary_management'
  | 'salary_report'
  | 'notices'
  | 'admin_settings'
  | 'settings'
  | 'password_change';

export interface Student {
  id: string;
  name: string;
  rollNo: string;
  class: string;
  section?: string;
  parentName: string;
  phone: string;
  email?: string;
  admissionDate: string;
  totalFee: number;
  paidFee: number;
  dueFee: number;
  status: 'active' | 'passed_out' | 'inactive';
}

export interface FeePayment {
  id: string;
  receiptNo: string;
  studentId: string;
  studentName: string;
  class: string;
  amount: number;
  date: string;
  paymentMode: 'Cash' | 'UPI' | 'Card' | 'Cheque' | 'NetBanking';
  collectedBy: string;
  notes?: string;
}

export interface FeeDefaulter {
  studentId: string;
  studentName: string;
  class: string;
  phone: string;
  dueAmount: number;
  lastReminderDate?: string;
}

export interface Expense {
  id: string;
  title: string;
  category: 'Utilities' | 'Rent' | 'Salaries' | 'Maintenance' | 'Stationery' | 'Events' | 'Other';
  amount: number;
  date: string;
  paymentMode: 'Cash' | 'UPI' | 'Bank Transfer';
  vendor?: string;
  notes?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  targetAudience: 'All' | 'Students' | 'Teachers' | 'Parents';
  date: string;
  urgent?: boolean;
}

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  class: string;
  status: 'P' | 'A' | 'L'; // Present, Absent, Late
  date: string;
}

export interface DashboardSummary {
  activeStudents: number;
  newStudentsThisMonth: number;
  totalCollected: number;
  collectedToday: number;
  pendingFees: number;
  totalExpenses: number;
  currencySymbol: string;
  currentSession: string;
}

export interface LaravelApiConfig {
  baseUrl: string;
  bearerToken: string;
  useMockFallback: boolean;
  isConnected: boolean;
  lastSyncTime: string;
}

export interface OfflineQueuedAction {
  id: string;
  endpoint: string;
  method: 'POST' | 'PUT' | 'DELETE';
  payload: any;
  timestamp: string;
  description: string;
}
