"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SpeciesFilterProps {
  uniqueSpecies: string[];
  selectedSpecies: string[];
  handleSpeciesToggle: (species: string) => void;
}

export function SpeciesFilter({
  uniqueSpecies,
  selectedSpecies,
  handleSpeciesToggle,
}: SpeciesFilterProps) {
  const [open, setOpen] = useState(false);
  const activeCount = selectedSpecies.length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Species
          {activeCount > 0 && (
            <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {activeCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="start">
        <div className="space-y-2">
          {uniqueSpecies.map((species) => (
            <label
              key={species}
              htmlFor={species}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Checkbox
                checked={selectedSpecies.includes(species)}
                onCheckedChange={() => handleSpeciesToggle(species)}
              />
              <span className="text-sm capitalize">{species}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
