import { Pet } from "@/types/listing-types";
import { PetCard } from "./pet-card";
import { PetCardSkeleton } from "./pet-card-skeleton";

interface PetGridProps {
  pets: Pet[];
  isLoading?: boolean;
}

export function PetGrid({ pets, isLoading = false }: PetGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-[75%] mx-auto">
        {Array.from({ length: 6 }).map((_, index) => (
          <PetCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-[75%] mx-auto">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
}
