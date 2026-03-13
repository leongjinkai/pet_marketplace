import type { Pet } from "@/types/listing-types";
import { PetFilterCategory } from "@/types/listing-types";

const API_BASE_URL = process.env.BACKEND_URL;

if (!API_BASE_URL) {
  throw new Error("BACKEND_URL environment variable is not set");
}

export interface FetchPetsFilters {
  species?: string[];
  size?: string[];
  available?: boolean;
}

export async function fetchPets(filters?: FetchPetsFilters): Promise<Pet[]> {
  const url = new URL(`${API_BASE_URL}/pets`);

  if (filters) {
    if (filters.species && filters.species.length > 0) {
      filters.species.forEach((species) => {
        url.searchParams.append(PetFilterCategory.SPECIES, species);
      });
    }
    if (filters.size && filters.size.length > 0) {
      filters.size.forEach((size) => {
        url.searchParams.append(PetFilterCategory.SIZE, size);
      });
    }
    if (filters.available !== undefined) {
      url.searchParams.append(
        PetFilterCategory.AVAILABILITY,
        filters.available.toString()
      );
    }
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch pets: ${response.statusText}`);
  }

  const data: { data: Pet[] } = await response.json();
  return data.data;
}
