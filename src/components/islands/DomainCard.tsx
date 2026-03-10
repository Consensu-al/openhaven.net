import type { Domain } from '@/lib/types'
import { getIcon } from '@/lib/icons'
import { Check } from 'lucide-react'

interface DomainCardProps {
  domain: Domain
  selected: boolean
  secondary?: boolean
  onSelect: (slug: string) => void
}

export default function DomainCard({ domain, selected, secondary, onSelect }: DomainCardProps) {
  const Icon = getIcon(domain.icon)

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      data-testid={`domain-card-${domain.slug}`}
      onClick={() => onSelect(domain.slug)}
      className="card-pad-lg group relative flex flex-col rounded-2xl border transition-all duration-200 cursor-pointer text-left overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        borderColor: selected ? 'var(--color-brand-primary)' : 'var(--color-card-border)',
        backgroundColor: selected ? 'var(--color-domain-selected-bg)' : 'white',
        boxShadow: selected
          ? '0 8px 24px rgba(139, 69, 19, 0.14)'
          : '0 2px 8px rgba(0,0,0,0.06)',
        borderTop: selected ? '3px solid var(--color-brand-primary)' : '3px solid transparent',
        opacity: secondary ? 0.85 : 1,
        // @ts-expect-error CSS custom property for focus ring
        '--tw-ring-color': 'var(--color-focus-ring)',
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
        style={{
          backgroundColor: selected ? 'var(--color-brand-primary)' : 'var(--color-brand-accent-light)',
        }}
      >
        <Icon
          className="h-5 w-5"
          style={{ color: selected ? 'white' : 'var(--color-brand-primary)' }}
          aria-hidden="true"
        />
      </div>
      <span
        className="block text-sm font-semibold mb-2 !mt-0"
        style={{ color: 'var(--color-brand-text)' }}
      >
        {domain.name}
      </span>
      <p
        className="text-xs leading-relaxed !mb-0"
        style={{ color: 'var(--color-brand-text)', opacity: 0.6 }}
      >
        {domain.description}
      </p>
      {selected && (
        <div
          className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-brand-primary)' }}
        >
          <Check className="w-3 h-3 text-white" aria-hidden="true" />
        </div>
      )}
    </button>
  )
}
