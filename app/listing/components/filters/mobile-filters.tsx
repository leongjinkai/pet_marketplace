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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ApplyFiltersButton } from "./apply-filters-button";
import { ClearFiltersButton } from "./clear-filters-button";
import { AvailableFilter } from "../../lib/use-pet-filters";
import type { FiltersViewModel } from "../pet-filters";

interface MobileFiltersProps {
  uniqueSpecies: string[];
  uniqueSizes: string[];
  model: FiltersViewModel;
}

export function MobileFilters({
  uniqueSpecies,
  uniqueSizes,
  model,
}: MobileFiltersProps) {
  const {
    selectedSpecies,
    selectedSizes,
    availableFilter,
    activeFilterCount,
    isApplyingFilters,
    hasSelectedFilters,
    handleSpeciesToggle,
    handleSizeToggle,
    handleAvailableChange,
    applyFilters,
    resetFilters,
  } = model;
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
        <PopoverContent className="w-60" align="start">
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-semibold">Species</h3>
              <div className="space-y-2">
                {uniqueSpecies.map((species) => {
                  const id = `mobile-species-${species}`;
                  return (
                    <div
                      key={species}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Checkbox
                        id={id}
                        checked={selectedSpecies.includes(species)}
                        onCheckedChange={() => handleSpeciesToggle(species)}
                      />
                      <Label
                        htmlFor={id}
                        className="text-sm capitalize cursor-pointer"
                      >
                        {species}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">Size</h3>
              <div className="space-y-2">
                {uniqueSizes.map((size) => {
                  const id = `mobile-size-${size}`;
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

            <div className="flex items-center justify-between gap-2 pt-2 border-t">
              <ClearFiltersButton
                onClick={resetFilters}
                disabled={isApplyingFilters || !hasSelectedFilters}
              />
              <ApplyFiltersButton
                onClick={handleApplyFilters}
                isApplying={isApplyingFilters}
                className="flex-1"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
