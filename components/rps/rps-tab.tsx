"use client";
import useRps from "@/lib/hooks/useRps";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RpsSelection from "@/components/rps/rps-selection";
import RpsWinning from "@/components/rps/rps-winning";
import RpsDraw from "@/components/rps/rps-draw";
import RpsDone from "@/components/rps/rps-done";

export default function RpsTab() {
  const { phase, mine, theirs, description, choose, playAgain, continueToPick } =
    useRps();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Rock, Paper, Scissors</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {phase === "selecting" && (
          <RpsSelection mine={mine} onChoose={choose} />
        )}
        {mine && theirs && phase === "won" && (
          <RpsWinning mine={mine} theirs={theirs} onContinue={continueToPick} />
        )}
        {mine && theirs && phase === "draw" && (
          <RpsDraw mine={mine} theirs={theirs} onPlayAgain={playAgain} />
        )}
        {mine && theirs && phase === "done" && (
          <RpsDone mine={mine} theirs={theirs} onPlayAgain={playAgain} />
        )}
      </CardContent>
    </Card>
  );
}
