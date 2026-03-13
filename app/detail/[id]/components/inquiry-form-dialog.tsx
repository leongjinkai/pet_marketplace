"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldContent,
  FieldGroup,
} from "@/components/ui/field";
import type { Pet } from "@/types/listing-types";
import type { ValidationErrors } from "../lib/utils";
import type { InquiryFormData } from "@/lib/api/submit-inquiry";

interface InquiryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pet: Pet;
  formData: InquiryFormData;
  errors: ValidationErrors;
  isSubmitting: boolean;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function InquiryFormDialog({
  open,
  onOpenChange,
  pet,
  formData,
  errors,
  isSubmitting,
  onInputChange,
  onSubmit,
}: InquiryFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          disabled={!pet.available}
          className={
            pet.available ? "cursor-pointer" : "cursor-not-allowed opacity-60"
          }
          size="lg"
          variant="outline"
        >
          {pet.available ? "Inquire" : "Inquiries unavailable"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Inquire about {pet.name}</DialogTitle>
          <DialogDescription>
            {pet.available
              ? "Fill out the form below to send an inquiry about this pet."
              : "This pet is currently unavailable, so inquiries cannot be submitted."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            <Field data-invalid={!!errors.fullName}>
              <FieldLabel htmlFor="fullName">
                Full Name <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={onInputChange}
                  placeholder="John Doe"
                  aria-invalid={!!errors.fullName}
                />
                <FieldError>{errors.fullName}</FieldError>
              </FieldContent>
            </Field>

            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">
                Email <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                <Input
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={onInputChange}
                  placeholder="john@example.com"
                  aria-invalid={!!errors.email}
                />
                <FieldError>{errors.email}</FieldError>
              </FieldContent>
            </Field>

            <Field data-invalid={!!errors.message}>
              <FieldLabel htmlFor="message">
                Message <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={onInputChange}
                  rows={4}
                  placeholder="Your message here..."
                  aria-invalid={!!errors.message}
                />
                <FieldError>{errors.message}</FieldError>
              </FieldContent>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
