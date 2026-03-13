"use client";

import { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PetImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  rounded?: boolean;
  sizes?: string;
}

export function PetImage({
  src,
  alt,
  className = "",
  priority = false,
  rounded = false,
  sizes,
}: PetImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={cn(
          "relative w-full h-full bg-muted flex items-center justify-center",
          rounded && "rounded-lg"
        )}
      >
        <ImageIcon className="w-12 h-12 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <Skeleton
          className={cn(
            "absolute inset-0 w-full h-full",
            rounded && "rounded-lg"
          )}
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={cn(
          "object-cover transition-opacity duration-300",
          className,
          isLoading ? "opacity-0" : "opacity-100",
          rounded && "rounded-lg"
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        priority={priority}
      />
    </div>
  );
}
