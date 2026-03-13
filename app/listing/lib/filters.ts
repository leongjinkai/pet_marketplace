import { FetchPetsFilters } from "@/lib/api/fetch-pets";
import { PetSpecies, PetSize } from "@/types/listing-types";

export function parseFiltersFromSearchParams(searchParams: {
  [key: string]: string | string[] | undefined;
}): FetchPetsFilters {
  const speciesParam = searchParams.species;
  const sizeParam = searchParams.size;
  const availableParam = searchParams.available;

  const species = Array.isArray(speciesParam)
    ? speciesParam
    : speciesParam
      ? [speciesParam]
      : undefined;
  const size = Array.isArray(sizeParam)
    ? sizeParam
    : sizeParam
      ? [sizeParam]
      : undefined;
  const available =
    availableParam === "true"
      ? true
      : availableParam === "false"
        ? false
        : undefined;

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
  const allowedParams = ["species", "size", "available"];
  const hasInvalidParams = Object.keys(searchParams).some(
    (key) => !allowedParams.includes(key)
  );

  if (hasInvalidParams) {
    return false;
  }

  // Validate species values
  const speciesParam = searchParams.species;
  if (speciesParam) {
    const speciesArray = Array.isArray(speciesParam)
      ? speciesParam
      : [speciesParam];
    const hasInvalidSpecies = speciesArray.some(
      (s) => !validSpecies.includes(s as PetSpecies)
    );
    if (hasInvalidSpecies) {
      return false;
    }
  }

  // Validate size values
  const sizeParam = searchParams.size;
  if (sizeParam) {
    const sizeArray = Array.isArray(sizeParam) ? sizeParam : [sizeParam];
    const hasInvalidSize = sizeArray.some(
      (s) => !validSizes.includes(s as PetSize)
    );
    if (hasInvalidSize) {
      return false;
    }
  }

  // Validate available value (must be "true", "false", or undefined)
  const availableParam = searchParams.available;
  if (
    availableParam !== undefined &&
    availableParam !== "true" &&
    availableParam !== "false"
  ) {
    return false;
  }

  return true;
}
