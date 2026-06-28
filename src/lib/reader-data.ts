export type ReaderParagraph = {
  paragraphId: string;
  anchor: string;
  order: number;
  contentHash: string;
};

export type ReaderSectionData = {
  sectionId: string;
  title: string;
  href: string;
  text: string;
  contentHash: string;
  paragraphs: ReaderParagraph[];
};

export type BreadcrumbCrumb = {
  label: string;
  href: string;
};

export type BreadcrumbRoute = {
  href: string;
  crumbs: BreadcrumbCrumb[];
};

let readerSectionsPromise: Promise<ReaderSectionData[]> | null = null;
let breadcrumbRoutesPromise: Promise<BreadcrumbRoute[]> | null = null;

export function loadReaderSections(): Promise<ReaderSectionData[]> {
  readerSectionsPromise ??= fetch("/data/reader-sections.json").then((response) => {
    if (!response.ok) {
      throw new Error(`Unable to load reader section data: ${response.status}`);
    }
    return response.json() as Promise<ReaderSectionData[]>;
  });
  return readerSectionsPromise;
}

export function loadBreadcrumbRoutes(): Promise<BreadcrumbRoute[]> {
  breadcrumbRoutesPromise ??= fetch("/data/breadcrumb-routes.json").then((response) => {
    if (!response.ok) {
      throw new Error(`Unable to load breadcrumb data: ${response.status}`);
    }
    return response.json() as Promise<BreadcrumbRoute[]>;
  });
  return breadcrumbRoutesPromise;
}
