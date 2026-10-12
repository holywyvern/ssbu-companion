"use client";

import { LoaderCircle } from "lucide-react";

import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";

export default function Loading() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <LoaderCircle />
        </EmptyMedia>
        <EmptyTitle>Loading Application</EmptyTitle>
        <EmptyDescription>
          Please wait while the application loads
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
