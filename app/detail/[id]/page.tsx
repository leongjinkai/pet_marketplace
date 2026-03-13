import { Suspense } from "react";
import { PetDetailContent } from "./components/pet-detail-content";
import { PetDetailSkeleton } from "./components/pet-detail-skeleton";

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<PetDetailSkeleton />}>
        <PetDetailContent id={id} />
      </Suspense>
    </div>
  );
}
