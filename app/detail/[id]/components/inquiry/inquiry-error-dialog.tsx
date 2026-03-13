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

interface InquiryErrorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string | null;
}

export function InquiryErrorDialog({
  open,
  onOpenChange,
  message,
}: InquiryErrorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Something went wrong</DialogTitle>
          <DialogDescription>
            We couldn&apos;t submit your inquiry. Please review the message
            below and try again.
          </DialogDescription>
        </DialogHeader>
        {message && (
          <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            {message}
          </div>
        )}
        <DialogFooter>
          <Button type="button" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
