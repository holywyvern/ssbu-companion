import { ArrowRight } from "lucide-react";
import { RpsChoice } from "@/lib/hooks/useRps";
import { Button } from "@/components/ui/button";
import RpsMatchup from "@/components/rps/rps-matchup";

export interface RpsWinningProps {
  mine: RpsChoice;
  theirs: RpsChoice;
  onContinue: () => void;
}

export default function RpsWinning({
  mine,
  theirs,
  onContinue,
}: RpsWinningProps) {
  return (
    <>
      <RpsMatchup mine={mine} theirs={theirs} />
      <Button onClick={onContinue}>
        <ArrowRight /> Decide home / away
      </Button>
    </>
  );
}
