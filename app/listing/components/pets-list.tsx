import { fetchPets } from "@/lib/api/fetch-pets";
import { FetchPetsFilters } from "@/lib/api/fetch-pets";
import { PetGrid } from "./pet-grid";
import { NoResults } from "./no-results";

interface PetsListProps {
  filters?: FetchPetsFilters;
}

export async function PetsList({ filters }: PetsListProps) {
  const pets = await fetchPets(filters);
  const hasActiveFilters = filters && Object.keys(filters).length > 0;

  if (pets.length === 0 && hasActiveFilters) {
    return <NoResults />;
  }

  return <PetGrid pets={pets} />;
}
