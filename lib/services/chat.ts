import {
  limitToLast,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  runTransaction,
  serverTimestamp,
  set,
} from "firebase/database";
import { db } from "@/lib/firebase/config";

export const MAX_MESSAGE_LENGTH = 200;
const HISTORY_LIMIT = 100;

export const REACTIONS = [
  { id: "thumbs_up", emoji: "👍", label: "Thumbs up" },
  { id: "heart", emoji: "❤️", label: "Heart" },
  { id: "laugh", emoji: "😂", label: "Laugh" },
  { id: "wow", emoji: "😮", label: "Wow" },
  { id: "sad", emoji: "😢", label: "Sad" },
  { id: "fire", emoji: "🔥", label: "Fire" },
  { id: "eyes", emoji: "👀", label: "Eyes" }
] as const;

export type ReactionId = (typeof REACTIONS)[number]["id"];

export function isReactionId(value: string): value is ReactionId {
  return REACTIONS.some((reaction) => reaction.id === value);
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  reactions?: Partial<Record<ReactionId, Record<string, boolean>>>;
  timestamp: number;
}

function messagesRef(lobbyId: string) {
  return ref(db, `lobbies/${lobbyId}/messages`);
}

export async function sendMessage(
  lobbyId: string,
  senderId: string,
  text: string,
) {
  const trimmed = text.trim();
  if (!trimmed) return;
  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    throw new Error(`Messages can't exceed ${MAX_MESSAGE_LENGTH} characters.`);
  }
  await set(push(messagesRef(lobbyId)), {
    senderId,
    text: trimmed,
    timestamp: serverTimestamp(),
  });
}

export async function reactToMessage(
  lobbyId: string,
  messageId: string,
  uid: string,
  reaction: ReactionId,
) {
  if (!isReactionId(reaction)) {
    throw new Error("Unknown reaction.");
  }
  await runTransaction(
    ref(db, `lobbies/${lobbyId}/messages/${messageId}/reactions/${reaction}/${uid}`),
    (current) => (current ? null : true),
  );
}

export function subscribeToMessages(
  lobbyId: string,
  onChange: (messages: ChatMessage[]) => void,
  onError?: (error: Error) => void,
) {
  const latest = query(
    messagesRef(lobbyId),
    orderByChild("timestamp"),
    limitToLast(HISTORY_LIMIT),
  );
  return onValue(
    latest,
    (snapshot) => {
      const messages: ChatMessage[] = [];
      snapshot.forEach((child) => {
        messages.push({ id: child.key, ...child.val() });
      });
      onChange(messages);
    },
    onError,
  );
}
