"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NoResults() {
  return (
    <div className="max-w-[75%] mx-auto text-center py-12">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">No pets found</h2>
        <p className="text-muted-foreground">
          No pets match your current filters. Try adjusting your search
          criteria.
        </p>
        <Link href="/listing">
          <Button className="cursor-pointer">Clear Filters</Button>
        </Link>
      </div>
    </div>
  );
}
