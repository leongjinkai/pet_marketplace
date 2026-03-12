import { fetchPets } from "@/lib/api";
import { parseFiltersFromSearchParams } from "@/lib/filters";
import { Pet, PetSpecies, PetSize } from "@/types/listing-types";
import Image from "next/image";
import { PetFilters } from "@/components/pet-filters";

interface ListingPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ListingPage({ searchParams }: ListingPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseFiltersFromSearchParams(resolvedSearchParams);

  const pets = await fetchPets(
    Object.keys(filters).length > 0 ? filters : undefined
  );

  const uniqueSpecies = Object.values(PetSpecies);
  const uniqueSizes = Object.values(PetSize);

  const petListings = pets.map((pet: Pet): React.ReactNode => {
    return (
      <div key={pet.id}>
        <h2>{pet.name}</h2>
        <p>{pet.species}</p>
        <p>{pet.price}</p>
        <p>{pet.age_months}</p>
        <p>{pet.size}</p>
        <p>{pet.available ? "Available" : "Not Available"}</p>
        <Image src={pet.image_url} alt={pet.name} width={100} height={100} />
      </div>
    );
  });
  return (
    <div>
      <h1>Pet Listings</h1>
      <div className="mb-4">
        <PetFilters uniqueSpecies={uniqueSpecies} uniqueSizes={uniqueSizes} />
      </div>
      {petListings}
    </div>
  );
}
