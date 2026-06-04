import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

export async function loadSectionBody(relPath: string): Promise<string> {
  const absolute = join(here, relPath);
  return await readFile(absolute, "utf8");
}
