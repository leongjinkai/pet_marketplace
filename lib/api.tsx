import { Pet } from "@/types/listing-types";

const API_BASE_URL = process.env.BACKEND_URL;

if (!API_BASE_URL) {
  throw new Error("BACKEND_URL environment variable is not set");
}

export async function fetchPets(): Promise<Pet[]> {
  const response = await fetch(`${API_BASE_URL}/pets`);

  if (!response.ok) {
    throw new Error(`Failed to fetch pets: ${response.statusText}`);
  }

  const data: { data: Pet[] } = await response.json();
  return data.data;
}
