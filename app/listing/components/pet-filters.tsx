"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
interface PetFiltersProps {
  uniqueSpecies: string[];
  uniqueSizes: string[];
}

export function PetFilters({ uniqueSpecies, uniqueSizes }: PetFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedSpecies = searchParams.getAll("species");
  const selectedSizes = searchParams.getAll("size");
  const availableParam = searchParams.get("available");
  const availableFilter: "all" | "available" | "not-available" =
    availableParam === "true"
      ? "available"
      : availableParam === "false"
        ? "not-available"
        : "all";

  const updateFilters = (
    newSpecies: string[],
    newSizes: string[],
    newAvailable: "all" | "available" | "not-available"
  ) => {
    const params = new URLSearchParams();

    newSpecies.forEach((species) => {
      params.append("species", species);
    });

    newSizes.forEach((size) => {
      params.append("size", size);
    });

    if (newAvailable !== "all") {
      params.set("available", newAvailable === "available" ? "true" : "false");
    }

    const queryString = params.toString();
    router.push(`/listing${queryString ? `?${queryString}` : ""}`);
  };

  const handleSpeciesToggle = (species: string) => {
    const newSpecies = selectedSpecies.includes(species)
      ? selectedSpecies.filter((s) => s !== species)
      : [...selectedSpecies, species];
    updateFilters(newSpecies, selectedSizes, availableFilter);
  };

  const handleSizeToggle = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    updateFilters(selectedSpecies, newSizes, availableFilter);
  };

  const handleAvailableChange = (
    value: "all" | "available" | "not-available"
  ) => {
    updateFilters(selectedSpecies, selectedSizes, value);
  };

  const activeFilterCount =
    selectedSpecies.length +
    selectedSizes.length +
    (availableFilter !== "all" ? 1 : 0);

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
