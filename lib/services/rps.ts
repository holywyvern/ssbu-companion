import { ref, set, runTransaction } from "firebase/database";
import { db } from "@/lib/firebase/config";

const RPS_BEATS: Record<string, string> = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

export async function sendRpsChoice(
  lobbyId: string,
  uid: string,
  choice: string,
  hostId: string,
  guestId: string,
) {
  await runTransaction(ref(db, `lobbies/${lobbyId}/rps`), (current) => {
    const rps = current ?? {};
    if (rps.winner) return;
    const picks = { ...(rps.picks ?? {}), [uid]: choice };
    const next: { picks: Record<string, string>; winner?: string } = { picks };
    const hostPick = picks[hostId];
    const guestPick = picks[guestId];
    if (hostPick && guestPick) {
      if (hostPick === guestPick) next.winner = "draw";
      else next.winner = RPS_BEATS[hostPick] === guestPick ? hostId : guestId;
    }
    return next;
  });
}

export async function resetRps(lobbyId: string) {
  await set(ref(db, `lobbies/${lobbyId}/rps`), null);
}

export async function continueFromRps(lobbyId: string) {
  await runTransaction(ref(db, `lobbies/${lobbyId}`), (lobby) => {
    const winner = lobby?.rps?.winner;
    if (!lobby || lobby.status !== "rps" || !winner || winner === "draw") {
      return;
    }
    lobby.status = winner === lobby.hostId ? "hostPicks" : "guestPicks";
    return lobby;
  });
}
