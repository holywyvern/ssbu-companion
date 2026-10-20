export default function CharacterSummary({
  mine,
  theirs,
}: {
  mine?: string;
  theirs?: string;
}) {
  if (!mine && !theirs) return null;
  return (
    <div className="flex justify-around text-center text-sm">
      <div>
        <div className="text-muted-foreground">You</div>
        <div className="font-medium">{mine ?? "-"}</div>
      </div>
      <div>
        <div className="text-muted-foreground">Opponent</div>
        <div className="font-medium">{theirs ?? "Hidden"}</div>
      </div>
    </div>
  );
}
