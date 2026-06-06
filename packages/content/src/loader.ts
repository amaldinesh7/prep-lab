import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

// Strip leading YAML frontmatter (--- ... ---) so it doesn't render as a paragraph.
// We avoid adding remark-frontmatter as a runtime dep since the format is fixed.
const FRONTMATTER_RE = /^---\r?\n[\s\S]*?\r?\n---\r?\n/;

export async function loadSectionBody(relPath: string): Promise<string> {
  const absolute = join(here, relPath);
  const raw = await readFile(absolute, "utf8");
  return raw.replace(FRONTMATTER_RE, "").trimStart();
}
