export interface InquiryFormData {
  fullName: string;
  email: string;
  message: string;
}

export interface ValidationErrors {
  fullName?: string;
  email?: string;
  message?: string;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateInquiryForm(formData: InquiryFormData): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.message.trim()) {
    errors.message = "Message is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
