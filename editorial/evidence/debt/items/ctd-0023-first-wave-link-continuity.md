---
id: CTD-0023
title: Complete first-wave import and historical link audit
status: resolved
kind: link
severity: critical
scopes: ["volume-1", "volume-2", "volume-3", "corpus"]
sources: ["editorial/evidence/audits/2026-08-20-ctd-0023-current-continuity.md", "editorial/evidence/reviews/corpus/2026-07-09-wave-one/summary.md", "editorial/evidence/reviews/volumes/volume-01/2026-07-09-wave-one/review.md", "editorial/evidence/reviews/volumes/volume-02/2026-07-09-wave-one/review.md", "editorial/evidence/reviews/volumes/volume-03/2026-07-09-wave-one/review.md", "publishing/continuity/aliases.json", "publishing/continuity/historical-section-mappings.json", "publishing/continuity/route-aliases.json", "publishing/continuity/route-ledger.json", "publishing/continuity/section-ledger.json", "publishing/continuity/section-lineage.json", "editorial/method/plan.md"]
discovered: 2026-07-09
updated: 2026-08-20
resolved: 2026-08-20
discoveredIn: first-editorial-wave
---

## Debt

The first editorial wave changes headings and section boundaries across three published volumes. The source edits are not safe to publish until every historical route and fragment resolves to its reviewed successor.

## Evidence

The isolated reviews preserve the explicit heading and route decisions. The earlier integrated result belonged to an unpublished candidate, so CTD-0023 was reopened when the work split. The current canonical graph now contains the reviewed first-wave destinations in durable lineage, alias, section-route, and route-ledger state. The dated current audit reconciles that state against refreshed `main` rather than treating the unpublished candidate's counts as current truth.

## Paydown criteria

- C1. Import and compile the current canonical sources for Volumes I, II, and III without collapse, fragmentation, empty sections, duplicate identities, or unintended structural renaming.
- C2. Resolve every reviewed first-wave predecessor identity to one current Volume I, II, or III lineage owner with no in-scope ambiguity or destination change.
- C3. Preserve every removed first-wave section, chapter, and part route through current lineage or an explicit reviewed alias.
- C4. Validate every stored-progress continuity group owned by the affected current sections.
- C5. Pass the complete current historical-link audit, including historical paragraph fragments, with zero broken destinations.
- C6. Pass current manuscript validation for every generated manuscript file and overview reference.

## History

- 2026-07-09: Recorded before combining the three isolated manuscript edits into the publishing pipeline.
- 2026-07-09: Imported the integrated sources, reviewed 170 explicit section maps and 52 structural route maps, and carried 265 deterministic continuity mappings forward.
- 2026-07-09: Wrote 551 lineage entries, 869 section aliases, and 82 route aliases. An identical second run reported zero unresolved items and no file changes.
- 2026-07-09: Found and fixed a planner gap that left 23 targets stale in the historical section mapping registry. Added regression coverage for refresh, unresolved accounting, and mapping-only writes.
- 2026-07-09: Passed the complete audit across 4,621 historical links, including 451 fragment links, with zero broken destinations. Manuscript validation also passed for 561 files and 36 overview references.
- 2026-07-11: Reopened during the pull request split because the reviewed continuity registries and historical-link audit are not present in this branch or main.
- 2026-08-20: The author approved closing against the current canonical route graph rather than reconstructing the unpublished July candidate.
- 2026-08-20: Refreshed from `origin/main` at `f3aba50fe7711657b4e3f1cfa015f57ba990ace7`, reconciled the reviewed mappings with current lineage and aliases, and passed the current historical audit across 4,387 hrefs, including 451 fragments, with zero broken destinations.

## Prior paydown

The unmerged editorial revision demonstrated a complete route and fragment audit. Its mapping choices remain useful evidence, but the durable registries and planner must land in a focused continuity pull request before this debt can close.

## Resolution

### Outcome

The reviewed first-wave structural destinations are present in the current canonical continuity graph. Current source preparation, import, lineage, stored-progress ownership, route aliases, route ledgers, historical fragments, and overview references validate without an in-scope ambiguity or broken destination. The July counts remain historical evidence and are not presented as current repository state.

### Criterion results

- C1: met. At `f3aba50fe7711657b4e3f1cfa015f57ba990ace7`, preparation imported nine canonical volumes into 535 source sections and compiled 525 public sections without an import failure. The current Volume I to III source hashes are recorded in the dated audit.
- C2: met. The planner recognized 239 Volume I to III predecessor mappings through established lineage, reported zero in-scope unresolved mappings, and proposed no in-scope destination change.
- C3: met. The durable state contains 82 reviewed structural route aliases for Volumes I to III, 695 section-route records, and 2,767 lineage-aware route records for those volumes. Current manuscript and historical-route validation accepts every destination.
- C4: met. The 239 affected current lineage owners carry 241 progress-continuity groups, and manuscript validation accepted the lineage configuration and route ledger.
- C5: met. The current historical audit checked 4,387 historical hrefs across 43 catalog commits, including 451 fragment hrefs, and reported zero broken destinations or unresolved successors.
- C6: met. `npm run manuscripts:validate` validated 535 manuscript files and 36 overview references.

### Evidence

The audited repository state is `f3aba50fe7711657b4e3f1cfa015f57ba990ace7`. Its closure proof is `editorial/evidence/audits/2026-08-20-ctd-0023-current-continuity.md`, introduced on the same closure candidate as this resolution. The three wave-one reviews remain the editorial mapping authority. The current `section-lineage.json`, `aliases.json`, `route-aliases.json`, `historical-section-mappings.json`, `section-ledger.json`, and `route-ledger.json` provide the durable runtime state.

### Validation

`npm run manuscripts:prepare`, `npm run manuscripts:import`, `npm run manuscripts:validate`, and `npm run manuscripts:audit-history -- --summary` passed on the refreshed closure worktree. The historical audit reported zero broken routes. After the structured resolution was recorded, `npm run editorial:debt`, `npm run editorial:validate`, `npm run repository:validate-admin-status`, `npm run repository:source-boundary`, and `npm run repository:validate-links` also passed.

### Approval

The author explicitly approved option 1, current-state closure, on 2026-08-20. The closure changes no manuscript wording, canon, voice authority, route destination, public audio, or publication checkpoint.

### Residual risk

The proof binds to the reachable catalog history and durable ledgers at the recorded revision. A future structural or route change can invalidate it and must run the continuity workflow again. Post-merge verification on current `main` remains required before the canonical ticket is considered closed.

### Related debt

CTD-0011 and CTD-0022 remain separate first-wave audio and editorial-ledger obligations. They do not waive or block this independently proven link-continuity result.
