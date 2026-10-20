import { useContext } from "react";
import { AppContext } from "@/lib/hooks/useApp";

export const RPS_CHOICES = [
  { id: "rock", label: "Rock", beats: "scissors" },
  { id: "paper", label: "Paper", beats: "rock" },
  { id: "scissors", label: "Scissors", beats: "paper" },
] as const;

export type RpsChoice = (typeof RPS_CHOICES)[number]["id"];

export default function useRps() {
  const { lobby } = useContext(AppContext);
  const picks = lobby.data?.rps?.picks ?? {};
  const winner = lobby.data?.rps?.winner;
  const opponentId = lobby.isHost ? lobby.data?.guestId : lobby.data?.hostId;
  const mine = picks[lobby.uid] as RpsChoice | undefined;
  const done = Boolean(winner);
  const theirs = (done && opponentId ? picks[opponentId] : undefined) as
    | RpsChoice
    | undefined;

  let result = "";
  if (winner) {
    if (winner === "draw") result = "It's a draw!";
    else result = winner === lobby.uid ? "You win!" : "You lose!";
  }

  const description = done
    ? result
    : mine
      ? "Waiting for your opponent..."
      : "Pick your move.";

  const isWinner = winner !== undefined && winner === lobby.uid;
  const phase: "selecting" | "won" | "draw" | "done" = !done
    ? "selecting"
    : winner === "draw"
      ? "draw"
      : isWinner
        ? "won"
        : "done";

  return {
    mine,
    theirs,
    done,
    phase,
    result,
    description,
    isWinner,
    choose: (choice: RpsChoice) => lobby.sendRps(choice),
    playAgain: () => lobby.clearRps(),
    continueToPick: () => lobby.continueFromRps(),
  };
}
