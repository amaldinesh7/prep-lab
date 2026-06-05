import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <div style={{ padding: 24 }}>prep-lab — hello</div>,
});
