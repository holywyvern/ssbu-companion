import { ModeToggle } from "./mode-toggle";

export default function AppNav() {
  return (
    <nav className="bg-gray-200 p-4 dark:text-white dark:bg-gray-800 flex items-center justify-between">
      <h1>SSBU Companion</h1>
      <ModeToggle />
    </nav>
  );
}