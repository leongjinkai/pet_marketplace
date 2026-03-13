"use client";

import { usePetFilters } from "../lib/use-pet-filters";
import { MobileFilters } from "./filters/mobile-filters";
import { DesktopFilters } from "./filters/desktop-filters";

interface PetFiltersProps {
  uniqueSpecies: string[];
  uniqueSizes: string[];
}

export function PetFilters({ uniqueSpecies, uniqueSizes }: PetFiltersProps) {
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
  } = usePetFilters();

  return (
    <>
      <MobileFilters
        uniqueSpecies={uniqueSpecies}
        uniqueSizes={uniqueSizes}
        selectedSpecies={selectedSpecies}
        selectedSizes={selectedSizes}
        availableFilter={availableFilter}
        activeFilterCount={activeFilterCount}
        isApplyingFilters={isApplyingFilters}
        hasSelectedFilters={hasSelectedFilters}
        handleSpeciesToggle={handleSpeciesToggle}
        handleSizeToggle={handleSizeToggle}
        handleAvailableChange={handleAvailableChange}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
      />
      <DesktopFilters
        uniqueSpecies={uniqueSpecies}
        uniqueSizes={uniqueSizes}
        selectedSpecies={selectedSpecies}
        selectedSizes={selectedSizes}
        availableFilter={availableFilter}
        isApplyingFilters={isApplyingFilters}
        hasSelectedFilters={hasSelectedFilters}
        handleSpeciesToggle={handleSpeciesToggle}
        handleSizeToggle={handleSizeToggle}
        handleAvailableChange={handleAvailableChange}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
      />
    </>
  );
}
