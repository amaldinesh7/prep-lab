import { useCallback, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/orpc";

export function useProgress(sectionId: string) {
  const queryClient = useQueryClient();
  const lastTick = useRef<number>(Date.now());

  const upsert = useMutation({
    mutationFn: (input: Parameters<typeof api.progress.upsert>[0]) =>
      api.progress.upsert(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["progress-summary"] }),
  });

  const heartbeat = useCallback(() => {
    if (document.hidden) {
      lastTick.current = Date.now();
      return;
    }
    const now = Date.now();
    const deltaSec = Math.min(60, Math.round((now - lastTick.current) / 1000));
    lastTick.current = now;
    if (deltaSec <= 0) return;
    upsert.mutate({ sectionId, status: "in_progress", timeSpentDeltaSec: deltaSec });
  }, [sectionId, upsert]);

  const markComplete = useCallback(() => {
    upsert.mutate({ sectionId, status: "completed" });
  }, [sectionId, upsert]);

  return { heartbeat, markComplete };
}
