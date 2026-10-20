"use client";
import { useContext } from "react";
import { Home, SearchX } from "lucide-react";
import { AppContext } from "@/lib/hooks/useApp";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function LobbyErrorTab() {
  const { lobby } = useContext(AppContext);
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchX />
        </EmptyMedia>
        <EmptyTitle>Lobby unavailable</EmptyTitle>
        <EmptyDescription>
          {lobby.error ??
            "This lobby does not exist, has expired or was closed."}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={lobby.exit}>
          <Home /> Back to home
        </Button>
      </EmptyContent>
    </Empty>
  );
}
