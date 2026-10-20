"use client";

import useLobbyState from "@/lib/hooks/useLobbyState";

import Invite from "@/components/pages/invite";
import Rps from "@/components/pages/rps";
import { SidePage } from "@/components/pages/side";
import { WaitingSideTab, ReadyTab } from "@/components/home/side-status-tabs";
import PickSideTab from "@/components/home/pick-side-tab";
import Select from "@/components/select";
import LoadingRoom from "@/components/preload/loading-room";

const wrap = (Tab: React.ComponentType) =>
  function Page() {
    return <SidePage><Tab /></SidePage>;
  };

const pages = {
  invite: Invite,
  loading: LoadingRoom,
  rps: Rps,
  pickSide: wrap(PickSideTab),
  waitingSide: wrap(WaitingSideTab),
  ready: wrap(ReadyTab),
};

export default function Lobby() {
  const state = useLobbyState();
  return <Select value={state} pages={pages} />;
}