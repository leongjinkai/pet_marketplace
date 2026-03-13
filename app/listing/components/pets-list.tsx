import type { FetchPetsFilters } from "@/lib/api/fetch-pets";
import { getPetsForListing } from "@/app/listing/lib/data";
import { InlineError } from "@/components/common/inline-error";
import { PetGrid } from "./pet-grid";
import { NoResults } from "./no-results";

interface PetsListProps {
  filters?: FetchPetsFilters;
}

export async function PetsList({ filters }: PetsListProps) {
  const result = await getPetsForListing(filters);

  if (result.status === "error") {
    return (
      <div className="py-10">
        <InlineError message={result.message} className="mx-auto max-w-xl" />
      </div>
    );
  }

  const pets = result.pets;
  const hasActiveFilters = filters && Object.keys(filters).length > 0;

  if (pets.length === 0 && hasActiveFilters) {
    return <NoResults />;
  }

  if (pets.length === 0 && !hasActiveFilters) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        No pets are available right now. Please check back soon.
      </div>
    );
  }

  return <PetGrid pets={pets} />;
}
