import { redirect } from "next/navigation";
import { Suspense } from "react";
import { PetFilters } from "@/app/listing/components/pet-filters";
import { PetGrid } from "@/app/listing/components/pet-grid";
import { PetsList } from "@/app/listing/components/pets-list";
import {
  parseFiltersFromSearchParams,
  validateSearchParams,
} from "@/app/listing/lib/filters";
import { PetSize, PetSpecies } from "@/types/listing-types";

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

  const uniqueSpecies = Object.values(PetSpecies);
  const uniqueSizes = Object.values(PetSize);

  return (
    <div>
      <div className="max-w-[90%] mx-auto">
        <h1 className="text-3xl font-bold mb-6">Pet Listings</h1>
        <div className="mb-6">
          <PetFilters uniqueSpecies={uniqueSpecies} uniqueSizes={uniqueSizes} />
        </div>
      </div>
      <Suspense fallback={<PetGrid pets={[]} isLoading={true} />}>
        <PetsList filters={hasActiveFilters ? filters : undefined} />
      </Suspense>
    </div>
  );
}
