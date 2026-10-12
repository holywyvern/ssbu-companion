import { useContext } from "react";

import { AppContext } from "@/lib/hooks/useApp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

export default function Invite() {
  const { lobby } = useContext(AppContext);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Waiting for Opponent</CardTitle>
        <CardDescription>
          Give this code to your opponent to join the lobby.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <InputOTP defaultValue={lobby.id ?? ""} readOnly maxLength={6}>
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
    </Card>
  );
}
