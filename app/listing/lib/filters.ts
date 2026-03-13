import type { FetchPetsFilters } from "@/lib/api/fetch-pets";
import {
  PetFilterCategory,
  PetSize,
  PetSpecies,
  TrueFalse,
} from "@/types/listing-types";

/**
 * Returns the first species/size value from search params (single selection).
 * - If array, returns first element
 * - If string, returns it
 * - If undefined, returns undefined
 */
function firstValue(value: string | string[] | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  const single = Array.isArray(value) ? value[0] : value;
  return single === undefined || single === "" ? undefined : single;
}

/**
 * Normalizes a search param value to a boolean or undefined.
 * - If "true", returns true
 * - If "false", returns false
 * - Otherwise, returns undefined
 */
function normalizeToBoolean(
  value: string | string[] | undefined
): boolean | undefined {
  if (value === TrueFalse.TRUE) {
    return true;
  }
  if (value === TrueFalse.FALSE) {
    return false;
  }
  return undefined;
}

export function parseFiltersFromSearchParams(searchParams: {
  [key: string]: string | string[] | undefined;
}): FetchPetsFilters {
  const speciesParam = searchParams[PetFilterCategory.SPECIES];
  const sizeParam = searchParams[PetFilterCategory.SIZE];
  const availableParam = searchParams[PetFilterCategory.AVAILABILITY];

  const species = firstValue(speciesParam);
  const size = firstValue(sizeParam);
  const available = normalizeToBoolean(availableParam);

  const filters: FetchPetsFilters = {};
  if (species) filters.species = [species];
  if (size) filters.size = [size];
  if (available !== undefined) filters.available = available;

  return filters;
}

export function validateSearchParams(searchParams: {
  [key: string]: string | string[] | undefined;
}): boolean {
  const validSpecies = Object.values(PetSpecies);
  const validSizes = Object.values(PetSize);

  // Check for invalid query parameters (only allow species, size, available)
  const allowedParams = [
    PetFilterCategory.SPECIES,
    PetFilterCategory.SIZE,
    PetFilterCategory.AVAILABILITY,
  ];
  const hasInvalidParams = Object.keys(searchParams).some(
    (key) => !allowedParams.includes(key as PetFilterCategory)
  );

  if (hasInvalidParams) {
    return false;
  }

  // Validate species (single value)
  const speciesParam = searchParams[PetFilterCategory.SPECIES];
  if (speciesParam) {
    const s = firstValue(speciesParam);
    if (s && !validSpecies.includes(s as PetSpecies)) {
      return false;
    }
  }

  // Validate size (single value)
  const sizeParam = searchParams[PetFilterCategory.SIZE];
  if (sizeParam) {
    const s = firstValue(sizeParam);
    if (s && !validSizes.includes(s as PetSize)) {
      return false;
    }
  }

  // Validate available value (must be "true", "false", or undefined)
  const availableParam = searchParams[PetFilterCategory.AVAILABILITY];
  if (
    availableParam !== undefined &&
    availableParam !== TrueFalse.TRUE &&
    availableParam !== TrueFalse.FALSE
  ) {
    return false;
  }

  return true;
}
