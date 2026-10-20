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
import AppNav from "@/components/app-nav";
import LeaveLobbyButton from "@/components/lobby/leave-lobby-button";
import OpponentStatus from "@/components/lobby/opponent-status";
import LobbyClosedTab from "@/components/lobby/lobby-closed-tab";
import LobbyErrorTab from "@/components/lobby/lobby-error-tab";
import ConnectionBanner from "@/components/lobby/connection-banner";

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
  closed: wrap(LobbyClosedTab),
  error: LobbyErrorTab,
};

export default function Lobby() {
  const state = useLobbyState();
  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      {state !== "closed" && state !== "loading" && state !== "error" && (
        <AppNav.Navigation>
          <OpponentStatus />
          <LeaveLobbyButton />
        </AppNav.Navigation>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <ConnectionBanner />
        <Select value={state} pages={pages} />
      </div>
      <ChatDock />
    </div>
  );
}