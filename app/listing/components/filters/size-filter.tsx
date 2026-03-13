"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { capitalize } from "@/lib/utils";
import { ALL_SIZES } from "../../lib/use-pet-filters";

interface SizeFilterProps {
  uniqueSizes: string[];
  selectedSizes: string;
  handleSizeChange: (size: string) => void;
}

export function SizeFilter({
  uniqueSizes,
  selectedSizes,
  handleSizeChange,
}: SizeFilterProps) {
  const [open, setOpen] = useState(false);
  const label =
    selectedSizes === ALL_SIZES
      ? "Size: All"
      : `Size: ${capitalize(selectedSizes)}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit" align="start">
        <RadioGroup
          value={selectedSizes || ALL_SIZES}
          onValueChange={handleSizeChange}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={ALL_SIZES} id="desktop-size-all" />
            <Label
              htmlFor="desktop-size-all"
              className="text-sm cursor-pointer"
            >
              All
            </Label>
          </div>
          {uniqueSizes.map((size) => {
            const id = `desktop-size-${size}`;
            return (
              <div
                key={size}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <RadioGroupItem value={size} id={id} />
                <Label
                  htmlFor={id}
                  className="text-sm capitalize cursor-pointer"
                >
                  {size}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
}
