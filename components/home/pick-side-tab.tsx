"use client";
import { useContext } from "react";
import { Home, Plane } from "lucide-react";
import { AppContext } from "@/lib/hooks/useApp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PickSideTab() {
  const { lobby } = useContext(AppContext);
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>You won!</CardTitle>
        <CardDescription>Choose who is home and who is away.</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Button className="flex-1" onClick={() => lobby.chooseSide("home")}>
          <Home /> I&apos;m home
        </Button>
        <Button
          className="flex-1"
          variant="outline"
          onClick={() => lobby.chooseSide("away")}
        >
          <Plane /> I&apos;m away
        </Button>
      </CardContent>
    </Card>
  );
}
