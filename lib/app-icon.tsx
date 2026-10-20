import { ImageResponse } from "next/og";

export const THEME_COLOR = "#111827";

export function renderAppIcon(size: number) {
  const inner = Math.round(size * 0.5);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: THEME_COLOR,
          color: "#ffffff",
          fontSize: inner,
          fontWeight: 800,
          letterSpacing: -inner / 12,
        }}
      >
        SB
      </div>
    ),
    { width: size, height: size },
  );
}
