import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { createLobby, joinLobby } from "@/lib/services/lobbies";
import useUser from "@/lib/hooks/useUser";
import useLobby from "@/lib/hooks/useLobby";

export default function useLobbyActions(setPage: Dispatch<SetStateAction<string>>) {
  const user = useUser();
  const [id, setId] = useState<string | null>(null);
  const lobby = useLobby(id);
  const create = async (format: string, assignment: string) => {
    const newLobbyId = await createLobby(user.uid, format, assignment);
    setId(newLobbyId);
    setPage("lobby");
  };
  const join = async (lobbyId: string) => {
    await joinLobby(user.uid, lobbyId);
    setId(lobbyId);
    setPage("lobby");
  };
  return { create, join, id, ...lobby };
}
