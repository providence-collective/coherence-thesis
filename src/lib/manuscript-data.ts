import catalogJson from "@/generated/manuscripts/catalog.json";

export type Catalog = typeof catalogJson;
export type Section = Catalog["sections"][number];
export type Volume = Catalog["volumes"][number];
export type Part = Volume["parts"][number];
export type Chapter = Part["chapters"][number];
export type ProgressSection = Pick<
  Section,
  "sectionId" | "contentHash" | "title" | "href"
>;
export type BreadcrumbCrumb = {
  label: string;
  href: string;
};
export type BreadcrumbRoute = {
  href: string;
  crumbs: BreadcrumbCrumb[];
};

export const catalog = catalogJson as Catalog;

export function allSections(): Section[] {
  return catalog.sections;
}

export function toProgressSection(section: Section): ProgressSection {
  return {
    sectionId: section.sectionId,
    contentHash: section.contentHash,
    title: section.title,
    href: section.href,
  };
}

export function progressSections(): ProgressSection[] {
  return catalog.sections.map(toProgressSection);
}

function addBreadcrumbRoute(
  routes: Map<string, BreadcrumbRoute>,
  href: string,
  crumbs: BreadcrumbCrumb[],
): void {
  routes.set(href, { href, crumbs });
}

export function breadcrumbRoutes(): BreadcrumbRoute[] {
  const routes = new Map<string, BreadcrumbRoute>();
  const home = { label: "Home", href: "/" };
  const overview = { label: "Overview", href: "/overview/" };

  addBreadcrumbRoute(routes, "/", [home]);
  addBreadcrumbRoute(routes, "/overview/", [home, overview]);

  for (const volume of catalog.volumes) {
    const volumeCrumb = { label: volume.title, href: volume.href };
    addBreadcrumbRoute(routes, volume.href, [home, volumeCrumb]);

    for (const part of volume.parts) {
      const partCrumb = { label: part.title, href: part.href };
      addBreadcrumbRoute(routes, part.href, [home, volumeCrumb, partCrumb]);

      for (const chapter of part.chapters) {
        const chapterCrumb = { label: chapter.title, href: chapter.href };
        addBreadcrumbRoute(routes, chapter.href, [
          home,
          volumeCrumb,
          partCrumb,
          chapterCrumb,
        ]);
      }
    }
  }

  for (const section of catalog.sections) {
    const volume = volumeById(section.volumeId);
    const part = partById(section.volumeId, section.partId);
    const chapter = chapterById(section.volumeId, section.partId, section.chapterId);
    if (!volume || !part || !chapter) continue;
    addBreadcrumbRoute(routes, section.href, [
      home,
      { label: volume.title, href: volume.href },
      { label: part.title, href: part.href },
      { label: chapter.title, href: chapter.href },
      { label: section.title, href: section.href },
    ]);
  }

  return [...routes.values()];
}

export function sectionById(sectionId: string): Section | undefined {
  return catalog.sections.find((section) => section.sectionId === sectionId);
}

export function volumeById(volumeId: string): Volume | undefined {
  return catalog.volumes.find((volume) => volume.volumeId === volumeId);
}

export function partById(volumeId: string, partId: string): Part | undefined {
  return volumeById(volumeId)?.parts.find((part) => part.partId === partId);
}

export function chapterById(
  volumeId: string,
  partId: string,
  chapterId: string,
): Chapter | undefined {
  return partById(volumeId, partId)?.chapters.find(
    (chapter) => chapter.chapterId === chapterId,
  );
}

export function sectionByRoute(
  volumeId: string,
  partId: string,
  chapterId: string,
  sectionId: string,
): Section | undefined {
  return catalog.sections.find(
    (section) =>
      section.volumeId === volumeId &&
      section.partId === partId &&
      section.chapterId === chapterId &&
      section.sectionId === sectionId,
  );
}

export function sectionsStartingAt(sectionId: string): Section[] {
  const startIndex = catalog.sections.findIndex(
    (section) => section.sectionId === sectionId,
  );
  if (startIndex < 0) return [];
  return catalog.sections.slice(startIndex);
}

export function sectionsForChapter(
  volumeId: string,
  partId: string,
  chapterId: string,
): Section[] {
  const chapter = chapterById(volumeId, partId, chapterId);
  if (!chapter) return [];
  const ids = new Set(chapter.sectionIds);
  return catalog.sections.filter((section) => ids.has(section.sectionId));
}

export function sectionsForPart(volumeId: string, partId: string): Section[] {
  const part = partById(volumeId, partId);
  if (!part) return [];
  const ids = new Set(part.sectionIds);
  return catalog.sections.filter((section) => ids.has(section.sectionId));
}

export function routeParams() {
  return catalog.sections.map((section) => ({
    volumeId: section.volumeId,
    partId: section.partId,
    chapterId: section.chapterId,
    sectionId: section.sectionId,
  }));
}

export function excerpt(text: string, maxLength = 180): string {
  if (text.length <= maxLength) return text;
  const shortened = text.slice(0, maxLength);
  return `${shortened.slice(0, shortened.lastIndexOf(" "))}...`;
}
