"use client";

import useApp, { AppContext } from "@/lib/hooks/useApp";
import Select from "@/components/select";
import HomePage from "@/components/pages/home";
import LobbyPage from "@/components/pages/lobby";

const pages = {
  home: HomePage,
  lobby: LobbyPage,
};

export default function Router() {
  const app = useApp();
  return (
    <AppContext value={app}>
      <Select value={app.page} pages={pages} />
    </AppContext>
  );
}
