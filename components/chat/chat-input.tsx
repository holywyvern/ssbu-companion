"use client";
import { SubmitEventHandler, useState } from "react";
import { Send } from "lucide-react";
import { MAX_MESSAGE_LENGTH } from "@/lib/services/chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface ChatInputProps {
  disabled?: boolean;
  onSend: (text: string) => Promise<void>;
}

export default function ChatInput({ disabled, onSend }: ChatInputProps) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const empty = text.trim() === "";

  const onSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (empty || sending || disabled) return;
    setSending(true);
    try {
      await onSend(text);
      setText("");
    } catch {
      // The parent reports the failure; keep the text so it can be retried.
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input
        value={text}
        onChange={(event) => setText(event.target.value)}
        maxLength={MAX_MESSAGE_LENGTH}
        placeholder="Type a message..."
        aria-label="Message"
        autoComplete="off"
        enterKeyHint="send"
        disabled={disabled}
        className="h-9"
      />
      <Button
        type="submit"
        size="icon-lg"
        disabled={empty || sending || disabled}
      >
        <Send />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}
