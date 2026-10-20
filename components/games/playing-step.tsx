"use client";
import { Swords, Trophy } from "lucide-react";
import Image from "next/image";
import useGame from "@/lib/hooks/useGame";
import { stageImage } from "@/lib/game";
import { Button } from "@/components/ui/button";
import CharacterSummary from "@/components/games/character-summary";

export default function PlayingStep() {
  const {
    current,
    busy,
    uid,
    opponentId,
    myCharacter,
    opponentCharacter,
    myReport,
    opponentReport,
    reportConflict,
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
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          Play the game in SSBU, then both players report who won. The result
          is only recorded when both reports match.
        </p>
        <div className="flex gap-2">
          <Button
            className="flex-1"
            variant={myReport === uid ? "default" : "outline"}
            disabled={busy}
            onClick={() => reportWinner(uid)}
          >
            <Trophy /> I won
          </Button>
          <Button
            className="flex-1"
            variant={myReport && myReport !== uid ? "default" : "outline"}
            disabled={busy || !opponentId}
            onClick={() => opponentId && reportWinner(opponentId)}
          >
            <Trophy /> Opponent won
          </Button>
        </div>
        {reportConflict ? (
          <p className="text-sm text-destructive">
            Your reports don&apos;t match. Talk to your opponent and report
            again.
          </p>
        ) : myReport ? (
          <p className="text-sm text-muted-foreground">
            Waiting for your opponent to report...
          </p>
        ) : opponentReport ? (
          <p className="text-sm text-muted-foreground">
            Your opponent has reported a result. Report yours to continue.
          </p>
        ) : null}
      </div>
    </div>
  );
}
