"use client";
import { SmilePlus } from "lucide-react";
import { REACTIONS, type ReactionId } from "@/lib/services/chat";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface ReactionPickerProps {
  onPick: (reaction: ReactionId) => void;
}

export default function ReactionPicker({ onPick }: ReactionPickerProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-xs"
            className="shrink-0 text-muted-foreground"
          >
            <SmilePlus />
            <span className="sr-only">Add reaction</span>
          </Button>
        }
      />
      <DropdownMenuContent
        align="center"
        className="flex w-auto min-w-0 flex-row gap-0.5"
      >
        {REACTIONS.map(({ id, emoji, label }) => (
          <DropdownMenuItem
            key={id}
            aria-label={label}
            title={label}
            className="size-8 justify-center p-0 text-lg"
            onClick={() => onPick(id)}
          >
            {emoji}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
