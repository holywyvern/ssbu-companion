import { Hand, Scissors, Mountain } from "lucide-react";
import { RpsChoice } from "@/lib/hooks/useRps";

export const RPS_ICONS = { rock: Mountain, paper: Hand, scissors: Scissors };

export function ChoiceIcon({
  id,
  className = "size-10",
}: {
  id: RpsChoice;
  className?: string;
}) {
  const Icon = RPS_ICONS[id];
  return <Icon className={className} />;
}
