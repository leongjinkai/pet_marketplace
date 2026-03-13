import { fetchPets } from "@/lib/api/fetch-pets";
import { parseFiltersFromSearchParams } from "@/lib/filters";
import { Pet, PetSpecies, PetSize } from "@/types/listing-types";
import Image from "next/image";
import { PetFilters } from "@/components/pet-filters";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Pet Listings</h1>
      <div className="mb-6">
        <PetFilters uniqueSpecies={uniqueSpecies} uniqueSizes={uniqueSizes} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet: Pet) => (
          <Card key={pet.id}>
            <div className="relative w-full aspect-square">
              <Image
                src={pet.image_url}
                alt={pet.name}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{pet.name}</CardTitle>
              <CardDescription>
                {pet.species} • {pet.size} • {pet.age_months} months old
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${pet.price}</p>
            </CardContent>
            <CardFooter>
              <p
                className={`text-sm font-medium ${
                  pet.available ? "text-green-600" : "text-red-600"
                }`}
              >
                {pet.available ? "Available" : "Not Available"}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
