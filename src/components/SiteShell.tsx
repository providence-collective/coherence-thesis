import Link from "next/link";
import type { ReactNode } from "react";
import { BookOpen, ListTree } from "lucide-react";
import { ToolbarBreadcrumbs } from "@/components/ToolbarBreadcrumbs";
import { ToolbarProgressIsland } from "@/components/ToolbarProgressIsland";
import { breadcrumbRoutes, catalog, progressSections } from "@/lib/manuscript-data";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="site-header">
        <Link href="/" className="brand-mark" aria-label="The Coherence Thesis home">
          <span className="brand-kicker">The Coherence Thesis</span>
          <span className="brand-title">Providence Imperative</span>
        </Link>
        <ToolbarBreadcrumbs routes={breadcrumbRoutes()} />
        <nav className="site-nav" aria-label="Primary">
          <Link href="/overview/">
            <ListTree aria-hidden="true" size={17} />
            Overview
          </Link>
          <Link href={catalog.volumes[0]?.href ?? "/manuscripts/providence-imperative/"}>
            <BookOpen aria-hidden="true" size={17} />
            Manuscript
          </Link>
          <ToolbarProgressIsland allSections={progressSections()} />
        </nav>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <p>
          Canonical text lives in this repository. Reader progress stays on this
          device.
        </p>
      </footer>
    </div>
  );
}
