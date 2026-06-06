import { createContext, useContext, useEffect, useRef, type Dispatch, type ReactNode, type SetStateAction } from "react";

export const RailContext = createContext<Dispatch<SetStateAction<ReactNode | null>> | null>(null);

/**
 * Mount a node into the shell's right rail. The node identity changes every parent render
 * (it's JSX), so we keep it in a ref and only push updates after commit — never clearing
 * mid-render. The rail is cleared once on unmount.
 */
export function useRailSlot(node: ReactNode) {
  const setRail = useContext(RailContext);
  const nodeRef = useRef<ReactNode>(node);
  nodeRef.current = node;

  // Sync the latest node to the rail after every commit. Because we don't depend on `node`,
  // we don't trigger a setRail(null) -> setRail(node) flash between renders.
  useEffect(() => {
    if (!setRail) return;
    setRail(nodeRef.current);
  });

  // Clear on unmount only.
  useEffect(() => {
    if (!setRail) return;
    return () => setRail(null);
  }, [setRail]);
}
