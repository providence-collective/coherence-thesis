import type { ProgressSection, Section } from "./manuscript-data";

export type SectionReadState = {
  sectionId: string;
  contentHash: string;
  readAt: number;
  percent: number;
};

export type ReaderProgressState = {
  sections: Record<string, SectionReadState>;
};

export const readerProgressStorageKey = "coherence-reader-progress-v1";
export const readerProgressUpdatedEvent = "coherence-reader-progress-updated";

export function emptyProgress(): ReaderProgressState {
  return { sections: {} };
}

export function parseProgress(raw: string | null): ReaderProgressState {
  if (!raw) return emptyProgress();
  try {
    const parsed = JSON.parse(raw) as ReaderProgressState;
    if (!parsed || typeof parsed !== "object" || !parsed.sections) {
      return emptyProgress();
    }
    return parsed;
  } catch {
    return emptyProgress();
  }
}

export function serializeProgress(progress: ReaderProgressState): string {
  return JSON.stringify(progress);
}

export function markRead(
  progress: ReaderProgressState,
  section: Pick<Section, "sectionId" | "contentHash">,
  percent = 100,
  now = Date.now(),
): ReaderProgressState {
  return {
    sections: {
      ...progress.sections,
      [section.sectionId]: {
        sectionId: section.sectionId,
        contentHash: section.contentHash,
        readAt: now,
        percent,
      },
    },
  };
}

export function updatedSinceRead(
  progress: ReaderProgressState,
  section: Pick<Section, "sectionId" | "contentHash">,
): boolean {
  const state = progress.sections[section.sectionId];
  return Boolean(state && state.contentHash !== section.contentHash);
}

export function readPercent(
  progress: ReaderProgressState,
  sections: Array<Pick<Section, "sectionId" | "contentHash">>,
): number {
  if (sections.length === 0) return 0;
  const read = sections.filter(
    (section) =>
      progress.sections[section.sectionId]?.contentHash === section.contentHash,
  ).length;
  return Math.round((read / sections.length) * 100);
}

export function recommendNextSections(
  progress: ReaderProgressState,
  sections: ProgressSection[],
  limit = 4,
): ProgressSection[] {
  const firstUnread = sections.filter(
    (section) => !progress.sections[section.sectionId],
  );
  const updated = sections.filter((section) => updatedSinceRead(progress, section));
  return [...updated, ...firstUnread]
    .filter(
      (section, index, list) =>
        list.findIndex((candidate) => candidate.sectionId === section.sectionId) === index,
    )
    .slice(0, limit);
}
