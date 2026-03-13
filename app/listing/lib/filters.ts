import { FetchPetsFilters } from "@/lib/api/fetch-pets";

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
