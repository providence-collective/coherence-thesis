---
id: CTD-0030
title: Verify whether the first Cardinal Scale exists
status: resolved
kind: factual
severity: critical
scopes: ["volume-1", "volume-3", "volume-4", "volume-5", "volume-8", "volume-9", "corpus"]
sources: ["editorial/sources/volumes/volume-01/manuscript.md", "editorial/sources/volumes/volume-03/manuscript.md", "editorial/sources/volumes/volume-04/manuscript.md", "editorial/sources/volumes/volume-05/manuscript.md", "editorial/sources/volumes/volume-08/manuscript.md", "editorial/sources/volumes/volume-09/manuscript.md", "editorial/sources/corpus/master-ledger.md", "editorial/evidence/audits/2026-07-09-initial-corpus.md"]
discovered: 2026-07-09
updated: 2026-08-22
resolved: 2026-07-31
discoveredIn: corpus-promise-audit
---

## Debt

Volumes IV, V, and IX alternately call the first Cardinal Scale an imagined composite, a hypothesis, an existing community of 87 people three years into operation, a founding core of 108 to 150 people in a real watershed, a potential first Scale, and a community still taking shape.

## Evidence

Volume IV first says the watershed community is imagined, later calls its 87 members and three-year history real, and finally admits that the volume has not built the first community or tested its mechanisms in actual institutional life. Volume V calls the Cardinal Scale a hypothesis while saying Volume IV showed that the architecture can actually be built. Volume IX says "The first ground exists" and "The Cardinal Scale is not a hypothesis," then names California Hot Springs as one among potential first Scales and describes its community as taking shape. The master ledger declares approximately 87 people and three years in as canon and calls that identity strongly consistent across the corpus. These formulations cannot all describe the same implementation status without a defined distinction among design fiction, land, organizers, participants, pilot, and functioning Scale.

## Paydown criteria

- C1. Record the named authority's decision about whether the corpus claims that a functioning Cardinal Scale presently exists.
- C2. Remove every unsupported association between the Cardinal Scale and a physical site or living project, and require primary verification and affirmative steward support before any future association.
- C3. Define composite, site, organizer group, founding core, pilot, mature population, and functioning Scale separately.
- C4. Use one implementation status consistently across the affected manuscripts and corpus ledger, and remove unsupported existence-proof rhetoric.
- C5. Verify that no other named physical site or living project is presented as the Cardinal Scale or as its proposed first ground.

## History

- 2026-07-09: Recorded during the first corpus-wide promise and inconsistency scan.
- 2026-07-09: Expanded after the same scan found Volume IV shifting between explicit design fiction, factual community history, and an admission that nothing has yet been built.
- 2026-07-09: Expanded again after the master ledger was found to declare the disputed 87-person history both canonical and strongly consistent.
- 2026-07-09: Expanded after Volume V was found to call the same Scale a hypothesis while treating Volume IV as proof of buildability.
- 2026-07-09: Expanded after the full corpus audit assembled the complete eighty-seven, one-hundred-eight, one-hundred-fifty, and five-hundred-person chronology.
- 2026-07-31: Resolved by authority decision and corpus reconciliation. The Cardinal Scale remains an architectural proposal represented through design fiction, not an operating community reported by the corpus.
- 2026-08-22: Reverified against current `origin/main` and the public reader. The named project authority clarified that the Cardinal Scale does not yet exist as a functioning community, but does exist as an idea with potential progenitors. The authority explicitly approved this durable clarification and the correction of stale closure metadata.

## Resolution

### Outcome

The Cardinal Scale does not yet exist as a functioning community. It exists as an architectural idea: the name for the first Scale to form fully. There are potential progenitors, but no person, group, site, organizer group, founding core, pilot, or living project is itself the Cardinal Scale merely because it may contribute to its formation. That designation requires primary verification of the land, organization, participant count, legal status, operational state, and consent to publication, together with affirmative support from its stewards. Existing descriptions of the Cardinal Scale's watershed, people, population, history, mechanisms, and outcomes are design fiction used to test the proposal in thought.

### Criterion results

- C1: met. On 2026-07-31, the named project authority directed that the debt be closed on the decision that the corpus makes no present existence claim and rejected a separate dated authority statement as unnecessary. On 2026-08-22, the authority explicitly confirmed that the Cardinal Scale does not yet exist as a functioning community, but does exist as an idea with potential progenitors.
- C2: met. Volume IX removes the previously named physical location and replaces it with a rule requiring verification of land, organization, participant count, legal status, operational state, publication consent, and affirmative steward support before any future association.
- C3: met. The corpus master ledger separately defines composite, site, organizer group, founding core, pilot, mature population, and functioning Scale.
- C4: met. Volumes I, III, IV, V, VIII, and IX now present the Cardinal Scale as a future test, proposal, or explicit design-fiction composite rather than a present existence proof. The master ledger carries the same status and no longer canonizes the imagined eighty-seven-person, three-year history as current fact.
- C5: met. A canonical-source search found no remaining named physical site or living project presented as the Cardinal Scale or its proposed first ground.

### Evidence

- `editorial/sources/corpus/master-ledger.md` records the canonical status, future-association rule, and implementation-stage definitions.
- `editorial/sources/volumes/volume-01/manuscript.md` and `editorial/sources/volumes/volume-03/manuscript.md` describe the first Scale as a test rather than proof.
- `editorial/sources/volumes/volume-04/manuscript.md` labels its Cardinal Scale community and events as design fiction and replaces existence-proof claims with bounded evidence and testing language.
- `editorial/sources/volumes/volume-05/manuscript.md` states that the Cardinal Scale is a hypothesis whose present reality the volume cannot vouch for.
- `editorial/sources/volumes/volume-08/manuscript.md` states that the corpus does not claim that a Cardinal Scale presently exists.
- `editorial/sources/volumes/volume-09/manuscript.md` removes the physical-location association, states that no operating community is reported, and requires verification and steward support for any future site or project claim.
- The Volume V, VIII, and IX voice cards explicitly record the authority decision. Volumes I, III, and IV carry the same implementation status in their canonical manuscripts and through the corpus master ledger, but their current voice cards do not repeat the decision explicitly.
- Source and closure commit: `8b70007f160bcd2ffb13be40598c6bb8c39b496e`. Version-provenance commit: `c90c06190cf8919baa59ac64f854307acb652da7`. The combined repair reached `main` through squash commit `29ac0f92c261f3673f42d5fbac388c20de105cf6`.

### Validation

Focused canonical-source searches found no remaining physical-location association or unsupported present-tense existence claim. `npm run editorial:debt`, `npm run editorial:validate`, `npm run editorial:semantic-links:validate`, `npm run manuscripts:validate`, `npm run repository:validate-links`, and `npm run repository:source-boundary` pass. `npm run editorial:lint:strict` reports zero errors across the five revised manuscripts. Manuscript preparation imports 534 files into 518 reader sections without structural loss. The full `npm run validate:ui` gate reaches and passes debt, editorial, and checkpoint validation, then stops on the pre-existing Volume III protected-line mismatch for "A person is not their record." On 2026-08-22, current `origin/main` and the public Volume IX reader were checked again; both preserve the proposal, design-fiction, and evidence-before-association status. `npm run audio:verify-manuscript-publication -- --base 0ce99e3` confirms current audio publication for 47 changed spoken segments across six volumes.

### Approval

The named project authority approved the removal of the physical-location association and, on 2026-07-31, explicitly authorized closure in the same change set as the associated source updates. The authority also declined a separate dated statement of present reality as unnecessary for that closure. On 2026-08-22, the authority explicitly approved this verification update and clarified the current status using the term `progenitors`.

### Residual risk

The source repair reached `main` on 2026-08-01 through squash commit `29ac0f92c261f3673f42d5fbac388c20de105cf6`, and matching audio was subsequently published. Absence of a verified functioning Scale does not imply that no potential progenitors exist. No progenitor, physical site, or living project may be associated with the Cardinal Scale without new primary evidence, qualified review, affirmative steward support, and publication approval. Population ranges and nesting remain unresolved under CTD-0036.

### Related debt

- CTD-0033 remains open for the master ledger's broader mixture of current canon and historical process notes.
- CTD-0036 remains active for direct-trust, governance-unit, mature-population, and nesting thresholds.
- CTD-0094 remains open for Volume IX's broader production obligations. Its 2026-07-10 statement that Cardinal Scale and California Hot Springs status remained incomplete predates and is superseded by this ticket's 2026-07-31 authority decision.
