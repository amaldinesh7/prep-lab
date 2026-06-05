import { createFileRoute, notFound } from "@tanstack/react-router";
import { api } from "../lib/orpc";
import { SectionView } from "../features/section/SectionView";

export const Route = createFileRoute("/modules/$moduleSlug/$sectionSlug")({
  loader: async ({ params, context }) => {
    const data = await context.queryClient.fetchQuery({
      queryKey: ["section", params.moduleSlug, params.sectionSlug],
      queryFn: () => api.sections.get({ moduleSlug: params.moduleSlug, sectionSlug: params.sectionSlug }),
    });
    if (!data) throw notFound();
    return data;
  },
  component: function SectionPage() {
    const data = Route.useLoaderData();
    const { moduleSlug } = Route.useParams();
    return <SectionView moduleSlug={moduleSlug} data={data} />;
  },
});
