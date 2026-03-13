import { fetchPets } from "@/lib/api/fetch-pets";
import type { Pet } from "@/types/listing-types";

export type PetDetailResult =
  | { status: "ok"; pet: Pet }
  | { status: "not-found" }
  | { status: "error"; message: string };

export async function getPetById(id: string): Promise<PetDetailResult> {
  try {
    const pets = await fetchPets();
    const pet = pets.find((p) => p.id === id);

    if (!pet) {
      return { status: "not-found" };
    }

    return { status: "ok", pet };
  } catch (error) {
    console.error("Error loading pet detail:", error);
    return {
      status: "error",
      message:
        "We’re having trouble loading this pet’s details right now. Please refresh the page or go back to the listings and try again.",
    };
  }
}
