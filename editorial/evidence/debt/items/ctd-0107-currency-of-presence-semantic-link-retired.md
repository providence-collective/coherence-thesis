---
id: CTD-0107
title: Restore the Volume II cross-reference retired by Currency of Presence revisions
status: open
kind: literary
severity: low
scopes: ["volume-1", "volume-2", "corpus"]
sources: ["editorial/sources/volumes/volume-01/manuscript.md#the-currency-of-presence", "editorial/sources/corpus/semantic-links.json"]
discovered: 2026-07-30
updated: 2026-08-22
resolved:
discoveredIn: volume-1/2026-07-30-baseline-re-render
---

## Debt

An approved semantic link from Volume I's Currency of Presence to Volume II's section on what money cannot carry was anchored on the phrase `what money cannot see`. That phrase does not appear in the wave-one baseline. It was introduced by the wave-one editorial pass, and the link was reviewed and approved five days later against the pass's wording.

The re-render restores the baseline phrase, `what money is structurally blind to`, because `structurally` carries a claim the shorter phrase drops: the blindness is a property of the instrument rather than an oversight. That restoration leaves the approved occurrence with no match text in its section, so `npm run editorial:reanchor` retires it rather than guessing a new home.

The concept the reviewer approved is unchanged. Only the words the link was pinned to are gone. Re-pointing the occurrence at the restored phrase was a review decision, not a repair, so it was recorded here rather than made silently.

On 2026-08-20, the author-approved Currency of Presence horizon replaced the restored sentence as part of CTD-0015's Volume I partial paydown. Neither former anchor remains. The current passage asks whether `another kind of memory could become possible`, and that question still points directly to Volume II's section on what money cannot perceive. On 2026-08-22, the author decided that the cross-reference should exist. The remaining work is to review and add an anchor against the current passage, then validate it.

## Evidence

- Occurrence `semantic-link-8f5b45aa63d5acd0`, concept `section-title-v02-what-money-cannot-carry`, approved 2026-07-14 with the rationale that the phrase is an exact conceptual reference to the Volume II section.
- Baseline at `editorial/evidence/reviews/volumes/volume-01/2026-07-09-wave-one/baseline.md`: `it remembers what money is structurally blind to`.
- `npm run editorial:reanchor` reports `retired 1, match text no longer present in the section`.
- Calibration record `editorial/evidence/calibration/volume-01/v01-the-currency-of-presence.json`, finding F6.
- Commit `c74fa0bb1707b1da79f81565619b1ff858a46198` replaces both former anchor phrases with the current Currency of Presence horizon, including `another kind of memory could become possible`.
- The approved concept `section-title-v02-what-money-cannot-carry` still targets Volume II's `What Money Cannot See`; no current occurrence points to it.

## Paydown criteria

- C1. A reviewer decides whether the current Volume I passage should carry the cross-reference to Volume II, or leave it retired.
- C2. If re-approved, a new occurrence exists in `editorial/sources/corpus/semantic-links.json` with an anchor that resolves and a dated approval rationale naming this item.
- C3. `npm run editorial:validate` passes with the decision in place.

## Partial paydown

- 2026-08-22: The author decided that the current Volume I passage should link to Volume II's `What Money Cannot See`. This settles C1. C2 and C3 remain open, so the ticket is active and unresolved.

## History

- 2026-07-30: Recorded during the Volume I baseline re-render. The link was approved against text the wave-one pass introduced, so restoring the baseline necessarily orphans it.
- 2026-08-22: Updated after the author-approved Currency of Presence horizon replaced the restored phrase. The author decided there should be a link, moving the ticket from query to open while implementation and validation remain.
