import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase/config";
import type { GameState } from "@/lib/game";

export interface Lobby {
  hostId: string;
  guestId?: string;
  closedBy?: string;
  presence?: Record<string, boolean>;
  status: string;
  settings: { format: string; assignment: string };
  createdAt: number;
  rps?: { picks?: Record<string, string>; winner?: string };
  sides?: { home: string; away: string };
  game?: GameState;
}

export default function useLobby(id: string | null) {
  const [data, setData] = useState<Lobby | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setError(null);    
    if (!id) {
      setData(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const lobbyRef = ref(db, `lobbies/${id}`);
    const unsubscribe = onValue(
      lobbyRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
          setError(null);
        } else {
          setData(null);
          setError("This lobby does not exist or has expired.");
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, [id]);
  return { data, error, loading };
}
