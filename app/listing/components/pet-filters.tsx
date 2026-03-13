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
    handleSpeciesToggle,
    handleSizeToggle,
    handleAvailableChange,
    applyFilters,
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
        handleSpeciesToggle={handleSpeciesToggle}
        handleSizeToggle={handleSizeToggle}
        handleAvailableChange={handleAvailableChange}
        applyFilters={applyFilters}
      />
      <DesktopFilters
        uniqueSpecies={uniqueSpecies}
        uniqueSizes={uniqueSizes}
        selectedSpecies={selectedSpecies}
        selectedSizes={selectedSizes}
        availableFilter={availableFilter}
        handleSpeciesToggle={handleSpeciesToggle}
        handleSizeToggle={handleSizeToggle}
        handleAvailableChange={handleAvailableChange}
        applyFilters={applyFilters}
      />
    </>
  );
}
