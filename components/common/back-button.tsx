"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="cursor-pointer"
      onClick={() => router.back()}
    >
      <ArrowLeftIcon className="mr-2" />
      Back to Listings
    </Button>
  );
}
