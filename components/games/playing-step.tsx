"use client";
import { Swords, Trophy } from "lucide-react";
import Image from "next/image";
import useGame from "@/lib/hooks/useGame";
import { stageImage } from "@/lib/game";
import { Button } from "@/components/ui/button";
import GameWaiting from "@/components/games/game-waiting";
import CharacterSummary from "@/components/games/character-summary";

export default function PlayingStep() {
  const {
    current,
    isHost,
    busy,
    uid,
    opponentId,
    myCharacter,
    opponentCharacter,
    reportWinner,
  } = useGame();
  if (!current) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={stageImage(current.stage ?? "")}
          alt=""
          width={256}
          height={128}
          className="aspect-2/1 w-full max-w-xs rounded-md object-cover"
        />
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Swords className="size-5" /> {current.stage}
        </div>
      </div>
      <CharacterSummary mine={myCharacter} theirs={opponentCharacter} />
      {isHost ? (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            Play the game in SSBU, then report who won.
          </p>
          <div className="flex gap-2">
            <Button
              className="flex-1"
              disabled={busy}
              onClick={() => reportWinner(uid)}
            >
              <Trophy /> I won
            </Button>
            <Button
              className="flex-1"
              variant="outline"
              disabled={busy || !opponentId}
              onClick={() => opponentId && reportWinner(opponentId)}
            >
              <Trophy /> Opponent won
            </Button>
          </div>
        </div>
      ) : (
        <GameWaiting message="Play your game. The host will report the result." />
      )}
    </div>
  );
}
