import { describe, expect, it } from "vitest";
import { allSections } from "./manuscript-data";
import {
  emptyProgress,
  markRead,
  readPercent,
  recommendNextSections,
  updatedSinceRead,
} from "./reader-state";

describe("reader progress", () => {
  it("marks a section read with its current hash", () => {
    const section = allSections()[0];
    const progress = markRead(emptyProgress(), section, 100, 1_700_000_000);

    expect(progress.sections[section.sectionId]).toMatchObject({
      sectionId: section.sectionId,
      contentHash: section.contentHash,
      readAt: 1_700_000_000,
      percent: 100,
    });
    expect(updatedSinceRead(progress, section)).toBe(false);
  });

  it("detects content updates after a section was read", () => {
    const section = allSections()[0];
    const progress = markRead(emptyProgress(), section);

    expect(
      updatedSinceRead(progress, {
        ...section,
        contentHash: "changed",
      }),
    ).toBe(true);
  });

  it("computes progress and recommends unread sections", () => {
    const sections = allSections().slice(0, 3);
    const progress = markRead(emptyProgress(), sections[0]);

    expect(readPercent(progress, sections)).toBe(33);
    expect(recommendNextSections(progress, sections, 2).map((section) => section.sectionId)).toEqual([
      sections[1].sectionId,
      sections[2].sectionId,
    ]);
  });
});
