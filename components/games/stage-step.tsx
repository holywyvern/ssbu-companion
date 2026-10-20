"use client";
import useGame from "@/lib/hooks/useGame";
import StageSelector from "@/components/games/stage-selector";
import GameWaiting from "@/components/games/game-waiting";
import CharacterSummary from "@/components/games/character-summary";

export default function StageStep() {
  const {
    current,
    myTurn,
    busy,
    banInfo,
    pickable,
    banStages,
    pickStage,
    myCharacter,
    opponentCharacter,
  } = useGame();
  if (!current || !banInfo) return null;

  const picking = current.step === "pick";
  const bans = current.bans ?? [];

  return (
    <div className="flex flex-col gap-4">
      <CharacterSummary mine={myCharacter} theirs={opponentCharacter} />
      {bans.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Banned: {bans.join(", ")}
        </p>
      )}
      {myTurn ? (
        <>
          <p className="text-sm">
            {picking
              ? "Pick the stage for this game."
              : `Ban ${banInfo.count} stage${banInfo.count === 1 ? "" : "s"}.${
                  banInfo.extra
                    ? ` You may also ban ${banInfo.extra}, where your opponent last won.`
                    : ""
                }`}
          </p>
          <StageSelector
            key={current.step}
            current={current}
            mode={picking ? "pick" : "ban"}
            stages={picking ? pickable : banInfo.pool}
            count={banInfo.count}
            extra={banInfo.extra}
            disabled={busy}
            onSubmit={(stages) =>
              picking ? pickStage(stages[0]) : banStages(stages)
            }
          />
        </>
      ) : (
        <GameWaiting
          message={
            picking
              ? "Waiting for your opponent to pick the stage..."
              : "Waiting for your opponent to ban stages..."
          }
        />
      )}
    </div>
  );
}
