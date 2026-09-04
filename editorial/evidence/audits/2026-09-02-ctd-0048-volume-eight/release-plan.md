# CTD-0048 release plan

This plan separates preparation from approval. Commands run in `/Users/robertryan/Documents/GitHub/coherence-thesis-worktrees/ctd-0048-fact-map` on `edit/ctd-0048-fact-map`.

## Phase 1: evidence and author decision

Current status: complete for the open-review candidate.

- Consolidate the T-050 and quick-triage commits on the task branch rebased to `origin/main` at `2074065`. Complete.
- Run `npm run editorial:debt:queue -- --id CTD-0048`. Complete.
- Freeze the pre-repair source into exact-hash sentence and structure ledgers. Complete for hash `60a9339d...`.
- Build source cards, claim map, reviewer packet, and author decision sheet. Complete.
- Record the author's 2026-09-02 approval of the open-review placements, status model, revised C1 to C8 criteria, and factual-repair direction. Complete.
- Prepare a public editorial evidence directory and attributable conclusion form for later qualified review. Complete in the candidate. The dedicated reader route and submission interface were removed at the author's direction.

Boundary: this edition may not be described as medically, legally, or historically endorsed. Later attributable reviews create new versioned editions.

## Phase 2: approved factual repair

Author approval was given on 2026-09-02. The candidate now:

1. Edit only `editorial/sources/volumes/volume-08/manuscript.md` and the evidence records authorized by the decisions.
2. Preserve all headings, standalone bold structural lines, section identities, ordering, and routes.
3. Update the Roots entries from the surviving claim map. Do not hand-edit generated reader output.
4. Run `npm run manuscripts:prepare`.
5. Recreate the exact candidate ledgers if the source hash changed.
6. Records semantic, literary, and mechanical review evidence without presenting editorial review as professional endorsement.
7. Refreshes every volatile source as of the final candidate date.
8. Re-runs the omission review over all final sentence records.
9. Preserves the source and evidence in a checkpoint commit before preview handoff.

Stop condition: do not resolve the ticket or mark T-050 done while any final claim attachment, required revision, validation, audio, or preview proof is incomplete.

## Phase 3: focused validation

Run shared-output commands sequentially.

```bash
npm run editorial:validate
npm run editorial:lint:strict
npm run editorial:ledgers:validate -- \
  editorial/evidence/reviews/volumes/volume-08/2026-09-02-open-review-fact-audit/sentence-ledger.jsonl
npm run editorial:structure-ledger -- \
  --base 20740657f5cc8fbec934c1df609d7e7e0d95fc32 \
  --current WORKTREE \
  --source editorial/sources/volumes/volume-08/manuscript.md \
  editorial/evidence/reviews/volumes/volume-08/2026-09-02-open-review-fact-audit/structure-ledger.jsonl
npm run manuscripts:prepare
npm run manuscripts:validate
npm run manuscripts:preserve-links -- \
  --base 20740657f5cc8fbec934c1df609d7e7e0d95fc32
npm run manuscripts:audit-history
npm run repository:source-boundary
```

Citation verification is partly structural and partly editorial. The final sentence ledger must contain direct citation attachments for every retained factual, empirical, medical, legal, historical, and quotation claim. The living report must show source location, method, population, geography, date, denominator, uncertainty, reviewer, and conclusion for each. Provisional status must remain visible where professional judgment or a reproducible method is still open.

Confirm structure separately by diffing headings and generated section identities against the approved baseline. Any heading, standalone bold line, part introduction, route, or identity change fails the approved boundary and requires a separate continuity decision.

## Phase 4: audio parity

Any change to spoken title or body invalidates audio for that section. The expected plan is section-level republication, not a waiver.

1. After wording approval, identify every changed compiled section by comparing the base and candidate manuscript.
2. Generate or record matching audio for the exact approved text.
3. Publish immutable audio and timing sidecars for each changed section.
4. Review playback and timing against the exact candidate.
5. Promote the reviewed section audio checkpoint.
6. Run:

```bash
npm run audio:publish-manifest
npm run audio:checkpoints
npm run audio:verify-manuscript-publication -- --base 20740657f5cc8fbec934c1df609d7e7e0d95fc32
```

If the manuscript changes after audio publication, audio approval is stale and this phase repeats for affected sections.

Stop condition: no ready pull request and no merge while the audio verifier reports stale or missing publication for changed spoken text.

## Phase 5: exact-worktree preview and author approval

After the final candidate commit:

1. Select an unused port.
2. Start the managed preview in this exact worktree.
3. Verify worktree, branch, commit, candidate digest, liveness, and rendered Volume VIII routes.

```bash
npm run preview:dev -- --port <unused-port>
npm run preview:dev:status -- --port <unused-port>
```

Review at minimum:

- Volume VIII opening and epigraph.
- Saturn history paragraph.
- Accounting sections for birds, bees, soil, water, nutrition, glyphosate, microplastics, and radiofrequency.
- Present Tense sections for war, money, AI, climate, overdose, genetics, social credit, fertility, trust, and whistleblowers.
- Birds and Bees second-meaning statistics.
- Architects quotations.
- Roots source register.
- Representative prior public routes and the Volume VIII table of contents.
- The audio-parity plan and every changed section identified by the verifier. Playback review follows publication of the matching immutable files.

Give the author the direct local URL. Wait for explicit approval of that exact commit and digest. A changed candidate invalidates the approval.

Stop condition: do not push or open the pull request before exact-preview approval or an explicit waiver.

## Phase 6: audio parity and closure candidate

After author wording, exact-preview, and audio approvals:

1. Fill structured CTD-0048 proof for C1 through C8 with links to the final claim map, source cards, reviewer records, final source hash, citation attachments, continuity proof, and validation results.
2. Set CTD-0048 to `resolved` on the same repair branch.
3. Run `npm run editorial:debt:update`. Do not hand-edit the generated debt index.
4. Mark T-050 `done` only after the result exists and has been exercised.
5. Re-run the focused validation and queue command.
6. Refresh from current `origin/main`, rebase, and repeat every affected validation because hashes and volatile claims may change.
7. Run `npm run updates:generate` and commit `publishing/updates/snapshot.json` if it advances.
8. Commit the complete repair-and-closure candidate.

## Phase 7: pull request

Push only after exact-preview approval.

Pull-request title candidate:

```text
edit: verify Volume VIII factual record
```

Pull-request body candidate:

```text
(AI Generated).

## Summary

- attaches a claim-level evidence map to every retained factual, empirical, medical, legal, historical, and quotation claim in Volume VIII
- corrects or removes claims that did not survive primary-source review while preserving every heading, section identity, and route
- publishes matching immutable audio and timing for every changed spoken section
- records fresh exact-hash review evidence and resolves CTD-0048 with proof for C1 through C8

## Review evidence

- final manuscript hash: <hash>
- open-review process: <public editorial evidence directory and attributable review record>
- professional endorsement: not claimed
- exact local preview: <url, commit, digest, approval>

## Validation

- `npm run editorial:validate`
- `npm run editorial:lint:strict`
- `npm run editorial:ledgers:validate`
- `npm run manuscripts:validate`
- `npm run manuscripts:preserve-links`
- `npm run manuscripts:audit-history`
- `npm run repository:source-boundary`
- `npm run audio:verify-manuscript-publication -- --base <refreshed-main-sha>`
- `npm run updates:verify`
- `npm run repository:validate-pr-topology -- --pr <number>`

## Remaining gate

<none for a ready pull request, or name the one concrete preview, audio, or publication gate keeping the pull request in draft>
```

The pull request must target `main`. It may be draft only while a named gate remains incomplete. Before merge run:

```bash
npm run repository:validate-pr-topology -- --pr <number>
```

## Phase 8: merged verification and production checkpoint

After squash merge:

1. Deploy the merged `main` commit.
2. Verify the live Volume VIII manuscript and the linked public editorial evidence directory.
3. Verify audio and timing for representative changed sections.
4. Verify the public Updates entry contains the merged pull request or commit.
5. Verify representative current and historical reader routes.
6. Run the production verification commands required by the publishing guide.
7. Only after live bytes and audio match the merged source, promote the verified Volume VIII manuscript checkpoint using the production commit.
8. Confirm CTD-0048 and T-050 are resolved and done on canonical `main`.

## Approval ledger

- Open-review materials: prepared in the public editorial evidence directory; no dedicated reader route or submission interface is part of this branch.
- Qualified medical, legal, and historical endorsement: not claimed and not a closure prerequisite for this edition.
- Author claim-retention and exact wording approval: approved 2026-09-02 for the open-review candidate direction.
- Author exact-preview approval: pending.
- Author audio publication and playback approval: pending.
- Push approval implicit only after the exact-preview gate is satisfied under the requested workflow.
- Merge approval: pending.
- Production checkpoint promotion: pending until post-deploy verification.
