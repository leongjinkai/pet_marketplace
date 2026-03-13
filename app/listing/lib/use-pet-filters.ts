"use client";

import {
  useState,
  useTransition,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  type MutableRefObject,
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
  isApplyingFilters: boolean;
  hasSelectedFilters: boolean;
  handleSpeciesToggle: (species: string) => void;
  handleSizeToggle: (size: string) => void;
  handleAvailableChange: (value: AvailableFilter) => void;
  applyFilters: () => void;
  resetFilters: () => void;
}

interface FilterState {
  species: string[];
  sizes: string[];
  available: AvailableFilter;
}

// Extract URL filter values from search params
function useUrlFilters(searchParams: URLSearchParams) {
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

  return { urlSpecies, urlSizes, urlAvailable };
}

// Manage local filter state that doesn't immediately update URL
function useLocalFilterState(initialState: FilterState) {
  const [localSpecies, setLocalSpecies] = useState<string[]>(
    initialState.species
  );
  const [localSizes, setLocalSizes] = useState<string[]>(initialState.sizes);
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
  isOptimisticUpdateRef: MutableRefObject<boolean>
) {
  const [, startTransition] = useTransition();
  const prevUrlValuesRef = useRef<FilterState>({
    species: [],
    sizes: [],
    available: AvailableFilter.All,
  });

  useEffect(() => {
    if (isOptimisticUpdateRef.current) {
      isOptimisticUpdateRef.current = false;
      prevUrlValuesRef.current = {
        species: [...urlFilters.species],
        sizes: [...urlFilters.sizes],
        available: urlFilters.available,
      };
      return;
    }

    const prev = prevUrlValuesRef.current;
    const urlSpeciesStr = [...urlFilters.species].sort().join(",");
    const urlSizesStr = [...urlFilters.sizes].sort().join(",");
    const prevSpeciesStr = [...prev.species].sort().join(",");
    const prevSizesStr = [...prev.sizes].sort().join(",");

    const speciesChanged = urlSpeciesStr !== prevSpeciesStr;
    const sizesChanged = urlSizesStr !== prevSizesStr;
    const availableChanged = urlFilters.available !== prev.available;

    if (speciesChanged || sizesChanged || availableChanged) {
      startTransition(() => {
        updateLocalFilters(urlFilters);
      });
    }

    prevUrlValuesRef.current = {
      species: [...urlFilters.species],
      sizes: [...urlFilters.sizes],
      available: urlFilters.available,
    };
  }, [urlFilters, updateLocalFilters, isOptimisticUpdateRef]);
}

// Build URLSearchParams from filter state
function buildFilterParams(filters: FilterState): URLSearchParams {
  const params = new URLSearchParams();

  filters.species.forEach((species) => {
    params.append(PetFilterCategory.SPECIES, species);
  });

  filters.sizes.forEach((size) => {
    params.append(PetFilterCategory.SIZE, size);
  });

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
  } catch {
    // Ignore storage errors (e.g., disabled storage)
  }
}

// Calculate active filter count based on URL filters
function calculateActiveFilterCount(filters: FilterState): number {
  return (
    filters.species.length +
    filters.sizes.length +
    (filters.available !== AvailableFilter.All ? 1 : 0)
  );
}

// Toggle a value in an array (add if not present, remove if present)
function toggleArrayValue<T>(array: T[], value: T): T[] {
  return array.includes(value)
    ? array.filter((v) => v !== value)
    : [...array, value];
}

export function usePetFilters(): UsePetFiltersReturn {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const isOptimisticUpdateRef = useRef(false);

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

    startTransition(() => {
      const params = buildFilterParams(currentFilters);
      const queryString = params.toString();
      router.push(`/listing${queryString ? `?${queryString}` : ""}`);
      persistFiltersToStorage(currentFilters);
    });
  }, [router, localSpecies, localSizes, localAvailable]);

  const resetFilters = useCallback(() => {
    const initial: FilterState = {
      species: [],
      sizes: [],
      available: AvailableFilter.All,
    };

    isOptimisticUpdateRef.current = true;
    updateLocalFilters(initial);

    startTransition(() => {
      router.push("/listing");
      persistFiltersToStorage(initial);
    });
  }, [router, updateLocalFilters]);

  // Create toggle handlers
  const handleSpeciesToggle = useCallback(
    (species: string) => {
      const newSpecies = toggleArrayValue(localSpecies, species);
      updateLocalFilters({
        species: newSpecies,
        sizes: localSizes,
        available: localAvailable,
      });
    },
    [localSpecies, localSizes, localAvailable, updateLocalFilters]
  );

  const handleSizeToggle = useCallback(
    (size: string) => {
      const newSizes = toggleArrayValue(localSizes, size);
      updateLocalFilters({
        species: localSpecies,
        sizes: newSizes,
        available: localAvailable,
      });
    },
    [localSpecies, localSizes, localAvailable, updateLocalFilters]
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
    localSpecies.length +
      localSizes.length +
      (localAvailable !== AvailableFilter.All ? 1 : 0) >
    0;

  return {
    selectedSpecies: localSpecies,
    selectedSizes: localSizes,
    availableFilter: localAvailable,
    activeFilterCount,
    isApplyingFilters: isPending,
    hasSelectedFilters,
    handleSpeciesToggle,
    handleSizeToggle,
    handleAvailableChange,
    applyFilters,
    resetFilters,
  };
}
