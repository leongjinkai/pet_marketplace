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

export type AvailableFilter = "all" | "available" | "not-available";

export interface UsePetFiltersReturn {
  selectedSpecies: string[];
  selectedSizes: string[];
  availableFilter: AvailableFilter;
  activeFilterCount: number;
  handleSpeciesToggle: (species: string) => void;
  handleSizeToggle: (size: string) => void;
  handleAvailableChange: (value: AvailableFilter) => void;
}

export function usePetFilters(): UsePetFiltersReturn {
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
  const [optimisticAvailable, setOptimisticAvailable] =
    useState<AvailableFilter>(urlAvailable);

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
      newAvailable: AvailableFilter
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

  const handleSpeciesToggle = useCallback(
    (species: string) => {
      const newSpecies = selectedSpecies.includes(species)
        ? selectedSpecies.filter((s) => s !== species)
        : [...selectedSpecies, species];
      updateFilters(newSpecies, selectedSizes, availableFilter);
    },
    [selectedSpecies, selectedSizes, availableFilter, updateFilters]
  );

  const handleSizeToggle = useCallback(
    (size: string) => {
      const newSizes = selectedSizes.includes(size)
        ? selectedSizes.filter((s) => s !== size)
        : [...selectedSizes, size];
      updateFilters(selectedSpecies, newSizes, availableFilter);
    },
    [selectedSpecies, selectedSizes, availableFilter, updateFilters]
  );

  const handleAvailableChange = useCallback(
    (value: AvailableFilter) => {
      updateFilters(selectedSpecies, selectedSizes, value);
    },
    [selectedSpecies, selectedSizes, updateFilters]
  );

  const activeFilterCount =
    selectedSpecies.length +
    selectedSizes.length +
    (availableFilter !== "all" ? 1 : 0);

  return {
    selectedSpecies,
    selectedSizes,
    availableFilter,
    activeFilterCount,
    handleSpeciesToggle,
    handleSizeToggle,
    handleAvailableChange,
  };
}
