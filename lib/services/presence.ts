import {
  onDisconnect,
  onValue,
  ref,
  remove,
  set,
} from "firebase/database";
import { db } from "@/lib/firebase/config";

// Marks the user as online in the lobby while connected. The server removes
// the marker automatically when the connection drops.
export function trackPresence(lobbyId: string, uid: string): () => void {
  const presenceRef = ref(db, `lobbies/${lobbyId}/presence/${uid}`);
  let active = true;

  const unsubscribe = onValue(ref(db, ".info/connected"), (snapshot) => {
    if (!active || snapshot.val() !== true) return;
    onDisconnect(presenceRef)
      .remove()
      .then(() => (active ? set(presenceRef, true) : undefined))
      .catch((error) => console.error("Presence update failed:", error));
  });

  return () => {
    active = false;
    unsubscribe();
    onDisconnect(presenceRef)
      .cancel()
      .catch(() => {});
    remove(presenceRef).catch(() => {});
  };
}
