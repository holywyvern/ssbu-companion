"use client";

import { LoaderCircle } from "lucide-react";

import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";

export default function LoadingRoom() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <LoaderCircle />
        </EmptyMedia>
        <EmptyTitle>Loading Room</EmptyTitle>
        <EmptyDescription>
          Please wait while the room loads
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
