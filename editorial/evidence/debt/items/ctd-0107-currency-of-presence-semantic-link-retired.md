---
id: CTD-0107
title: Restore the Volume II cross-reference retired by Currency of Presence revisions
status: resolved
kind: literary
severity: low
scopes: ["volume-1", "volume-2", "corpus"]
sources: ["editorial/sources/volumes/volume-01/manuscript.md#the-currency-of-presence", "editorial/sources/corpus/semantic-links.json"]
discovered: 2026-07-30
updated: 2026-09-02
resolved: 2026-09-02
discoveredIn: volume-1/2026-07-30-baseline-re-render
---

## Debt

An approved semantic link from Volume I's Currency of Presence to Volume II's section on what money cannot carry was anchored on the phrase `what money cannot see`. That phrase does not appear in the wave-one baseline. It was introduced by the wave-one editorial pass, and the link was reviewed and approved five days later against the pass's wording.

The re-render restores the baseline phrase, `what money is structurally blind to`, because `structurally` carries a claim the shorter phrase drops: the blindness is a property of the instrument rather than an oversight. That restoration leaves the approved occurrence with no match text in its section, so `npm run editorial:reanchor` retires it rather than guessing a new home.

The concept the reviewer approved is unchanged. Only the words the link was pinned to are gone. Re-pointing the occurrence at the restored phrase was a review decision, not a repair, so it was recorded here rather than made silently.

On 2026-08-20, the author-approved Currency of Presence horizon replaced the restored sentence as part of CTD-0015's Volume I partial paydown. Neither former anchor remains. The current passage asks whether `another kind of memory could become possible`, and that question still points directly to Volume II's section on what money cannot perceive. On 2026-08-22, the author decided that the cross-reference should exist. That decision left a reviewed occurrence and validation as the remaining work, which this resolution completes.

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
- 2026-09-02: Added the reviewed occurrence against the current Volume I phrase, confirmed the compiled link targets Volume II's `What Money Cannot See`, completed the focused editorial checks, and resolved the ticket.

## Resolution

### Outcome

The current Volume I phrase `another kind of memory could become possible` now links to Volume II's `What Money Cannot See`. The link restores the approved conceptual cross-reference without changing either manuscript's prose.

### Criterion results

- C1: met. On 2026-08-22, the author decided that the current Volume I passage should carry the cross-reference.
- C2: met. Occurrence `semantic-link-7040019eba45df93` uses concept `section-title-v02-what-money-cannot-carry`, resolves from paragraph `p-ha0c719792dc12462`, and records a dated CTD-0107 approval rationale.
- C3: met. `npm run editorial:validate` passes with the reviewed occurrence in place.

### Evidence

The canonical record is `editorial/sources/corpus/semantic-links.json`. The occurrence binds the exact Volume I text in `v01-the-currency-of-presence` to continuity target `v02-what-money-cannot-carry`, whose current route is `/manuscripts/2/the-response/what-money-cannot-see/`. The prepared reader catalog contains the expected Markdown link at the source phrase.

### Validation

`npm run editorial:semantic-links:audit -- --concept section-title-v02-what-money-cannot-carry` reports one match, zero unreviewed candidates, and one approved link. `npm run editorial:semantic-links:validate`, `npm run manuscripts:validate`, `npm run editorial:validate`, `npm run repository:validate-links`, and `npm run repository:source-boundary` pass. `npm run audio:verify-manuscript-publication -- --base 20740657f5cc8fbec934c1df609d7e7e0d95fc32` confirms that no spoken manuscript segments changed. The focused semantic-link browser test passes on desktop and mobile. The broader UI run passed 220 browser tests but reported 10 unrelated interaction and timing failures outside this change's files and behavior.

### Approval

The author approved restoring this cross-reference on 2026-08-22. On 2026-09-02, the author authorized the pull request and explicitly waived local preview review for this self-contained link change.

### Residual risk

The occurrence depends on the exact source phrase and paragraph anchor. If later prose changes retire that match, the semantic-link checks fail closed for review. No manuscript or audio bytes changed in this repair.

### Related debt

CTD-0015 supplied the current Currency of Presence wording but remains a separate obligation. No active debt item is required to complete CTD-0107.
