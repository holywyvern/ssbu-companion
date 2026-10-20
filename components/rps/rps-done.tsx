import { RotateCcw } from "lucide-react";
import { RpsChoice } from "@/lib/hooks/useRps";
import { Button } from "@/components/ui/button";
import RpsMatchup from "@/components/rps/rps-matchup";

export interface RpsDoneProps {
  mine: RpsChoice;
  theirs: RpsChoice;
  onPlayAgain: () => void;
}

export default function RpsDone({ mine, theirs, onPlayAgain }: RpsDoneProps) {
  return (
    <>
      <RpsMatchup mine={mine} theirs={theirs} />
      <Button variant="outline" onClick={onPlayAgain}>
        <RotateCcw /> Play again
      </Button>
    </>
  );
}
