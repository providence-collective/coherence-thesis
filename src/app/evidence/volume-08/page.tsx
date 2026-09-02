import type { Metadata } from "next";

import { MarkdownBody } from "@/components/MarkdownBody";
import { volumeEightEvidenceDocuments } from "@/lib/volume-eight-evidence";

import styles from "./volume-eight-evidence.module.css";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Volume VIII Evidence",
  description:
    "The versioned evidence report, claim map, uncertainties, and open-review invitation for Volume Eight of The Coherence Thesis.",
  alternates: { canonical: "/evidence/volume-08/" },
};

const reviewIssueUrl =
  "https://github.com/genii-foundation/coherence-thesis/issues/new?template=volume-eight-evidence-review.yml";

export default function VolumeEightEvidencePage() {
  const documents = volumeEightEvidenceDocuments();

  return (
    <div className="page-frame reader-layout">
      <article className={`reader-main ${styles.page}`}>
        <header className="page-heading">
          <p className="eyebrow">Volume VIII evidence</p>
          <h1>Living factual record</h1>
          <p>
            Sources, methods, limitations, claim status, and unresolved
            questions for <em>A Misanthropic Artifice</em>.
          </p>
          <p>
            Candidate source hash: <code>{documents.candidateSourceHash}</code>
          </p>
        </header>

        <section className={styles.statusKey} aria-label="Evidence status key">
          <div>
            <span className={`${styles.statusDot} ${styles.verified}`} />
            <strong>Verified</strong>
            <p>The cited evidence supports the bounded statement.</p>
          </div>
          <div>
            <span className={`${styles.statusDot} ${styles.provisional}`} />
            <strong>Provisional</strong>
            <p>Evidence exists, but interpretation or review remains open.</p>
          </div>
          <div>
            <span className={`${styles.statusDot} ${styles.withdrawn}`} />
            <strong>Withdrawn</strong>
            <p>
              The earlier wording was unsupported, contradicted, or retired.
            </p>
          </div>
        </section>

        <aside className={styles.reviewInvitation}>
          <p>
            Clinicians, public-health researchers, lawyers, historians,
            statisticians, and other qualified readers are invited to review
            claims within their fields. Provisional material is not medical or
            legal advice and does not carry professional endorsement.
          </p>
          <a href={reviewIssueUrl}>Submit an attributed review</a>
        </aside>

        <section className={styles.document} id="report">
          <h2>Evidence report</h2>
          <MarkdownBody
            markdown={documents.report}
            focusWords={false}
            orderedLists
          />
        </section>

        <section className={styles.document} id="claim-map">
          <h2>Current claim map</h2>
          <MarkdownBody
            markdown={documents.candidateClaimMap}
            focusWords={false}
            orderedLists
          />
        </section>

        <section className={styles.document} id="claim-status">
          <h2>Pre-repair disposition register</h2>
          <MarkdownBody
            markdown={documents.statusRegister}
            focusWords={false}
            orderedLists
          />
        </section>

        <details className={styles.claimMap} id="pre-repair-claim-map">
          <summary>Open the complete pre-repair claim map</summary>
          <div className={styles.document}>
            <MarkdownBody
              markdown={documents.claimMap}
              focusWords={false}
              orderedLists
            />
          </div>
        </details>
      </article>
    </div>
  );
}
