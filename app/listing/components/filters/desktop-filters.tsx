"use client";

import { Button } from "@/components/ui/button";
import { SpeciesFilter } from "./species-filter";
import { SizeFilter } from "./size-filter";
import { AvailabilityFilter } from "./availability-filter";
import type { AvailableFilter } from "../../lib/use-pet-filters";

interface DesktopFiltersProps {
  uniqueSpecies: string[];
  uniqueSizes: string[];
  selectedSpecies: string[];
  selectedSizes: string[];
  availableFilter: AvailableFilter;
  handleSpeciesToggle: (species: string) => void;
  handleSizeToggle: (size: string) => void;
  handleAvailableChange: (value: AvailableFilter) => void;
  applyFilters: () => void;
  resetFilters: () => void;
}

export function DesktopFilters({
  uniqueSpecies,
  uniqueSizes,
  selectedSpecies,
  selectedSizes,
  availableFilter,
  handleSpeciesToggle,
  handleSizeToggle,
  handleAvailableChange,
  applyFilters,
  resetFilters,
}: DesktopFiltersProps) {
  return (
    <div className="hidden md:flex md:items-center md:gap-2">
      <SpeciesFilter
        uniqueSpecies={uniqueSpecies}
        selectedSpecies={selectedSpecies}
        handleSpeciesToggle={handleSpeciesToggle}
      />
      <SizeFilter
        uniqueSizes={uniqueSizes}
        selectedSizes={selectedSizes}
        handleSizeToggle={handleSizeToggle}
      />
      <AvailabilityFilter
        availableFilter={availableFilter}
        handleAvailableChange={handleAvailableChange}
      />
      <Button
        onClick={applyFilters}
        variant="default"
        className="ml-auto cursor-pointer"
      >
        Apply Filters
      </Button>
      <Button
        onClick={resetFilters}
        variant="outline"
        className="cursor-pointer"
      >
        Clear
      </Button>
    </div>
  );
}
