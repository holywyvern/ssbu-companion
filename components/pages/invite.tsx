import { useContext } from "react";

import { AppContext } from "@/lib/hooks/useApp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export default function Invite() {
  const { lobby } = useContext(AppContext);
  const copyCode = () => {
    navigator.clipboard.writeText(lobby.id ?? "");
    toast.add({
      type: "info",
      title: "Code copied",
      description: "Code copied to clipboard",
    });
  };
  return (
    <div className="p-4 flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Card>
        <CardHeader>
          <CardTitle>Waiting for Opponent</CardTitle>
          <CardDescription>
            Give this code to your opponent to join the lobby.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InputOTP value={lobby.id ?? ""} readOnly maxLength={6}>
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
          <Button onClick={copyCode}>Copy Code</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
