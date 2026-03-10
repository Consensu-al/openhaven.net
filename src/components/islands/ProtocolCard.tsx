import { useMemo } from 'react'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'
import { ExternalLink } from 'lucide-react'
import type { Protocol } from '@/lib/types'

const RESULTS_STRINGS = {
  captureRiskLabel: {
    low: 'Low capture risk',
    medium: 'Medium capture risk',
    high: 'High capture risk',
  },
  captureRiskTooltip:
    'Capture risk reflects governance structure, not quality. High-capture protocols may be candidates for governance transition.',
  governanceLabel: {
    foundation: 'Foundation',
    dao: 'DAO',
    'single-company': 'Company',
    'open-standard-body': 'Open Standard',
    community: 'Community',
  },
  architectureLabel: {
    'fully-p2p': 'Fully P2P',
    federated: 'Federated',
    hybrid: 'Hybrid',
  },
  communityLinkLabel: 'Community',
  lastInvestigatedLabel: 'Last investigated',
  viewDetails: 'View Details',
} as const

const GOVERNANCE_STYLE: Record<
  Protocol['governanceModel'],
  { bg: string; text: string }
> = {
  foundation: {
    bg: 'var(--color-badge-foundation-bg)',
    text: 'var(--color-badge-foundation-text)',
  },
  dao: {
    bg: 'var(--color-badge-dao-bg)',
    text: 'var(--color-badge-dao-text)',
  },
  'single-company': {
    bg: 'var(--color-badge-company-bg)',
    text: 'var(--color-badge-company-text)',
  },
  'open-standard-body': {
    bg: 'var(--color-badge-standard-bg)',
    text: 'var(--color-badge-standard-text)',
  },
  community: {
    bg: 'var(--color-badge-community-bg)',
    text: 'var(--color-badge-community-text)',
  },
}

const RISK_COLOR: Record<Protocol['captureRisk'], string> = {
  low: 'var(--color-risk-low)',
  medium: 'var(--color-risk-medium)',
  high: 'var(--color-risk-high)',
}

const ARCH_STYLE: Record<
  Protocol['architectureType'],
  { border: string; text: string }
> = {
  'fully-p2p': {
    border: 'var(--color-arch-p2p-bg)',
    text: 'var(--color-arch-p2p-text)',
  },
  federated: {
    border: 'var(--color-arch-federated-bg)',
    text: 'var(--color-arch-federated-text)',
  },
  hybrid: {
    border: 'var(--color-arch-hybrid-bg)',
    text: 'var(--color-arch-hybrid-text)',
  },
}

interface ProtocolCardProps {
  protocol: Protocol
  locale?: string
}

export default function ProtocolCard({
  protocol,
  locale = 'en',
}: ProtocolCardProps) {
  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    [locale]
  )

  const govStyle = GOVERNANCE_STYLE[protocol.governanceModel]
  const riskColor = RISK_COLOR[protocol.captureRisk]
  const archStyle = ARCH_STYLE[protocol.architectureType]

  return (
    <div
      className="rounded-lg border p-4 sm:p-6 transition-colors"
      style={{
        borderColor: 'var(--color-card-border)',
        backgroundColor: 'var(--color-card-bg)',
      }}
      data-testid={`protocol-card-${protocol.id}`}
    >
      {/* Header: name + entity type */}
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <h4
          className="text-lg font-semibold"
          style={{ color: 'var(--color-brand-primary)' }}
        >
          {protocol.name}
        </h4>
        <span
          className="text-xs px-2 py-0.5 rounded-full whitespace-nowrap"
          style={{
            color: 'var(--color-brand-text)',
            backgroundColor: 'var(--color-chip-unchecked-bg)',
            border: '1px solid var(--color-card-border)',
          }}
        >
          {protocol.entityType}
        </span>
      </div>

      {/* Badges row */}
      <div className="flex flex-wrap gap-2 mb-3">
        {/* Architecture badge — outline style */}
        <span
          className="text-xs px-2 py-0.5 rounded-full border"
          style={{
            color: archStyle.text,
            borderColor: archStyle.border,
            backgroundColor: 'transparent',
          }}
        >
          {RESULTS_STRINGS.architectureLabel[protocol.architectureType]}
        </span>

        {/* Governance badge — filled style */}
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: govStyle.bg,
            color: govStyle.text,
          }}
          data-testid={`governance-badge-${protocol.id}`}
        >
          {RESULTS_STRINGS.governanceLabel[protocol.governanceModel]}
        </span>
      </div>

      {/* Capture risk + date row */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        {/* Capture risk indicator with tooltip */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className="inline-flex items-center gap-1.5 cursor-default"
                data-testid={`capture-risk-${protocol.id}`}
              >
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: riskColor }}
                  aria-hidden="true"
                />
                <span style={{ color: 'var(--color-brand-text)' }}>
                  {RESULTS_STRINGS.captureRiskLabel[protocol.captureRisk]}
                </span>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-xs">
                {RESULTS_STRINGS.captureRiskTooltip}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Last investigated date */}
        <span
          className="text-xs"
          style={{ color: 'var(--color-brand-text)', opacity: 0.6 }}
        >
          {dateFormatter.format(new Date(protocol.lastInvestigated))}
        </span>
      </div>

      {/* Community link */}
      {protocol.communityLink && (
        <a
          href={protocol.communityLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-3 text-sm min-h-[44px] min-w-[44px] underline-offset-2 hover:underline"
          style={{ color: 'var(--color-brand-primary)' }}
          aria-label={`${protocol.name} community`}
          data-testid={`community-link-${protocol.id}`}
        >
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          {RESULTS_STRINGS.communityLinkLabel}
        </a>
      )}

      {/* View Details link */}
      <a
        href={`/protocols/${protocol.id}`}
        className="inline-flex items-center gap-1 mt-2 text-sm min-h-[44px] min-w-[44px] underline-offset-2 hover:underline"
        style={{ color: 'var(--color-brand-primary)' }}
        aria-label={`View details for ${protocol.name}`}
        data-testid={`detail-link-${protocol.id}`}
      >
        {RESULTS_STRINGS.viewDetails}
      </a>
    </div>
  )
}
