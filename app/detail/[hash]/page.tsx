import { notFound } from "next/navigation";
import { fetchPets } from "@/lib/api/fetch-pets";
import { createPetHash } from "@/app/listing/lib/hash";
import { PetDetail } from "./components/pet-detail";

interface DetailPageProps {
  params: Promise<{ hash: string }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { hash } = await params;

  // Fetch all pets to find the one matching the hash
  const pets = await fetchPets();
  const pet = pets.find((p) => createPetHash(p) === hash);

  if (!pet) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PetDetail pet={pet} />
    </div>
  );
}
