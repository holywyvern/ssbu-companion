"use client";
import { Loader2 } from "lucide-react";
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
