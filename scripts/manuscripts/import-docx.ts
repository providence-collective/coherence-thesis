import fs from "node:fs";
import path from "node:path";
import mammoth from "mammoth";
import {
  artifactsRoot,
  cleanDir,
  ensureDir,
  fileHash,
  formatFrontmatter,
  manuscriptRoot,
  normalizeNewlines,
  repoRoot,
  sha256,
  slugify,
  writeJson,
  writeUtf8,
  type ManuscriptFrontmatter,
} from "./shared";

type HtmlBlock = {
  tag: "p" | "h1" | "h2";
  markdown: string;
  plain: string;
  index: number;
};

type DraftSection = {
  frontmatter: ManuscriptFrontmatter;
  body: string[];
};

const numberWords: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
};

const partWords: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
};

function parseArgs(): {
  source: string;
  apply: boolean;
  volumeId: string;
  volumeTitle: string;
  volumeOrder: number;
} {
  const args = process.argv.slice(2);
  const options = new Map<string, string | boolean>();
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--apply") {
      options.set("apply", true);
      continue;
    }
    if (!arg.startsWith("--")) {
      throw new Error(`Unexpected argument '${arg}'.`);
    }
    options.set(arg.slice(2), args[index + 1]);
    index += 1;
  }
  return {
    source:
      String(options.get("source") ?? "") ||
      path.join(repoRoot, "sources/manuscripts/coherence-thesis-vol3-providence-imperative.docx"),
    apply: options.get("apply") === true,
    volumeId: String(options.get("volume-id") ?? "providence-imperative"),
    volumeTitle: String(options.get("volume-title") ?? "The Providence Imperative"),
    volumeOrder: Number(options.get("volume-order") ?? 3),
  };
}

function decodeHtml(value: string): string {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

function htmlToMarkdown(value: string): string {
  return decodeHtml(value)
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<strong>([\s\S]*?)<\/strong>/g, "**$1**")
    .replace(/<em>([\s\S]*?)<\/em>/g, "*$1*")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+\n/g, "\n")
    .replace(/\n\s+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function markdownToPlain(value: string): string {
  return value
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function htmlBlocks(html: string): HtmlBlock[] {
  const blocks: HtmlBlock[] = [];
  const regex = /<(p|h1|h2)>([\s\S]*?)<\/\1>/g;
  let match: RegExpExecArray | null;
  let index = 0;
  while ((match = regex.exec(html)) !== null) {
    const markdown = htmlToMarkdown(match[2]);
    const plain = markdownToPlain(markdown);
    if (!plain) continue;
    blocks.push({
      tag: match[1] as HtmlBlock["tag"],
      markdown,
      plain,
      index,
    });
    index += 1;
  }
  return blocks;
}

function parseChapterNumber(value: string): number | null {
  const match = value.match(/^chapter\s+(.+)$/i);
  if (!match) return null;
  return numberWords[match[1].trim().toLowerCase()] ?? null;
}

function parsePartNumber(value: string): number | null {
  const match = value.match(/^part\s+(.+)$/i);
  if (!match) return null;
  return partWords[match[1].trim().toLowerCase()] ?? null;
}

function uniqueId(base: string, used: Set<string>): string {
  let candidate = base;
  let index = 2;
  while (used.has(candidate)) {
    candidate = `${base}-${index}`;
    index += 1;
  }
  used.add(candidate);
  return candidate;
}

function sectionPath(section: DraftSection): string {
  const fm = section.frontmatter;
  const partDir = `${String(fm.partOrder).padStart(2, "0")}-${fm.partId}`;
  const chapterDir = `${String(fm.chapterOrder).padStart(2, "0")}-${fm.chapterId}`;
  const fileName = `${String(fm.sectionOrder).padStart(2, "0")}-${fm.sectionId}.md`;
  return path.join(fm.volumeId, partDir, chapterDir, fileName);
}

function createSection(
  sections: DraftSection[],
  usedSectionIds: Set<string>,
  frontmatter: Omit<ManuscriptFrontmatter, "sectionId"> & { sectionId: string },
): DraftSection {
  const sectionId = uniqueId(frontmatter.sectionId, usedSectionIds);
  const section: DraftSection = {
    frontmatter: {
      ...frontmatter,
      sectionId,
    },
    body: [],
  };
  sections.push(section);
  return section;
}

function buildSections(
  blocks: HtmlBlock[],
  sourceDoc: string,
  sourceHash: string,
  volumeId: string,
  volumeTitle: string,
  volumeOrder: number,
): DraftSection[] {
  const sections: DraftSection[] = [];
  const usedSectionIds = new Set<string>();
  let partId = "front-matter";
  let partTitle = "Front Matter";
  let partOrder = 0;
  let chapterId = "preface";
  let chapterTitle = "Preface";
  let chapterOrder = 0;
  let sectionOrder = 0;
  let current: DraftSection | null = null;
  let accepting = false;
  let skipNextH1Title = false;

  const baseFrontmatter = (extra: {
    sectionId: string;
    title: string;
    sectionOrder: number;
    paragraphStart: number;
  }): ManuscriptFrontmatter => ({
    volumeId,
    volumeTitle,
    volumeOrder,
    partId,
    partTitle,
    partOrder,
    chapterId,
    chapterTitle,
    chapterOrder,
    sectionId: extra.sectionId,
    title: extra.title,
    sectionOrder: extra.sectionOrder,
    sourceDoc,
    sourceHash,
    sourceParagraphStart: extra.paragraphStart,
    sourceParagraphEnd: extra.paragraphStart,
  });

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    const plain = block.plain.trim();
    const upper = plain.toUpperCase();

    if (!accepting) {
      if (upper === "PREFACE") {
        accepting = true;
        current = createSection(sections, usedSectionIds, {
          ...baseFrontmatter({
            sectionId: "preface",
            title: "Preface",
            sectionOrder,
            paragraphStart: block.index,
          }),
        });
        sectionOrder += 1;
      }
      continue;
    }

    const partNumber = parsePartNumber(plain);
    if (partNumber !== null) {
      partOrder = partNumber;
      partTitle = blocks[index + 1]?.plain ?? `Part ${partNumber}`;
      partId = slugify(partTitle);
      chapterOrder = 0;
      chapterTitle = `${partTitle} Overview`;
      chapterId = `${partId}-overview`;
      sectionOrder = 0;
      current = createSection(sections, usedSectionIds, {
        ...baseFrontmatter({
          sectionId: `${partId}-overview`,
          title: partTitle,
          sectionOrder,
          paragraphStart: block.index,
        }),
      });
      sectionOrder += 1;
      const deck = blocks[index + 2];
      if (deck && deck.tag === "p" && parseChapterNumber(deck.plain) === null) {
        current.body.push(deck.markdown);
        current.frontmatter.sourceParagraphEnd = deck.index;
        index += 2;
      } else {
        index += 1;
      }
      continue;
    }

    const chapterNumber = parseChapterNumber(plain);
    if (block.tag === "h1" && chapterNumber !== null) {
      const titleBlock = blocks[index + 1];
      chapterOrder = chapterNumber;
      chapterTitle = titleBlock?.plain ?? plain;
      chapterId = slugify(chapterTitle);
      sectionOrder = chapterNumber * 100;
      current = createSection(sections, usedSectionIds, {
        ...baseFrontmatter({
          sectionId: `${chapterId}-opening`,
          title: chapterTitle,
          sectionOrder,
          paragraphStart: block.index,
        }),
      });
      sectionOrder += 1;
      skipNextH1Title = true;
      continue;
    }

    if (skipNextH1Title && block.tag === "h1") {
      skipNextH1Title = false;
      continue;
    }

    if (block.tag === "h2") {
      current = createSection(sections, usedSectionIds, {
        ...baseFrontmatter({
          sectionId: `${chapterId}-${slugify(plain)}`,
          title: plain,
          sectionOrder,
          paragraphStart: block.index,
        }),
      });
      sectionOrder += 1;
      continue;
    }

    if (!current) {
      current = createSection(sections, usedSectionIds, {
        ...baseFrontmatter({
          sectionId: `${chapterId}-opening`,
          title: chapterTitle,
          sectionOrder,
          paragraphStart: block.index,
        }),
      });
      sectionOrder += 1;
    }
    current.body.push(block.markdown);
    current.frontmatter.sourceParagraphEnd = block.index;
  }

  return sections.filter((section) => section.body.join("\n").trim().length > 0);
}

async function main(): Promise<void> {
  const options = parseArgs();
  const sourcePath = path.resolve(repoRoot, options.source);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Source DOCX not found: ${sourcePath}`);
  }

  const sourceHash = fileHash(sourcePath);
  const sourceDoc = path.relative(repoRoot, sourcePath).replace(/\\/g, "/");
  const result = await mammoth.convertToHtml(
    { path: sourcePath },
    {
      styleMap: [
        "p[style-name='Heading 1'] => h1:fresh",
        "p[style-name='Heading 2'] => h2:fresh",
      ],
    },
  );
  const blocks = htmlBlocks(result.value);
  const sections = buildSections(
    blocks,
    sourceDoc,
    sourceHash,
    options.volumeId,
    options.volumeTitle,
    options.volumeOrder,
  );

  const importId = `${new Date().toISOString().replace(/[:.]/g, "-")}-${options.volumeId}`;
  const outputRoot = options.apply
    ? manuscriptRoot
    : path.join(artifactsRoot, importId, "content/manuscripts");
  const reportPath = options.apply
    ? path.join(artifactsRoot, importId, "report.json")
    : path.join(artifactsRoot, importId, "report.json");

  if (options.apply) {
    cleanDir(path.join(manuscriptRoot, options.volumeId));
  } else {
    cleanDir(outputRoot);
  }

  for (const section of sections) {
    const body = `${formatFrontmatter(section.frontmatter)}\n${normalizeNewlines(section.body.join("\n\n"))}\n`;
    writeUtf8(path.join(outputRoot, sectionPath(section)), body);
  }

  ensureDir(path.dirname(reportPath));
  writeJson(reportPath, {
    importId,
    appliedToCanonical: options.apply,
    sourceDoc,
    sourceHash,
    messageCount: result.messages.length,
    messages: result.messages,
    blockCount: blocks.length,
    sectionCount: sections.length,
    sections: sections.map((section) => ({
      sectionId: section.frontmatter.sectionId,
      title: section.frontmatter.title,
      partId: section.frontmatter.partId,
      chapterId: section.frontmatter.chapterId,
      path: sectionPath(section),
      contentHash: sha256(section.body.join("\n\n")).slice(0, 16),
    })),
  });

  console.log(
    `${options.apply ? "Seeded" : "Imported"} ${sections.length} sections from ${sourceDoc}`,
  );
  console.log(`Report: ${path.relative(repoRoot, reportPath)}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
