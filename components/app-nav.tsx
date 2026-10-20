"use client";

import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { createPortal } from "react-dom";

const Context = createContext<{ nav: HTMLElement|null; setNav: Dispatch<SetStateAction<HTMLElement|null>> }>(null!);

export default function AppNav() {
  const { setNav } = useContext(Context);
  return (
    <nav className="bg-gray-200 dark:text-white dark:bg-gray-800 flex items-center justify-between p-2 pt-[max(0.5rem,env(safe-area-inset-top))] pl-[max(0.5rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))]">
      <h1 >SSBU Companion</h1>
      <div ref={setNav} />
      <ModeToggle />
    </nav>
  );
}

export function AppNavigation({ children }: PropsWithChildren<{}>) {
  const { nav } = useContext(Context);
  if (!nav) return null;
  return createPortal(children, nav);
}

export function AppProvider({ children }: PropsWithChildren<{}>) {
  const [nav, setNav] = useState<HTMLElement|null>(null);
  return (
    <Context.Provider value={{ nav, setNav }}>
      {children}
    </Context.Provider>
  );
}

AppNav.Navigation = AppNavigation;
AppNav.Provider = AppProvider;