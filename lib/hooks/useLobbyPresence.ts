import { useEffect } from "react";
import { trackPresence } from "@/lib/services/presence";

export default function useLobbyPresence(
  lobbyId: string | null,
  uid: string,
  enabled: boolean,
) {
  useEffect(() => {
    if (!lobbyId || !uid || !enabled) return;
    return trackPresence(lobbyId, uid);
  }, [lobbyId, uid, enabled]);
}
