import {
  Callout, Code, Reading, ProjectCard, Cheatsheet, CodePlayground, SectionHeader,
} from "@prep-lab/ui";

export const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-[44px] font-semibold leading-[1.05] tracking-tight mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-[26px] font-semibold mt-10 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 max-w-[64ch]" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 mb-4 max-w-[64ch] text-[var(--text-muted)]" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-[var(--hover)] border border-[var(--border)] px-1.5 py-0.5 text-[0.88em]" {...props} />
  ),
  // custom
  Callout,
  Code,
  Reading,
  ProjectCard,
  Cheatsheet,
  CodePlayground,
  SectionHeader,
};
