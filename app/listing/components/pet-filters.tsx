"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePetFilters } from "../lib/use-pet-filters";

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
  } = usePetFilters();

  return (
    <Popover>
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
                  <input
                    type="checkbox"
                    checked={selectedSpecies.includes(species)}
                    onChange={() => handleSpeciesToggle(species)}
                    className="h-4 w-4 rounded border-gray-300"
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
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeToggle(size)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span className="text-sm capitalize">{size}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold">Availability</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  checked={availableFilter === "all"}
                  onChange={() => handleAvailableChange("all")}
                  className="h-4 w-4"
                />
                <span className="text-sm">All</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  checked={availableFilter === "available"}
                  onChange={() => handleAvailableChange("available")}
                  className="h-4 w-4"
                />
                <span className="text-sm">Available</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  checked={availableFilter === "not-available"}
                  onChange={() => handleAvailableChange("not-available")}
                  className="h-4 w-4"
                />
                <span className="text-sm">Not Available</span>
              </label>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
