"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Home, ListTree, Search } from "lucide-react";
import type { ToolbarOutline } from "@/lib/manuscript-data";

function normalizePath(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

function searchable(value: string): string {
  return value.trim().toLowerCase();
}

function matchesQuery(values: string[], query: string): boolean {
  if (!query) return true;
  return values.some((value) => searchable(value).includes(query));
}

export function OutlineMenuIsland({ outline }: { outline: ToolbarOutline }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const currentPath = normalizePath(pathname);
  const normalizedQuery = searchable(query);

  const topLinks = useMemo(
    () =>
      [
        {
          title: outline.home.title,
          href: outline.home.href,
          detail: "Home",
        },
        {
          title: outline.overview.title,
          href: outline.overview.href,
          detail: "Overview",
        },
      ].filter((item) => matchesQuery([item.title, item.detail], normalizedQuery)),
    [normalizedQuery, outline.home, outline.overview],
  );

  const volumes = useMemo(
    () =>
      outline.volumes
        .map((volume) => {
          const volumeMatches = matchesQuery(
            [volume.title, volume.subtitle, volume.numberLabel],
            normalizedQuery,
          );
          const subsections = volume.subsections.filter((subsection) =>
            matchesQuery([subsection.title], normalizedQuery),
          );
          return {
            ...volume,
            subsections: volumeMatches || !normalizedQuery ? volume.subsections : subsections,
            visible: volumeMatches || subsections.length > 0 || !normalizedQuery,
          };
        })
        .filter((volume) => volume.visible),
    [normalizedQuery, outline.volumes],
  );

  const hasResults = topLinks.length > 0 || volumes.length > 0;

  useEffect(() => {
    const closeTimer = window.setTimeout(() => {
      setOpen(false);
      setQuery("");
    }, 0);
    return () => window.clearTimeout(closeTimer);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const focusTimer = window.setTimeout(() => searchRef.current?.focus(), 0);
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="outline-menu" ref={containerRef}>
      <button
        type="button"
        className="outline-menu-button"
        aria-expanded={open}
        aria-controls="site-outline-menu"
        onClick={() => setOpen((current) => !current)}
      >
        <ListTree aria-hidden="true" size={17} />
        <span className="nav-label">Outline</span>
        <ChevronDown aria-hidden="true" size={16} />
      </button>
      {open && (
        <section
          id="site-outline-menu"
          className="outline-popover"
          aria-label="Site outline"
        >
          <label className="outline-search">
            <Search aria-hidden="true" size={16} />
            <span className="sr-only">Filter outline</span>
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search outline"
              autoComplete="off"
            />
          </label>
          <div className="outline-scroll">
            {topLinks.length > 0 && (
              <div className="outline-section">
                <p className="eyebrow">Start</p>
                <div className="outline-top-links">
                  {topLinks.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      aria-current={normalizePath(item.href) === currentPath ? "page" : undefined}
                    >
                      <Home aria-hidden="true" size={16} />
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.detail}</small>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
            {volumes.length > 0 && (
              <div className="outline-section">
                <p className="eyebrow">Manuscripts</p>
                <div className="outline-volume-list">
                  {volumes.map((volume) => (
                    <article className="outline-volume" key={volume.href}>
                      <a
                        className="outline-volume-link"
                        href={volume.href}
                        aria-current={normalizePath(volume.href) === currentPath ? "page" : undefined}
                      >
                        <span className="outline-volume-number">{volume.numberLabel}</span>
                        <span>
                          <strong>{volume.title}</strong>
                          <small>{volume.wordCount.toLocaleString()} words</small>
                        </span>
                      </a>
                      {volume.subsections.length > 0 && (
                        <div className="outline-subsections">
                          {volume.subsections.map((subsection) => (
                            <a
                              key={subsection.href}
                              href={subsection.href}
                              aria-current={
                                normalizePath(subsection.href) === currentPath
                                  ? "page"
                                  : undefined
                              }
                            >
                              <span>{subsection.title}</span>
                              <small>{subsection.wordCount.toLocaleString()} words</small>
                            </a>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            )}
            {!hasResults && (
              <p className="quiet-copy outline-empty">No outline matches.</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
