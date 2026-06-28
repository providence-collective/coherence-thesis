import path from "node:path";
import {
  buildCatalog,
  catalogPath,
  ensureDir,
  generatedRoot,
  repoRoot,
  writeJson,
} from "./shared";

export function compileManuscripts(): void {
  const catalog = buildCatalog();
  ensureDir(generatedRoot);
  writeJson(catalogPath, catalog);
  console.log(
    `Compiled ${catalog.stats.sectionCount} sections, ${catalog.stats.wordCount.toLocaleString()} words`,
  );
  console.log(`Catalog: ${path.relative(repoRoot, catalogPath)}`);
}

compileManuscripts();
