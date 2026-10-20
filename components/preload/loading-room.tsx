"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingRoom() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 p-4"
    >
      <div className="flex flex-col gap-3 rounded-xl border p-6">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mx-auto mt-4 size-40" />
        <Skeleton className="mt-2 h-10 w-full" />
      </div>
      <span className="sr-only">Loading room...</span>
    </div>
  );
}
