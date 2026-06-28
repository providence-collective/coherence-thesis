import { describe, expect, it } from "vitest";
import { buildCatalog, slugify, wordCount } from "./shared";

describe("manuscript compiler helpers", () => {
  it("creates stable URL slugs", () => {
    expect(slugify("The Currency of Presence")).toBe("the-currency-of-presence");
    expect(slugify("Why Providence Is Not Social Credit")).toBe(
      "why-providence-is-not-social-credit",
    );
  });

  it("counts words from markdown bodies", () => {
    expect(wordCount("*Presence* coordinates **trust**.")).toBe(3);
  });

  it("builds the current catalog from canonical markdown", () => {
    const catalog = buildCatalog();

    expect(catalog.stats.volumeCount).toBe(1);
    expect(catalog.stats.sectionCount).toBeGreaterThan(100);
    expect(catalog.sections[0].sectionId).toBe("preface");
    expect(catalog.overview.nodes.length).toBeGreaterThan(5);
  });
});
