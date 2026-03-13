import Image from "next/image";
import { Pet } from "@/types/listing-types";

interface PetDetailImageProps {
  pet: Pet;
}

export function PetDetailImage({ pet }: PetDetailImageProps) {
  return (
    <div className="relative w-full aspect-square">
      <Image
        src={pet.image_url}
        alt={pet.name}
        fill
        className="object-cover rounded-lg"
      />
    </div>
  );
}
