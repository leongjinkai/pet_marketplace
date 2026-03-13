import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">[404] Page Not Found</h2>
        <p className="text-sm text-muted-foreground">
          Could not find the requested resource.
        </p>
        <Button asChild>
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </div>
  );
}
