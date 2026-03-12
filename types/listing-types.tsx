export type Pet = {
  age_months: number;
  available: boolean;
  id: string;
  image_url: string;
  name: string;
  price: number;
  size: PetSize;
  species: PetSpecies;
};

export enum PetSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export enum PetSpecies {
  BIRD = "bird",
  RABBIT = "rabbit",
  DOG = "dog",
  CAT = "cat",
}
