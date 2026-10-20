"use client";
import { RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import useGame from "@/lib/hooks/useGame";

export default function GameFinished() {
  const { matchWinner, uid, history, isHost, restart, busy } = useGame();
  const won = matchWinner === uid;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <Trophy className="size-10" />
        <p className="text-lg font-semibold">
          {won ? "You won the match!" : "You lost the match."}
        </p>
      </div>
      <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
        {history.map((game) => (
          <li key={game.number}>
            Game {game.number} - {game.stage}:{" "}
            {game.winner === uid ? "You won" : "Opponent won"}
          </li>
        ))}
      </ul>
      {isHost ? (
        <Button onClick={restart} disabled={busy}>
          <RotateCcw />
          Play again
        </Button>
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          Waiting for the host to start a new match...
        </p>
      )}
    </div>
  );
}
