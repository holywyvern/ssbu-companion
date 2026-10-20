"use client";
import useGame from "@/lib/hooks/useGame";
import CharacterPicker from "@/components/games/character-picker";
import GameWaiting from "@/components/games/game-waiting";
import CharacterSummary from "@/components/games/character-summary";

export default function CharacterStep() {
  const { current, myTurn, busy, chooseCharacter, myCharacter, opponentCharacter } =
    useGame();
  if (!current) return null;

  const blind = current.step === "characters";
  const hint = blind
    ? "Pick your first character. Picks stay hidden until both players choose."
    : current.step === "winnerCharacter"
      ? "You won the last game: pick first. Your opponent will see your choice."
      : "You lost the last game: pick your character knowing your opponent's.";

  return (
    <div className="flex flex-col gap-4">
      {myTurn ? (
        <>
          <p className="text-sm text-muted-foreground">{hint}</p>
          {!blind && (
            <CharacterSummary mine={myCharacter} theirs={opponentCharacter} />
          )}
          <CharacterPicker disabled={busy} onConfirm={chooseCharacter} />
        </>
      ) : (
        <>
          <CharacterSummary
            mine={myCharacter}
            theirs={blind ? undefined : opponentCharacter}
          />
          <GameWaiting
            message={
              blind
                ? "Waiting for your opponent to pick a character..."
                : "Waiting for your opponent to pick their character..."
            }
          />
        </>
      )}
    </div>
  );
}
