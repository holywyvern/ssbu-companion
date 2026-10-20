"use client";

import { SubmitEventHandler, useContext, useState } from "react";
import { AppContext } from "@/lib/hooks/useApp";
import { toast } from "@/components/ui/toast";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function JoinLobbyTab() {
  const { lobby } = useContext(AppContext);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (code.length !== 6) return;
    setLoading(true);
    try {
      await lobby.join(code.toUpperCase());
    } catch {
      toast.add({
        type: "error",
        title: "Error",
        description: "Failed to join lobby. Check the code and try again.",
      });
    }
    setLoading(false);
  };

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <CardHeader>
          <CardTitle>Join a Lobby</CardTitle>
          <CardDescription>
            Enter the 6-digit code to join an existing lobby.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InputOTP
            maxLength={6}
            required
            value={code}
            onChange={(value) => setCode(value.toUpperCase())}
            disabled={loading}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={loading || code.length !== 6}
          >
            Join Room
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
