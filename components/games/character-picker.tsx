"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { CHARACTERS } from "@/lib/game";
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
  const filtered = CHARACTERS.filter((name) =>
    name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <div className="flex flex-col gap-3">
      <Input
        placeholder="Search characters..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="grid max-h-64 grid-cols-2 gap-2 overflow-y-auto">
        {filtered.map((name) => (
          <Button
            key={name}
            type="button"
            size="sm"
            variant={selected === name ? "default" : "outline"}
            onClick={() => setSelected(name)}
          >
            {name}
          </Button>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-2 text-sm text-muted-foreground">
            No characters found.
          </p>
        )}
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
