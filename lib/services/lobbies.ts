import {Filter} from "bad-words";
import { ref, set, get, runTransaction } from "firebase/database";
import { db } from "@/lib/firebase/config";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const filter = new Filter();

function generateRandomCode(length = 6) {
  let result = "";
  let badWord = true;
  while (badWord) {
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * ALPHABET.length);
      result += ALPHABET[randomIndex];
    }
    badWord = filter.isProfane(result);
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

export async function createLobby(
  hostId: string,
  format: string,
  assignment: string,
) {
  const lobbyId = await generateUniqueLobbyCode();
  const lobbyRef = ref(db, `lobbies/${lobbyId}`);
  await set(lobbyRef, {
    hostId,
    status: "LOBBY_SETUP",
    settings: { format, assignment },
    createdAt: Date.now(),
  });
  return lobbyId;
}

export async function joinLobby(guestId: string, lobbyId: string) {
  const lobbyRef = ref(db, `lobbies/${lobbyId}`);

  try {
    const result = await runTransaction(lobbyRef, (currentLobby) => {
      if (currentLobby === null) {
        return; 
      }
      if (currentLobby.guestId && currentLobby.guestId !== guestId) {
        return;
      }
      currentLobby.guestId = guestId;
      if (currentLobby.settings?.assignment === "rps") {
        currentLobby.status = "rps";
      } else {
        currentLobby.status = "hostPicks"; 
      }
      return currentLobby;
    });
    if (!result.committed) {
      throw new Error("Lobby is already full or does not exist.");
    }
  } catch (error: any) {
    console.error("Error joining lobby:", error);
    throw error;
  }
}