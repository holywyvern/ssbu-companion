import { useContext, useState } from "react";
import { AppContext } from "@/lib/hooks/useApp";
import { toast } from "@/components/ui/toast";
import {
  WINS_NEEDED,
  banRule,
  needsAction,
  stepActor,
  availableStages,
} from "@/lib/game";

export default function useGame() {
  const { lobby } = useContext(AppContext);
  const [busy, setBusy] = useState(false);

  const game = lobby.data?.game;
  const sides = lobby.data?.sides;
  const current = game?.current;
  const wins = game?.wins ?? {};
  const history = game?.history ?? [];
  const matchWinner = game?.matchWinner;
  const uid = lobby.uid;
  const opponentId = lobby.isHost ? lobby.data?.guestId : lobby.data?.hostId;
  const needed = WINS_NEEDED[lobby.data?.settings.format ?? ""] ?? 2;
  const myTurn = Boolean(current && sides && needsAction(current, sides, uid));
  const actorId = current && sides ? stepActor(current, sides) : undefined;

  const characters = current?.characters ?? {};
  const blind = current?.step === "characters";
  const myCharacter = characters[uid];
  const opponentCharacter = blind || !opponentId ? undefined : characters[opponentId];

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    try {
      await action();
    } catch {
      toast.add({
        type: "error",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
    setBusy(false);
  };

  return {
    current,
    sides,
    uid,
    opponentId,
    isHost: lobby.isHost,
    isHome: sides?.home === uid,
    hostId: lobby.data?.hostId,
    guestId: lobby.data?.guestId,
    wins,
    history,
    matchWinner,
    needed,
    myTurn,
    actorId,
    busy,
    myCharacter,
    opponentCharacter,
    banInfo: current ? banRule(current) : undefined,
    pickable: current ? availableStages(current) : [],
    chooseCharacter: (character: string) =>
      run(() => lobby.pickCharacter(character)),
    banStages: (stages: string[]) => run(() => lobby.banGameStages(stages)),
    pickStage: (stage: string) => run(() => lobby.pickGameStage(stage)),
    reportWinner: (winnerId: string) =>
      run(() => lobby.reportGameWinner(winnerId)),
  };
}
