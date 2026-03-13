"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { capitalize } from "@/lib/utils";
import { ALL_SPECIES } from "../../lib/use-pet-filters";

interface SpeciesFilterProps {
  uniqueSpecies: string[];
  selectedSpecies: string;
  handleSpeciesChange: (species: string) => void;
}

export function SpeciesFilter({
  uniqueSpecies,
  selectedSpecies,
  handleSpeciesChange,
}: SpeciesFilterProps) {
  const [open, setOpen] = useState(false);
  const label =
    selectedSpecies === ALL_SPECIES
      ? "Species: All"
      : `Species: ${capitalize(selectedSpecies)}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit" align="start">
        <RadioGroup
          value={selectedSpecies || ALL_SPECIES}
          onValueChange={handleSpeciesChange}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={ALL_SPECIES} id="desktop-species-all" />
            <Label
              htmlFor="desktop-species-all"
              className="text-sm cursor-pointer"
            >
              All
            </Label>
          </div>
          {uniqueSpecies.map((species) => {
            const id = `desktop-species-${species}`;
            return (
              <div
                key={species}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <RadioGroupItem value={species} id={id} />
                <Label
                  htmlFor={id}
                  className="text-sm capitalize cursor-pointer"
                >
                  {species}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
}
