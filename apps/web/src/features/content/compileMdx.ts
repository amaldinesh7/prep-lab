import { compile } from "@mdx-js/mdx";

export async function compileMdx(source: string): Promise<string> {
  const v = await compile(source, {
    outputFormat: "function-body",
    development: false,
    providerImportSource: "@mdx-js/react",
  });
  return String(v);
}
