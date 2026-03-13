"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PetFilterCategory, TrueFalse } from "@/types/listing-types";

export function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    // Try to restore filters from localStorage, regardless of where user came from
    try {
      const stored = window.localStorage.getItem("listingFilters");

      if (stored) {
        const parsed = JSON.parse(stored) as {
          species?: string[];
          sizes?: string[];
          available?: "all" | "available" | "not-available";
        };

        const params = new URLSearchParams();

        parsed.species?.forEach((s) =>
          params.append(PetFilterCategory.SPECIES, s)
        );
        parsed.sizes?.forEach((s) => params.append(PetFilterCategory.SIZE, s));

        if (parsed.available && parsed.available !== "all") {
          params.set(
            PetFilterCategory.AVAILABILITY,
            parsed.available === "available" ? TrueFalse.TRUE : TrueFalse.FALSE
          );
        }

        const queryString = params.toString();
        router.push(`/listing${queryString ? `?${queryString}` : ""}`);
        return;
      }
    } catch (error) {
      console.error("Error restoring filters from localStorage", error);
    }

    router.push("/listing");
  };

  return (
    <Button variant="outline" className="cursor-pointer" onClick={handleBack}>
      <ArrowLeftIcon className="mr-2" />
      Back to Listings
    </Button>
  );
}
