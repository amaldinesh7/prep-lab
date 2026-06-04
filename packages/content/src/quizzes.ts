import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
  correct: string | string[];
  explanation: string;
}
export interface QuizManifest { questions: QuizQuestion[] }

export async function loadQuizForBodyPath(bodyMdxPath: string): Promise<QuizManifest | null> {
  const quizPath = bodyMdxPath.replace(/\.mdx$/, ".quiz.json");
  try {
    const raw = await readFile(join(here, quizPath), "utf8");
    return JSON.parse(raw) as QuizManifest;
  } catch { return null; }
}
