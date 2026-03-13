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
import { PetFilterCategory, TrueFalse } from "@/types/listing-types";

export enum AvailableFilter {
  All = "all",
  Available = "available",
  NotAvailable = "not-available",
}

export interface UsePetFiltersReturn {
  selectedSpecies: string[];
  selectedSizes: string[];
  availableFilter: AvailableFilter;
  activeFilterCount: number;
  handleSpeciesToggle: (species: string) => void;
  handleSizeToggle: (size: string) => void;
  handleAvailableChange: (value: AvailableFilter) => void;
  applyFilters: () => void;
}

export function usePetFilters(): UsePetFiltersReturn {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const isOptimisticUpdateRef = useRef(false);
  const prevUrlValuesRef = useRef<{
    species: string[];
    sizes: string[];
    available: AvailableFilter;
  }>({ species: [], sizes: [], available: AvailableFilter.All });

  // Derive current URL values
  const urlSpecies = useMemo(
    () => searchParams.getAll(PetFilterCategory.SPECIES),
    [searchParams]
  );
  const urlSizes = useMemo(
    () => searchParams.getAll(PetFilterCategory.SIZE),
    [searchParams]
  );
  const urlAvailable = useMemo(() => {
    const availableParam = searchParams.get(PetFilterCategory.AVAILABILITY);
    return availableParam === TrueFalse.TRUE
      ? AvailableFilter.Available
      : availableParam === TrueFalse.FALSE
        ? AvailableFilter.NotAvailable
        : AvailableFilter.All;
  }, [searchParams]);

  // Local state for filters (doesn't immediately update URL)
  const [localSpecies, setLocalSpecies] = useState<string[]>(urlSpecies);
  const [localSizes, setLocalSizes] = useState<string[]>(urlSizes);
  const [localAvailable, setLocalAvailable] =
    useState<AvailableFilter>(urlAvailable);

  // Sync local state with URL when URL changes externally (e.g., browser back/forward or after applying filters)
  // Only sync when URL actually changes, not when local state changes
  useEffect(() => {
    if (isOptimisticUpdateRef.current) {
      isOptimisticUpdateRef.current = false;
      // Update ref to current URL values after applying filters
      prevUrlValuesRef.current = {
        species: [...urlSpecies],
        sizes: [...urlSizes],
        available: urlAvailable,
      };
      return;
    }

    // Compare current URL values with previous URL values (not local state)
    const prev = prevUrlValuesRef.current;
    const urlSpeciesStr = [...urlSpecies].sort().join(",");
    const urlSizesStr = [...urlSizes].sort().join(",");
    const prevSpeciesStr = [...prev.species].sort().join(",");
    const prevSizesStr = [...prev.sizes].sort().join(",");

    const speciesChanged = urlSpeciesStr !== prevSpeciesStr;
    const sizesChanged = urlSizesStr !== prevSizesStr;
    const availableChanged = urlAvailable !== prev.available;

    // Only update local state if URL values actually changed
    if (speciesChanged || sizesChanged || availableChanged) {
      // Use startTransition to defer state updates and avoid cascading renders
      startTransition(() => {
        setLocalSpecies(urlSpecies);
        setLocalSizes(urlSizes);
        setLocalAvailable(urlAvailable);
      });
    }

    // Always update ref to track current URL values (for next comparison)
    prevUrlValuesRef.current = {
      species: [...urlSpecies],
      sizes: [...urlSizes],
      available: urlAvailable,
    };
  }, [urlSpecies, urlSizes, urlAvailable]);

  // Use local state for UI
  const selectedSpecies = localSpecies;
  const selectedSizes = localSizes;
  const availableFilter = localAvailable;

  // Apply filters to URL (called when filter button is clicked)
  const applyFilters = useCallback(() => {
    // Mark as optimistic update
    isOptimisticUpdateRef.current = true;

    // Navigate with transition
    startTransition(() => {
      const params = new URLSearchParams();

      localSpecies.forEach((species) => {
        params.append(PetFilterCategory.SPECIES, species);
      });

      localSizes.forEach((size) => {
        params.append(PetFilterCategory.SIZE, size);
      });

      if (localAvailable !== AvailableFilter.All) {
        params.set(
          PetFilterCategory.AVAILABILITY,
          localAvailable === AvailableFilter.Available
            ? TrueFalse.TRUE
            : TrueFalse.FALSE
        );
      }

      const queryString = params.toString();
      router.push(`/listing${queryString ? `?${queryString}` : ""}`);

      // Persist current filters to localStorage so they can be restored later
      try {
        const stored = {
          species: localSpecies,
          sizes: localSizes,
          available: localAvailable,
        };
        window.localStorage.setItem("listingFilters", JSON.stringify(stored));
      } catch {
        // Ignore storage errors (e.g., disabled storage)
      }
    });
  }, [router, localSpecies, localSizes, localAvailable]);

  // Update local state only (doesn't update URL)
  const updateLocalFilters = useCallback(
    (
      newSpecies: string[],
      newSizes: string[],
      newAvailable: AvailableFilter
    ) => {
      setLocalSpecies(newSpecies);
      setLocalSizes(newSizes);
      setLocalAvailable(newAvailable);
    },
    []
  );

  const handleSpeciesToggle = useCallback(
    (species: string) => {
      const newSpecies = selectedSpecies.includes(species)
        ? selectedSpecies.filter((s) => s !== species)
        : [...selectedSpecies, species];
      updateLocalFilters(newSpecies, selectedSizes, availableFilter);
    },
    [selectedSpecies, selectedSizes, availableFilter, updateLocalFilters]
  );

  const handleSizeToggle = useCallback(
    (size: string) => {
      const newSizes = selectedSizes.includes(size)
        ? selectedSizes.filter((s) => s !== size)
        : [...selectedSizes, size];
      updateLocalFilters(selectedSpecies, newSizes, availableFilter);
    },
    [selectedSpecies, selectedSizes, availableFilter, updateLocalFilters]
  );

  const handleAvailableChange = useCallback(
    (value: AvailableFilter) => {
      updateLocalFilters(selectedSpecies, selectedSizes, value);
    },
    [selectedSpecies, selectedSizes, updateLocalFilters]
  );

  // Count active filters based on URL params (applied filters)
  const activeFilterCount =
    urlSpecies.length +
    urlSizes.length +
    (urlAvailable !== AvailableFilter.All ? 1 : 0);

  return {
    selectedSpecies,
    selectedSizes,
    availableFilter,
    activeFilterCount,
    handleSpeciesToggle,
    handleSizeToggle,
    handleAvailableChange,
    applyFilters,
  };
}
