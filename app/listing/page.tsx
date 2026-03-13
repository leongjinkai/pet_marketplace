import { redirect } from "next/navigation";
import { fetchPets } from "@/lib/api/fetch-pets";
import {
  parseFiltersFromSearchParams,
  validateSearchParams,
} from "@/app/listing/lib/filters";
import { PetSpecies, PetSize } from "@/types/listing-types";
import { PetFilters } from "@/app/listing/components/pet-filters";
import { PetGrid } from "@/app/listing/components/pet-grid";
import { NoResults } from "@/app/listing/components/no-results";

interface ListingPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ListingPage({ searchParams }: ListingPageProps) {
  const resolvedSearchParams = await searchParams;

  // Validate search params and redirect if invalid
  if (!validateSearchParams(resolvedSearchParams)) {
    redirect("/listing");
  }

  const filters = parseFiltersFromSearchParams(resolvedSearchParams);
  const hasActiveFilters = Object.keys(filters).length > 0;

  const pets = await fetchPets(hasActiveFilters ? filters : undefined);

  const uniqueSpecies = Object.values(PetSpecies);
  const uniqueSizes = Object.values(PetSize);

  return (
    <div>
      <div className="max-w-[75%] mx-auto">
        <h1 className="text-3xl font-bold mb-6">Pet Listings</h1>
        <div className="mb-6">
          <PetFilters uniqueSpecies={uniqueSpecies} uniqueSizes={uniqueSizes} />
        </div>
      </div>
      {pets.length === 0 && hasActiveFilters ? (
        <NoResults />
      ) : (
        <PetGrid pets={pets} />
      )}
    </div>
  );
}
