import Link from "next/link";
import type { Section } from "@/lib/manuscript-data";

export function ManuscriptNavigation({
  previous,
  next,
}: {
  previous?: Section | null;
  next?: Section | null;
}) {
  return (
    <nav className="section-nav" aria-label="Section navigation">
      {previous ? <Link href={previous.href}>Previous: {previous.title}</Link> : <span />}
      {next ? <Link href={next.href}>Next: {next.title}</Link> : <span />}
    </nav>
  );
}
