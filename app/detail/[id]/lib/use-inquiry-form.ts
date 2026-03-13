"use client";

import { useState } from "react";
import { Pet } from "@/types/listing-types";
import { submitInquiry, type InquiryResponse } from "@/lib/api/submit-inquiry";
import { validateInquiryForm, type ValidationErrors } from "./utils";

export interface InquiryFormData {
  petId: string;
  fullName: string;
  email: string;
  message: string;
}

export interface UseInquiryFormReturn {
  open: boolean;
  setOpen: (open: boolean) => void;
  isSubmitting: boolean;
  successData: InquiryResponse | null;
  showSuccessDialog: boolean;
  setShowSuccessDialog: (show: boolean) => void;
  errorMessage: string | null;
  showErrorDialog: boolean;
  setShowErrorDialog: (show: boolean) => void;
  formData: InquiryFormData;
  errors: ValidationErrors;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export function useInquiryForm(pet: Pet): UseInquiryFormReturn {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<InquiryResponse | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [formData, setFormData] = useState<InquiryFormData>({
    petId: pet.id,
    fullName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateInquiryForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitInquiry(formData);

      // Store success data and show success dialog
      setSuccessData(response);
      setFormData({ petId: pet.id, fullName: "", email: "", message: "" });
      setErrors({});
      setOpen(false);
      setShowSuccessDialog(true);
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      // Show error message to user via dialog
      const message =
        error instanceof Error
          ? error.message
          : "Failed to submit inquiry. Please try again.";
      setErrorMessage(message);
      setShowErrorDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    open,
    setOpen,
    isSubmitting,
    successData,
    showSuccessDialog,
    setShowSuccessDialog,
    errorMessage,
    showErrorDialog,
    setShowErrorDialog,
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
}
