import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../lib/orpc";

export const Route = createFileRoute("/notes")({
  component: function NotesSearch() {
    const [q, setQ] = useState("");
    const r = useQuery({ queryKey: ["notes", q], enabled: q.length > 0, queryFn: () => api.notes.search({ q }) });
    return (
      <div>
        <h1 className="text-[40px] font-semibold tracking-tight mb-6">Notes</h1>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search..."
          className="w-full max-w-[60ch] border border-[var(--border)] p-3 mb-6 font-mono text-[14px]"
        />
        <ul className="space-y-3">
          {r.data?.map((n) => (
            <li key={n.id} className="border border-[var(--border)] p-4 max-w-[64ch]">
              <div className="font-mono text-[11px] text-[var(--text-faint)] uppercase tracking-wider mb-2">{n.scope} · {n.refId.slice(0,8)}</div>
              <pre className="text-[13px] whitespace-pre-wrap">{n.bodyMd}</pre>
            </li>
          ))}
        </ul>
      </div>
    );
  },
});
