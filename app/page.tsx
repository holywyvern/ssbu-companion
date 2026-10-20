import { Suspense } from "react";
import Router from "@/components/router";

export const instant = false;

export default function Home() {
  return (
    <Suspense>
      <Router />
    </Suspense>
  );
}
