export const STARTER_STAGES = [
  "Battlefield",
  "Small Battlefield",
  "Pokémon Stadium 2",
  "Smashville",
  "Town & City",
];

export const COUNTERPICK_STAGES = [
  "Final Destination",
  "Kalos Pokémon League",
  "Hollow Bastion",
];

export const ALL_STAGES = [...STARTER_STAGES, ...COUNTERPICK_STAGES];

export function stageImage(stage: string) {
  const slug = stage
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `/stages/${slug}.png`;
}

export const CHARACTERS = [
  "Mario", "Donkey Kong", "Link", "Samus", "Dark Samus", "Yoshi", "Kirby",
  "Fox", "Pikachu", "Luigi", "Ness", "Captain Falcon", "Jigglypuff", "Peach",
  "Daisy", "Bowser", "Ice Climbers", "Sheik", "Zelda", "Dr. Mario", "Pichu",
  "Falco", "Marth", "Lucina", "Young Link", "Ganondorf", "Mewtwo", "Roy",
  "Chrom", "Mr. Game & Watch", "Meta Knight", "Pit", "Dark Pit",
  "Zero Suit Samus", "Wario", "Snake", "Ike", "Pokémon Trainer", "Diddy Kong",
  "Lucas", "Sonic", "King Dedede", "Olimar", "Lucario", "R.O.B.", "Toon Link",
  "Wolf", "Villager", "Mega Man", "Wii Fit Trainer", "Rosalina & Luma",
  "Little Mac", "Greninja", "Mii Brawler", "Mii Swordfighter", "Mii Gunner",
  "Palutena", "Pac-Man", "Robin", "Shulk", "Bowser Jr.", "Duck Hunt", "Ryu",
  "Ken", "Cloud", "Corrin", "Bayonetta", "Inkling", "Ridley", "Simon",
  "Richter", "King K. Rool", "Isabelle", "Incineroar", "Piranha Plant", "Joker",
  "Hero", "Banjo & Kazooie", "Terry", "Byleth", "Min Min", "Steve",
  "Sephiroth", "Pyra/Mythra", "Kazuya", "Sora",
];

export const WINS_NEEDED: Record<string, number> = { bo3: 2, bo5: 3 };

export type GameStep =
  | "characters"
  | "winnerCharacter"
  | "loserCharacter"
  | "homeBan"
  | "awayBan"
  | "ban"
  | "pick"
  | "playing";

export interface GameCurrent {
  number: number;
  step: GameStep;
  characters?: Record<string, string>;
  bans?: string[];
  stage?: string;
  winnerId?: string;
  loserId?: string;
  extraBan?: string;
}

export interface GameHistoryEntry {
  number: number;
  winner: string;
  loser: string;
  stage: string;
  characters: Record<string, string>;
}

export interface GameState {
  current?: GameCurrent;
  wins?: Record<string, number>;
  history?: GameHistoryEntry[];
  matchWinner?: string;
}

export interface Sides {
  home: string;
  away: string;
}

export function stagePool(current: GameCurrent) {
  return current.number === 1 ? STARTER_STAGES : ALL_STAGES;
}

export function availableStages(current: GameCurrent) {
  const bans = current.bans ?? [];
  return stagePool(current).filter((stage) => !bans.includes(stage));
}

export function banRule(current: GameCurrent) {
  const pool = availableStages(current);
  if (current.step === "homeBan") return { count: 1, pool };
  if (current.step === "awayBan") return { count: 2, pool };
  return { count: 2, pool, extra: current.extraBan };
}

export function validateBans(current: GameCurrent, stages: string[]) {
  const { count, pool, extra } = banRule(current);
  if (new Set(stages).size !== stages.length) return false;
  if (!stages.every((stage) => pool.includes(stage))) return false;
  if (stages.length === count) return true;
  return Boolean(extra) && stages.length === count + 1 && stages.includes(extra!);
}

export function stepActor(current: GameCurrent, sides: Sides) {
  switch (current.step) {
    case "winnerCharacter":
      return current.winnerId;
    case "loserCharacter":
      return current.loserId;
    case "homeBan":
      return sides.home;
    case "awayBan":
      return sides.away;
    case "ban":
      return current.winnerId;
    case "pick":
      return current.number === 1 ? sides.home : current.loserId;
    default:
      return undefined;
  }
}

export function needsAction(current: GameCurrent, sides: Sides, uid: string) {
  if (current.step === "characters") return !current.characters?.[uid];
  return stepActor(current, sides) === uid;
}
