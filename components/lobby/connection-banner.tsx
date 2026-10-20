"use client";
import { useSyncExternalStore } from "react";
import { WifiOff } from "lucide-react";
import { onValue, ref } from "firebase/database";
import { db } from "@/lib/firebase/config";

let connected = true;
const listeners = new Set<() => void>();
let stop: (() => void) | null = null;

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    stop = onValue(ref(db, ".info/connected"), (snapshot) => {
      connected = snapshot.val() === true;
      listeners.forEach((l) => l());
    });
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      stop?.();
      stop = null;
    }
  };
}

export default function ConnectionBanner() {
  const online = useSyncExternalStore(
    subscribe,
    () => connected,
    () => true,
  );
  if (online) return null;
  return (
    <div
      role="alert"
      className="flex items-center justify-center gap-2 bg-destructive/10 px-3 py-2 text-sm text-destructive"
    >
      <WifiOff className="size-4" /> Connection lost. Reconnecting...
    </div>
  );
}
