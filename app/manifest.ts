import type { MetadataRoute } from "next";
import { THEME_COLOR } from "@/lib/app-icon";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SSBU Companion",
    short_name: "SSBU",
    description:
      "Run Super Smash Bros. Ultimate sets with a friend: rock-paper-scissors, stage and character picks, and scoreboard.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: THEME_COLOR,
    theme_color: THEME_COLOR,
    icons: [
      { src: "/icon/192", sizes: "192x192", type: "image/png" },
      { src: "/icon/512", sizes: "512x512", type: "image/png" },
      {
        src: "/icon/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
