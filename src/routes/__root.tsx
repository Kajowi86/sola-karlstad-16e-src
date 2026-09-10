import { createRootRoute, HeadContent, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

const APP_NAME = "Valkompass Karlstad";
const APP_DESC =
  "Valkompass för kommunvalet i Karlstad den 13 september 2026. Allt räknas i din webbläsare. Inga svar sparas.";

const SHARED_META = [
  { charSet: "utf-8" as const },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { name: "theme-color", content: "#8FB8DC" },
];

const SHARED_LINKS = [
  { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
  { rel: "stylesheet", href: appCss },
  { rel: "manifest", href: "/__grok/manifest.webmanifest" },
  { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
];

export const Route = createRootRoute({
  head: ({ matches }) => {
    const lokaliserad = matches.some((m) => m.pathname === "/es" || m.pathname === "/en");
    return {
      meta: lokaliserad
        ? SHARED_META
        : [
            ...SHARED_META,
            { title: APP_NAME },
            { name: "description", content: APP_DESC },
          ],
      links: SHARED_LINKS,
    };
  },
  component: RootDocument,
});

function RootDocument() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lang = pathname === "/es" ? "es" : pathname === "/en" ? "en" : "sv";
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
