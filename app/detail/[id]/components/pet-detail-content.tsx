import { notFound } from "next/navigation";
import { fetchPets } from "@/lib/api/fetch-pets";
import { PetDetail } from "./pet-detail";

interface PetDetailContentProps {
  id: string;
}

export async function PetDetailContent({ id }: PetDetailContentProps) {
  // Fetch all pets to find the one matching the id
  const pets = await fetchPets();
  const pet = pets.find((p) => p.id === id);

  if (!pet) {
    notFound();
  }

  return <PetDetail pet={pet} />;
}
