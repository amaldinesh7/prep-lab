import { type ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { RailContext } from "./RailSlot";

export function AppShell({ children }: { children: ReactNode }) {
  const [rail, setRail] = useState<ReactNode | null>(null);
  return (
    <RailContext.Provider value={setRail}>
      <div
        className="grid min-h-screen max-w-[1500px] mx-auto"
        style={{ gridTemplateColumns: rail ? "264px 1fr 308px" : "264px 1fr" }}
      >
        <Sidebar />
        <main className="px-16 pt-12 pb-24 max-w-[860px] bg-[var(--paper)] border-r border-[var(--border)]">
          {children}
        </main>
        {rail && (
          <aside className="px-6 py-7 sticky top-0 h-screen overflow-y-auto bg-[var(--bg)] w-[308px]">{rail}</aside>
        )}
      </div>
    </RailContext.Provider>
  );
}
