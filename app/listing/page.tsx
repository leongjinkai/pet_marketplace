import { fetchPets } from "@/lib/api";
import { Pet } from "@/types/listing-types";
import Image from "next/image";

export default async function ListingPage() {
  const pets = await fetchPets();

  const petListings = pets.map((pet: Pet): React.ReactNode => {
    return (
      <div key={pet.id}>
        <h2>{pet.name}</h2>
        <p>{pet.species}</p>
        <p>{pet.price}</p>
        <Image src={pet.image_url} alt={pet.name} width={100} height={100} />
      </div>
    );
  });
  return (
    <div>
      <h1>Pet Listings</h1>
      {petListings}
    </div>
  );
}
