import { ref, set, get } from "firebase/database";
import { db } from "@/lib/firebase/config";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; 

function generateRandomCode(length = 6) {
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * ALPHABET.length);
    result += ALPHABET[randomIndex];
  }
  return result;
}

async function generateUniqueLobbyCode() {
  const maxAttempts = 5;
  let attempts = 0;
  while (attempts < maxAttempts) {
    const code = generateRandomCode(6);
    const lobbyRef = ref(db, `lobbies/${code}`);
    const snapshot = await get(lobbyRef);

    if (!snapshot.exists()) {
      return code;
    }
    attempts++;
  }
  throw new Error("Failed to generate a unique room code. Please try again.");
}

export async function createLobby(hostId: string, format: string, assignment: string) {
  const lobbyId = await generateUniqueLobbyCode();
  const lobbyRef = ref(db, `lobbies/${lobbyId}`);
  await set(lobbyRef, {
    hostId,
    status: "LOBBY_SETUP",
    settings: { format, assignment },
    createdAt: Date.now()
  });
}