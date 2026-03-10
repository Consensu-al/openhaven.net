import type { Domain } from '@/lib/types'
import DomainCard from '@/components/islands/DomainCard'

interface DomainGridProps {
  domains: Domain[]
  selectedDomain: string | null
  onSelectDomain: (slug: string | null) => void
}

export default function DomainGrid({ domains, selectedDomain, onSelectDomain }: DomainGridProps) {
  const handleSelect = (slug: string) => {
    onSelectDomain(slug === selectedDomain ? null : slug)
  }

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
      role="radiogroup"
      aria-label="Select a use case domain"
      data-testid="domain-grid"
    >
      {domains.map((domain) => (
        <DomainCard
          key={domain.id}
          domain={domain}
          selected={domain.slug === selectedDomain}
          secondary={!domain.isPrimary}
          onSelect={handleSelect}
        />
      ))}
    </div>
  )
}
