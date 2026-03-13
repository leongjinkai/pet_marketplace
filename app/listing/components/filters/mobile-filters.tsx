"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AvailableFilter } from "../../lib/use-pet-filters";

interface MobileFiltersProps {
  uniqueSpecies: string[];
  uniqueSizes: string[];
  selectedSpecies: string[];
  selectedSizes: string[];
  availableFilter: AvailableFilter;
  activeFilterCount: number;
  handleSpeciesToggle: (species: string) => void;
  handleSizeToggle: (size: string) => void;
  handleAvailableChange: (value: AvailableFilter) => void;
  applyFilters: () => void;
}

export function MobileFilters({
  uniqueSpecies,
  uniqueSizes,
  selectedSpecies,
  selectedSizes,
  availableFilter,
  activeFilterCount,
  handleSpeciesToggle,
  handleSizeToggle,
  handleAvailableChange,
  applyFilters,
}: MobileFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleApplyFilters = () => {
    applyFilters();
    setMobileOpen(false);
  };

  return (
    <div className="md:hidden">
      <Popover open={mobileOpen} onOpenChange={setMobileOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="cursor-pointer">
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-semibold">Species</h3>
              <div className="space-y-2">
                {uniqueSpecies.map((species) => (
                  <label
                    key={species}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedSpecies.includes(species)}
                      onCheckedChange={() => handleSpeciesToggle(species)}
                    />
                    <span className="text-sm capitalize">{species}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">Size</h3>
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
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">Availability</h3>
              <RadioGroup
                value={availableFilter as string}
                onValueChange={(value) =>
                  handleAvailableChange(value as AvailableFilter)
                }
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={AvailableFilter.All}
                    id="mobile-availability-all"
                  />
                  <Label
                    htmlFor="mobile-availability-all"
                    className="text-sm cursor-pointer"
                  >
                    All
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={AvailableFilter.Available}
                    id="mobile-availability-available"
                  />
                  <Label
                    htmlFor="mobile-availability-available"
                    className="text-sm cursor-pointer"
                  >
                    Available
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={AvailableFilter.NotAvailable}
                    id="mobile-availability-not-available"
                  />
                  <Label
                    htmlFor="mobile-availability-not-available"
                    className="text-sm cursor-pointer"
                  >
                    Not Available
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="pt-2 border-t">
              <Button
                onClick={handleApplyFilters}
                className="w-full cursor-pointer"
                variant="default"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
