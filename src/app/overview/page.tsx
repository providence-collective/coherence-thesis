import type { Metadata } from "next";
import { OverviewMap } from "@/components/OverviewMap";
import { catalog } from "@/lib/manuscript-data";

export const metadata: Metadata = {
  title: "Overview",
  description:
    "A five minute overview of The Coherence Thesis with direct links into the manuscript.",
};

export default function OverviewPage() {
  return (
    <div className="page-frame">
      <header className="page-heading">
        <p className="eyebrow">Five minute map</p>
        <h1>{catalog.overview.title}</h1>
        <p>{catalog.overview.subtitle}</p>
      </header>
      <OverviewMap />
    </div>
  );
}
