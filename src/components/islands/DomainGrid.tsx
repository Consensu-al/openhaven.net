import type { Domain } from '@/lib/types'
import DomainCard from '@/components/islands/DomainCard'

const GRID_STRINGS = {
  connecting: 'Connecting',
  deepening: 'Deepening',
  acting: 'Acting',
  moreDomains: 'More',
} as const

interface DomainGridProps {
  domains: Domain[]
  selectedDomain: string | null
  onSelectDomain: (slug: string | null) => void
}

export default function DomainGrid({ domains, selectedDomain, onSelectDomain }: DomainGridProps) {
  const primary = domains.filter((d) => d.isPrimary)
  const secondary = domains.filter((d) => !d.isPrimary)

  // Trust trajectory clusters (derived from array position of primary domains)
  const connecting = primary.slice(0, 3)   // Identity, Communication, Group Formation
  const deepening = primary.slice(3, 5)    // Relationship Development, Co-Creation
  const acting = primary.slice(5, 8)       // Events, Mutual Aid, Learning

  const handleSelect = (slug: string) => {
    onSelectDomain(slug === selectedDomain ? null : slug)
  }

  const clusterHeading = (text: string) => (
    <h4
      className="text-xs font-medium uppercase tracking-wider"
      style={{ color: 'var(--color-brand-text)', opacity: 0.4 }}
    >
      {text}
    </h4>
  )

  const clusterGrid = (items: Domain[], isSecondary = false) => (
    <div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
      role="radiogroup"
      aria-label="Select a use case domain"
    >
      {items.map((domain) => (
        <DomainCard
          key={domain.id}
          domain={domain}
          selected={domain.slug === selectedDomain}
          secondary={isSecondary}
          onSelect={handleSelect}
        />
      ))}
    </div>
  )

  return (
    <div className="flex flex-col gap-6" data-testid="domain-grid">
      <div>
        {clusterHeading(GRID_STRINGS.connecting)}
        {clusterGrid(connecting)}
      </div>

      <div>
        {clusterHeading(GRID_STRINGS.deepening)}
        {clusterGrid(deepening)}
      </div>

      <div>
        {clusterHeading(GRID_STRINGS.acting)}
        {clusterGrid(acting)}
      </div>

      {secondary.length > 0 && (
        <div>
          {clusterHeading(GRID_STRINGS.moreDomains)}
          {clusterGrid(secondary, true)}
        </div>
      )}
    </div>
  )
}
