"use client";

import { useState } from "react";
import type { Pet } from "@/types/listing-types";
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
  const [uiState, setUiState] = useState({
    open: false,
    isSubmitting: false,
    showSuccessDialog: false,
    showErrorDialog: false,
  });
  const [successData, setSuccessData] = useState<InquiryResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<InquiryFormData>({
    petId: pet.id,
    fullName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const { open, isSubmitting, showSuccessDialog, showErrorDialog } = uiState;

  const setOpen = (open: boolean) => setUiState((prev) => ({ ...prev, open }));

  const setShowSuccessDialog = (show: boolean) =>
    setUiState((prev) => ({ ...prev, showSuccessDialog: show }));

  const setShowErrorDialog = (show: boolean) =>
    setUiState((prev) => ({ ...prev, showErrorDialog: show }));

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

    setUiState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      const response = await submitInquiry(formData);

      // Store success data and show success dialog
      setSuccessData(response);
      setFormData({ petId: pet.id, fullName: "", email: "", message: "" });
      setErrors({});
      setUiState((prev) => ({
        ...prev,
        isSubmitting: false,
        open: false,
        showSuccessDialog: true,
        showErrorDialog: false,
      }));
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      // Show error message to user via dialog
      const message =
        error instanceof Error
          ? error.message
          : "Failed to submit inquiry. Please try again.";
      setErrorMessage(message);
      setUiState((prev) => ({
        ...prev,
        isSubmitting: false,
        showErrorDialog: true,
      }));
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
