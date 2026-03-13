"use client";

import { ApplyFiltersButton } from "./apply-filters-button";
import { ClearFiltersButton } from "./clear-filters-button";
import { SpeciesFilter } from "./species-filter";
import { SizeFilter } from "./size-filter";
import { AvailabilityFilter } from "./availability-filter";
import type { FiltersViewModel } from "../pet-filters";

interface DesktopFiltersProps {
  uniqueSpecies: string[];
  uniqueSizes: string[];
  model: FiltersViewModel;
}

export function DesktopFilters({
  uniqueSpecies,
  uniqueSizes,
  model,
}: DesktopFiltersProps) {
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
  return (
    <div className="hidden md:flex md:items-center md:gap-2">
      <SpeciesFilter
        uniqueSpecies={uniqueSpecies}
        selectedSpecies={selectedSpecies}
        handleSpeciesChange={handleSpeciesChange}
      />
      <SizeFilter
        uniqueSizes={uniqueSizes}
        selectedSizes={selectedSizes}
        handleSizeChange={handleSizeChange}
      />
      <AvailabilityFilter
        availableFilter={availableFilter}
        handleAvailableChange={handleAvailableChange}
      />
      <ApplyFiltersButton
        onClick={applyFilters}
        isApplying={isApplyingFilters}
        className="ml-auto"
      />
      <ClearFiltersButton
        onClick={resetFilters}
        disabled={isApplyingFilters || !hasSelectedFilters}
      />
    </div>
  );
}
