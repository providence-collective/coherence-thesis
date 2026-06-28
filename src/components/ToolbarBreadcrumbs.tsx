"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { BreadcrumbRoute } from "@/lib/manuscript-data";

function normalizePath(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

export function ToolbarBreadcrumbs({
  routes,
}: {
  routes: BreadcrumbRoute[];
}) {
  const pathname = usePathname();
  const currentPath = normalizePath(pathname);
  const route =
    routes.find((candidate) => normalizePath(candidate.href) === currentPath) ??
    routes[0];

  if (!route) return null;

  return (
    <nav className="breadcrumb-trail" aria-label="Breadcrumb">
      <ol>
        {route.crumbs.map((crumb, index) => {
          const isCurrent = index === route.crumbs.length - 1;
          return (
            <li key={`${crumb.href}-${index}`}>
              {isCurrent ? (
                <span aria-current="page">{crumb.label}</span>
              ) : (
                <Link href={crumb.href}>{crumb.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
