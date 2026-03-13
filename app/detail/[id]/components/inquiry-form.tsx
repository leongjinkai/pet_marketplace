"use client";

import { useState } from "react";
import { Pet } from "@/types/listing-types";
import { submitInquiry, type InquiryResponse } from "@/lib/api/submit-inquiry";
import { validateInquiryForm, type ValidationErrors } from "../lib/utils";
import { InquiryFormDialog } from "./inquiry-form-dialog";
import { InquirySuccessDialog } from "./inquiry-success-dialog";

interface InquiryFormProps {
  pet: Pet;
}

export function InquiryForm({ pet }: InquiryFormProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<InquiryResponse | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [formData, setFormData] = useState({
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
      // Show error message to user
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to submit inquiry. Please try again.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <InquiryFormDialog
        open={open}
        onOpenChange={setOpen}
        pet={pet}
        formData={formData}
        errors={errors}
        isSubmitting={isSubmitting}
        onInputChange={handleChange}
        onSubmit={handleSubmit}
      />

      <InquirySuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        successData={successData}
        pet={pet}
      />
    </>
  );
}
