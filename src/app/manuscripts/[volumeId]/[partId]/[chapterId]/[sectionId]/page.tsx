import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/MarkdownBody";
import { ManuscriptNavigation } from "@/components/ManuscriptNavigation";
import { SectionRevisionNotice } from "@/components/SectionRevisionNotice";
import {
  routeParams,
  sectionById,
  sectionByRouteOrAlias,
  toProgressSection,
} from "@/lib/manuscript-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return routeParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    volumeId: string;
    partId: string;
    chapterId: string;
    sectionId: string;
  }>;
}): Promise<Metadata> {
  const { volumeId, partId, chapterId, sectionId } = await params;
  const resolved = sectionByRouteOrAlias(volumeId, partId, chapterId, sectionId);
  const section = resolved?.section;
  return {
    title: section?.title ?? "Section",
    description: section?.text.slice(0, 155),
    alternates: section ? { canonical: section.href } : undefined,
  };
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{
    volumeId: string;
    partId: string;
    chapterId: string;
    sectionId: string;
  }>;
}) {
  const { volumeId, partId, chapterId, sectionId } = await params;
  const resolved = sectionByRouteOrAlias(volumeId, partId, chapterId, sectionId);
  if (!resolved) notFound();
  const { section, alias } = resolved;
  const previous = section.previousSectionId ? sectionById(section.previousSectionId) : null;
  const next = section.nextSectionId ? sectionById(section.nextSectionId) : null;

  return (
    <div className="page-frame reader-layout">
      <article className="reader-main">
        <header className="manuscript-heading">
          <p className="eyebrow">
            {section.volumeTitle} / {section.partTitle} / {section.chapterTitle}
          </p>
          <h1>{section.title}</h1>
          <p>
            {section.wordCount.toLocaleString()} words, about {section.readingMinutes} minute
            {section.readingMinutes === 1 ? "" : "s"}.
          </p>
        </header>
        {alias && (
          <aside className="revision-notice" aria-label="Section alias notice">
            <span>This older link now opens the current section.</span>
            <a href={section.href}>Use the canonical link</a>
          </aside>
        )}
        <SectionRevisionNotice section={toProgressSection(section)} />
        <MarkdownBody markdown={section.body} paragraphs={section.paragraphs} />
        <ManuscriptNavigation previous={previous} next={next} />
      </article>
    </div>
  );
}
