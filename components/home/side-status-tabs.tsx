"use client";
import { useContext } from "react";
import { Loader2, Home, Plane } from "lucide-react";
import { AppContext } from "@/lib/hooks/useApp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function WaitingSideTab() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Waiting for your opponent</CardTitle>
        <CardDescription>
          They won the match and are choosing who is home and who is away.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Loader2 className="size-8 animate-spin" />
      </CardContent>
    </Card>
  );
}

export function ReadyTab() {
  const { lobby } = useContext(AppContext);
  const isHome = lobby.data?.sides?.home === lobby.uid;
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isHome ? <Home /> : <Plane />} You are {isHome ? "home" : "away"}
        </CardTitle>
        <CardDescription>
          Your opponent is {isHome ? "away" : "home"}.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
