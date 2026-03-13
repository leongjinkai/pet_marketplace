import type { Pet } from "@/types/listing-types";
import { PetImage } from "@/components/common/pet-image";

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
        sizes="(min-width: 1024px) 40vw, 100vw"
      />
    </div>
  );
}
