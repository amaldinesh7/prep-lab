import { createContext, useContext } from "react";
import {
  Callout, Code, Reading, ProjectCard, Cheatsheet, CodePlayground, SectionHeader,
  Quiz, type QuizProps,
} from "@prep-lab/ui";

interface QuizCtx {
  sectionId: string;
  questions: { id: string; prompt: string; options: { id: string; label: string }[] }[];
  onSubmit: QuizProps["onSubmit"];
}
export const QuizContext = createContext<QuizCtx | null>(null);

function QuizSlot() {
  const ctx = useContext(QuizContext);
  if (!ctx) {
    return <div className="text-[var(--text-faint)] text-[13px]">(no quiz for this section)</div>;
  }
  return <Quiz {...ctx} />;
}

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
  QuizSlot,
};
