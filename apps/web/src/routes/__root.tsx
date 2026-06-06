import { Link, Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { AppShell } from "../components/layout/AppShell";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
  notFoundComponent: () => (
    <div className="max-w-[60ch]">
      <div className="font-mono text-[11px] text-[var(--text-faint)] uppercase tracking-widest mb-3">404 · not found</div>
      <h1 className="text-[40px] font-semibold tracking-tight mb-3">Page not found</h1>
      <p className="text-[var(--text-muted)] text-[16px] mb-8">
        The section, module, or page you're looking for doesn't exist.
      </p>
      <Link
        to="/modules"
        className="inline-block border border-[var(--border)] bg-[var(--paper)] px-4 py-2 font-mono text-[11px] uppercase tracking-widest hover:border-[var(--border-strong)] hover:bg-[var(--surface)]"
      >
        → Browse all modules
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="max-w-[60ch]">
      <div className="font-mono text-[11px] text-[var(--rose)] uppercase tracking-widest mb-3">Error</div>
      <h1 className="text-[40px] font-semibold tracking-tight mb-3">Something broke</h1>
      <p className="text-[var(--text-muted)] text-[16px] mb-2">An unexpected error stopped this page from loading.</p>
      <pre className="font-mono text-[12.5px] text-[var(--text-muted)] bg-[var(--surface)] border border-[var(--border)] px-3 py-2 mb-6 whitespace-pre-wrap">
        {error instanceof Error ? error.message : String(error)}
      </pre>
      <button
        onClick={reset}
        className="border border-[var(--border)] bg-[var(--paper)] px-4 py-2 font-mono text-[11px] uppercase tracking-widest cursor-pointer hover:border-[var(--border-strong)] hover:bg-[var(--surface)]"
      >
        Try again
      </button>
    </div>
  ),
});
