import { useContext } from "react";
import { AppContext } from "@/lib/hooks/useApp";

export type LobbyViewState =
  | "loading"
  | "invite"
  | "rps"
  | "pickSide"
  | "waitingSide"
  | "game"
  | "closed"
  | "error";

export default function useLobbyState(): LobbyViewState {
  const { lobby } = useContext(AppContext);
  if (lobby.loading) return "loading";
  if (lobby.error && !lobby.data) return "error";
  if (lobby.data?.closedBy) return "closed";
  const status = lobby.data?.status;
  if (status === "rps") return "rps";
  if (status === "hostPicks" || status === "guestPicks") {
    const picker = status === "hostPicks" ? lobby.isHost : lobby.isGuest;
    return picker ? "pickSide" : "waitingSide";
  }
  if (status === "game") return "game";
  return "invite";
}
