"use client";

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
  InputOTPSeparator,
} from "@/components/ui/input-otp";

export default function JoinLobbyTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Join a Lobby</CardTitle>
        <CardDescription>Enter the 6-digit code to join an existing lobby.</CardDescription>
      </CardHeader>
      <CardContent>
        <InputOTP maxLength={6} required>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">
          Join Room
        </Button>
      </CardFooter>
    </Card>
  );
}
