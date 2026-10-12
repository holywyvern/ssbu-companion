import { useState, createContext } from "react";
import useLobbyActions from "@/lib/hooks/useLobbyActions";

export const AppContext = createContext<ReturnType<typeof useApp>>(null!);

export default function useApp() {
  const [page, setPage] = useState("home");
  const lobby = useLobbyActions(setPage);
  return { page, lobby };
}