import { notFound } from "next/navigation";
import { PetDetail } from "./pet-detail";
import { InlineError } from "@/components/common/inline-error";
import { getPetById } from "../lib/data";

interface PetDetailContentProps {
  id: string;
}

export async function PetDetailContent({ id }: PetDetailContentProps) {
  const result = await getPetById(id);

  if (result.status === "error") {
    return (
      <InlineError
        message={result.message}
        className="mx-auto max-w-xl md:max-w-2xl"
      />
    );
  }

  if (result.status === "not-found") {
    notFound();
  }

  return <PetDetail pet={result.pet} />;
}
