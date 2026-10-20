"use client";
import { useContext } from "react";
import { AppContext } from "@/lib/hooks/useApp";
import { cn } from "@/lib/utils";

export default function OpponentStatus() {
  const { lobby } = useContext(AppContext);
  const data = lobby.data;
  if (!data?.guestId || data.closedBy) return null;

  const opponentId = lobby.isHost ? data.guestId : data.hostId;
  const online = data.presence?.[opponentId] === true;

  return (
    <div
      role="status"
      className="flex items-center gap-2 text-sm text-muted-foreground"
    >
      <span
        aria-hidden
        className={cn(
          "size-2.5 rounded-full",
          online ? "bg-green-500" : "bg-muted-foreground/40",
        )}
      />
      <span>
        {lobby.isHost ? "Guest" : "Host"} {online ? "online" : "offline"}
      </span>
    </div>
  );
}
