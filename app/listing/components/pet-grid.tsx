import { Pet } from "@/types/listing-types";
import { PetCard } from "./pet-card";

interface PetGridProps {
  pets: Pet[];
}

export function PetGrid({ pets }: PetGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
}
