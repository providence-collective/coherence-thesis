import Link from "next/link";

const VOLUME_EIGHT_ID = "misanthropic-artifice";

export function VolumeEvidenceLink({ volumeId }: { volumeId: string }) {
  if (volumeId !== VOLUME_EIGHT_ID) return null;

  return (
    <Link
      className="volume-evidence-link"
      href="/evidence/volume-08/"
      aria-label="Open Volume Eight evidence and open review"
    >
      <span className="volume-evidence-dot" aria-hidden="true" />
      <span>Evidence</span>
      <span className="volume-evidence-state">Open review</span>
    </Link>
  );
}
