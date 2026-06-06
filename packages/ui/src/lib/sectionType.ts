import type { SectionKind } from "@prep-lab/contracts";

export interface SectionTypeStyle {
  label: string;
  numChip: string;
  typeText: string;
  bar: string;
  headingBar: string;
  dot: string;
  accentVar: string;
}

export const sectionTypeStyles: Record<SectionKind, SectionTypeStyle> = {
  concept: {
    label: "Concept",
    numChip: "bg-[var(--surface)] text-[var(--text)] border-[var(--border)]",
    typeText: "text-[var(--text-faint)]",
    bar: "bg-[var(--border-strong)]",
    headingBar: "border-[var(--text-muted)]",
    dot: "bg-[var(--text-muted)]",
    accentVar: "--text-muted",
  },
  why: {
    label: "Why",
    numChip: "bg-[var(--teal-bg)] text-[var(--teal)] border-[var(--teal-soft)]",
    typeText: "text-[var(--teal)]",
    bar: "bg-[var(--teal-soft)]",
    headingBar: "border-[var(--teal)]",
    dot: "bg-[var(--teal)]",
    accentVar: "--teal",
  },
  pattern: {
    label: "Production pattern",
    numChip: "bg-[var(--teal-bg)] text-[var(--teal)] border-[var(--teal-soft)]",
    typeText: "text-[var(--teal)]",
    bar: "bg-[var(--teal-soft)]",
    headingBar: "border-[var(--teal)]",
    dot: "bg-[var(--teal)]",
    accentVar: "--teal",
  },
  tradeoff: {
    label: "Tradeoff",
    numChip: "bg-[var(--amber-bg)] text-[var(--amber)] border-[var(--amber-soft)]",
    typeText: "text-[var(--amber)]",
    bar: "bg-[var(--amber-soft)]",
    headingBar: "border-[var(--amber)]",
    dot: "bg-[var(--amber)]",
    accentVar: "--amber",
  },
  gotcha: {
    label: "Gotcha",
    numChip: "bg-[var(--rose-bg)] text-[var(--rose)] border-[var(--rose-soft)]",
    typeText: "text-[var(--rose)]",
    bar: "bg-[var(--rose-soft)]",
    headingBar: "border-[var(--rose)]",
    dot: "bg-[var(--rose)]",
    accentVar: "--rose",
  },
  reading: {
    label: "Readings",
    numChip: "bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)]",
    typeText: "text-[var(--text-muted)]",
    bar: "bg-[var(--border-strong)]",
    headingBar: "border-[var(--text-muted)]",
    dot: "bg-[var(--text-muted)]",
    accentVar: "--text-muted",
  },
  mini_project: {
    label: "Mini-project",
    numChip: "bg-[var(--emerald-bg)] text-[var(--emerald)] border-[var(--emerald-soft)]",
    typeText: "text-[var(--emerald)]",
    bar: "bg-[var(--emerald-soft)]",
    headingBar: "border-[var(--emerald)]",
    dot: "bg-[var(--emerald)]",
    accentVar: "--emerald",
  },
  challenge: {
    label: "Challenge",
    numChip: "bg-[var(--emerald-bg)] text-[var(--emerald)] border-[var(--emerald-soft)]",
    typeText: "text-[var(--emerald)]",
    bar: "bg-[var(--emerald-soft)]",
    headingBar: "border-[var(--emerald)]",
    dot: "bg-[var(--emerald)]",
    accentVar: "--emerald",
  },
  quiz: {
    label: "Self-check",
    numChip: "bg-[var(--indigo-bg)] text-[var(--indigo)] border-[var(--indigo-soft)]",
    typeText: "text-[var(--indigo)]",
    bar: "bg-[var(--indigo-soft)]",
    headingBar: "border-[var(--indigo)]",
    dot: "bg-[var(--indigo)]",
    accentVar: "--indigo",
  },
  cheatsheet: {
    label: "Cheatsheet",
    numChip: "bg-[var(--violet-bg)] text-[var(--violet)] border-[var(--violet-soft)]",
    typeText: "text-[var(--violet)]",
    bar: "bg-[var(--violet-soft)]",
    headingBar: "border-[var(--violet)]",
    dot: "bg-[var(--violet)]",
    accentVar: "--violet",
  },
};
