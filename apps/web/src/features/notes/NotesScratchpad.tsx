import type { NoteScope } from "@prep-lab/contracts";

export function NotesScratchpad({ scope, refId }: { scope: NoteScope; refId: string }) {
  return (
    <textarea
      readOnly
      placeholder="// notes (impl in Task 28)"
      data-scope={scope}
      data-ref-id={refId}
      className="w-full min-h-[200px] border border-[var(--border)] p-3 font-mono text-[12.5px] text-[var(--text)] bg-[var(--paper)]"
    />
  );
}
