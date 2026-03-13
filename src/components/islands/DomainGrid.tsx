import type { Domain } from '@/lib/types'
import DomainCard from '@/components/islands/DomainCard'
import { useTranslations } from '@/i18n'

interface DomainGridProps {
  domains: Domain[]
  selectedDomain: string | null
  onSelectDomain: (slug: string | null) => void
  locale?: string
}

export default function DomainGrid({ domains, selectedDomain, onSelectDomain, locale = 'en' }: DomainGridProps) {
  const t = useTranslations(locale)

  const handleSelect = (slug: string) => {
    onSelectDomain(slug === selectedDomain ? null : slug)
  }

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
      role="radiogroup"
      aria-label={t('nav.selectDomain') as string}
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
