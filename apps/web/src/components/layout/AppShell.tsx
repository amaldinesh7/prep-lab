import { type ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { RailContext } from "./RailSlot";
import { DefaultRail } from "./DefaultRail";

export function AppShell({ children }: { children: ReactNode }) {
  const [rail, setRail] = useState<ReactNode | null>(null);
  return (
    <RailContext.Provider value={setRail}>
      <div
        className="
          grid min-h-screen mx-auto
          max-w-[1500px] 2xl:max-w-[1700px] 3xl:max-w-[1880px]
          grid-cols-[264px_minmax(0,1fr)]
          xl:grid-cols-[264px_minmax(0,1fr)_308px]
          2xl:grid-cols-[280px_minmax(0,1fr)_336px]
          3xl:grid-cols-[304px_minmax(0,1fr)_360px]
        "
      >
        <Sidebar />
        <main className="bg-[var(--paper)] xl:border-r xl:border-[var(--border)] min-w-0">
          <div className="mx-auto w-full max-w-[720px] 2xl:max-w-[760px] 3xl:max-w-[800px] px-12 2xl:px-16 3xl:px-20 pt-12 2xl:pt-16 pb-24">
            {children}
          </div>
        </main>
        <aside className="hidden xl:block sticky top-0 h-screen overflow-y-auto bg-[var(--bg)] px-6 2xl:px-7 3xl:px-8 py-7 2xl:py-8">
          {rail ?? <DefaultRail />}
        </aside>
      </div>
    </RailContext.Provider>
  );
}
