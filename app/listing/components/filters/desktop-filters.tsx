"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
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
    handleSpeciesToggle,
    handleSizeToggle,
    handleAvailableChange,
    applyFilters,
    resetFilters,
  } = model;
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
      {hasSelectedFilters && (
        <>
          <Button
            onClick={applyFilters}
            variant="default"
            className="ml-auto cursor-pointer"
            disabled={isApplyingFilters}
          >
            {isApplyingFilters ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Spinner className="size-4" />
                Applying…
              </span>
            ) : (
              "Apply Filters"
            )}
          </Button>
          <Button
            onClick={resetFilters}
            variant="outline"
            className="cursor-pointer"
            disabled={isApplyingFilters}
          >
            Clear
          </Button>
        </>
      )}
    </div>
  );
}
