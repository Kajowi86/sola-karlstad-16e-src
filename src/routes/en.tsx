import { createFileRoute } from "@tanstack/react-router";
import { ValkompassKarlstad } from "@/components/valkompass";
import { META_EN } from "@/lib/valkompass/ui-en";
import type { Sok } from "@/components/valkompass";

export const Route = createFileRoute("/en")({
  validateSearch: (search: Record<string, unknown>): Sok => ({
    vy: search.vy === "metod" ? "metod" : undefined,
    fran: search.fran === "resultat" ? "resultat" : undefined,
  }),
  head: () => ({
    meta: [
      { title: META_EN.title },
      { name: "description", content: META_EN.description },
    ],
  }),
  component: EnHome,
});

function EnHome() {
  const sok = Route.useSearch();
  return <ValkompassKarlstad sprak="en" bas="/en" sok={sok} />;
}
