import { createContext, useContext, useEffect, type Dispatch, type ReactNode, type SetStateAction } from "react";

export const RailContext = createContext<Dispatch<SetStateAction<ReactNode | null>> | null>(null);

export function useRailSlot(node: ReactNode) {
  const setRail = useContext(RailContext);
  useEffect(() => {
    if (!setRail) return;
    setRail(node);
    return () => setRail(null);
  }, [setRail, node]);
}
