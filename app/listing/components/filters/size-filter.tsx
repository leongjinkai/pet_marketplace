"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

interface SizeFilterProps {
  uniqueSizes: string[];
  selectedSizes: string[];
  handleSizeToggle: (size: string) => void;
}

export function SizeFilter({
  uniqueSizes,
  selectedSizes,
  handleSizeToggle,
}: SizeFilterProps) {
  const [open, setOpen] = useState(false);
  const activeCount = selectedSizes.length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Size
          {activeCount > 0 && (
            <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {activeCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="start">
        <div className="space-y-2">
          {uniqueSizes.map((size) => (
            <label
              key={size}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Checkbox
                checked={selectedSizes.includes(size)}
                onCheckedChange={() => handleSizeToggle(size)}
              />
              <span className="text-sm capitalize">{size}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
