import Image from "next/image";
import { characterIcon } from "@/lib/game";

function Pick({
  label,
  name,
  fallback,
}: {
  label: string;
  name?: string;
  fallback: string;
}) {
  const icon = name ? characterIcon(name) : null;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-muted-foreground">{label}</div>
      {icon && <Image src={icon} alt="" width={48} height={48} />}
      <div className="font-medium">{name ?? fallback}</div>
    </div>
  );
}

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
      <Pick label="You" name={mine} fallback="-" />
      <Pick label="Opponent" name={theirs} fallback="Hidden" />
    </div>
  );
}
