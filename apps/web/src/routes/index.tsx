import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/orpc";

export const Route = createFileRoute("/")({
  component: function Home() {
    const q = useQuery({ queryKey: ["modules"], queryFn: () => api.modules.list({}) });
    if (q.isLoading) return <p>Loading…</p>;
    if (q.error) return <pre style={{ color: "red" }}>{String(q.error)}</pre>;
    return <ul>{q.data!.map((m) => <li key={m.id}>{m.title}</li>)}</ul>;
  },
});
