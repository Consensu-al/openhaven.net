import { useState, useEffect, useMemo, useCallback } from 'react'
import { X } from 'lucide-react'
import type { Protocol, Domain, Affordance } from '@/lib/types'
import { useTranslations } from '@/i18n'

function updateUrl(params: URLSearchParams) {
  const qs = params.toString()
  const hash = window.location.hash
  const base = qs ? `?${qs}` : window.location.pathname
  window.history.replaceState({}, '', `${base}${hash}`)
}

const GOV_BADGE_TOKENS: Record<string, { bg: string; text: string }> = {
  foundation: { bg: 'var(--color-badge-foundation-bg)', text: 'var(--color-badge-foundation-text)' },
  dao: { bg: 'var(--color-badge-dao-bg)', text: 'var(--color-badge-dao-text)' },
  'single-company': { bg: 'var(--color-badge-company-bg)', text: 'var(--color-badge-company-text)' },
  'open-standard-body': { bg: 'var(--color-badge-standard-bg)', text: 'var(--color-badge-standard-text)' },
  community: { bg: 'var(--color-badge-community-bg)', text: 'var(--color-badge-community-text)' },
}

const RISK_DOT: Record<string, string> = {
  low: 'var(--color-risk-low)',
  medium: 'var(--color-risk-medium)',
  high: 'var(--color-risk-high)',
}

export interface ComparisonViewProps {
  protocols: Protocol[]
  domains: Domain[]
  affordances: Affordance[]
  locale?: string
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 700,
  color: 'var(--color-brand-primary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  padding: '0.75rem 1rem',
  verticalAlign: 'top',
  minWidth: '140px',
  background: 'var(--color-brand-bg)',
  position: 'sticky',
  left: 0,
  zIndex: 1,
}

const cellStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  fontSize: '0.8125rem',
  color: 'var(--color-brand-text)',
  verticalAlign: 'top',
  minWidth: '200px',
}

const badgeBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.375rem',
  padding: '0.375rem 0.75rem',
  fontSize: '0.75rem',
  fontWeight: 500,
  borderRadius: '0.5rem',
  whiteSpace: 'nowrap',
}

const tagStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0.25rem 0.625rem',
  borderRadius: '0.375rem',
  fontSize: '0.8125rem',
  minHeight: '44px',
  minWidth: '44px',
}

export default function ComparisonView({ protocols, domains, affordances, locale = 'en' }: ComparisonViewProps) {
  const t = useTranslations(locale)
  const localePrefix = locale !== 'en' ? `/${locale}` : ''
  const [compareIds, setCompareIds] = useState<string[]>([])

  const protocolMap = useMemo(() => new Map(protocols.map(p => [p.id, p])), [protocols])
  const domainMap = useMemo(() => new Map(domains.map(d => [d.id, d])), [domains])
  const affordanceMap = useMemo(() => new Map(affordances.map(a => [a.id, a])), [affordances])

  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric' }),
    [locale],
  )

  const readCompareFromUrl = useCallback(() => {
    const params = new URLSearchParams(window.location.search)
    const cp = params.get('compare')
    if (cp) {
      const ids = cp.split(',').filter(id => protocolMap.has(id)).slice(0, 5)
      setCompareIds(ids)
    } else {
      setCompareIds([])
    }
  }, [protocolMap])

  useEffect(() => {
    readCompareFromUrl()

    const params = new URLSearchParams(window.location.search)
    const cp = params.get('compare')
    if (cp) {
      const ids = cp.split(',').filter(id => protocolMap.has(id)).slice(0, 5)
      if (ids.length >= 2) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            document.getElementById('comparison')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          })
        })
      }
    }

    window.addEventListener('popstate', readCompareFromUrl)
    window.addEventListener('comparechange', readCompareFromUrl)
    return () => {
      window.removeEventListener('popstate', readCompareFromUrl)
      window.removeEventListener('comparechange', readCompareFromUrl)
    }
  }, [readCompareFromUrl, protocolMap])

  const clearAll = useCallback(() => {
    const params = new URLSearchParams(window.location.search)
    params.delete('compare')
    updateUrl(params)
    queueMicrotask(() => {
      window.dispatchEvent(new CustomEvent('comparechange'))
    })
  }, [])

  useEffect(() => {
    if (compareIds.length < 2) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearAll()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [compareIds.length, clearAll])

  const selectedProtocols = useMemo(
    () => compareIds.map(id => protocolMap.get(id)).filter((p): p is Protocol => p !== undefined),
    [compareIds, protocolMap],
  )

  const sharedAffordanceIds = useMemo(() => {
    const counts = new Map<string, number>()
    selectedProtocols.forEach(p => {
      p.affordanceIds.forEach(id => {
        counts.set(id, (counts.get(id) ?? 0) + 1)
      })
    })
    return new Set(
      [...counts.entries()]
        .filter(([, count]) => count >= 2)
        .map(([id]) => id),
    )
  }, [selectedProtocols])

  const removeProtocol = useCallback((idToRemove: string) => {
    const params = new URLSearchParams(window.location.search)
    const current = params.get('compare')?.split(',').filter(Boolean) ?? []
    const next = current.filter(id => id !== idToRemove)
    if (next.length >= 2) {
      params.set('compare', next.sort().join(','))
    } else {
      params.delete('compare')
    }
    updateUrl(params)
    queueMicrotask(() => {
      window.dispatchEvent(new CustomEvent('comparechange'))
    })
  }, [])

  if (selectedProtocols.length < 2) return null

  const rows: Array<{
    label: string
    render: (p: Protocol) => React.ReactNode
  }> = [
    {
      label: t('comparison.architectureType') as string,
      render: p => (
        <span style={{
          ...badgeBase,
          color: 'var(--color-brand-primary)',
          background: 'transparent',
          border: '2px solid rgba(139, 69, 19, 0.25)',
        }}>
          {t(`badge.architecture.${p.architectureType}`) as string}
        </span>
      ),
    },
    {
      label: t('comparison.governanceModel') as string,
      render: p => {
        const tokens = GOV_BADGE_TOKENS[p.governanceModel]
        return (
          <span style={{
            ...badgeBase,
            background: tokens?.bg ?? 'var(--color-brand-accent-light)',
            color: tokens?.text ?? 'var(--color-brand-primary)',
            border: '1px solid rgba(139, 69, 19, 0.15)',
          }}>
            {t(`badge.governance.${p.governanceModel}`) as string}
          </span>
        )
      },
    },
    {
      label: t('comparison.captureRisk') as string,
      render: p => (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
          <span
            style={{
              width: '0.5rem',
              height: '0.5rem',
              borderRadius: '50%',
              backgroundColor: RISK_DOT[p.captureRisk] ?? 'gray',
              flexShrink: 0,
            }}
            aria-hidden="true"
          />
          {t(`badge.captureRisk.${p.captureRisk}`) as string}
        </span>
      ),
    },
    {
      label: t('comparison.license') as string,
      render: p => <>{p.license || t('comparison.noValue')}</>,
    },
    {
      label: t('comparison.devStatus') as string,
      render: p => <>{p.devStatus || t('comparison.noValue')}</>,
    },
    {
      label: t('comparison.owner') as string,
      render: p => <>{p.owner || t('comparison.noValue')}</>,
    },
    {
      label: t('comparison.startYear') as string,
      render: p => <>{p.startYear ? String(p.startYear) : t('comparison.noValue')}</>,
    },
    {
      label: t('comparison.stack') as string,
      render: p => <>{p.stack.length > 0 ? p.stack.join(', ') : t('comparison.noValue')}</>,
    },
    {
      label: t('comparison.funding') as string,
      render: p => <>{p.funding.length > 0 ? p.funding.join(', ') : t('comparison.noValue')}</>,
    },
    {
      label: t('comparison.useCaseDomains') as string,
      render: p => {
        const pDomains = p.domainIds.map(id => domainMap.get(id)).filter((d): d is Domain => d !== undefined)
        if (pDomains.length === 0) return <>{t('comparison.noValue')}</>
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {pDomains.map(d => (
              <a
                key={d.id}
                href={`${localePrefix}/prototype/domains/${d.slug}`}
                style={{
                  ...tagStyle,
                  background: 'var(--color-brand-accent-light)',
                  border: '1px solid rgba(139, 69, 19, 0.15)',
                  color: 'var(--color-brand-primary)',
                  textDecoration: 'none',
                }}
                onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-focus-ring)' }}
                onBlur={e => { e.currentTarget.style.boxShadow = '' }}
              >
                {d.name}
              </a>
            ))}
          </div>
        )
      },
    },
    {
      label: t('comparison.affordances') as string,
      render: p => {
        const pAffs = p.affordanceIds.map(id => affordanceMap.get(id)).filter((a): a is Affordance => a !== undefined)
        if (pAffs.length === 0) return <>{t('comparison.noValue')}</>
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {pAffs.map(a => (
              <span
                key={a.id}
                title={sharedAffordanceIds.has(a.id) ? t('comparison.sharedAffordance') as string : undefined}
                style={{
                  ...tagStyle,
                  background: sharedAffordanceIds.has(a.id)
                    ? 'var(--color-domain-selected-bg)'
                    : 'white',
                  border: '2px solid rgba(139, 69, 19, 0.25)',
                  color: 'var(--color-text-secondary)',
                  fontWeight: sharedAffordanceIds.has(a.id) ? 600 : 400,
                }}
                data-shared={sharedAffordanceIds.has(a.id) ? 'true' : undefined}
              >
                {a.name}
              </span>
            ))}
          </div>
        )
      },
    },
    {
      label: t('comparison.communityLink') as string,
      render: p => {
        if (!p.communityLink) return <>{t('comparison.noValue')}</>
        return (
          <a
            href={p.communityLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--color-brand-primary)',
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              minHeight: '44px',
              minWidth: '44px',
              display: 'inline-flex',
              alignItems: 'center',
            }}
            onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-focus-ring)' }}
            onBlur={e => { e.currentTarget.style.boxShadow = '' }}
          >
            {t('comparison.visitLink') as string} ↗
          </a>
        )
      },
    },
    {
      label: t('comparison.lastInvestigated') as string,
      render: p => <>{dateFormatter.format(new Date(p.lastInvestigated))}</>,
    },
  ]

  return (
    <div
      data-testid="comparison-view"
      role="region"
      aria-label={t('comparison.ariaLabel') as string}
      style={{
        background: 'var(--color-brand-bg)',
        border: '2px solid rgba(139, 69, 19, 0.15)',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '0.75rem',
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--color-brand-primary)',
          margin: 0,
        }}>
          {t('comparison.protocolComparison')}
        </h2>
        <button
          data-testid="comparison-clear"
          onClick={clearAll}
          style={{
            background: 'none',
            border: '2px solid rgba(139, 69, 19, 0.25)',
            borderRadius: '0.5rem',
            color: 'var(--color-brand-primary)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            cursor: 'pointer',
            padding: '0.5rem 0.875rem',
            minHeight: '44px',
            minWidth: '44px',
            transition: 'all 0.15s ease',
          }}
          onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-focus-ring)' }}
          onBlur={e => { e.currentTarget.style.boxShadow = '' }}
        >
          {t('comparison.clearComparison')}
        </button>
      </div>

      {/* Comparison table */}
      <div style={{
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.8125rem',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(139, 69, 19, 0.15)' }}>
              <th style={labelStyle} />
              {selectedProtocols.map(p => (
                <th
                  key={p.id}
                  data-testid={`comparison-column-${p.id}`}
                  role="group"
                  aria-label={t('comparison.comparisonDataAriaLabel')(p.name)}
                  style={{
                    ...cellStyle,
                    fontWeight: 700,
                    color: 'var(--color-brand-primary)',
                    borderBottom: '2px solid rgba(139, 69, 19, 0.15)',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span>{p.name}</span>
                      <span style={{
                        background: 'var(--color-brand-accent-light)',
                        border: '1px solid rgba(139, 69, 19, 0.2)',
                        color: 'var(--color-brand-primary)',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.03em',
                        display: 'inline-block',
                        padding: '0.25rem 0.625rem',
                        borderRadius: '9999px',
                      }}>
                        {p.entityType}
                      </span>
                    </div>
                    <button
                      data-testid={`comparison-remove-${p.id}`}
                      aria-label={t('comparison.removeAriaLabel')(p.name)}
                      onClick={() => removeProtocol(p.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '44px',
                        height: '44px',
                        border: '2px solid rgba(139, 69, 19, 0.25)',
                        borderRadius: '0.5rem',
                        background: 'white',
                        cursor: 'pointer',
                        color: 'var(--color-brand-primary)',
                        transition: 'all 0.15s ease',
                        flexShrink: 0,
                        outline: 'none',
                      }}
                      onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-focus-ring)' }}
                      onBlur={e => { e.currentTarget.style.boxShadow = '' }}
                    >
                      <X size={18} />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.label}
                style={{
                  borderBottom: i < rows.length - 1 ? '1px solid rgba(139, 69, 19, 0.08)' : 'none',
                }}
              >
                <td style={labelStyle}>{row.label}</td>
                {selectedProtocols.map(p => (
                  <td key={p.id} style={cellStyle}>
                    {row.render(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
