import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, ListTree } from "lucide-react";
import { OverviewMap } from "@/components/OverviewMap";
import { catalog } from "@/lib/manuscript-data";

export default function Home() {
  const firstVolume = catalog.volumes[0];
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Nine volume series</p>
          <h1>The Coherence Thesis</h1>
          <p className="hero-deck">
            A living manuscript body on coherence, intelligence, coordination,
            human potential, and the future institutions required for a civilization
            worth inheriting.
          </p>
          <div className="hero-actions">
            <Link className="primary-link" href="/overview/">
              <ListTree aria-hidden="true" size={18} />
              Read the overview
            </Link>
            <Link className="secondary-link" href="/manuscripts/">
              <BookOpen aria-hidden="true" size={18} />
              Browse manuscripts
            </Link>
          </div>
        </div>
        <div className="hero-art" aria-label="Coherence Thesis cover art">
          <Image
            src={firstVolume?.coverImage ?? "/art/coherence-thesis-vol1-cover.jpg"}
            alt={firstVolume?.coverAlt ?? "The Coherence Thesis cover artwork."}
            width={1024}
            height={1536}
            priority
          />
        </div>
      </section>

      <section className="stats-band" aria-label="Manuscript stats">
        <div>
          <strong>{catalog.stats.volumeCount}</strong>
          <span>volumes</span>
        </div>
        <div>
          <strong>{catalog.stats.wordCount.toLocaleString()}</strong>
          <span>words</span>
        </div>
        <div>
          <strong>{catalog.stats.sectionCount.toLocaleString()}</strong>
          <span>sections</span>
        </div>
        <div>
          <strong>{catalog.stats.readingMinutes.toLocaleString()}</strong>
          <span>minutes full read</span>
        </div>
      </section>

      <section className="content-band">
        <div>
          <p className="eyebrow">Manuscripts</p>
          <h2>Each volume stands on its own.</h2>
          <p>
            The series now publishes each volume as an independent complementary
            manuscript with its own cover, route, index, progress state, and reading
            path.
          </p>
        </div>
      </section>

      <section className="volume-grid" aria-label="Published manuscripts">
        {catalog.volumes.map((volume) => (
          <Link key={volume.volumeId} href={volume.href} className="volume-card">
            <Image
              src={volume.coverImage}
              alt={volume.coverAlt}
              width={512}
              height={768}
              sizes="(max-width: 720px) 42vw, 180px"
            />
            <span>Volume {volume.numberLabel}</span>
            <strong>{volume.title}</strong>
            <small>{volume.subtitle}</small>
            <em>{volume.wordCount.toLocaleString()} words</em>
          </Link>
        ))}
      </section>

      <section className="content-band">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>Start with the whole shape, then zoom in.</h2>
          <p>
            Each node below links into precise manuscript sections across the full
            body of work.
          </p>
        </div>
      </section>

      <OverviewMap />

      <section className="final-cta">
        <h2>Ready for the full body?</h2>
        <Link href="/manuscripts/">
          Open manuscripts
          <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </div>
  );
}
