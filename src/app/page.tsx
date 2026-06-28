import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Clock, ListTree } from "lucide-react";
import { OverviewMap } from "@/components/OverviewMap";
import { catalog } from "@/lib/manuscript-data";

export default function Home() {
  const volume = catalog.volumes[0];
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Volume Three</p>
          <h1>The Providence Imperative</h1>
          <p className="hero-deck">
            A five minute map into a manuscript about coherence, coordination,
            trust, and the future institutions required for a civilization worth
            inheriting.
          </p>
          <div className="hero-actions">
            <Link className="primary-link" href="/overview/">
              <ListTree aria-hidden="true" size={18} />
              Read the overview
            </Link>
            <Link className="secondary-link" href={volume?.href ?? "/manuscripts/providence-imperative/"}>
              <BookOpen aria-hidden="true" size={18} />
              Enter manuscript
            </Link>
          </div>
        </div>
        <div className="hero-art" aria-label="Coherence Thesis cover art">
          <Image
            src="/art/coherence-thesis-purposeful-cover.jpg"
            alt="The Coherence Thesis cover artwork showing figures, landscape, and geometric lines."
            width={1024}
            height={1536}
            priority
          />
        </div>
      </section>

      <section className="stats-band" aria-label="Manuscript stats">
        <div>
          <strong>{catalog.stats.sectionCount}</strong>
          <span>sections</span>
        </div>
        <div>
          <strong>{catalog.stats.wordCount.toLocaleString()}</strong>
          <span>words</span>
        </div>
        <div>
          <strong>{catalog.stats.readingMinutes}</strong>
          <span>minutes full read</span>
        </div>
        <div>
          <Clock aria-hidden="true" size={22} />
          <span>five minute overview</span>
        </div>
      </section>

      <section className="content-band">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>Start with the whole shape, then zoom in.</h2>
          <p>
            Each node below links into precise manuscript sections. As more
            volumes enter the repository, this same map can reference the whole
            body of work without turning into a table of contents in a powdered
            wig.
          </p>
        </div>
      </section>

      <OverviewMap />

      <section className="final-cta">
        <h2>Ready for the full text?</h2>
        <Link href={volume?.href ?? "/manuscripts/providence-imperative/"}>
          Open Volume Three
          <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </div>
  );
}
