// Link data for the /research landing's non-collection sections.
// Shared by both the en and pt-BR landings so the lists live in one place.

/** Shared shape for the external link cards (link-only this stage). */
export interface ExternalDiagram {
  /** i18n dot-path for the (proper-noun, English) title. */
  titleKey: string
  href: string
  /** i18n dot-path for a one-line summary — shown on the landing card + nav group. */
  summaryKey: string
}

/** External diagram pages (Stories 9.7/9.8) — the 2 sovereign-stack diagrams. */
export const externalDiagrams: ExternalDiagram[] = [
  { titleKey: 'research.stackTitle', summaryKey: 'research.stackSummary', href: 'https://sovereign-stack-model.netlify.app/' },
  { titleKey: 'research.stackEntityTitle', summaryKey: 'research.stackEntitySummary', href: 'https://stack-model-entity-placement.netlify.app/' },
  // OPEN ITEM (Decision 15): the third stack page ("Entities Mapped to Stack Layers")
  // has no URL yet — add it here when Brandon provides it (key: research.stackSampleTitle).
]

/** External report pages (link-only). Monetary Architecture is a report, not a diagram,
 * so it surfaces in the Reports group (nav) + Reports section (/research), not Diagrams. */
export const externalReports: ExternalDiagram[] = [
  { titleKey: 'research.monetaryTitle', summaryKey: 'research.monetarySummary', href: 'https://monetary-architecture.netlify.app/' },
]

/**
 * Raw / orphan HTML pages dropped into `public/research/` that do NOT use the site
 * design (see docs/raw-research-pages.md). Add an entry to surface one on the landing
 * under "Additional documents"; the section is hidden while this list is empty.
 * Titles are plain strings (author-provided), not i18n keys.
 */
export interface RawDocument {
  title: string
  /** Public path, e.g. '/research/my-document.html'. */
  href: string
  description?: string
}

export const rawDocuments: RawDocument[] = [
  // Example — uncomment and edit when a raw page is added:
  // { title: 'My Standalone Document', href: '/research/my-document.html', description: 'Off-brand reference page.' },
]
