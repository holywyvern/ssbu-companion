"use client";
import { useContext, useState } from "react";
import { Home } from "lucide-react";
import { AppContext } from "@/lib/hooks/useApp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

export default function LobbyClosedTab() {
  const { lobby } = useContext(AppContext);
  const [leaving, setLeaving] = useState(false);

  const goHome = async () => {
    setLeaving(true);
    try {
      await lobby.leave();
    } catch {
      setLeaving(false);
      toast.add({
        type: "error",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Your opponent left</CardTitle>
        <CardDescription>
          This lobby is closed and can&apos;t be rejoined. Head back to start a
          new one.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" onClick={goHome} disabled={leaving}>
          <Home /> Back to home
        </Button>
      </CardContent>
    </Card>
  );
}
