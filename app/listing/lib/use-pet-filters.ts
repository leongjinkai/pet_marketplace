"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { useListingUi } from "@/app/listing/provider/listing-ui-context";
import { PetFilterCategory, TrueFalse } from "@/types/listing-types";

export enum AvailableFilter {
  All = "all",
  Available = "available",
  NotAvailable = "not-available",
}

/** Empty string means "All" (no filter). */
export const ALL_SPECIES = "";
export const ALL_SIZES = "";

export interface UsePetFiltersReturn {
  selectedSpecies: string;
  selectedSizes: string;
  availableFilter: AvailableFilter;
  activeFilterCount: number;
  isApplyingFilters: boolean;
  hasSelectedFilters: boolean;
  handleSpeciesChange: (species: string) => void;
  handleSizeChange: (size: string) => void;
  handleAvailableChange: (value: AvailableFilter) => void;
  applyFilters: () => void;
  resetFilters: () => void;
}

interface FilterState {
  species: string;
  sizes: string;
  available: AvailableFilter;
}

// Extract URL filter values from search params (single value each)
function useUrlFilters(searchParams: URLSearchParams) {
  const urlSpecies = useMemo(
    () => searchParams.get(PetFilterCategory.SPECIES) ?? ALL_SPECIES,
    [searchParams]
  );
  const urlSizes = useMemo(
    () => searchParams.get(PetFilterCategory.SIZE) ?? ALL_SIZES,
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

  return { urlSpecies, urlSizes, urlAvailable };
}

// Manage local filter state that doesn't immediately update URL
function useLocalFilterState(initialState: FilterState) {
  const [localSpecies, setLocalSpecies] = useState<string>(
    initialState.species
  );
  const [localSizes, setLocalSizes] = useState<string>(initialState.sizes);
  const [localAvailable, setLocalAvailable] = useState<AvailableFilter>(
    initialState.available
  );

  const updateLocalFilters = useCallback((newState: FilterState) => {
    setLocalSpecies(newState.species);
    setLocalSizes(newState.sizes);
    setLocalAvailable(newState.available);
  }, []);

  return {
    localSpecies,
    localSizes,
    localAvailable,
    updateLocalFilters,
  };
}

// Sync local state with URL when URL changes externally
function useFilterSync(
  urlFilters: FilterState,
  updateLocalFilters: (state: FilterState) => void,
  isOptimisticUpdateRef: { current: boolean }
) {
  const [, startTransition] = useTransition();
  const prevUrlValuesRef = useRef<FilterState>({
    species: ALL_SPECIES,
    sizes: ALL_SIZES,
    available: AvailableFilter.All,
  });

  useEffect(() => {
    if (isOptimisticUpdateRef.current) {
      isOptimisticUpdateRef.current = false;
      prevUrlValuesRef.current = {
        species: urlFilters.species,
        sizes: urlFilters.sizes,
        available: urlFilters.available,
      };
      return;
    }

    const prev = prevUrlValuesRef.current;
    const speciesChanged = urlFilters.species !== prev.species;
    const sizesChanged = urlFilters.sizes !== prev.sizes;
    const availableChanged = urlFilters.available !== prev.available;

    if (speciesChanged || sizesChanged || availableChanged) {
      startTransition(() => {
        updateLocalFilters(urlFilters);
      });
    }

    prevUrlValuesRef.current = {
      species: urlFilters.species,
      sizes: urlFilters.sizes,
      available: urlFilters.available,
    };
  }, [urlFilters, updateLocalFilters, isOptimisticUpdateRef]);
}

// Build URLSearchParams from filter state
function buildFilterParams(filters: FilterState): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.species !== ALL_SPECIES) {
    params.set(PetFilterCategory.SPECIES, filters.species);
  }
  if (filters.sizes !== ALL_SIZES) {
    params.set(PetFilterCategory.SIZE, filters.sizes);
  }
  if (filters.available !== AvailableFilter.All) {
    params.set(
      PetFilterCategory.AVAILABILITY,
      filters.available === AvailableFilter.Available
        ? TrueFalse.TRUE
        : TrueFalse.FALSE
    );
  }

  return params;
}

// Persist filters to localStorage
function persistFiltersToStorage(filters: FilterState): void {
  try {
    window.localStorage.setItem("listingFilters", JSON.stringify(filters));
  } catch (error) {
    console.error("Error persisting filters to localStorage", error);
  }
}

// Calculate active filter count based on URL filters
function calculateActiveFilterCount(filters: FilterState): number {
  return (
    (filters.species !== ALL_SPECIES ? 1 : 0) +
    (filters.sizes !== ALL_SIZES ? 1 : 0) +
    (filters.available !== AvailableFilter.All ? 1 : 0)
  );
}

export function usePetFilters(): UsePetFiltersReturn {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOptimisticUpdateRef = useRef(false);
  const { isApplyingFilters, startFiltersTransition } = useListingUi();

  // Extract URL filters
  const { urlSpecies, urlSizes, urlAvailable } = useUrlFilters(searchParams);

  // Initialize local filter state from URL
  const initialFilterState: FilterState = {
    species: urlSpecies,
    sizes: urlSizes,
    available: urlAvailable,
  };

  // Manage local filter state
  const { localSpecies, localSizes, localAvailable, updateLocalFilters } =
    useLocalFilterState(initialFilterState);

  // Sync local state with URL changes
  const urlFilters: FilterState = {
    species: urlSpecies,
    sizes: urlSizes,
    available: urlAvailable,
  };
  useFilterSync(urlFilters, updateLocalFilters, isOptimisticUpdateRef);

  // Apply filters to URL and persist to localStorage
  const applyFilters = useCallback(() => {
    isOptimisticUpdateRef.current = true;

    const currentFilters: FilterState = {
      species: localSpecies,
      sizes: localSizes,
      available: localAvailable,
    };

    startFiltersTransition(() => {
      const params = buildFilterParams(currentFilters);
      const queryString = params.toString();
      router.push(`/listing${queryString ? `?${queryString}` : ""}`);
      persistFiltersToStorage(currentFilters);
    });
  }, [
    router,
    localSpecies,
    localSizes,
    localAvailable,
    startFiltersTransition,
  ]);

  const resetFilters = useCallback(() => {
    const initial: FilterState = {
      species: ALL_SPECIES,
      sizes: ALL_SIZES,
      available: AvailableFilter.All,
    };

    updateLocalFilters(initial);
  }, [updateLocalFilters]);

  const handleSpeciesChange = useCallback(
    (species: string) => {
      updateLocalFilters({
        species,
        sizes: localSizes,
        available: localAvailable,
      });
    },
    [localSizes, localAvailable, updateLocalFilters]
  );

  const handleSizeChange = useCallback(
    (size: string) => {
      updateLocalFilters({
        species: localSpecies,
        sizes: size,
        available: localAvailable,
      });
    },
    [localSpecies, localAvailable, updateLocalFilters]
  );

  const handleAvailableChange = useCallback(
    (value: AvailableFilter) => {
      updateLocalFilters({
        species: localSpecies,
        sizes: localSizes,
        available: value,
      });
    },
    [localSpecies, localSizes, updateLocalFilters]
  );

  // Calculate active filter count
  const activeFilterCount = calculateActiveFilterCount(urlFilters);
  const hasSelectedFilters =
    localSpecies !== ALL_SPECIES ||
    localSizes !== ALL_SIZES ||
    localAvailable !== AvailableFilter.All;

  return {
    selectedSpecies: localSpecies,
    selectedSizes: localSizes,
    availableFilter: localAvailable,
    activeFilterCount,
    isApplyingFilters,
    hasSelectedFilters,
    handleSpeciesChange,
    handleSizeChange,
    handleAvailableChange,
    applyFilters,
    resetFilters,
  };
}
