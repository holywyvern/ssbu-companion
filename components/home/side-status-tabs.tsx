"use client";
import { useContext } from "react";
import { Loader2 } from "lucide-react";
import { AppContext } from "@/lib/hooks/useApp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function WaitingSideTab() {
  const { lobby } = useContext(AppContext);
  const byRps = lobby.data?.settings.assignment === "rps";
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          {byRps ? "Waiting for your opponent" : "Waiting for the host"}
        </CardTitle>
        <CardDescription>
          {byRps
            ? "They won at rock paper scissors and are choosing who is home and who is away."
            : "The host is choosing who is home and who is away."}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Loader2 className="size-8 animate-spin" />
      </CardContent>
    </Card>
  );
}
