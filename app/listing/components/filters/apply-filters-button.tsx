"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface ApplyFiltersButtonProps {
  onClick: () => void;
  isApplying: boolean;
  className?: string;
}

export function ApplyFiltersButton({
  onClick,
  isApplying,
  className,
}: ApplyFiltersButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn("cursor-pointer", className)}
      variant="default"
      disabled={isApplying}
    >
      {isApplying ? (
        <span className="inline-flex items-center justify-center gap-2">
          <Spinner className="size-3 md:size-4" />
          Applying…
        </span>
      ) : (
        "Apply Filters"
      )}
    </Button>
  );
}
