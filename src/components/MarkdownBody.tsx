import type { ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let cursor = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={`${match.index}-strong`}>{token.slice(2, -2)}</strong>);
    } else {
      nodes.push(<em key={`${match.index}-em`}>{token.slice(1, -1)}</em>);
    }
    cursor = match.index + token.length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

export function MarkdownBody({ markdown }: { markdown: string }) {
  const blocks = markdown
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="manuscript-prose">
      {blocks.map((block, index) => {
        if (block.startsWith("### ")) {
          return <h3 key={index}>{renderInline(block.slice(4))}</h3>;
        }
        if (block.startsWith("## ")) {
          return <h2 key={index}>{renderInline(block.slice(3))}</h2>;
        }
        if (block.startsWith("# ")) {
          return <h2 key={index}>{renderInline(block.slice(2))}</h2>;
        }
        if (block.startsWith("> ")) {
          return <blockquote key={index}>{renderInline(block.replace(/^>\s?/gm, ""))}</blockquote>;
        }
        return <p key={index}>{renderInline(block)}</p>;
      })}
    </div>
  );
}
