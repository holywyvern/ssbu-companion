import { Dispatch, SetStateAction } from "react";
import { createLobby, joinLobby, leaveLobby } from "@/lib/services/lobbies";

export default function useLobbyManagementActions(
  uid: string,
  id: string | null,
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
  const leave = async () => {
    if (id) await leaveLobby(id, uid);
    setId(null);
    setPage("home");
  };
  const exit = () => {
    setId(null);
    setPage("home");
  };
  return { create, join, leave, exit };
}
