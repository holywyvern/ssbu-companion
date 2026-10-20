import { RpsChoice } from "@/lib/hooks/useRps";
import { ChoiceIcon } from "@/components/rps/choice-icon";

export default function RpsMatchup({
  mine,
  theirs,
}: {
  mine: RpsChoice;
  theirs: RpsChoice;
}) {
  return (
    <div className="flex justify-around items-center text-center">
      <div className="flex flex-col items-center gap-1">
        <ChoiceIcon id={mine} />
        <span className="text-sm">You</span>
      </div>
      <span className="font-bold">VS</span>
      <div className="flex flex-col items-center gap-1">
        <ChoiceIcon id={theirs} />
        <span className="text-sm">Opponent</span>
      </div>
    </div>
  );
}
