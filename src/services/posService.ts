import { apiClient, queueOfflineAction, getStoredApiConfig } from './apiClient';
import { Student, FeePayment, Expense, Notice, AttendanceRecord } from '../types';

export const posService = {
  // 1. Fee Collection / POS Payment
  async collectFee(payload: {
    studentId: string;
    studentName: string;
    studentClass: string;
    amount: number;
    paymentMode: 'Cash' | 'UPI' | 'Card' | 'Cheque';
    collectedBy: string;
    notes?: string;
  }): Promise<{ success: boolean; payment: FeePayment; offlineQueued?: boolean }> {
    const config = getStoredApiConfig();
    const receiptNo = `RCP-${new Date().getFullYear().toString().slice(-2)}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(Math.floor(10000 + Math.random() * 90000))}`;
    
    const newPayment: FeePayment = {
      id: `PAY-${Date.now()}`,
      receiptNo,
      studentId: payload.studentId,
      studentName: payload.studentName,
      class: payload.studentClass,
      amount: payload.amount,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      paymentMode: payload.paymentMode,
      collectedBy: payload.collectedBy,
      notes: payload.notes || 'POS Quick Collection',
    };

    if (!navigator.onLine || config.useMockFallback) {
      // Queue in background offline storage for eventual Laravel sync
      if (!navigator.onLine) {
        queueOfflineAction({
          endpoint: '/fees/collect',
          method: 'POST',
          payload: newPayment,
          description: `Fee Collection: ${payload.studentName} ₹${payload.amount}`,
        });
      }
      return { success: true, payment: newPayment, offlineQueued: !navigator.onLine };
    }

    try {
      const response = await apiClient.post('/fees/collect', newPayment);
      return { success: true, payment: response.data?.payment || newPayment };
    } catch (err) {
      console.warn('Backend API unavailable, saving in offline queue:', err);
      queueOfflineAction({
        endpoint: '/fees/collect',
        method: 'POST',
        payload: newPayment,
        description: `Fee Collection: ${payload.studentName} ₹${payload.amount}`,
      });
      return { success: true, payment: newPayment, offlineQueued: true };
    }
  },

  // 2. New Admission
  async createAdmission(student: Omit<Student, 'id'>): Promise<{ success: boolean; student: Student }> {
    const id = `STU-${String(Math.floor(100 + Math.random() * 900))}`;
    const fullStudent: Student = {
      ...student,
      id,
    };

    const config = getStoredApiConfig();
    if (!navigator.onLine || config.useMockFallback) {
      if (!navigator.onLine) {
        queueOfflineAction({
          endpoint: '/students/admission',
          method: 'POST',
          payload: fullStudent,
          description: `New Admission: ${fullStudent.name} (${fullStudent.class})`,
        });
      }
      return { success: true, student: fullStudent };
    }

    try {
      const response = await apiClient.post('/students/admission', fullStudent);
      return { success: true, student: response.data?.student || fullStudent };
    } catch (err) {
      queueOfflineAction({
        endpoint: '/students/admission',
        method: 'POST',
        payload: fullStudent,
        description: `New Admission: ${fullStudent.name} (${fullStudent.class})`,
      });
      return { success: true, student: fullStudent };
    }
  },

  // 3. Record Expense
  async addExpense(payload: Omit<Expense, 'id'>): Promise<{ success: boolean; expense: Expense }> {
    const expense: Expense = {
      ...payload,
      id: `EXP-${Date.now()}`,
    };

    const config = getStoredApiConfig();
    if (!navigator.onLine || config.useMockFallback) {
      if (!navigator.onLine) {
        queueOfflineAction({
          endpoint: '/expenses',
          method: 'POST',
          payload: expense,
          description: `Expense: ${expense.title} ₹${expense.amount}`,
        });
      }
      return { success: true, expense };
    }

    try {
      const res = await apiClient.post('/expenses', expense);
      return { success: true, expense: res.data?.expense || expense };
    } catch (err) {
      queueOfflineAction({
        endpoint: '/expenses',
        method: 'POST',
        payload: expense,
        description: `Expense: ${expense.title} ₹${expense.amount}`,
      });
      return { success: true, expense };
    }
  },

  // 4. Mark Attendance
  async saveAttendance(records: AttendanceRecord[]): Promise<{ success: boolean }> {
    const config = getStoredApiConfig();
    if (!navigator.onLine || config.useMockFallback) {
      if (!navigator.onLine) {
        queueOfflineAction({
          endpoint: '/attendance/bulk-record',
          method: 'POST',
          payload: { records },
          description: `Attendance saved for ${records.length} students`,
        });
      }
      return { success: true };
    }

    try {
      await apiClient.post('/attendance/bulk-record', { records });
      return { success: true };
    } catch (err) {
      queueOfflineAction({
        endpoint: '/attendance/bulk-record',
        method: 'POST',
        payload: { records },
        description: `Attendance saved for ${records.length} students`,
      });
      return { success: true };
    }
  },

  // 5. Post Notice
  async postNotice(notice: Omit<Notice, 'id'>): Promise<{ success: boolean; notice: Notice }> {
    const newNotice: Notice = {
      ...notice,
      id: `NOT-${Date.now()}`,
    };
    return { success: true, notice: newNotice };
  },

  // 6. WhatsApp Reminder generator
  getWhatsAppReminderUrl(phone: string, studentName: string, dueAmount: number, session: string = '2027-28') {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const message = encodeURIComponent(
      `Dear Parent, this is a friendly fee reminder from Data Click IT HUB for student ${studentName}. Pending tuition fee is ₹${dueAmount.toLocaleString('en-IN')} for academic session ${session}. Kindly clear the dues at your earliest convenience or visit the fee counter. Thank you!`
    );
    return `https://wa.me/${formattedPhone}?text=${message}`;
  },
};
