import { Check } from "lucide-react";
import { RPS_CHOICES, RpsChoice } from "@/lib/hooks/useRps";
import { Button } from "@/components/ui/button";
import { ChoiceIcon } from "@/components/rps/choice-icon";

export interface RpsSelectionProps {
  mine?: RpsChoice;
  onChoose: (choice: RpsChoice) => void;
}

export default function RpsSelection({ mine, onChoose }: RpsSelectionProps) {
  return (
    <>
      <div className="flex gap-2 justify-center">
        {RPS_CHOICES.map(({ id, label }) => (
          <Button
            key={id}
            variant={mine === id ? "default" : "outline"}
            className="flex-col h-auto py-3 flex-1"
            disabled={Boolean(mine)}
            onClick={() => onChoose(id)}
          >
            <ChoiceIcon id={id} className="size-6" />
            {label}
          </Button>
        ))}
      </div>
      {mine && (
        <p className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
          <Check className="size-4" /> Choice sent
        </p>
      )}
    </>
  );
}
