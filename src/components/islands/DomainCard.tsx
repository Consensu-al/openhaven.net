import { cn } from '@/lib/utils'
import type { Domain } from '@/lib/types'
import { getIcon } from '@/lib/icons'

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
      className={cn(
        'flex flex-col items-start gap-2 rounded-lg border text-left transition-all duration-200 cursor-pointer',
        'p-4 sm:p-6',
        'min-h-[44px] min-w-[44px]',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        selected
          ? 'border-[var(--color-brand-primary)] bg-[var(--color-domain-selected-bg)] shadow-md'
          : 'border-[var(--color-card-border)] bg-white shadow-[0_2px_4px_var(--color-card-shadow)]',
        !selected && 'hover:border-[var(--color-domain-hover-border)] hover:shadow-md',
        secondary && 'opacity-80',
      )}
      style={{
        // @ts-expect-error CSS custom property for focus ring
        '--tw-ring-color': 'var(--color-focus-ring)',
      }}
    >
      <Icon
        className={cn(
          'shrink-0',
          secondary ? 'h-5 w-5' : 'h-6 w-6',
        )}
        style={{ color: 'var(--color-brand-primary)' }}
        aria-hidden="true"
      />
      <span
        className="text-base font-semibold leading-tight"
        style={{ color: 'var(--color-brand-text)' }}
      >
        {domain.name}
      </span>
      <p
        className="text-xs leading-snug"
        style={{ color: 'var(--color-brand-text)', opacity: 0.6 }}
      >
        {domain.description}
      </p>
    </button>
  )
}
