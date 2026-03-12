import { Button } from "@/components/ui/button";
import { Pet } from "@/types/listing-types";
import Image from "next/image";

export default async function ListingPage() {
  const data = await fetch("https://pets-intrvw.up.railway.app/pets");
  const response: { data: Pet[] } = await data.json();
  console.log(response.data);

  const petListings = response.data.map((pet: Pet): React.ReactNode => {
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
      <Button>Add Pet</Button>
      {petListings}
    </div>
  );
}
