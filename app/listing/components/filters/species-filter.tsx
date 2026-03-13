"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
      <PopoverContent className="w-fit" align="start">
        <div className="space-y-2">
          {uniqueSpecies.map((species) => {
            const id = `desktop-species-${species}`;
            return (
              <div
                key={species}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Checkbox
                  id={id}
                  checked={selectedSpecies.includes(species)}
                  onCheckedChange={() => handleSpeciesToggle(species)}
                />
                <Label
                  htmlFor={id}
                  className="text-sm capitalize cursor-pointer"
                >
                  {species}
                </Label>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
