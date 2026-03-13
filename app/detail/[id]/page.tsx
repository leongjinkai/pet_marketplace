import { Suspense } from "react";
import { PetDetailContent } from "./components/pet-detail-content";
import { PetDetailSkeleton } from "./components/pet-detail-skeleton";
import { BackButton } from "@/components/common/back-button";

interface DetailPageProps {
  params: { id: string };
}

export default function DetailPage({ params }: DetailPageProps) {
  const { id } = params;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <BackButton />
      </div>
      <Suspense fallback={<PetDetailSkeleton />}>
        <PetDetailContent id={id} />
      </Suspense>
    </div>
  );
}
