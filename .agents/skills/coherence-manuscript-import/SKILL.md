---
name: coherence-manuscript-import
description: Import and update Coherence Thesis manuscripts from Markdown sources through the repository publishing workflow. Use when asked to seed or update manuscript sources, preserve public deep links with aliases, validate overview references, or regenerate manuscript data.
disable-model-invocation: true
---

# Manuscript Import

Markdown files in `sources/manuscripts/` are import inputs. Generated reader Markdown lives in `content/manuscripts/`.

## Workflow

1. Confirm the source Markdown path or volume manifest change and inspect the current git state.
2. Confirm canonical Markdown and generated data are currently valid:

```bash
npm run manuscripts:compile
npm run manuscripts:validate
```

3. Regenerate canonical reader Markdown:

```bash
npm run manuscripts:import
```

4. Review changed generated sections and the Markdown import report:

```bash
git diff -- content/manuscripts artifacts/imports/markdown-series-report.json
```

5. Regenerate and validate:

```bash
npm run manuscripts:compile
npm run manuscripts:validate
npm run readme:update
npm run test
```

6. Run `npm run build` when route data, overview references, or generated catalog data changed.
7. Commit and push the reviewed manuscript update to `origin/main`.

## Stable IDs

- Public section routes are preserved through `content/series/aliases.json`.
- Add an alias when a future route should keep resolving after a section moves, splits, merges, or is renamed.
- Do not force new headings to mimic old section structures just to preserve links.
- Paragraph fingerprints are generated into the catalog so local progress can identify changed passages after a reader has read an older section version.

## Failure Handling

- Stop on duplicate IDs, empty bodies, missing frontmatter, broken overview references, bad aliases, bad ordering, or stale generated data.
- If the parser collapses or fragments the document, fix the source or importer before publishing.
- Never normalize a broken import into canonical Markdown.
