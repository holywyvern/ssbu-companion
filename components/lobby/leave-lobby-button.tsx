"use client";
import { useContext, useState } from "react";
import { LogOut } from "lucide-react";
import { AppContext } from "@/lib/hooks/useApp";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";

export default function LeaveLobbyButton() {
  const { lobby } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const hasOpponent = Boolean(lobby.data?.guestId);

  const confirm = async () => {
    setLeaving(true);
    try {
      await lobby.leave();
    } catch {
      setLeaving(false);
      toast.add({
        type: "error",
        title: "Could not leave",
        description: "Something went wrong while leaving the lobby. Try again.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !leaving && setOpen(next)}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm">
            <LogOut /> Leave
          </Button>
        }
      />
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Leave this lobby?</DialogTitle>
          <DialogDescription>
            {hasOpponent
              ? "You won't be able to come back to this lobby once you leave, and the match will end for your opponent too."
              : "You won't be able to come back to this lobby once you leave, and the invite code will stop working."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" disabled={leaving} />}>
            Stay
          </DialogClose>
          <Button variant="destructive" onClick={confirm} disabled={leaving}>
            <LogOut /> {leaving ? "Leaving..." : "Leave lobby"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
