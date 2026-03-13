import { Pet } from "@/types/listing-types";
import { createHash } from "crypto";

/**
 * Creates a hash from pet details
 * Uses a combination of pet properties to generate a deterministic hash
 */
export function createPetHash(pet: Pet): string {
  // Create a string from pet details
  const petString = `${pet.id}-${pet.name}-${pet.species}-${pet.size}-${pet.age_months}-${pet.price}-${pet.available}`;

  // Generate SHA-256 hash and take first 16 characters for a shorter hash
  const hash = createHash("sha256").update(petString).digest("hex");
  return hash.substring(0, 16);
}
