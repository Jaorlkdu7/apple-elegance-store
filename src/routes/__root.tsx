import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "iPhones Premium — Loja oficial de iPhones novos e seminovos" },
      { name: "description", content: "Compre iPhones novos e seminovos com garantia, parcelamento em 12x, PIX e entrega para todo o Brasil. Procedência comprovada." },
      { name: "author", content: "iPhones Premium" },
      { property: "og:title", content: "iPhones Premium — Loja oficial de iPhones novos e seminovos" },
      { property: "og:description", content: "Compre iPhones novos e seminovos com garantia, parcelamento em 12x, PIX e entrega para todo o Brasil. Procedência comprovada." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "iPhones Premium — Loja oficial de iPhones novos e seminovos" },
      { name: "twitter:description", content: "Compre iPhones novos e seminovos com garantia, parcelamento em 12x, PIX e entrega para todo o Brasil. Procedência comprovada." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6b6ac496-8eb9-4db6-a05d-fa5032d07a8f/id-preview-9c141986--07105013-06ae-4fe0-89d0-38a188c9eb1d.lovable.app-1777508789321.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6b6ac496-8eb9-4db6-a05d-fa5032d07a8f/id-preview-9c141986--07105013-06ae-4fe0-89d0-38a188c9eb1d.lovable.app-1777508789321.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster position="top-right" richColors />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
