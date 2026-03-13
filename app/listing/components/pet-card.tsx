import { Pet } from "@/types/listing-types";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
  return (
    <Card>
      <div className="relative w-full aspect-square">
        <Image
          src={pet.image_url}
          alt={pet.name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{pet.name}</CardTitle>
        <CardDescription>
          {pet.species} • {pet.size} • {pet.age_months} months old
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${pet.price}</p>
      </CardContent>
      <CardFooter>
        <p
          className={`text-sm font-medium ${
            pet.available ? "text-green-600" : "text-red-600"
          }`}
        >
          {pet.available ? "Available" : "Not Available"}
        </p>
      </CardFooter>
    </Card>
  );
}
