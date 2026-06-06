import { createFileRoute, notFound } from "@tanstack/react-router";
import { isDefinedError, ORPCError } from "@orpc/client";
import { api } from "../lib/orpc";
import { SectionView } from "../features/section/SectionView";

export const Route = createFileRoute("/modules/$moduleSlug/$sectionSlug")({
  loader: async ({ params, context }) => {
    try {
      const data = await context.queryClient.fetchQuery({
        queryKey: ["section", params.moduleSlug, params.sectionSlug],
        queryFn: () => api.sections.get({ moduleSlug: params.moduleSlug, sectionSlug: params.sectionSlug }),
      });
      if (!data) throw notFound();
      return data;
    } catch (err) {
      if ((err instanceof ORPCError && err.code === "NOT_FOUND") || isDefinedError(err)) {
        throw notFound();
      }
      throw err;
    }
  },
  component: function SectionPage() {
    const data = Route.useLoaderData();
    const { moduleSlug } = Route.useParams();
    return <SectionView moduleSlug={moduleSlug} data={data} />;
  },
});
