import { useCallback } from "react";

export function useProgress(_sectionId: string) {
  const heartbeat = useCallback(() => { /* implemented in Task 27 */ }, []);
  const markComplete = useCallback(() => { /* implemented in Task 27 */ }, []);
  return { heartbeat, markComplete };
}
