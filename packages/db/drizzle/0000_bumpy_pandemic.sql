CREATE TYPE "public"."note_scope" AS ENUM('module', 'section');--> statement-breakpoint
CREATE TYPE "public"."progress_status" AS ENUM('not_started', 'in_progress', 'completed');--> statement-breakpoint
CREATE TYPE "public"."section_kind" AS ENUM('concept', 'why', 'pattern', 'tradeoff', 'gotcha', 'reading', 'mini_project', 'challenge', 'quiz', 'cheatsheet');--> statement-breakpoint
CREATE TYPE "public"."track" AS ENUM('frontend');--> statement-breakpoint
CREATE TABLE "modules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"track" "track" NOT NULL,
	"order_index" integer NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"est_minutes" integer NOT NULL,
	CONSTRAINT "modules_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"scope" "note_scope" NOT NULL,
	"ref_id" uuid NOT NULL,
	"body_md" text DEFAULT '' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "notes_scope_ref_id_unique" UNIQUE("scope","ref_id")
);
--> statement-breakpoint
CREATE TABLE "progress" (
	"section_id" uuid PRIMARY KEY NOT NULL,
	"status" "progress_status" DEFAULT 'not_started' NOT NULL,
	"time_spent_sec" integer DEFAULT 0 NOT NULL,
	"last_visited_at" timestamp with time zone,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "quiz_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"section_id" uuid NOT NULL,
	"score" numeric(4, 2) NOT NULL,
	"answers_json" jsonb NOT NULL,
	"attempted_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"module_id" uuid NOT NULL,
	"slug" text NOT NULL,
	"order_index" integer NOT NULL,
	"kind" "section_kind" NOT NULL,
	"title" text NOT NULL,
	"body_mdx_path" text NOT NULL,
	"est_minutes" integer NOT NULL,
	CONSTRAINT "sections_module_id_slug_unique" UNIQUE("module_id","slug")
);
--> statement-breakpoint
ALTER TABLE "progress" ADD CONSTRAINT "progress_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sections" ADD CONSTRAINT "sections_module_id_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."modules"("id") ON DELETE cascade ON UPDATE no action;