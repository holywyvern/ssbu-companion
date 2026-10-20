import { Home, Plane } from "lucide-react";
import useGame from "@/lib/hooks/useGame";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GameScoreboard() {
  const { current, sides, uid, opponentId, wins, needed, isHome } = useGame();
  const mine = wins[uid] ?? 0;
  const theirs = opponentId ? (wins[opponentId] ?? 0) : 0;
  const Icon = isHome ? Home : Plane;
  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>{current ? `Game ${current.number}` : "Match over"}</span>
        <span className="tabular-nums">
          {mine} - {theirs}
        </span>
      </CardTitle>
      <CardDescription className="flex items-center gap-1">
        {sides && <Icon className="size-4" />}
        {sides ? `You are ${isHome ? "home" : "away"}. ` : ""}First to {needed}{" "}
        wins.
      </CardDescription>
    </CardHeader>
  );
}
