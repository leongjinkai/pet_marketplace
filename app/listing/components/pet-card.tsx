import { Pet } from "@/types/listing-types";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PetImage } from "@/components/common/pet-image";

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
  return (
    <Link href={`/detail/${pet.id}`} className="block">
      <Card className="cursor-pointer transition-transform hover:scale-105">
        <div className="relative w-full aspect-square bg-muted">
          <PetImage src={pet.image_url} alt={pet.name} />
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
    </Link>
  );
}
