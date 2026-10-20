import { ref, runTransaction } from "firebase/database";
import { db } from "@/lib/firebase/config";
import {
  GameCurrent,
  GameHistoryEntry,
  GameState,
  Sides,
  availableStages,
  validateBans,
} from "@/lib/game";

const currentRef = (lobbyId: string) =>
  ref(db, `lobbies/${lobbyId}/game/current`);

export async function chooseCharacter(
  lobbyId: string,
  uid: string,
  character: string,
  sides: Sides,
) {
  await runTransaction(currentRef(lobbyId), (cur: GameCurrent | null) => {
    if (!cur) return cur;
    const characters = { ...(cur.characters ?? {}) };
    if (cur.step === "characters") {
      if (characters[uid]) return;
      characters[uid] = character;
      const both = characters[sides.home] && characters[sides.away];
      return { ...cur, characters, step: both ? "homeBan" : "characters" };
    }
    if (cur.step === "winnerCharacter" && cur.winnerId === uid) {
      characters[uid] = character;
      return { ...cur, characters, step: "loserCharacter" };
    }
    if (cur.step === "loserCharacter" && cur.loserId === uid) {
      characters[uid] = character;
      return { ...cur, characters, step: "ban" };
    }
    return;
  });
}

export async function banStages(
  lobbyId: string,
  uid: string,
  stages: string[],
  sides: Sides,
) {
  await runTransaction(currentRef(lobbyId), (cur: GameCurrent | null) => {
    if (!cur) return cur;
    if (!validateBans(cur, stages)) return;
    const bans = [...(cur.bans ?? []), ...stages];
    if (cur.step === "homeBan" && uid === sides.home) {
      return { ...cur, bans, step: "awayBan" };
    }
    if (cur.step === "awayBan" && uid === sides.away) {
      return { ...cur, bans, step: "pick" };
    }
    if (cur.step === "ban" && uid === cur.winnerId) {
      return { ...cur, bans, step: "pick" };
    }
    return;
  });
}

export async function pickStage(
  lobbyId: string,
  uid: string,
  stage: string,
  sides: Sides,
) {
  await runTransaction(currentRef(lobbyId), (cur: GameCurrent | null) => {
    if (!cur) return cur;
    const picker = cur.number === 1 ? sides.home : cur.loserId;
    if (cur.step !== "pick" || uid !== picker) return;
    if (!availableStages(cur).includes(stage)) return;
    return { ...cur, stage, step: "playing" };
  });
}

export async function reportWinner(
  lobbyId: string,
  winnerId: string,
  sides: Sides,
  needed: number,
) {
  await runTransaction(
    ref(db, `lobbies/${lobbyId}/game`),
    (game: GameState | null) => {
      if (!game) return game;
      const cur = game.current;
      if (!cur || cur.step !== "playing" || !cur.stage) return;
      const loserId = winnerId === sides.home ? sides.away : sides.home;
      const entry: GameHistoryEntry = {
        number: cur.number,
        winner: winnerId,
        loser: loserId,
        stage: cur.stage,
        characters: cur.characters ?? {},
      };
      const history = [...(game.history ?? []), entry];
      const wins = { ...(game.wins ?? {}) };
      wins[winnerId] = (wins[winnerId] ?? 0) + 1;
      if (wins[winnerId] >= needed) {
        return { wins, history, matchWinner: winnerId };
      }
      const lastLoserWin = [...history]
        .reverse()
        .find((item) => item.winner === loserId);
      const next: GameCurrent = {
        number: cur.number + 1,
        step: "winnerCharacter",
        winnerId,
        loserId,
      };
      if (lastLoserWin) next.extraBan = lastLoserWin.stage;
      return { wins, history, current: next };
    },
  );
}
