import { createFileRoute } from "@tanstack/react-router";
import { ValkompassKarlstad } from "@/components/valkompass";
import { META_ES } from "@/lib/valkompass/ui-es";
import type { Sok } from "@/components/valkompass";

export const Route = createFileRoute("/es")({
  validateSearch: (search: Record<string, unknown>): Sok => ({
    vy: search.vy === "metod" ? "metod" : undefined,
    fran: search.fran === "resultat" ? "resultat" : undefined,
  }),
  head: () => ({
    meta: [
      { title: META_ES.title },
      { name: "description", content: META_ES.description },
    ],
  }),
  component: EsHome,
});

function EsHome() {
  const sok = Route.useSearch();
  return <ValkompassKarlstad sprak="es" bas="/es" sok={sok} />;
}
