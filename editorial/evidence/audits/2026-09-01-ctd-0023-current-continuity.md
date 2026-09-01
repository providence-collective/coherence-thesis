# CTD-0023 Current Continuity Verification

Audit completed: 2026-09-01

Audited base revision: `20740657f5cc8fbec934c1df609d7e7e0d95fc32`

Status: Current proof for closing CTD-0023 against the canonical route graph on refreshed `origin/main`. This audit does not restage or publish the unpublished 2026-07-09 editorial candidate.

## Authority and scope

The author approved the current-state closure lane and authorized the closure commit on 2026-08-21, then explicitly requested the pull request and closure on 2026-09-01. Publishing continuity review owns the route and lineage proof. The audit covers the first-wave structural decisions in Volumes I, II, and III, their corpus continuity records, stored-progress identities, and historical fragment behavior. It changes no manuscript, voice card, volume identity, route destination, continuity registry, audio input, or publication checkpoint.

The earlier counts in the wave-one review remain historical evidence. They describe an unpublished candidate and are not treated as targets for the current graph.

## Source identity

The canonical manuscript packages retain their stable editorial identities and historical source paths in each `volume.json`.

| Volume | Canonical source SHA-256 |
| --- | --- |
| I | `c549784300cf3c99b88402b90b8950bf32aaa127a75fdbff1db90c7aff99713e` |
| II | `226a79331eac2eb3499f71e6425f1387c7987003dafb56a4828799da189eff5e` |
| III | `de1d7ccf4113cac0c826d36c6db8eff36ea13d4fe597d5f2492de2dd109afc55` |

`npm run manuscripts:prepare` imported nine canonical volumes into 535 source sections, compiled 525 public sections and 202,137 words, and wrote only ignored generated output. The import report named all nine canonical `editorial/sources/volumes/*/manuscript.md` paths, reported 37 Volume I sections, 83 Volume II sections, and 129 Volume III sections, and contained no warnings or errors. A subsequent import completed with the same 535-section result.

Volume I changed on `main` after the earlier unmerged proof, but its public structural-line hash remained `bfafa56be4e5b7ce49214ab79c06a58b3bcc562ca193c5acf82908b429cf9540`. On 2026-09-01, the branch was refreshed again through the unrelated CTD-0030 status merge at `20740657f5cc8fbec934c1df609d7e7e0d95fc32`. The Volume I to III source hashes and route state remained unchanged, and the complete proof was repeated rather than inferred from that limited diff.

## Durable continuity state

The current tracked registries contain:

- 525 current lineage owners, including 239 in Volumes I to III.
- 302 historical section identities, 373 continuity identities, and 241 stored-progress continuity groups owned by those 239 first-wave sections.
- 156 structural route aliases, including the reviewed first-wave distribution of 8 for Volume I, 59 for Volume II, and 15 for Volume III.
- 1,560 section-route records, including 695 for Volumes I to III.
- 11,459 lineage-aware route records, including 2,767 for Volumes I to III and 86 fragment-bearing entries in those volumes.
- 34 explicit historical section mappings, all targeting Volume III successors.

The first-wave dry-run planner used baseline `29c0ffdc7023e8cda6d7232d915b392b6c8eb163`. It recognized all 239 Volume I to III predecessors through established lineage, reported no added or removed in-scope aliases, and reported zero in-scope unresolved routes. Ten existing in-scope structural aliases received proposed note-only refreshes, but every proposed target matched its tracked target. No planner output was written.

The same corpus-wide dry run surfaced one Volume VIII route that requires an explicit reviewed input when recomputing from the old baseline. The tracked route alias already supplies that destination, the current historical audit resolves it, and it is outside CTD-0023's Volume I to III mapping scope. It is not evidence of a current broken route.

## Historical route and fragment proof

`npm run manuscripts:audit-history -- --summary` audited the current worktree against every first-parent catalog revision reachable from the exact base:

- Catalog commits: 43
- Historical hrefs: 4,387
- Historical static paths: 3,936
- Historical fragment hrefs: 451
- Broken historical hrefs: 0
- Broken route kinds: none
- Routes without an obvious successor: 0

This current result supersedes the old 4,621-link count as closure proof. The old count remains preserved in the historical review and debt history.

## Validation

- `npm run manuscripts:prepare`: passed; generated outputs current after the first run.
- `npm run manuscripts:preserve-links -- --base 29c0ffdc7023e8cda6d7232d915b392b6c8eb163 --reviewed-lineage publishing/continuity/section-lineage.json --reviewed-route-aliases publishing/continuity/route-aliases.json --format json`: confirmed all 239 in-scope predecessors with no in-scope unresolved route or destination change. The only unresolved route was the previously documented Volume VIII ambiguity outside this ticket.
- `npm run manuscripts:validate`: passed; 535 manuscript files and 36 overview references validated.
- `npm run manuscripts:import`: passed; nine volumes imported into 535 sections.
- `npm run manuscripts:audit-history -- --summary`: passed; 4,387 historical hrefs and 451 fragments checked with zero broken destinations.
- `npm run audio:verify-manuscript-publication -- --base origin/main`: passed; no spoken manuscript segments changed across zero changed volumes.
- `npm run editorial:debt`: passed; 112 debt items validated after the structured resolution.
- `npm run editorial:validate`: passed; nine stable volume packages, nine review batches, and 12,179 sentence and structure records validated.
- `npm run repository:validate-admin-status`: passed; 50 tasks and 112 debt items checked.
- `npm run repository:source-boundary`: passed; durable editorial and publishing records remained tracked and generated output remained untracked.
- `npm run repository:validate-links`: passed; 249 tracked Markdown files and 166 local references checked.
- `npm run updates:generate`: passed; regenerated 241 Updates records through current `origin/main`.
- `npm run updates:verify -- 20740657f5cc8fbec934c1df609d7e7e0d95fc32`: passed; the checked snapshot matches the refreshed base.
- `git diff --check`: passed on the refreshed tracked candidate diff.

## Conclusion

Every current historical route and fragment resolves through related lineage. The reviewed first-wave structural destinations remain stable, stored-progress continuity validates, and no manuscript or audio input changed. The structured resolution, regenerated debt index, and focused validators pass on the same candidate, so CTD-0023 meets its closure criteria against the current canonical route graph.
