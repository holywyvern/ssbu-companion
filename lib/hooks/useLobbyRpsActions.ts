import {
  sendRpsChoice,
  resetRps,
  continueFromRps,
} from "@/lib/services/rps";
import { pickSide } from "@/lib/services/lobbies";
import type { Lobby } from "@/lib/hooks/useLobby";

export default function useLobbyRpsActions(
  uid: string,
  id: string | null,
  lobby: Lobby | null,
) {
  const sendRps = async (choice: string) => {
    if (!id || !lobby?.hostId || !lobby.guestId) return;
    await sendRpsChoice(id, uid, choice, lobby.hostId, lobby.guestId);
  };
  const clearRps = async () => {
    if (!id) return;
    await resetRps(id);
  };
  const continueFromRpsResult = async () => {
    if (!id) return;
    await continueFromRps(id);
  };
  const chooseSide = async (side: "home" | "away") => {
    if (!id || !lobby?.hostId || !lobby.guestId) return;
    await pickSide(id, uid, lobby.hostId, lobby.guestId, side);
  };
  return {
    sendRps,
    clearRps,
    continueFromRps: continueFromRpsResult,
    chooseSide,
  };
}
