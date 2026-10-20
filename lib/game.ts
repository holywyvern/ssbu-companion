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

const CHARACTER_ICONS: Record<string, string | null> = {
  "Mario": "mario",
  "Donkey Kong": "donkey",
  "Link": "link",
  "Samus": "samus",
  "Dark Samus": "darksamus",
  "Yoshi": "yoshi",
  "Kirby": "kirby",
  "Fox": "fox",
  "Pikachu": "pikachu",
  "Luigi": "luigi",
  "Ness": "ness",
  "Captain Falcon": "captainfalco",
  "Jigglypuff": "jigglypuff",
  "Peach": "peach",
  "Daisy": "daisy",
  "Bowser": "bowser",
  "Ice Climbers": "iceclimber",
  "Sheik": "sheik",
  "Zelda": "zelda",
  "Dr. Mario": "drmario",
  "Pichu": "pichu",
  "Falco": "falco",
  "Marth": "marth",
  "Lucina": "lucina",
  "Young Link": "younglink",
  "Ganondorf": "ganon",
  "Mewtwo": "mewtwo",
  "Roy": "roy",
  "Chrom": "chrom",
  "Mr. Game & Watch": "gamewatch",
  "Meta Knight": "metaknight",
  "Pit": "pit",
  "Dark Pit": "darkpit",
  "Zero Suit Samus": "samus-zero",
  "Wario": "wario",
  "Snake": "snake",
  "Ike": "ike",
  "Pokémon Trainer": "red",
  "Diddy Kong": "diddy",
  "Lucas": "lucas",
  "Sonic": "sonic",
  "King Dedede": "dedede",
  "Olimar": "olimar",
  "Lucario": "lucario",
  "R.O.B.": "rob",
  "Toon Link": "toonlink",
  "Wolf": "wolf",
  "Villager": "villager",
  "Mega Man": "megaman",
  "Wii Fit Trainer": "wiifit",
  "Rosalina & Luma": "rosalina",
  "Little Mac": "littlemac",
  "Greninja": "greninja",
  "Mii Brawler": "miifighter",
  "Mii Swordfighter": "miiswordman",
  "Mii Gunner": "miigunner",
  "Palutena": "palutena",
  "Pac-Man": "pacman",
  "Robin": "robin",
  "Shulk": "shulk",
  "Bowser Jr.": "bowserjr",
  "Duck Hunt": "duckhunt",
  "Ryu": "ryu",
  "Ken": "ken",
  "Cloud": "cloud",
  "Corrin": "kamui",
  "Bayonetta": "bayonetta",
  "Inkling": "inkling",
  "Ridley": "ridley",
  "Simon": "simon",
  "Richter": "richter",
  "King K. Rool": "krool",
  "Isabelle": "isabelle",
  "Incineroar": "incineroar",
  "Piranha Plant": "piranhaplant",
  "Joker": "joker",
  "Hero": "hero",
  "Banjo & Kazooie": "banjo",
  "Terry": "terry",
  "Byleth": "byleth",
  "Min Min": "min-min",
  "Steve": "steve",
  "Sephiroth": "sephirott",
  "Pyra/Mythra": "pyra",
  "Kazuya": "demon",
  "Sora": "sora",
};

export const CHARACTERS = Object.keys(CHARACTER_ICONS);

// The in-game character select is 13 icons wide, in roster order.
export const CHARACTER_COLUMNS = 13;

export function characterIcon(name: string) {
  const file = CHARACTER_ICONS[name];
  return file ? `/characters/${file}.png` : null;
}

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
  reports?: Record<string, string>;
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
