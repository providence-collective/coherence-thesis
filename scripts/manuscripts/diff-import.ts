import fs from "node:fs";
import path from "node:path";
import {
  manuscriptRoot,
  readMarkdownDocuments,
  repoRoot,
  sha256,
  stripMarkdown,
  writeJson,
} from "./shared";

function parseArgs(): { draft: string } {
  const args = process.argv.slice(2);
  const draftIndex = args.indexOf("--draft");
  if (draftIndex === -1 || !args[draftIndex + 1]) {
    throw new Error("Usage: npm run manuscripts:diff-import -- --draft artifacts/imports/<id>/content/manuscripts");
  }
  return { draft: path.resolve(repoRoot, args[draftIndex + 1]) };
}

function bodyHash(body: string): string {
  return sha256(stripMarkdown(body)).slice(0, 16);
}

function main(): void {
  const { draft } = parseArgs();
  if (!fs.existsSync(draft)) {
    throw new Error(`Draft import not found: ${draft}`);
  }

  const canonicalDocs = readMarkdownDocuments(manuscriptRoot);
  const draftDocs = readMarkdownDocuments(draft);
  const canonical = new Map(canonicalDocs.map((doc) => [doc.frontmatter.sectionId, doc]));
  const incoming = new Map(draftDocs.map((doc) => [doc.frontmatter.sectionId, doc]));
  const added: string[] = [];
  const removed: string[] = [];
  const changed: string[] = [];
  const unchanged: string[] = [];

  for (const [sectionId, doc] of incoming) {
    const existing = canonical.get(sectionId);
    if (!existing) {
      added.push(sectionId);
    } else if (bodyHash(existing.body) !== bodyHash(doc.body)) {
      changed.push(sectionId);
    } else {
      unchanged.push(sectionId);
    }
  }

  for (const sectionId of canonical.keys()) {
    if (!incoming.has(sectionId)) removed.push(sectionId);
  }

  const report = {
    draft: path.relative(repoRoot, draft),
    added,
    changed,
    removed,
    unchangedCount: unchanged.length,
  };
  const reportPath = path.join(path.dirname(path.dirname(draft)), "diff-report.json");
  writeJson(reportPath, report);
  console.log(
    `Diff complete: ${added.length} added, ${changed.length} changed, ${removed.length} removed`,
  );
  console.log(`Report: ${path.relative(repoRoot, reportPath)}`);
}

main();
