"use client";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "@/lib/hooks/useApp";
import type { ChatMessage, ReactionId } from "@/lib/services/chat";
import { BubbleGroup } from "@/components/ui/bubble";
import { toast } from "@/components/ui/toast";
import ChatInput from "@/components/chat/chat-input";
import ChatMessageItem from "@/components/chat/chat-message";

export interface ChatPanelProps {
  messages: ChatMessage[];
}

export default function ChatPanel({ messages }: ChatPanelProps) {
  const { lobby } = useContext(AppContext);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages]);

  const send = async (text: string) => {
    try {
      await lobby.sendChatMessage(text);
    } catch (error) {
      toast.add({
        type: "error",
        title: "Message not sent",
        description: "Could not send your message. Try again.",
      });
      throw error;
    }
  };

  const react = (messageId: string, reaction: ReactionId) => {
    lobby.reactToChatMessage(messageId, reaction).catch(() => {
      toast.add({
        type: "error",
        title: "Reaction failed",
        description: "Could not add your reaction. Try again.",
      });
    });
  };

  return (
    <section aria-label="Chat" className="flex h-full min-h-0 flex-col gap-3">
      <div
        ref={listRef}
        role="log"
        aria-live="polite"
        className="min-h-40 flex-1 overflow-y-auto px-1 py-2"
      >
        {messages.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No messages yet. Say hi!
          </p>
        ) : (
          <BubbleGroup>
            {messages.map((message) => (
              <ChatMessageItem
                key={message.id}
                message={message}
                uid={lobby.uid}
                onReact={react}
              />
            ))}
          </BubbleGroup>
        )}
      </div>
      <ChatInput onSend={send} disabled={!lobby.data?.guestId} />
    </section>
  );
}
