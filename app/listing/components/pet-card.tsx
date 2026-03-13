import type { Pet } from "@/types/listing-types";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PetImage } from "@/components/common/pet-image";

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
  return (
    <Link href={`/detail/${pet.id}`} className="block">
      <Card className="cursor-pointer transition-transform hover:scale-105 hover:shadow-lg pt-0 border-b-2">
        <div className="relative w-full aspect-square bg-muted">
          <PetImage
            src={pet.image_url}
            alt={pet.name}
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          />
        </div>
        <CardHeader>
          <CardTitle className="font-bold text-3xl">{pet.name}</CardTitle>
          <div className="flex flex-wrap gap-2 my-2 text-lg capitalize">
            <p>{pet.species} • </p>
            <p>{pet.size} • </p>
            <p>{pet.age_months} months old</p>
          </div>
          <Badge
            className={
              pet.available
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-red-600 text-white hover:bg-red-700"
            }
          >
            {pet.available ? "Available" : "Not Available"}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">${pet.price}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
