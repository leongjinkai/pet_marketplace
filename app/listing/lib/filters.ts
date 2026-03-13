import { FetchPetsFilters } from "@/lib/api/fetch-pets";
import {
  PetSpecies,
  PetSize,
  PetFilterCategory,
  TrueFalse,
} from "@/types/listing-types";

/**
 * Normalizes a search param value to an array or undefined.
 * - If already an array, returns it
 * - If a string, wraps it in an array
 * - If undefined, returns undefined
 */
function normalizeToArray(
  value: string | string[] | undefined
): string[] | undefined {
  if (value === undefined) {
    return undefined;
  }
  return Array.isArray(value) ? value : [value];
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

  const species = normalizeToArray(speciesParam);
  const size = normalizeToArray(sizeParam);
  const available = normalizeToBoolean(availableParam);

  // Build filters object
  const filters: FetchPetsFilters = {};
  if (species && species.length > 0) filters.species = species;
  if (size && size.length > 0) filters.size = size;
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

  // Validate species values
  const speciesParam = searchParams[PetFilterCategory.SPECIES];
  if (speciesParam) {
    const speciesArray = normalizeToArray(speciesParam);
    if (speciesArray) {
      const hasInvalidSpecies = speciesArray.some(
        (s) => !validSpecies.includes(s as PetSpecies)
      );
      if (hasInvalidSpecies) {
        return false;
      }
    }
  }

  // Validate size values
  const sizeParam = searchParams[PetFilterCategory.SIZE];
  if (sizeParam) {
    const sizeArray = normalizeToArray(sizeParam);
    if (sizeArray) {
      const hasInvalidSize = sizeArray.some(
        (s) => !validSizes.includes(s as PetSize)
      );
      if (hasInvalidSize) {
        return false;
      }
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
