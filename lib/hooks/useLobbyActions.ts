import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import useUser from "@/lib/hooks/useUser";
import useLobby from "@/lib/hooks/useLobby";
import useLobbyManagementActions from "@/lib/hooks/useLobbyManagementActions";
import useLobbyRpsActions from "@/lib/hooks/useLobbyRpsActions";
import useLobbyGameActions from "@/lib/hooks/useLobbyGameActions";

export default function useLobbyActions(
  setPage: Dispatch<SetStateAction<string>>,
) {
  const user = useUser();
  const [id, setId] = useState<string | null>(null);
  const lobby = useLobby(id);
  const management = useLobbyManagementActions(user.uid, setId, setPage);
  const rps = useLobbyRpsActions(user.uid, id, lobby.data);
  const game = useLobbyGameActions(user.uid, id, lobby.data);
  const isHost = lobby.data?.hostId === user.uid;
  const isGuest = lobby.data?.guestId === user.uid;
  return {
    id,
    ...lobby,
    isHost,
    isGuest,
    uid: user.uid,
    ...management,
    ...rps,
    ...game,
  };
}
