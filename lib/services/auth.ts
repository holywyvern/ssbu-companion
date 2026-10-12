import { signInAnonymously, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

// Sign in anonymously (great for quick lobbies!)
export async function loginAnonymously() {
  try {
    return await signInAnonymously(auth);
  } catch (error) {
    console.error("Anonymous sign-in failed:", error);
  }
}

export async function logout() {
  return await signOut(auth);
}
