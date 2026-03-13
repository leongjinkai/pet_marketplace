import { fetchPets, type FetchPetsFilters } from "@/lib/api/fetch-pets";
import type { Pet } from "@/types/listing-types";

export type PetsResult =
  | { status: "ok"; pets: Pet[] }
  | { status: "error"; message: string };

export async function getPetsForListing(
  filters?: FetchPetsFilters
): Promise<PetsResult> {
  try {
    const pets = await fetchPets(filters);
    return { status: "ok", pets };
  } catch (error) {
    console.error("Error loading pets:", error);
    return {
      status: "error",
      message:
        "We’re having trouble loading pets right now. Please refresh the page and try again.",
    };
  }
}
