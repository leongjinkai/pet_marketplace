"use client";

import {
  useState,
  useTransition,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
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
  const [, startTransition] = useTransition();
  const isOptimisticUpdateRef = useRef(false);

  // Derive current URL values
  const urlSpecies = useMemo(
    () => searchParams.getAll("species"),
    [searchParams]
  );
  const urlSizes = useMemo(() => searchParams.getAll("size"), [searchParams]);
  const urlAvailable = useMemo(() => {
    const availableParam = searchParams.get("available");
    return availableParam === "true"
      ? "available"
      : availableParam === "false"
        ? "not-available"
        : "all";
  }, [searchParams]);

  // Optimistic state for immediate UI updates
  const [optimisticSpecies, setOptimisticSpecies] =
    useState<string[]>(urlSpecies);
  const [optimisticSizes, setOptimisticSizes] = useState<string[]>(urlSizes);
  const [optimisticAvailable, setOptimisticAvailable] = useState<
    "all" | "available" | "not-available"
  >(urlAvailable);

  // Sync optimistic state with URL when URL changes externally
  // Use a timeout to avoid setState in effect directly
  useEffect(() => {
    if (isOptimisticUpdateRef.current) {
      isOptimisticUpdateRef.current = false;
      return;
    }

    // Check if URL values differ from optimistic state
    const speciesChanged =
      urlSpecies.length !== optimisticSpecies.length ||
      urlSpecies.some((s) => !optimisticSpecies.includes(s));
    const sizesChanged =
      urlSizes.length !== optimisticSizes.length ||
      urlSizes.some((s) => !optimisticSizes.includes(s));
    const availableChanged = urlAvailable !== optimisticAvailable;

    if (speciesChanged || sizesChanged || availableChanged) {
      // Use setTimeout to defer state update outside of effect execution
      const timeoutId = setTimeout(() => {
        setOptimisticSpecies(urlSpecies);
        setOptimisticSizes(urlSizes);
        setOptimisticAvailable(urlAvailable);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [
    urlSpecies,
    urlSizes,
    urlAvailable,
    optimisticSpecies,
    optimisticSizes,
    optimisticAvailable,
  ]);

  // Use optimistic state for UI
  const selectedSpecies = optimisticSpecies;
  const selectedSizes = optimisticSizes;
  const availableFilter = optimisticAvailable;

  const updateFilters = useCallback(
    (
      newSpecies: string[],
      newSizes: string[],
      newAvailable: "all" | "available" | "not-available"
    ) => {
      // Mark as optimistic update
      isOptimisticUpdateRef.current = true;

      // Update optimistic state immediately
      setOptimisticSpecies(newSpecies);
      setOptimisticSizes(newSizes);
      setOptimisticAvailable(newAvailable);

      // Navigate with transition
      startTransition(() => {
        const params = new URLSearchParams();

        newSpecies.forEach((species) => {
          params.append("species", species);
        });

        newSizes.forEach((size) => {
          params.append("size", size);
        });

        if (newAvailable !== "all") {
          params.set(
            "available",
            newAvailable === "available" ? "true" : "false"
          );
        }

        const queryString = params.toString();
        router.push(`/listing${queryString ? `?${queryString}` : ""}`);
      });
    },
    [router]
  );

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
