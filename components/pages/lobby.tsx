"use client";

import { useContext } from "react";
import { AppContext } from "@/lib/hooks/useApp";

import Invite from "@/components/pages/invite";
import Select from "@/components/select";

const pages = {
  invite: Invite,
}

export default function Lobby() {
  const { lobby } = useContext(AppContext);
  const state = 'invite';
  return <Select value={state} pages={pages} />;
}