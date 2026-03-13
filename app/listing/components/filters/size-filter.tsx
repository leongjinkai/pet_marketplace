"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
      <PopoverContent className="w-fit" align="start">
        <div className="space-y-2">
          {uniqueSizes.map((size) => {
            const id = `desktop-size-${size}`;
            return (
              <div
                key={size}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Checkbox
                  id={id}
                  checked={selectedSizes.includes(size)}
                  onCheckedChange={() => handleSizeToggle(size)}
                />
                <Label
                  htmlFor={id}
                  className="text-sm capitalize cursor-pointer"
                >
                  {size}
                </Label>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
