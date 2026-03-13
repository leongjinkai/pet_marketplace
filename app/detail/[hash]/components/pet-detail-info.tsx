import { Pet } from "@/types/listing-types";
import { InquiryForm } from "./inquiry-form";

interface PetDetailInfoProps {
  pet: Pet;
}

export function PetDetailInfo({ pet }: PetDetailInfoProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">{pet.name}</h2>
        <p className="text-muted-foreground capitalize">
          {pet.species} • {pet.size} • {pet.age_months} months old
        </p>
      </div>
      <div>
        <p className="text-3xl font-bold text-primary">${pet.price}</p>
      </div>
      <div>
        <p
          className={`text-lg font-medium ${
            pet.available ? "text-green-600" : "text-red-600"
          }`}
        >
          {pet.available ? "Available" : "Not Available"}
        </p>
      </div>
      <div>
        <InquiryForm pet={pet} />
      </div>
    </div>
  );
}
