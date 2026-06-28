"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { loadBreadcrumbRoutes, type BreadcrumbRoute } from "@/lib/reader-data";

function normalizePath(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

export function ToolbarBreadcrumbs() {
  const pathname = usePathname();
  const [routes, setRoutes] = useState<BreadcrumbRoute[]>([]);
  const currentPath = normalizePath(pathname);
  const route =
    routes.find((candidate) => normalizePath(candidate.href) === currentPath) ??
    routes[0];

  useEffect(() => {
    let mounted = true;
    loadBreadcrumbRoutes()
      .then((loadedRoutes) => {
        if (mounted) setRoutes(loadedRoutes);
      })
      .catch(() => {
        if (mounted) setRoutes([]);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (!route || route.crumbs.length === 0) return null;

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
