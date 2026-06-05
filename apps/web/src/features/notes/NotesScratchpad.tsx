import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { NoteScope } from "@prep-lab/contracts";
import { api } from "../../lib/orpc";
import { useDebounced } from "./useDebounced";

export function NotesScratchpad({ scope, refId }: { scope: NoteScope; refId: string }) {
  const q = useQuery({ queryKey: ["note", scope, refId], queryFn: () => api.notes.get({ scope, refId }) });
  const m = useMutation({ mutationFn: (input: Parameters<typeof api.notes.upsert>[0]) => api.notes.upsert(input) });
  const [body, setBody] = useState("");

  useEffect(() => { setBody(q.data?.bodyMd ?? ""); }, [q.data?.bodyMd]);

  const fire = useCallback((v: string) => {
    if (v === (q.data?.bodyMd ?? "")) return;
    m.mutate({ scope, refId, bodyMd: v });
  }, [scope, refId, q.data?.bodyMd, m]);

  useDebounced(body, 800, fire);

  return (
    <textarea
      value={body}
      onChange={(e) => setBody(e.target.value)}
      placeholder="// notes"
      className="w-full min-h-[200px] border border-[var(--border)] p-3 font-mono text-[12.5px] resize-y outline-none text-[var(--text)] bg-[var(--paper)] leading-relaxed focus:border-[var(--teal)]"
    />
  );
}
