"use client";

import type { Pet } from "@/types/listing-types";
import { useInquiryForm } from "../lib/use-inquiry-form";
import { InquiryErrorDialog } from "./inquiry-error-dialog";
import { InquiryFormDialog } from "./inquiry-form-dialog";
import { InquirySuccessDialog } from "./inquiry-success-dialog";

interface InquiryFormProps {
  pet: Pet;
}

export function InquiryForm({ pet }: InquiryFormProps) {
  const {
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
  } = useInquiryForm(pet);

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

      <InquiryErrorDialog
        open={showErrorDialog}
        onOpenChange={setShowErrorDialog}
        message={errorMessage}
      />
    </>
  );
}
