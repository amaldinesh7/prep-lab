import { run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import { mdxComponents } from "./mdxComponents";

interface Props { compiled: string }

export function MdxRenderer({ compiled }: Props) {
  const [Comp, setComp] = useState<React.ComponentType | null>(null);
  useEffect(() => {
    let alive = true;
    (async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mod = await run(compiled, { ...(runtime as any), baseUrl: import.meta.url });
      if (alive) setComp(() => mod.default);
    })();
    return () => { alive = false; };
  }, [compiled]);
  if (!Comp) return <p className="text-[var(--text-faint)]">Loading…</p>;
  return <MDXProvider components={mdxComponents as unknown as React.ComponentProps<typeof MDXProvider>["components"]}><Comp /></MDXProvider>;
}
