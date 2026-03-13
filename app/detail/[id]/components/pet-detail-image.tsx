import { Pet } from "@/types/listing-types";
import { PetImage } from "@/app/listing/components/pet-image";

interface PetDetailImageProps {
  pet: Pet;
}

export function PetDetailImage({ pet }: PetDetailImageProps) {
  return (
    <div className="relative w-full aspect-square bg-muted rounded-lg">
      <PetImage
        src={pet.image_url}
        alt={pet.name}
        className="rounded-lg"
        priority
        rounded
      />
    </div>
  );
}
