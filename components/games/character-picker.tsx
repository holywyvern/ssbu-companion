"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import { CHARACTERS, CHARACTER_COLUMNS, characterIcon } from "@/lib/game";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface CharacterPickerProps {
  disabled?: boolean;
  onConfirm: (character: string) => void;
}

export default function CharacterPicker({
  disabled,
  onConfirm,
}: CharacterPickerProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const term = query.trim().toLowerCase();
  return (
    <div className="flex flex-col gap-3">
      <Input
        placeholder="Search characters..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${CHARACTER_COLUMNS}, minmax(0, 1fr))`,
        }}
      >
        {CHARACTERS.map((name) => {
          const icon = characterIcon(name);
          const dimmed = term !== "" && !name.toLowerCase().includes(term);
          return (
            <Button
              key={name}
              type="button"
              title={name}
              aria-label={name}
              variant={selected === name ? "default" : "outline"}
              className={`aspect-square h-auto w-full p-0.5 ${
                dimmed ? "opacity-25" : ""
              }`}
              onClick={() => setSelected(name)}
            >
              {icon && <Image src={icon} alt="" width={64} height={64} />}
            </Button>
          );
        })}
      </div>
      <Button
        disabled={!selected || disabled}
        onClick={() => selected && onConfirm(selected)}
      >
        <Check /> {selected ? `Lock in ${selected}` : "Select a character"}
      </Button>
    </div>
  );
}
