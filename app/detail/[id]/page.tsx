import { notFound } from "next/navigation";
import { fetchPets } from "@/lib/api/fetch-pets";
import { PetDetail } from "./components/pet-detail";

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params;

  // Fetch all pets to find the one matching the id
  const pets = await fetchPets();
  const pet = pets.find((p) => p.id === id);

  if (!pet) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PetDetail pet={pet} />
    </div>
  );
}
