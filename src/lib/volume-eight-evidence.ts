import "server-only";

import { readFileSync } from "node:fs";
import path from "node:path";

const auditDirectory = path.join(
  process.cwd(),
  "editorial",
  "evidence",
  "audits",
  "2026-09-02-ctd-0048-volume-eight",
);

function readEvidenceFile(name: string): string {
  return readFileSync(path.join(auditDirectory, name), "utf8").trim();
}

function withoutDocumentTitle(markdown: string): string {
  return markdown.replace(/^#\s+[^\n]+\n+/, "");
}

function fromFirstSection(markdown: string): string {
  const untitled = withoutDocumentTitle(markdown);
  const firstSection = untitled.search(/^##\s+/m);
  return firstSection === -1 ? untitled : untitled.slice(firstSection);
}

function candidateSourceHash(markdown: string): string {
  return (
    markdown.match(/Candidate source hash:\s*`([a-f0-9]{64})`/)?.[1] ??
    "Unavailable"
  );
}

export function volumeEightEvidenceDocuments() {
  const report = readEvidenceFile("research-report.md");

  return {
    candidateSourceHash: candidateSourceHash(report),
    report: fromFirstSection(report),
    candidateClaimMap: fromFirstSection(
      readEvidenceFile("candidate-claim-map.md"),
    ),
    statusRegister: fromFirstSection(
      readEvidenceFile("claim-status-register.md"),
    ),
    claimMap: withoutDocumentTitle(readEvidenceFile("claim-map.md")),
  };
}
