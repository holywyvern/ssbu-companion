import { Dispatch, SetStateAction } from "react";
import { createLobby, joinLobby } from "@/lib/services/lobbies";

export default function useLobbyManagementActions(
  uid: string,
  setId: Dispatch<SetStateAction<string | null>>,
  setPage: Dispatch<SetStateAction<string>>,
) {
  const create = async (format: string, assignment: string) => {
    const newLobbyId = await createLobby(uid, format, assignment);
    setId(newLobbyId);
    setPage("lobby");
  };
  const join = async (lobbyId: string) => {
    await joinLobby(uid, lobbyId);
    setId(lobbyId);
    setPage("lobby");
  };
  return { create, join };
}
