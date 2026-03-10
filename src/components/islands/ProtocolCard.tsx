import { useMemo } from 'react'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'
import { ArrowRight } from 'lucide-react'
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
    }),
    [locale]
  )

  const govStyle = GOVERNANCE_STYLE[protocol.governanceModel]
  const riskColor = RISK_COLOR[protocol.captureRisk]
  const archStyle = ARCH_STYLE[protocol.architectureType]

  return (
    <a
      href={`/protocols/${protocol.id}`}
      className="group block rounded-xl transition-all duration-200 cursor-pointer"
      style={{
        border: '2px solid rgba(139, 69, 19, 0.25)',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
      data-testid={`protocol-card-${protocol.id}`}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-brand-primary)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 69, 19, 0.12)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(139, 69, 19, 0.25)'
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'
      }}
    >
      {/* Card content */}
      <div className="p-5">
        {/* Header: name + entity type */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h4
            className="text-base font-semibold leading-tight"
            style={{ color: 'var(--color-brand-primary)' }}
          >
            {protocol.name}
          </h4>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap shrink-0"
            style={{
              color: 'var(--color-brand-text)',
              backgroundColor: 'var(--color-chip-unchecked-bg)',
              border: '1px solid var(--color-card-border)',
              opacity: 0.7,
            }}
          >
            {protocol.entityType}
          </span>
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {/* Architecture badge — outline style */}
          <span
            className="text-[10px] px-2 py-0.5 rounded-full border"
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
            className="text-[10px] px-2 py-0.5 rounded-full"
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
        <div className="flex items-center gap-3 text-xs mb-4">
          {/* Capture risk indicator with tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className="inline-flex items-center gap-1 cursor-default"
                  data-testid={`capture-risk-${protocol.id}`}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: riskColor }}
                    aria-hidden="true"
                  />
                  <span style={{ color: 'var(--color-brand-text)', opacity: 0.7 }}>
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

          <span className="text-[10px]" style={{ color: 'var(--color-brand-text)', opacity: 0.5 }}>
            {dateFormatter.format(new Date(protocol.lastInvestigated))}
          </span>
        </div>
      </div>

      {/* View Details footer - prominent CTA */}
      <div
        className="flex items-center justify-between px-5 py-3 rounded-b-xl transition-colors"
        style={{
          backgroundColor: 'var(--color-brand-accent-light)',
          borderTop: '1px solid rgba(139, 69, 19, 0.1)',
        }}
      >
        <span
          className="text-sm font-semibold"
          style={{ color: 'var(--color-brand-primary)' }}
        >
          {RESULTS_STRINGS.viewDetails}
        </span>
        <ArrowRight
          className="w-4 h-4 transition-transform group-hover:translate-x-1"
          style={{ color: 'var(--color-brand-primary)' }}
        />
      </div>
    </a>
  )
}
