# CTD-0048 Volume VIII fact audit

Status: evidence-phase working record

Ticket: `CTD-0048`

Task: `T-050`

Current source: `editorial/sources/volumes/volume-08/manuscript.md`

Current source hash: `60a9339de6656c68129449af471e06230b5ae7ad599001c7126c97152d79c0c7`

Base commit: `20740657f5cc8fbec934c1df609d7e7e0d95fc32`

## Authority and limits

The author approved an evidence-first, stable-manuscript approach. This audit may inventory claims, attach sources, mark uncertainty, recommend dispositions, and prepare review and decision materials. It does not authorize a manuscript edit, a debt-status change, publication, audio promotion, a push, or a pull request.

Every existing Volume VIII heading, section identity, and route is protected. Any later wording proposal must fit inside that structure.

The July 2026 production review remains historical evidence. It expressly states that fact checking was not performed and that the reviewed version was not publication approved. It cannot verify the current source because its source hash differs from the hash above.

## Contents

- `current-sentence-ledger.jsonl`: exact 855-sentence census of the current source hash.
- `current-structure-ledger.jsonl`: exact 40-record structure census of the current source hash.
- `research-report.md`: source cards, findings, limitations, and preliminary dispositions.
- `claim-map.md`: claim-level inventory tied to exact current manuscript sentences.
- `qualified-review-packet.md`: medical, legal, and historical review scopes and sign-off form.
- `author-decision-sheet.md`: concrete keep, narrow, revise, or remove decisions for the author after specialist review.
- `release-plan.md`: exact preview, validation, audio, pull-request, merge, deployment, and checkpoint gates.

The exact-hash sentence and structure ledgers in this working package are an inventory, not a final review batch. A new directory under `editorial/evidence/reviews/volumes/volume-08/` will be created only when the final candidate and all independent reviews exist. Its source hash must match the candidate manuscript byte for byte.

## Current conclusion

The prose is generally clear. The blocking problem is factual precision, not a need for broad stylistic rewriting. Several numerical and quotation claims do not survive a primary-source check as written. Others survive only after their dataset, population, geography, date, or legal scope is made explicit. The manuscript should change only after qualified review and the author's claim-retention decisions.
