import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { VolumeEvidenceLink } from "./VolumeEvidenceLink";

describe("VolumeEvidenceLink", () => {
  it("links Volume Eight to its public evidence report", () => {
    const html = renderToStaticMarkup(
      <VolumeEvidenceLink volumeId="misanthropic-artifice" />,
    );

    expect(html).toContain('href="/evidence/volume-08"');
    expect(html).toContain("Evidence");
    expect(html).toContain("Open review");
  });

  it("stays absent from other volumes", () => {
    expect(
      renderToStaticMarkup(<VolumeEvidenceLink volumeId="other-volume" />),
    ).toBe("");
  });
});
