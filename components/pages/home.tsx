"use client";

import { useState } from "react";

import AppNav from "@/components/app-nav";
import HomeTabs from "@/components/home/home-tabs";
import JoinLobbyTab from "@/components/home/join-lobby-tab";
import NewLobbyTab from "@/components/home/new-lobby-tab";
import Select from "@/components/select";

const TABS = {
  "create-lobby": NewLobbyTab,
  "join-lobby": JoinLobbyTab,
};

export default function Home() {
  const [tab, setTab] = useState("create-lobby");
  return (
    <div className="p-4 flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <AppNav.Navigation>
        <HomeTabs onTabChange={setTab} />
      </AppNav.Navigation>
      <div className="my-4">
        <Select value={tab} pages={TABS} />
      </div>
    </div>
  );
}
