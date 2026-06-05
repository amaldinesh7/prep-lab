import { ExternalLink } from "lucide-react";

type Kind = "blog" | "paper" | "video" | "docs";

export function Reading({ url, title, author, kind, minutes }: { url: string; title: string; author?: string; kind: Kind; minutes: number }) {
  return (
    <a href={url} target="_blank" rel="noreferrer"
       className="grid grid-cols-[28px_1fr_auto] gap-4 items-baseline py-3.5 border-b border-[var(--border)] first:border-t hover:bg-[var(--surface)] hover:-mx-4 hover:px-4">
      <span className="font-mono text-[11px] text-[var(--text-faint)]">›</span>
      <span>
        <div className="font-medium text-[14.5px] leading-snug">{title}</div>
        {author && <div className="text-[12.5px] text-[var(--text-muted)] italic">{author}</div>}
      </span>
      <span className="font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-wider text-right">
        {kind}<br/>{minutes} MIN
        <ExternalLink className="inline-block ml-1 w-3 h-3" />
      </span>
    </a>
  );
}
