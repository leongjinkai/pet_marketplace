"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ClearFiltersButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export function ClearFiltersButton({
  onClick,
  disabled = false,
  className,
}: ClearFiltersButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className={cn("cursor-pointer", className)}
      disabled={disabled}
    >
      Clear
    </Button>
  );
}
