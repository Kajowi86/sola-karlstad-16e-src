import { createFileRoute } from "@tanstack/react-router";
import { ValkompassKarlstad } from "@/components/valkompass";
import type { SvarMap } from "@/lib/valkompass/berakning";
import type { Sok } from "@/components/valkompass";

declare module "@tanstack/history" {
  interface HistoryState {
    vkSvar?: SvarMap;
    vkViktiga?: number[];
    vkFSvar?: SvarMap;
  }
}

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): Sok => ({
    vy: search.vy === "metod" ? "metod" : undefined,
    fran: search.fran === "resultat" ? "resultat" : undefined,
  }),
  component: Home,
});

function Home() {
  const sok = Route.useSearch();
  return <ValkompassKarlstad sprak="sv" bas="/" sok={sok} />;
}
