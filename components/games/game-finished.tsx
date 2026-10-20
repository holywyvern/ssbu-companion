"use client";
import Image from "next/image";
import { RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import useGame from "@/lib/hooks/useGame";
import { characterIcon, stageImage } from "@/lib/game";
import { cn } from "@/lib/utils";

function Fighter({
  name,
  won,
  align,
}: {
  name?: string;
  won: boolean;
  align: "start" | "end";
}) {
  const icon = name ? characterIcon(name) : null;
  return (
    <div
      className={cn(
        "flex min-w-0 max-w-full flex-col items-center gap-1 rounded-lg border p-1.5 text-center transition-colors",
        won
          ? "border-primary bg-primary/10 ring-2 ring-primary/40"
          : "border-transparent opacity-50 grayscale",
        align === "start" ? "justify-self-start" : "justify-self-end",
      )}
    >
      {icon ? (
        <Image
          src={icon}
          alt=""
          width={64}
          height={64}
          className="size-12 sm:size-14"
        />
      ) : (
        <div className="size-12 sm:size-14" />
      )}
      <span className="w-full truncate text-xs font-medium">{name ?? "-"}</span>
      {won && <Trophy className="size-3.5 text-primary" aria-label="Winner" />}
    </div>
  );
}

export default function GameFinished() {
  const {
    matchWinner,
    uid,
    history,
    hostId,
    guestId,
    wins,
    isHost,
    restart,
    busy,
  } = useGame();
  const won = matchWinner === uid;
  const hostWins = hostId ? (wins[hostId] ?? 0) : 0;
  const guestWins = guestId ? (wins[guestId] ?? 0) : 0;
  const hostLabel = isHost ? "Host (you)" : "Host";
  const guestLabel = isHost ? "Guest" : "Guest (you)";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <Trophy className="size-10" />
        <p className="text-lg font-semibold">
          {won ? "You won the match!" : "You lost the match."}
        </p>
        <p
          className="text-4xl font-bold tabular-nums"
          aria-label={`Final score ${hostWins} to ${guestWins}`}
        >
          {hostWins} - {guestWins}
        </p>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 text-xs font-medium text-muted-foreground">
        <span className="justify-self-start">{hostLabel}</span>
        <span className="w-24 text-center sm:w-32">Stage</span>
        <span className="justify-self-end">{guestLabel}</span>
      </div>

      <ol className="flex flex-col gap-3">
        {history.map((game) => (
          <li
            key={game.number}
            className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-2"
          >
            <Fighter
              name={hostId ? game.characters[hostId] : undefined}
              won={game.winner === hostId}
              align="start"
            />
            <div className="flex w-24 flex-col items-center gap-1 sm:w-32">
              <span className="text-xs font-semibold text-muted-foreground">
                Game {game.number}
              </span>
              <Image
                src={stageImage(game.stage)}
                alt=""
                width={256}
                height={128}
                className="aspect-2/1 w-full rounded-md object-cover"
              />
              <span className="w-full truncate text-center text-xs">
                {game.stage}
              </span>
            </div>
            <Fighter
              name={guestId ? game.characters[guestId] : undefined}
              won={game.winner === guestId}
              align="end"
            />
          </li>
        ))}
      </ol>

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
