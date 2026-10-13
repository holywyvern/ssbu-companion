"use client";

import { useContext } from "react";
import { AppContext } from "@/lib/hooks/useApp";

import Invite from "@/components/pages/invite";
import Select from "@/components/select";
import LoadingRoom from "@/components/preload/loading-room";

const pages = {
  invite: Invite,
  loading: LoadingRoom,
}

export default function Lobby() {
  const { lobby } = useContext(AppContext);
  let state = 'invite';
  if (lobby.loading) {
    state = 'loading';
  }
  return <Select value={state} pages={pages} />;
}