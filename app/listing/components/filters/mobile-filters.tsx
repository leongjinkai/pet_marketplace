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
import { ApplyFiltersButton } from "./apply-filters-button";
import { ClearFiltersButton } from "./clear-filters-button";
import { capitalize } from "@/lib/utils";
import {
  ALL_SPECIES,
  ALL_SIZES,
  AvailableFilter,
} from "../../lib/use-pet-filters";
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
    isApplyingFilters,
    hasSelectedFilters,
    handleSpeciesChange,
    handleSizeChange,
    handleAvailableChange,
    applyFilters,
    resetFilters,
  } = model;
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeLabels: string[] = [];
  if (selectedSpecies !== ALL_SPECIES) {
    activeLabels.push(capitalize(selectedSpecies));
  }
  if (selectedSizes !== ALL_SIZES) {
    activeLabels.push(capitalize(selectedSizes));
  }
  if (availableFilter === AvailableFilter.Available) {
    activeLabels.push("Available");
  } else if (availableFilter === AvailableFilter.NotAvailable) {
    activeLabels.push("Not Available");
  }
  const filtersButtonLabel =
    activeLabels.length > 0
      ? `Filters: ${activeLabels.join(" · ")}`
      : "Filters";

  const handleApplyFilters = () => {
    applyFilters();
    setMobileOpen(false);
  };

  return (
    <div className="md:hidden">
      <Popover open={mobileOpen} onOpenChange={setMobileOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="cursor-pointer">
            {filtersButtonLabel}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60" align="start">
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-semibold">Species</h3>
              <RadioGroup
                value={selectedSpecies || ALL_SPECIES}
                onValueChange={handleSpeciesChange}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={ALL_SPECIES} id="mobile-species-all" />
                  <Label
                    htmlFor="mobile-species-all"
                    className="text-sm cursor-pointer"
                  >
                    All
                  </Label>
                </div>
                {uniqueSpecies.map((species) => {
                  const id = `mobile-species-${species}`;
                  return (
                    <div
                      key={species}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <RadioGroupItem value={species} id={id} />
                      <Label
                        htmlFor={id}
                        className="text-sm capitalize cursor-pointer"
                      >
                        {species}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">Size</h3>
              <RadioGroup
                value={selectedSizes || ALL_SIZES}
                onValueChange={handleSizeChange}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={ALL_SIZES} id="mobile-size-all" />
                  <Label
                    htmlFor="mobile-size-all"
                    className="text-sm cursor-pointer"
                  >
                    All
                  </Label>
                </div>
                {uniqueSizes.map((size) => {
                  const id = `mobile-size-${size}`;
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
