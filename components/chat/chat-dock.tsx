"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { AppContext } from "@/lib/hooks/useApp";
import useLobbyMessages from "@/lib/hooks/useLobbyMessages";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ChatPanel from "@/components/chat/chat-panel";
import OpponentStatus from "@/components/lobby/opponent-status";

export default function ChatDock() {
  const { lobby } = useContext(AppContext);
  const messages = useLobbyMessages(lobby.id);
  const [open, setOpen] = useState(false);
  const [readUpTo, setReadUpTo] = useState(0);

  const unread = messages.filter(
    (message) => message.senderId !== lobby.uid && message.timestamp > readUpTo,
  ).length;

  // Messages that arrive while the sheet is open count as read.
  const close = useCallback(() => {
    setReadUpTo(Math.max(0, ...messages.map((message) => message.timestamp)));
    setOpen(false);
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  if (lobby.loading || !lobby.data?.guestId || lobby.data.closedBy) return null;

  return (
    <>
      <Button
        type="button"
        size="icon-lg"
        aria-label={
          unread > 0
            ? `Open chat, ${unread} unread message${unread === 1 ? "" : "s"}`
            : "Open chat"
        }
        aria-expanded={open}
        className={cn(
          "fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 size-12 rounded-full shadow-lg lg:hidden",
          open && "hidden",
        )}
        onClick={() => setOpen(true)}
      >
        <MessageCircle className="size-5" />
        {unread > 0 && (
          <span
            aria-hidden="true"
            className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-xs font-semibold text-white tabular-nums ring-2 ring-background"
          >
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </Button>
      <aside
        aria-label="Lobby chat"
        className={cn(
          "flex-col bg-background p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]",
          open
            ? "fixed inset-x-0 top-0 z-40 flex h-dvh"
            : "hidden",
          "lg:sticky lg:top-0 lg:z-auto lg:flex lg:h-[calc(100dvh-3rem)] lg:w-80 lg:shrink-0 lg:self-start lg:border-l lg:pb-3",
        )}
      >
        <div className="mb-2 flex items-center justify-between gap-2">
          <OpponentStatus />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={close}
          >
            <X />
            <span className="sr-only">Close chat</span>
          </Button>
        </div>
        <ChatPanel messages={messages} />
      </aside>
    </>
  );
}
