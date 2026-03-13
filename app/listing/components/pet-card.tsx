import { Pet } from "@/types/listing-types";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PetImage } from "@/components/common/pet-image";
import { capitalizeFirst } from "@/lib/utils";

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
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{capitalizeFirst(pet.species)}</Badge>
            <Badge variant="secondary">{capitalizeFirst(pet.size)}</Badge>
            <Badge variant="secondary">{pet.age_months} months old</Badge>
            <Badge
              className={
                pet.available
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-red-600 text-white hover:bg-red-700"
              }
            >
              {pet.available ? "Available" : "Not Available"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">${pet.price}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
