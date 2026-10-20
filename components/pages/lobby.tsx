"use client";

import useLobbyState from "@/lib/hooks/useLobbyState";

import Invite from "@/components/pages/invite";
import Rps from "@/components/pages/rps";
import { SidePage } from "@/components/pages/side";
import { WaitingSideTab } from "@/components/home/side-status-tabs";
import PickSideTab from "@/components/home/pick-side-tab";
import GameTab from "@/components/pages/game-tab";
import Select from "@/components/select";
import LoadingRoom from "@/components/preload/loading-room";
import ChatDock from "@/components/chat/chat-dock";

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
  game: GameTab,
};

export default function Lobby() {
  const state = useLobbyState();
  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <div className="flex min-w-0 flex-1 flex-col">
        <Select value={state} pages={pages} />
      </div>
      <ChatDock />
    </div>
  );
}