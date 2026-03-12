import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Button asChild>
        <Link href="/listing">Pet Listings</Link>
      </Button>
      <Button asChild>
        <Link href="/inquiry">Pet Inquiry</Link>
      </Button>
    </div>
  );
}
