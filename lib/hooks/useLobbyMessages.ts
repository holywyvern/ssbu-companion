import { useEffect, useState } from "react";
import { subscribeToMessages, type ChatMessage } from "@/lib/services/chat";

export default function useLobbyMessages(lobbyId: string | null) {
  const [state, setState] = useState<{
    lobbyId: string;
    messages: ChatMessage[];
  } | null>(null);

  useEffect(() => {
    if (!lobbyId) return;
    return subscribeToMessages(
      lobbyId,
      (messages) => setState({ lobbyId, messages }),
      (error) => console.error("Chat subscription failed:", error),
    );
  }, [lobbyId]);

  return state && state.lobbyId === lobbyId ? state.messages : [];
}
