"use client";
import { useState } from "react";
import Image from "next/image";
import { Ban, Check } from "lucide-react";
import { GameCurrent, stageImage, validateBans } from "@/lib/game";
import { Button } from "@/components/ui/button";

export interface StageSelectorProps {
  current: GameCurrent;
  mode: "ban" | "pick";
  stages: string[];
  count?: number;
  extra?: string;
  disabled?: boolean;
  onSubmit: (stages: string[]) => void;
}

export default function StageSelector({
  current,
  mode,
  stages,
  count = 1,
  extra,
  disabled,
  onSubmit,
}: StageSelectorProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const max = mode === "pick" ? 1 : count + (extra ? 1 : 0);
  const valid =
    mode === "pick" ? selected.length === 1 : validateBans(current, selected);

  const toggle = (stage: string) => {
    setSelected((prev) => {
      if (prev.includes(stage)) return prev.filter((item) => item !== stage);
      if (mode === "pick") return [stage];
      return prev.length >= max ? prev : [...prev, stage];
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2">
        {stages.map((stage) => (
          <Button
            key={stage}
            type="button"
            variant={selected.includes(stage) ? "default" : "outline"}
            className="h-auto flex-col gap-1 p-1.5"
            onClick={() => toggle(stage)}
          >
            <Image
              src={stageImage(stage)}
              alt=""
              width={256}
              height={128}
              className="aspect-2/1 w-full rounded-sm object-cover"
            />
            <span className="px-1 text-center text-xs whitespace-normal">
              {stage}
            </span>
            {stage === extra && mode === "ban" && (
              <span className="text-xs opacity-70">(opponent&apos;s win)</span>
            )}
          </Button>
        ))}
      </div>
      <Button
        disabled={!valid || disabled}
        variant={mode === "ban" ? "destructive" : "default"}
        onClick={() => onSubmit(selected)}
      >
        {mode === "ban" ? <Ban /> : <Check />}
        {mode === "ban"
          ? `Ban ${selected.length} stage${selected.length === 1 ? "" : "s"}`
          : "Pick stage"}
      </Button>
    </div>
  );
}
