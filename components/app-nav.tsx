"use client";

import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { createPortal } from "react-dom";

const Context = createContext<{ nav: HTMLElement|null; setNav: Dispatch<SetStateAction<HTMLElement|null>> }>(null!);

export default function AppNav() {
  const { setNav } = useContext(Context);
  return (
    <nav className="bg-gray-200 p-4 dark:text-white dark:bg-gray-800 flex items-center justify-between">
      <h1>SSBU Companion</h1>
      <div ref={setNav}/>
      <ModeToggle />
    </nav>
  );
}

export function AppNavigation({ children }: PropsWithChildren<{}>) {
  const { nav } = useContext(Context);
  return createPortal(children, nav ?? document.body);
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