"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

function normalizePath(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

export function MobileHomeLinkIsland() {
  const pathname = usePathname();
  if (normalizePath(pathname) === "/") return null;

  return (
    <div className="mobile-home-menu">
      <Link className="mobile-home-link" href="/" aria-label="Home">
        <Home aria-hidden="true" size={22} strokeWidth={2.1} />
        <span className="nav-label">Home</span>
      </Link>
    </div>
  );
}
