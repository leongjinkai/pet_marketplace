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
import { AvailableFilter } from "../../lib/use-pet-filters";

interface AvailabilityFilterProps {
  availableFilter: AvailableFilter;
  handleAvailableChange: (value: AvailableFilter) => void;
}

export function AvailabilityFilter({
  availableFilter,
  handleAvailableChange,
}: AvailabilityFilterProps) {
  const [open, setOpen] = useState(false);
  const label =
    availableFilter === AvailableFilter.All
      ? "Availability: All"
      : availableFilter === AvailableFilter.Available
        ? "Availability: Available"
        : "Availability: Not Available";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit" align="start">
        <RadioGroup
          value={availableFilter as string}
          onValueChange={(value) =>
            handleAvailableChange(value as AvailableFilter)
          }
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={AvailableFilter.All} id="availability-all" />
            <Label
              htmlFor="availability-all"
              className="text-sm cursor-pointer"
            >
              All
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value={AvailableFilter.Available}
              id="availability-available"
            />
            <Label
              htmlFor="availability-available"
              className="text-sm cursor-pointer"
            >
              Available
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value={AvailableFilter.NotAvailable}
              id="availability-not-available"
            />
            <Label
              htmlFor="availability-not-available"
              className="text-sm cursor-pointer"
            >
              Not Available
            </Label>
          </div>
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
}
