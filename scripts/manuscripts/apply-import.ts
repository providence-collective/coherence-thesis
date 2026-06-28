import fs from "node:fs";
import path from "node:path";
import { cleanDir, ensureDir, manuscriptRoot, repoRoot } from "./shared";

function parseArgs(): { draft: string; force: boolean } {
  const args = process.argv.slice(2);
  const draftIndex = args.indexOf("--draft");
  if (draftIndex === -1 || !args[draftIndex + 1]) {
    throw new Error("Usage: npm run manuscripts:apply-import -- --draft artifacts/imports/<id>/content/manuscripts --force");
  }
  return {
    draft: path.resolve(repoRoot, args[draftIndex + 1]),
    force: args.includes("--force"),
  };
}

function copyTree(source: string, target: string): void {
  ensureDir(target);
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(target, entry.name);
    if (entry.isDirectory()) {
      copyTree(from, to);
    } else if (entry.isFile()) {
      fs.copyFileSync(from, to);
    }
  }
}

function main(): void {
  const { draft, force } = parseArgs();
  if (!force) {
    throw new Error("Refusing to apply import without --force after review.");
  }
  if (!fs.existsSync(draft)) {
    throw new Error(`Draft import not found: ${draft}`);
  }
  cleanDir(manuscriptRoot);
  copyTree(draft, manuscriptRoot);
  console.log(`Applied import from ${path.relative(repoRoot, draft)}.`);
}

main();
