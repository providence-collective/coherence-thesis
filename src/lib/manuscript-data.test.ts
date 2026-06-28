import { describe, expect, it } from "vitest";
import { allSections, sectionsStartingAt } from "./manuscript-data";

describe("manuscript data", () => {
  it("returns the canonical playback suffix from a section", () => {
    const sections = allSections();
    const start = sections[2];

    expect(sectionsStartingAt(start.sectionId).map((section) => section.sectionId)).toEqual(
      sections.slice(2).map((section) => section.sectionId),
    );
  });

  it("returns no playback sections for an unknown section", () => {
    expect(sectionsStartingAt("missing-section")).toEqual([]);
  });
});
