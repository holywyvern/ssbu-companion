"use client";

import { useState } from "react";

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
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HomeTabs onTabChange={setTab} />
      <div className="my-4">
        <Select value={tab} pages={TABS} />
      </div>
    </div>
  );
}
