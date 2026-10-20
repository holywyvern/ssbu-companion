"use client";
import useGame from "@/lib/hooks/useGame";
import { Card, CardContent } from "@/components/ui/card";
import GameScoreboard from "@/components/games/game-scoreboard";
import CharacterStep from "@/components/games/character-step";
import StageStep from "@/components/games/stage-step";
import PlayingStep from "@/components/games/playing-step";
import GameFinished from "@/components/games/game-finished";

export default function GameTab() {
  const { current, matchWinner } = useGame();

  let content = null;
  if (matchWinner) {
    content = <GameFinished />;
  } else if (current) {
    if (
      current.step === "characters" ||
      current.step === "winnerCharacter" ||
      current.step === "loserCharacter"
    ) {
      content = <CharacterStep />;
    } else if (current.step === "playing") {
      content = <PlayingStep />;
    } else {
      content = <StageStep />;
    }
  }

  return (
    <div className="p-4 flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Card className="w-full max-w-2xl">
        <GameScoreboard />
        <CardContent>{content}</CardContent>
      </Card>
    </div>
  );
}
