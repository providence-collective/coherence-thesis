# Volume VIII Audio Parity Plan

## Boundary

The open-review candidate changes spoken Volume VIII wording. Existing audio cannot be treated as matching the candidate. Repository policy requires new immutable audio and timing sidecars for every affected spoken section before this pull request can become ready or merge.

## Exact procedure

1. Fix the final manuscript and supporting records in a candidate commit.
2. Run `npm run audio:verify-manuscript-publication -- --base 20740657f5cc8fbec934c1df609d7e7e0d95fc32` from that exact commit.
3. Record the complete affected-section list from the verifier.
4. Generate or record new section audio without replacing older immutable assets.
5. Review playback and timing alignment for every changed section.
6. Publish the matching immutable audio and timing sidecars and promote the reviewed audio checkpoint.
7. Rerun the verifier against the refreshed pull-request base. The gate must pass before the pull request becomes ready.

## Current status

The verifier was run against the candidate spoken wording fixed at commit `d1a0331d0fb52281ab53773e357cd73c1c6288a7`. It reports 14 changed spoken segments. Commit `dedd1fc6258064584ee5f3404dacadb297488f13` changes only the evidence-link destination and removes reader-system work; it does not change spoken wording.

- `v08-saturns-day-cosmological-opening-and-register`
- `v08-the-accounting`
- `v08-the-present-tense-a-reckoning-of-the-year-2026`
- `v08-the-birds-and-the-bees-the-second-meaning`
- `v08-the-meaning-of-the-title`
- `v08-let-the-architects-speak`
- `v08-the-strain-on-liberal-democracy`
- `v08-why-write-one-more-book`
- `v08-how-providence-would-tend-three-primal-goods`
- `v08-the-second-address-to-the-frightened`
- `v08-a-blessing-and-a-door`
- `v08-the-roots-of-this-volume`
- `v08-the-living-world`
- `v08-the-state-of-2026`

Generate the delta with:

```bash
--sections v08-saturns-day-cosmological-opening-and-register,v08-the-accounting,v08-the-present-tense-a-reckoning-of-the-year-2026,v08-the-birds-and-the-bees-the-second-meaning,v08-the-meaning-of-the-title,v08-let-the-architects-speak,v08-the-strain-on-liberal-democracy,v08-why-write-one-more-book,v08-how-providence-would-tend-three-primal-goods,v08-the-second-address-to-the-frightened,v08-a-blessing-and-a-door,v08-the-roots-of-this-volume,v08-the-living-world,v08-the-state-of-2026
```

After immutable upload and playback review, promote exactly those sections with:

```bash
npm run audio:promote-sections -- --version <immutable-version> --sections v08-saturns-day-cosmological-opening-and-register,v08-the-accounting,v08-the-present-tense-a-reckoning-of-the-year-2026,v08-the-birds-and-the-bees-the-second-meaning,v08-the-meaning-of-the-title,v08-let-the-architects-speak,v08-the-strain-on-liberal-democracy,v08-why-write-one-more-book,v08-how-providence-would-tend-three-primal-goods,v08-the-second-address-to-the-frightened,v08-a-blessing-and-a-door,v08-the-roots-of-this-volume,v08-the-living-world,v08-the-state-of-2026 --write
```

Audio publication remains an open release gate. It is not deferred by the open-review status.
