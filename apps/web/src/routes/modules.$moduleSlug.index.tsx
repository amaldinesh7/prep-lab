import { createFileRoute, Link } from "@tanstack/react-router";
import { api } from "../lib/orpc";
import { SectionHeader } from "@prep-lab/ui";

export const Route = createFileRoute("/modules/$moduleSlug/")({
  loader: async ({ params, context }) => {
    return await context.queryClient.fetchQuery({
      queryKey: ["module", params.moduleSlug],
      queryFn: () => api.modules.get({ slug: params.moduleSlug }),
    });
  },
  component: function ModuleOverview() {
    const data = Route.useLoaderData();
    return (
      <div>
        <div className="font-mono text-[11px] text-[var(--text-faint)] uppercase tracking-widest mb-6">Module · {data.track}</div>
        <h1 className="text-[44px] font-semibold leading-[1.05] tracking-tight mb-3">{data.title}</h1>
        <p className="text-[var(--text-muted)] text-[18px] max-w-[60ch] mb-12">{data.summary}</p>
        <ol className="space-y-1">
          {data.sections.map((s, i) => (
            <li key={s.id}>
              <Link
                to="/modules/$moduleSlug/$sectionSlug"
                params={{ moduleSlug: data.slug, sectionSlug: s.slug }}
                className="block rounded-[var(--radius-md)] px-3 -mx-3 transition-colors duration-150 ease-out hover:bg-[var(--surface)]"
              >
                <SectionHeader kind={s.kind} number={i + 1} title={s.title} />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    );
  },
});
