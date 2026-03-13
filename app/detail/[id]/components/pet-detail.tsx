import { Pet } from "@/types/listing-types";
import { PetDetailImage } from "./pet-detail-image";
import { PetDetailInfo } from "./pet-detail-info";

interface PetDetailProps {
  pet: Pet;
}

export function PetDetail({ pet }: PetDetailProps) {
  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <PetDetailImage pet={pet} />
        <PetDetailInfo pet={pet} />
      </div>
    </div>
  );
}
