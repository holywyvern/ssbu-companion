import {
  banStages,
  chooseCharacter,
  pickStage,
  reportWinner,
  restartMatch,
} from "@/lib/services/games";
import { WINS_NEEDED } from "@/lib/game";
import type { Lobby } from "@/lib/hooks/useLobby";

export default function useLobbyGameActions(
  uid: string,
  id: string | null,
  lobby: Lobby | null,
) {
  const sides = lobby?.sides;
  const pickCharacter = async (character: string) => {
    if (!id || !sides) return;
    await chooseCharacter(id, uid, character, sides);
  };
  const banGameStages = async (stages: string[]) => {
    if (!id || !sides) return;
    await banStages(id, uid, stages, sides);
  };
  const pickGameStage = async (stage: string) => {
    if (!id || !sides) return;
    await pickStage(id, uid, stage, sides);
  };
  const reportGameWinner = async (winnerId: string) => {
    if (!id || !sides || !lobby) return;
    const needed = WINS_NEEDED[lobby.settings.format] ?? 2;
    await reportWinner(id, uid, winnerId, sides, needed);
  };
  const restartGame = async () => {
    if (!id || !lobby || lobby.hostId !== uid) return;
    await restartMatch(id, uid);
  };
  return {
    pickCharacter,
    banGameStages,
    pickGameStage,
    reportGameWinner,
    restartGame,
  };
}
