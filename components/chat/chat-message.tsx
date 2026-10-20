"use client";
import { REACTIONS, type ChatMessage, type ReactionId } from "@/lib/services/chat";
import { cn } from "@/lib/utils";
import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@/components/ui/bubble";
import ReactionPicker from "@/components/chat/reaction-picker";

export interface ChatMessageItemProps {
  message: ChatMessage;
  uid: string;
  onReact: (messageId: string, reaction: ReactionId) => void;
}

export default function ChatMessageItem({
  message,
  uid,
  onReact,
}: ChatMessageItemProps) {
  const mine = message.senderId === uid;
  const reactions = REACTIONS.map((reaction) => {
    const users = Object.keys(message.reactions?.[reaction.id] ?? {});
    return { ...reaction, count: users.length, active: users.includes(uid) };
  }).filter((reaction) => reaction.count > 0);

  return (
    <div
      className={cn(
        "flex items-center gap-1",
        mine ? "flex-row-reverse" : "flex-row",
        reactions.length > 0 && "mb-3",
      )}
    >
      <Bubble
        align={mine ? "end" : "start"}
        variant={mine ? "default" : "secondary"}
      >
        <BubbleContent>{message.text}</BubbleContent>
        {reactions.length > 0 && (
          <BubbleReactions align={mine ? "end" : "start"}>
            {reactions.map(({ id, emoji, label, count, active }) => (
              <button
                key={id}
                type="button"
                title={label}
                aria-label={`${label}, ${count}`}
                aria-pressed={active}
                className={cn(
                  "flex items-center gap-1 rounded-full px-1.5 py-0.5 text-xs transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  active ? "bg-primary/20 text-foreground" : "hover:bg-foreground/10",
                )}
                onClick={() => onReact(message.id, id)}
              >
                <span className="text-sm">{emoji}</span>
                {count > 1 && <span className="tabular-nums">{count}</span>}
              </button>
            ))}
          </BubbleReactions>
        )}
      </Bubble>
      <ReactionPicker onPick={(reaction) => onReact(message.id, reaction)} />
    </div>
  );
}
