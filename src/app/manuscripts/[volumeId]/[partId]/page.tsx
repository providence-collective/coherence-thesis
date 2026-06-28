import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalog, partById, sectionsForPart } from "@/lib/manuscript-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return catalog.volumes.flatMap((volume) =>
    volume.parts.map((part) => ({
      volumeId: volume.volumeId,
      partId: part.partId,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ volumeId: string; partId: string }>;
}): Promise<Metadata> {
  const { volumeId, partId } = await params;
  const part = partById(volumeId, partId);
  return {
    title: part?.title ?? "Part",
    description: part ? `${part.title} in The Coherence Thesis.` : undefined,
  };
}

export default async function PartPage({
  params,
}: {
  params: Promise<{ volumeId: string; partId: string }>;
}) {
  const { volumeId, partId } = await params;
  const part = partById(volumeId, partId);
  if (!part) notFound();
  const sections = sectionsForPart(volumeId, partId);

  return (
    <div className="page-frame">
      <header className="page-heading">
        <p className="eyebrow">Part {part.order || "0"}</p>
        <h1>{part.title}</h1>
        <p>{part.wordCount.toLocaleString()} words across {part.chapters.length} chapters.</p>
      </header>
      <section className="chapter-list">
        {part.chapters.map((chapter) => (
          <Link key={chapter.chapterId} href={chapter.href} className="chapter-card">
            <span>{String(chapter.order).padStart(2, "0")}</span>
            <strong>{chapter.title}</strong>
            <small>{chapter.wordCount.toLocaleString()} words</small>
          </Link>
        ))}
      </section>
      <section className="section-index">
        <h2>Sections</h2>
        {sections.map((section) => (
          <Link key={section.sectionId} href={section.href}>
            {section.title}
          </Link>
        ))}
      </section>
    </div>
  );
}
