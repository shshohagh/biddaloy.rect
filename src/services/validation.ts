export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validatePhoneNumber = (phone: string): { isValid: boolean; error?: string } => {
  if (!phone || !phone.trim()) {
    return { isValid: false, error: 'Phone number is required' };
  }
  const clean = phone.replace(/[\s-()+]/g, '');
  // Standard 10-digit mobile number validation
  if (!/^\d{10}$/.test(clean)) {
    return { isValid: false, error: 'Please enter a valid 10-digit mobile number' };
  }
  return { isValid: true };
};

export const validatePositiveAmount = (amount: number | string, maxLimit?: number): { isValid: boolean; error?: string } => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num) || num <= 0) {
    return { isValid: false, error: 'Amount must be greater than 0' };
  }
  if (maxLimit !== undefined && num > maxLimit) {
    return { isValid: false, error: `Amount cannot exceed due balance of ₹${maxLimit.toLocaleString('en-IN')}` };
  }
  return { isValid: true };
};

export const validateAdmissionForm = (data: {
  name: string;
  phone: string;
  class: string;
  parentName: string;
  totalFee: number;
}): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Student full name must be at least 2 characters';
  }

  if (!data.parentName || data.parentName.trim().length < 2) {
    errors.parentName = 'Parent/Guardian name is required';
  }

  if (!data.class || !data.class.trim()) {
    errors.class = 'Please select a valid class';
  }

  const phoneVal = validatePhoneNumber(data.phone);
  if (!phoneVal.isValid) {
    errors.phone = phoneVal.error || 'Invalid phone number';
  }

  if (isNaN(data.totalFee) || data.totalFee < 0) {
    errors.totalFee = 'Total fee cannot be negative';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateExpenseForm = (data: {
  title: string;
  amount: number;
  category: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.title || data.title.trim().length < 3) {
    errors.title = 'Expense title/reason is required (min 3 chars)';
  }

  const amountVal = validatePositiveAmount(data.amount);
  if (!amountVal.isValid) {
    errors.amount = amountVal.error || 'Invalid expense amount';
  }

  if (!data.category) {
    errors.category = 'Please choose an expense category';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
