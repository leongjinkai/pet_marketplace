"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/common/back-button";

interface RouteErrorProps {
  error: unknown;
  reset: () => void;
}

export default function RouteError({ error, reset }: RouteErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        We couldn&apos;t complete your request. You can try again or return to
        the listings page.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <BackButton />
      </div>
    </div>
  );
}
