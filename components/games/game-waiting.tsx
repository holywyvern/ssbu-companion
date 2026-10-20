import { Loader2 } from "lucide-react";

export default function GameWaiting({ message }: { message: string }) {
  return (
    <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="size-4 animate-spin" /> {message}
    </p>
  );
}
