import {
  reactToMessage,
  sendMessage,
  type ReactionId,
} from "@/lib/services/chat";
import type { Lobby } from "@/lib/hooks/useLobby";

export default function useLobbyChatActions(
  uid: string,
  id: string | null,
  lobby: Lobby | null,
) {
  const isParticipant = lobby?.hostId === uid || lobby?.guestId === uid;
  const sendChatMessage = async (text: string) => {
    if (!id || !isParticipant) return;
    await sendMessage(id, uid, text);
  };
  const reactToChatMessage = async (
    messageId: string,
    reaction: ReactionId,
  ) => {
    if (!id || !isParticipant) return;
    await reactToMessage(id, messageId, uid, reaction);
  };
  return { sendChatMessage, reactToChatMessage };
}
