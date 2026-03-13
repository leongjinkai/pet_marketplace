"use client";

import { usePetFilters } from "../lib/use-pet-filters";
import { MobileFilters } from "./filters/mobile-filters";
import { DesktopFilters } from "./filters/desktop-filters";
import type { AvailableFilter } from "../lib/use-pet-filters";

interface PetFiltersProps {
  uniqueSpecies: string[];
  uniqueSizes: string[];
}

export type FiltersViewModel = {
  selectedSpecies: string[];
  selectedSizes: string[];
  availableFilter: AvailableFilter;
  activeFilterCount: number;
  isApplyingFilters: boolean;
  hasSelectedFilters: boolean;
  handleSpeciesToggle: (species: string) => void;
  handleSizeToggle: (size: string) => void;
  handleAvailableChange: (value: AvailableFilter) => void;
  applyFilters: () => void;
  resetFilters: () => void;
};

export function PetFilters({ uniqueSpecies, uniqueSizes }: PetFiltersProps) {
  const filters = usePetFilters();

  const model: FiltersViewModel = {
    selectedSpecies: filters.selectedSpecies,
    selectedSizes: filters.selectedSizes,
    availableFilter: filters.availableFilter,
    activeFilterCount: filters.activeFilterCount,
    isApplyingFilters: filters.isApplyingFilters,
    hasSelectedFilters: filters.hasSelectedFilters,
    handleSpeciesToggle: filters.handleSpeciesToggle,
    handleSizeToggle: filters.handleSizeToggle,
    handleAvailableChange: filters.handleAvailableChange,
    applyFilters: filters.applyFilters,
    resetFilters: filters.resetFilters,
  };

  return (
    <>
      {filters.isApplyingFilters && (
        <div
          className="fixed inset-0 z-20 bg-background/40 pointer-events-auto"
          aria-hidden="true"
        />
      )}
      <MobileFilters
        uniqueSpecies={uniqueSpecies}
        uniqueSizes={uniqueSizes}
        model={model}
      />
      <DesktopFilters
        uniqueSpecies={uniqueSpecies}
        uniqueSizes={uniqueSizes}
        model={model}
      />
    </>
  );
}
