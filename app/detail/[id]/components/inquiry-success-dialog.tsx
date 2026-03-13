"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pet } from "@/types/listing-types";
import { type InquiryResponse } from "@/lib/api/submit-inquiry";
import { formatDate } from "../lib/utils";
import { PetImage } from "@/app/listing/components/pet-image";

interface InquirySuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  successData: InquiryResponse | null;
  pet: Pet;
}

export function InquirySuccessDialog({
  open,
  onOpenChange,
  successData,
  pet,
}: InquirySuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Inquiry Submitted Successfully!</DialogTitle>
          <DialogDescription>
            Your inquiry has been received and we will get back to you soon.
          </DialogDescription>
        </DialogHeader>
        {successData && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-muted">
                <PetImage
                  src={successData.imageUrl}
                  alt={successData.petName}
                  className="rounded-lg"
                  rounded
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-lg">{successData.petName}</p>
                <p className="text-sm text-muted-foreground">
                  {pet.age_months} months old
                </p>
                <p className="text-sm text-muted-foreground">
                  Pet ID: {successData.petId}
                </p>
              </div>
            </div>
            <div className="space-y-2 pt-2 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Inquiry ID:</span>
                <span className="font-medium">{successData.inquiryId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Received At:</span>
                <span className="font-medium">
                  {formatDate(successData.receivedAt)}
                </span>
              </div>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
