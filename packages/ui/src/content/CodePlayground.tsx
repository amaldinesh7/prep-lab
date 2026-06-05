import { Sandpack } from "@codesandbox/sandpack-react";

export interface CodePlaygroundProps {
  template?: "react-ts" | "vanilla-ts";
  files: Record<string, string>;
  height?: number;
}

export function CodePlayground({ template = "react-ts", files, height = 360 }: CodePlaygroundProps) {
  return (
    <div className="my-5 max-w-[64ch] border border-[var(--border)]">
      <Sandpack
        template={template}
        files={files}
        theme={{
          colors: {
            surface1: "var(--surface)",
            surface2: "var(--paper)",
            surface3: "var(--hover)",
            clickable: "var(--text-muted)",
            base: "var(--text)",
            disabled: "var(--text-faint)",
            hover: "var(--text)",
            accent: "var(--teal)",
          },
          syntax: {
            plain: "var(--text)",
            comment: { color: "var(--text-faint)", fontStyle: "italic" },
            keyword: "var(--rose)",
            tag: "var(--violet)",
            punctuation: "var(--text-muted)",
            definition: "var(--violet)",
            property: "var(--violet)",
            static: "var(--emerald)",
            string: "var(--emerald)",
          },
          font: {
            body: '"Geist", sans-serif',
            mono: '"Geist Mono", monospace',
            size: "13px",
            lineHeight: "1.5",
          },
        }}
        options={{ editorHeight: height, showLineNumbers: true, showTabs: true, showInlineErrors: true }}
      />
    </div>
  );
}
