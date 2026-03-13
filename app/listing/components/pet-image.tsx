"use client";

import { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface PetImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  rounded?: boolean;
}

export function PetImage({
  src,
  alt,
  className = "",
  priority = false,
  rounded = false,
}: PetImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <Skeleton
          className={`absolute inset-0 w-full h-full ${rounded ? "rounded-lg" : ""}`}
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        onLoad={() => setIsLoading(false)}
        priority={priority}
      />
    </div>
  );
}
