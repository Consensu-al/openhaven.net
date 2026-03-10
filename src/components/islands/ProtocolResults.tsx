import { useMemo } from 'react'
import type { Protocol } from '@/lib/types'
import ProtocolCard from '@/components/islands/ProtocolCard'

const RESULTS_STRINGS = {
  countHeader: (count: number) =>
    count === 1 ? '1 protocol matches' : `${count} protocols match`,
  emptyHeading: 'No verified protocols yet for this combination',
  emptyBody:
    "That doesn\u2019t mean none exist \u2014 just that we haven\u2019t mapped them yet.",
  emptyContribute: 'Know one we should add?',
  contributeLinkText: 'Contribute',
} as const

interface ProtocolResultsProps {
  protocols: Protocol[]
  selectedDomain: string | null
  selectedAffordances: string[]
  matchMode: 'or' | 'and'
  locale?: string
}

export default function ProtocolResults({
  protocols,
  selectedDomain,
  selectedAffordances,
  matchMode,
  locale = 'en',
}: ProtocolResultsProps) {
  const filtered = useMemo(() => {
    // Domain is always selected when this component renders (parent guards)
    const domainFiltered = protocols.filter((p) =>
      selectedDomain ? p.domainIds.includes(selectedDomain) : false,
    )

    // No affordances checked → show all protocols for this domain (no affordance filter)
    if (selectedAffordances.length === 0) return domainFiltered

    // Apply affordance filter
    return domainFiltered.filter((p) => {
      if (matchMode === 'and') {
        return selectedAffordances.every((aId) =>
          p.affordanceIds.includes(aId),
        )
      }
      return selectedAffordances.some((aId) =>
        p.affordanceIds.includes(aId),
      )
    })
  }, [protocols, selectedDomain, selectedAffordances, matchMode])

  return (
    <div
      className="results-slide-down mt-8"
      data-testid="protocol-results"
    >
      {filtered.length > 0 ? (
        <>
          <p
            className="text-sm font-medium mb-4"
            style={{ color: 'var(--color-brand-text)' }}
            data-testid="results-count"
          >
            {RESULTS_STRINGS.countHeader(filtered.length)}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((protocol) => (
              <ProtocolCard
                key={protocol.id}
                protocol={protocol}
                locale={locale}
              />
            ))}
          </div>
        </>
      ) : (
        <div
          className="text-center py-8 px-4 rounded-lg border"
          style={{
            borderColor: 'var(--color-card-border)',
            backgroundColor: 'var(--color-card-bg)',
          }}
          data-testid="results-empty-state"
        >
          <p
            className="text-lg font-medium mb-2"
            style={{ color: 'var(--color-brand-primary)' }}
          >
            {RESULTS_STRINGS.emptyHeading}
          </p>
          <p
            className="text-sm mb-3"
            style={{ color: 'var(--color-brand-text)', opacity: 0.7 }}
          >
            {RESULTS_STRINGS.emptyBody}
          </p>
          <p className="text-sm">
            <span style={{ color: 'var(--color-brand-text)', opacity: 0.7 }}>
              {RESULTS_STRINGS.emptyContribute}{' '}
            </span>
            <a
              href="#"
              className="underline underline-offset-2"
              style={{ color: 'var(--color-brand-primary)' }}
            >
              {RESULTS_STRINGS.contributeLinkText}
            </a>
          </p>
        </div>
      )}
    </div>
  )
}
