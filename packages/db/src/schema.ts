import {
  pgTable, pgEnum, uuid, text, integer, timestamp, jsonb, numeric, unique,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const trackEnum = pgEnum("track", ["frontend"]);

export const sectionKindEnum = pgEnum("section_kind", [
  "concept", "why", "pattern", "tradeoff", "gotcha",
  "reading", "mini_project", "challenge", "quiz", "cheatsheet",
]);

export const progressStatusEnum = pgEnum("progress_status", [
  "not_started", "in_progress", "completed",
]);

export const noteScopeEnum = pgEnum("note_scope", ["module", "section"]);

export const modules = pgTable("modules", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  track: trackEnum("track").notNull(),
  orderIndex: integer("order_index").notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  estMinutes: integer("est_minutes").notNull(),
});

export const sections = pgTable(
  "sections",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    moduleId: uuid("module_id").notNull().references(() => modules.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    orderIndex: integer("order_index").notNull(),
    kind: sectionKindEnum("kind").notNull(),
    title: text("title").notNull(),
    bodyMdxPath: text("body_mdx_path").notNull(),
    estMinutes: integer("est_minutes").notNull(),
  },
  (t) => ({ uniqModuleSection: unique().on(t.moduleId, t.slug) }),
);

export const progress = pgTable("progress", {
  sectionId: uuid("section_id").primaryKey().references(() => sections.id, { onDelete: "cascade" }),
  status: progressStatusEnum("status").notNull().default("not_started"),
  timeSpentSec: integer("time_spent_sec").notNull().default(0),
  lastVisitedAt: timestamp("last_visited_at", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const quizAttempts = pgTable("quiz_attempts", {
  id: uuid("id").primaryKey().defaultRandom(),
  sectionId: uuid("section_id").notNull().references(() => sections.id, { onDelete: "cascade" }),
  score: numeric("score", { precision: 4, scale: 2 }).notNull(),
  answersJson: jsonb("answers_json").notNull(),
  attemptedAt: timestamp("attempted_at", { withTimezone: true }).notNull().defaultNow(),
});

export const notes = pgTable(
  "notes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    scope: noteScopeEnum("scope").notNull(),
    refId: uuid("ref_id").notNull(),
    bodyMd: text("body_md").notNull().default(""),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({ uniqScopeRef: unique().on(t.scope, t.refId) }),
);

export const modulesRelations = relations(modules, ({ many }) => ({
  sections: many(sections),
}));

export const sectionsRelations = relations(sections, ({ one, many }) => ({
  module: one(modules, { fields: [sections.moduleId], references: [modules.id] }),
  progress: one(progress, { fields: [sections.id], references: [progress.sectionId] }),
  quizAttempts: many(quizAttempts),
}));
