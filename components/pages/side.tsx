export function SidePage({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {children}
    </div>
  );
}
