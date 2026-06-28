import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { catalog, sectionById, toProgressSection } from "@/lib/manuscript-data";
import { ReadCheckmarkIsland } from "@/components/ReadCheckmarkIsland";

export function OverviewMap() {
  return (
    <section className="overview-map" aria-label="Five minute overview">
      {catalog.overview.nodes.map((node, index) => {
        const nodeSections = node.references.flatMap((reference) => {
          const section = sectionById(reference.sectionId);
          return section ? [toProgressSection(section)] : [];
        });

        return (
          <details key={node.id} className="overview-node" open={index < 3}>
            <summary>
              <span className="overview-node-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <strong>{node.title}</strong>
              <span className="overview-node-actions">
                <ReadCheckmarkIsland sections={nodeSections} />
                <ChevronRight
                  aria-hidden="true"
                  className="overview-chevron"
                  size={18}
                />
              </span>
            </summary>
            <p>{node.summary}</p>
            <div className="reference-grid">
              {node.references.map((reference) => {
                const section = sectionById(reference.sectionId);
                if (!section) return null;
                return (
                  <Link key={reference.sectionId} href={section.href}>
                    <span>{reference.label ?? section.title}</span>
                    <ReadCheckmarkIsland sections={[toProgressSection(section)]} />
                  </Link>
                );
              })}
            </div>
          </details>
        );
      })}
    </section>
  );
}
