import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { catalog, sectionById } from "@/lib/manuscript-data";

export function OverviewMap() {
  return (
    <section className="overview-map" aria-label="Five minute overview">
      {catalog.overview.nodes.map((node, index) => (
        <details key={node.id} className="overview-node" open={index < 3}>
          <summary>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{node.title}</strong>
            <ChevronRight aria-hidden="true" size={18} />
          </summary>
          <p>{node.summary}</p>
          <div className="reference-grid">
            {node.references.map((reference) => {
              const section = sectionById(reference.sectionId);
              if (!section) return null;
              return (
                <Link key={reference.sectionId} href={section.href}>
                  {reference.label ?? section.title}
                </Link>
              );
            })}
          </div>
        </details>
      ))}
    </section>
  );
}
