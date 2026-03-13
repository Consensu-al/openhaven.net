import { useState, useEffect, useCallback, useMemo, useRef, Fragment } from 'react'
import { ChevronRight, ChevronDown, X } from 'lucide-react'
import type { Protocol, Domain, Affordance } from '@/lib/types'
import { useTranslations } from '@/i18n'

const MAX_COMPARE = 5

// ---------------------------------------------------------------------------
// Badge styles (match protocols/[id].astro detail page treatment)
// ---------------------------------------------------------------------------

const ARCH_BADGE_STYLE: Record<Protocol['architectureType'], React.CSSProperties> = {
  'fully-p2p': {
    color: 'var(--color-brand-primary)',
    background: 'transparent',
    border: '2px solid rgba(139, 69, 19, 0.25)',
  },
  federated: {
    color: 'var(--color-brand-primary)',
    background: 'transparent',
    border: '2px solid rgba(139, 69, 19, 0.25)',
  },
  hybrid: {
    color: 'var(--color-brand-primary)',
    background: 'transparent',
    border: '2px solid rgba(139, 69, 19, 0.25)',
  },
}

const GOV_BADGE_STYLE: React.CSSProperties = {
  color: 'var(--color-brand-primary)',
  background: 'var(--color-brand-accent-light)',
  border: '1px solid rgba(139, 69, 19, 0.15)',
}

const RISK_DOT_COLOR: Record<Protocol['captureRisk'], string> = {
  low: 'var(--color-risk-low)',
  medium: 'var(--color-risk-medium)',
  high: 'var(--color-risk-high)',
}

const ENTITY_BADGE_STYLE: React.CSSProperties = {
  background: 'var(--color-brand-accent-light)',
  border: '1px solid rgba(139, 69, 19, 0.2)',
  color: 'var(--color-brand-primary)',
  fontSize: '0.6875rem',
  fontWeight: 600,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.03em',
}

// ---------------------------------------------------------------------------
// URL helpers (reuse NavigatorSection pattern)
// ---------------------------------------------------------------------------

function updateUrl(params: URLSearchParams) {
  const qs = params.toString()
  const hash = window.location.hash
  const base = qs ? `?${qs}` : window.location.pathname
  window.history.replaceState({}, '', `${base}${hash}`)
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MatrixFilters {
  q: string
  entity: string[]
  arch: Protocol['architectureType'][]
  gov: Protocol['governanceModel'][]
  risk: Protocol['captureRisk'][]
  status: string[]
}

type SortKey = 'name' | 'architecture' | 'governance' | 'captureRisk' | 'lastInvestigated'
type SortDir = 'asc' | 'desc'

const EMPTY_FILTERS: MatrixFilters = {
  q: '',
  entity: [],
  arch: [],
  gov: [],
  risk: [],
  status: [],
}

export interface MatrixTableProps {
  protocols: Protocol[]
  domains: Domain[]
  affordances: Affordance[]
  locale?: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildDetailAttributes(
  protocol: Protocol,
  dateFormatter: Intl.DateTimeFormat,
  t: (key: string) => any,
): Array<{ label: string; value: string }> {
  const attrs: Array<{ label: string; value: string }> = []
  if (protocol.license) attrs.push({ label: t('matrix.license') as string, value: protocol.license })
  if (protocol.devStatus) attrs.push({ label: t('matrix.devStatus') as string, value: protocol.devStatus })
  if (protocol.owner) attrs.push({ label: t('matrix.owner') as string, value: protocol.owner })
  if (protocol.country) attrs.push({ label: t('matrix.country') as string, value: protocol.country })
  if (protocol.startYear) attrs.push({ label: t('matrix.startYear') as string, value: String(protocol.startYear) })
  if (protocol.stack.length > 0) attrs.push({ label: t('matrix.stack') as string, value: protocol.stack.join(', ') })
  if (protocol.funding.length > 0) attrs.push({ label: t('matrix.funding') as string, value: protocol.funding.join(', ') })
  attrs.push({ label: t('matrix.lastInvestigated') as string, value: dateFormatter.format(new Date(protocol.lastInvestigated)) })
  return attrs
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MatrixTable({ protocols, domains, affordances, locale = 'en' }: MatrixTableProps) {
  const t = useTranslations(locale)
  const localePrefix = locale !== 'en' ? `/${locale}` : ''
  const [filters, setFilters] = useState<MatrixFilters>(EMPTY_FILTERS)
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  // Locale-aware date formatter
  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric' }),
    [locale],
  )

  // -------------------------------------------------------------------------
  // URL state sync
  // -------------------------------------------------------------------------

  const readFiltersFromUrl = useCallback(() => {
    const params = new URLSearchParams(window.location.search)
    setFilters({
      q: params.get('q') ?? '',
      entity: params.get('entity')?.split(',').filter(Boolean) ?? [],
      arch: (params.get('arch')?.split(',').filter(Boolean) ?? []) as Protocol['architectureType'][],
      gov: (params.get('gov')?.split(',').filter(Boolean) ?? []) as Protocol['governanceModel'][],
      risk: (params.get('risk')?.split(',').filter(Boolean) ?? []) as Protocol['captureRisk'][],
      status: params.get('status')?.split(',').filter(Boolean) ?? [],
    })
    return params
  }, [])

  const protocolIds = useMemo(() => new Set(protocols.map(p => p.id)), [protocols])

  // Sync expand param to URL without affecting filter params
  const syncExpandToUrl = useCallback((expandId: string | null) => {
    queueMicrotask(() => {
      const params = new URLSearchParams(window.location.search)
      if (expandId) {
        params.set('expand', expandId)
      } else {
        params.delete('expand')
      }
      updateUrl(params)
    })
  }, [])

  const syncCompareToUrl = useCallback((ids: Set<string>) => {
    queueMicrotask(() => {
      const params = new URLSearchParams(window.location.search)
      if (ids.size > 0) {
        params.set('compare', [...ids].sort().join(','))
      } else {
        params.delete('compare')
      }
      updateUrl(params)
      window.dispatchEvent(new CustomEvent('comparechange'))
    })
  }, [])

  useEffect(() => {
    const params = readFiltersFromUrl()
    const expandParam = params.get('expand')
    if (expandParam) {
      setExpandedRowId(expandParam)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.getElementById(`matrix-detail-${expandParam}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        })
      })
    }
    const compareParam = params.get('compare')
    if (compareParam) {
      const ids = compareParam.split(',').filter(id => protocolIds.has(id)).slice(0, MAX_COMPARE)
      setSelectedIds(new Set(ids))
    }

    const readCompareFromUrl = () => {
      const p = new URLSearchParams(window.location.search)
      const cp = p.get('compare')
      const ids = cp ? cp.split(',').filter(id => protocolIds.has(id)).slice(0, MAX_COMPARE) : []
      setSelectedIds(new Set(ids))
    }
    const onPopState = () => {
      readFiltersFromUrl()
      const p = new URLSearchParams(window.location.search)
      setExpandedRowId(p.get('expand') ?? null)
      readCompareFromUrl()
    }
    window.addEventListener('popstate', onPopState)
    window.addEventListener('comparechange', readCompareFromUrl)
    return () => {
      window.removeEventListener('popstate', onPopState)
      window.removeEventListener('comparechange', readCompareFromUrl)
    }
  }, [readFiltersFromUrl, protocolIds])

  const syncUrl = useCallback((next: MatrixFilters) => {
    queueMicrotask(() => {
      const params = new URLSearchParams()
      if (next.q) params.set('q', next.q)
      if (next.entity.length) params.set('entity', next.entity.join(','))
      if (next.arch.length) params.set('arch', next.arch.join(','))
      if (next.gov.length) params.set('gov', next.gov.join(','))
      if (next.risk.length) params.set('risk', next.risk.join(','))
      if (next.status.length) params.set('status', next.status.join(','))
      const current = new URLSearchParams(window.location.search)
      const currentExpand = current.get('expand')
      if (currentExpand) params.set('expand', currentExpand)
      const currentCompare = current.get('compare')
      if (currentCompare) params.set('compare', currentCompare)
      updateUrl(params)
    })
  }, [])

  // -------------------------------------------------------------------------
  // Derived data for filter options
  // -------------------------------------------------------------------------

  const entityTypes = useMemo(
    () => [...new Set(protocols.map(p => p.entityType))].sort(),
    [protocols],
  )

  const devStatuses = useMemo(
    () => [...new Set(protocols.map(p => p.devStatus).filter((s): s is string => !!s))].sort(),
    [protocols],
  )

  const archTypes: Protocol['architectureType'][] = ['fully-p2p', 'federated', 'hybrid']
  const govModels: Protocol['governanceModel'][] = ['foundation', 'dao', 'single-company', 'open-standard-body', 'community']
  const riskLevels: Protocol['captureRisk'][] = ['low', 'medium', 'high']

  // -------------------------------------------------------------------------
  // Filter + sort
  // -------------------------------------------------------------------------

  const filtered = useMemo(() => {
    let result = protocols

    if (filters.q) {
      const query = filters.q.toLowerCase()
      result = result.filter(p => p.name.toLowerCase().includes(query))
    }
    if (filters.entity.length > 0) {
      result = result.filter(p => filters.entity.includes(p.entityType))
    }
    if (filters.arch.length > 0) {
      result = result.filter(p => filters.arch.includes(p.architectureType))
    }
    if (filters.gov.length > 0) {
      result = result.filter(p => filters.gov.includes(p.governanceModel))
    }
    if (filters.risk.length > 0) {
      result = result.filter(p => filters.risk.includes(p.captureRisk))
    }
    if (filters.status.length > 0) {
      result = result.filter(p => p.devStatus && filters.status.includes(p.devStatus))
    }

    return result
  }, [protocols, filters])

  const sorted = useMemo(() => {
    const copy = [...filtered]
    const dir = sortDir === 'asc' ? 1 : -1

    copy.sort((a, b) => {
      switch (sortKey) {
        case 'name':
          return dir * a.name.localeCompare(b.name, locale)
        case 'architecture':
          return dir * a.architectureType.localeCompare(b.architectureType, locale)
        case 'governance':
          return dir * a.governanceModel.localeCompare(b.governanceModel, locale)
        case 'captureRisk': {
          const order = { low: 0, medium: 1, high: 2 }
          return dir * (order[a.captureRisk] - order[b.captureRisk])
        }
        case 'lastInvestigated':
          return dir * (new Date(a.lastInvestigated).getTime() - new Date(b.lastInvestigated).getTime())
        default:
          return 0
      }
    })

    return copy
  }, [filtered, sortKey, sortDir, locale])

  // -------------------------------------------------------------------------
  // Clear expanded row if it's filtered out (AC 4.5)
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (expandedRowId && !filtered.some(p => p.id === expandedRowId)) {
      setExpandedRowId(null)
      const params = new URLSearchParams(window.location.search)
      params.delete('expand')
      updateUrl(params)
    }
  }, [expandedRowId, filtered])

  // -------------------------------------------------------------------------
  // Escape key closes expanded panel (Task 3.2)
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (!expandedRowId) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const rowEl = document.querySelector(`[data-testid="matrix-row-${expandedRowId}"]`) as HTMLElement
        setExpandedRowId(null)
        syncExpandToUrl(null)
        rowEl?.focus()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [expandedRowId, syncExpandToUrl])

  // -------------------------------------------------------------------------
  // Scroll overflow detection
  // -------------------------------------------------------------------------

  const updateScrollIndicators = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const tolerance = 2
    setCanScrollLeft(el.scrollLeft > tolerance)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - tolerance)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollIndicators()
    el.addEventListener('scroll', updateScrollIndicators, { passive: true })
    const ro = new ResizeObserver(updateScrollIndicators)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateScrollIndicators)
      ro.disconnect()
    }
  }, [updateScrollIndicators, sorted.length])

  // -------------------------------------------------------------------------
  // Filter handlers
  // -------------------------------------------------------------------------

  const updateFilter = useCallback(<K extends keyof MatrixFilters>(key: K, value: MatrixFilters[K]) => {
    setFilters(prev => {
      const next = { ...prev, [key]: value }
      syncUrl(next)
      return next
    })
  }, [syncUrl])

  const toggleArrayFilter = useCallback(<K extends 'entity' | 'arch' | 'gov' | 'risk' | 'status'>(
    key: K,
    value: MatrixFilters[K][number],
  ) => {
    setFilters(prev => {
      const arr = prev[key] as string[]
      const next = {
        ...prev,
        [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value],
      }
      syncUrl(next)
      return next
    })
  }, [syncUrl])

  const clearFilters = useCallback(() => {
    setFilters(EMPTY_FILTERS)
    syncUrl(EMPTY_FILTERS)
  }, [syncUrl])

  const activeFilterCount =
    (filters.q ? 1 : 0) +
    filters.entity.length +
    filters.arch.length +
    filters.gov.length +
    filters.risk.length +
    filters.status.length

  // -------------------------------------------------------------------------
  // Sort handler
  // -------------------------------------------------------------------------

  const handleSort = useCallback((key: SortKey) => {
    setSortKey(prev => {
      if (prev === key) {
        setSortDir(d => d === 'asc' ? 'desc' : 'asc')
        return prev
      }
      setSortDir('asc')
      return key
    })
  }, [])

  // -------------------------------------------------------------------------
  // Expand/collapse handler
  // -------------------------------------------------------------------------

  const toggleExpand = useCallback((protocolId: string) => {
    setExpandedRowId(prev => {
      const next = prev === protocolId ? null : protocolId
      syncExpandToUrl(next)
      return next
    })
  }, [syncExpandToUrl])

  const closeExpand = useCallback((protocolId: string) => {
    setExpandedRowId(null)
    syncExpandToUrl(null)
    requestAnimationFrame(() => {
      const rowEl = document.querySelector(`[data-testid="matrix-row-${protocolId}"]`) as HTMLElement
      rowEl?.focus()
    })
  }, [syncExpandToUrl])

  // -------------------------------------------------------------------------
  // Comparison selection handlers
  // -------------------------------------------------------------------------

  const toggleCompare = useCallback((protocolId: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(protocolId)) {
        next.delete(protocolId)
      } else if (next.size < MAX_COMPARE) {
        next.add(protocolId)
      }
      syncCompareToUrl(next)
      return next
    })
  }, [syncCompareToUrl])

  const clearCompare = useCallback(() => {
    setSelectedIds(new Set())
    syncCompareToUrl(new Set())
  }, [syncCompareToUrl])

  const handleCompareCta = useCallback(() => {
    syncCompareToUrl(selectedIds)
    document.getElementById('comparison')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [selectedIds, syncCompareToUrl])

  // -------------------------------------------------------------------------
  // Shared styles
  // -------------------------------------------------------------------------

  const sectionTitle: React.CSSProperties = {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'var(--color-brand-primary)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    margin: 0,
  }

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div data-testid="matrix-table">
      {/* ---- Filter Bar ---- */}
      <div style={{ marginBottom: '1.5rem' }}>
        {/* Search + count row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
            <input
              type="text"
              value={filters.q}
              onChange={e => updateFilter('q', e.target.value)}
              placeholder={t('matrix.searchPlaceholder') as string}
              data-testid="matrix-filter-search"
              style={{
                padding: '0.5rem 0.875rem',
                fontSize: '0.8125rem',
                border: '2px solid rgba(139, 69, 19, 0.25)',
                borderRadius: '0.5rem',
                background: 'white',
                color: 'var(--color-brand-text)',
                outline: 'none',
                minHeight: '44px',
                width: '100%',
                maxWidth: '280px',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-brand-primary)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(139, 69, 19, 0.25)' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            <span data-testid="matrix-count" style={sectionTitle}>
              {(t('matrix.protocolCount') as (n: number) => string)(filtered.length)}
            </span>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  padding: '0.375rem 0.75rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  transition: 'all 0.15s ease',
                  minHeight: '36px',
                  border: '2px solid rgba(139, 69, 19, 0.25)',
                  background: 'white',
                  color: 'var(--color-brand-primary)',
                }}
              >
                {t('matrix.clearAll') as string} ({activeFilterCount})
              </button>
            )}
          </div>
        </div>

        {/* Filter dropdowns */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <DropdownFilter
            label={t('matrix.filterArchitecture') as string}
            testId="matrix-filter-arch"
            options={archTypes.map(val => ({ value: val, label: t(`badge.architecture.${val}`) as string }))}
            selected={filters.arch}
            onToggle={val => toggleArrayFilter('arch', val as Protocol['architectureType'])}
          />
          <DropdownFilter
            label={t('matrix.filterGovernance') as string}
            testId="matrix-filter-gov"
            options={govModels.map(val => ({ value: val, label: t(`badge.governance.${val}`) as string }))}
            selected={filters.gov}
            onToggle={val => toggleArrayFilter('gov', val as Protocol['governanceModel'])}
          />
          <DropdownFilter
            label={t('matrix.filterCaptureRisk') as string}
            testId="matrix-filter-risk"
            options={riskLevels.map(val => ({ value: val, label: t(`badge.captureRisk.${val}`) as string }))}
            selected={filters.risk}
            onToggle={val => toggleArrayFilter('risk', val as Protocol['captureRisk'])}
          />
          <DropdownFilter
            label={t('matrix.filterEntityType') as string}
            testId="matrix-filter-entity"
            options={entityTypes.map(val => ({ value: val, label: val }))}
            selected={filters.entity}
            onToggle={val => toggleArrayFilter('entity', val)}
          />
          {devStatuses.length > 0 && (
            <DropdownFilter
              label={t('matrix.filterDevStatus') as string}
              testId="matrix-filter-status"
              options={devStatuses.map(val => ({ value: val, label: val }))}
              selected={filters.status}
              onToggle={val => toggleArrayFilter('status', val)}
            />
          )}
        </div>

        {/* Compare CTA bar */}
        {selectedIds.size >= 2 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              background: 'var(--color-brand-accent-light)',
              border: '1px solid rgba(139, 69, 19, 0.15)',
              borderRadius: '0.5rem',
              marginTop: '0.75rem',
              flexWrap: 'wrap',
            }}
          >
            <button
              data-testid="matrix-compare-cta"
              onClick={handleCompareCta}
              style={{
                background: 'var(--color-brand-primary)',
                color: 'white',
                borderRadius: '0.5rem',
                padding: '0.625rem 1.25rem',
                fontSize: '0.8125rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                minHeight: '44px',
                minWidth: '44px',
                transition: 'opacity 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-focus-ring)' }}
              onBlur={e => { e.currentTarget.style.boxShadow = '' }}
            >
              {t('matrix.compareNSelected') as string} {selectedIds.size} {t('matrix.nOfMaxSelected') as string}
            </button>
            <span
              data-testid="matrix-compare-count"
              style={{
                background: 'var(--color-brand-accent-light)',
                color: 'var(--color-brand-primary)',
                borderRadius: '9999px',
                padding: '0.25rem 0.75rem',
                fontSize: '0.8125rem',
                fontWeight: 700,
                border: '1px solid rgba(139, 69, 19, 0.15)',
              }}
            >
              {selectedIds.size}/{MAX_COMPARE} {t('matrix.nOfMaxSelected') as string}
            </span>
            <button
              data-testid="matrix-compare-clear"
              onClick={clearCompare}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-brand-primary)',
                fontSize: '0.8125rem',
                fontWeight: 500,
                cursor: 'pointer',
                padding: '0.5rem',
                minHeight: '44px',
                minWidth: '44px',
                textDecoration: 'underline',
                textUnderlineOffset: '2px',
              }}
              onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-focus-ring)' }}
              onBlur={e => { e.currentTarget.style.boxShadow = '' }}
            >
              {t('matrix.clearSelection') as string}
            </button>
          </div>
        )}
      </div>

      {/* ---- Table ---- */}
      {sorted.length === 0 ? (
        <div
          data-testid="matrix-empty-state"
          style={{
            textAlign: 'center',
            padding: '3rem 1.5rem',
            color: 'var(--color-brand-text)',
            opacity: 0.7,
            fontSize: '0.9375rem',
            lineHeight: 1.6,
          }}
        >
          {t('matrix.emptyState') as string}
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          {canScrollLeft && (
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '2rem',
                background: 'linear-gradient(to right, var(--color-brand-bg), transparent)',
                zIndex: 3,
                pointerEvents: 'none',
              }}
            />
          )}
          {canScrollRight && (
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '2rem',
                background: 'linear-gradient(to left, var(--color-brand-bg), transparent)',
                zIndex: 3,
                pointerEvents: 'none',
              }}
            />
          )}
          <div ref={scrollRef} style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.8125rem',
            }}
          >
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(139, 69, 19, 0.15)' }}>
                <th style={{ ...thStyle, width: '44px', padding: '0.5rem' }}>
                  <span className="sr-only" style={{
                    position: 'absolute', width: '1px', height: '1px',
                    padding: 0, margin: '-1px', overflow: 'hidden',
                    clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', borderWidth: 0,
                  }}>
                    {t('matrix.selectForComparison') as string}
                  </span>
                </th>
                <SortableHeader
                  label={t('matrix.columns.name') as string}
                  sortKey="name"
                  currentKey={sortKey}
                  currentDir={sortDir}
                  onSort={handleSort}
                  t={t}
                  sticky
                />
                <th style={thStyle}>{t('matrix.columns.entityType') as string}</th>
                <SortableHeader
                  label={t('matrix.columns.architecture') as string}
                  sortKey="architecture"
                  currentKey={sortKey}
                  currentDir={sortDir}
                  onSort={handleSort}
                  t={t}
                />
                <SortableHeader
                  label={t('matrix.columns.governance') as string}
                  sortKey="governance"
                  currentKey={sortKey}
                  currentDir={sortDir}
                  onSort={handleSort}
                  t={t}
                />
                <SortableHeader
                  label={t('matrix.columns.captureRisk') as string}
                  sortKey="captureRisk"
                  currentKey={sortKey}
                  currentDir={sortDir}
                  onSort={handleSort}
                  t={t}
                />
                <th style={thStyle}>{t('matrix.columns.devStatus') as string}</th>
                <SortableHeader
                  label={t('matrix.columns.lastInvestigated') as string}
                  sortKey="lastInvestigated"
                  currentKey={sortKey}
                  currentDir={sortDir}
                  onSort={handleSort}
                  t={t}
                />
              </tr>
            </thead>
            <tbody>
              {sorted.map(protocol => {
                const isExpanded = expandedRowId === protocol.id

                // Resolve domains and affordances for expansion panel
                const protocolDomains = protocol.domainIds
                  .map(id => domains.find(d => d.id === id))
                  .filter((d): d is Domain => d !== undefined)
                const protocolAffordances = protocol.affordanceIds
                  .map(id => affordances.find(a => a.id === id))
                  .filter((a): a is Affordance => a !== undefined)

                const detailAttrs = buildDetailAttributes(protocol, dateFormatter, t)

                return (
                  <Fragment key={protocol.id}>
                    {/* Data row */}
                    <tr
                      data-testid={`matrix-row-${protocol.id}`}
                      style={{
                        borderBottom: isExpanded ? 'none' : '1px solid rgba(139, 69, 19, 0.08)',
                        cursor: 'pointer',
                        transition: 'background 0.1s',
                        background: isExpanded ? 'var(--color-domain-selected-bg)' : undefined,
                      }}
                      onClick={() => toggleExpand(protocol.id)}
                      onMouseEnter={e => { if (!isExpanded) e.currentTarget.style.background = 'var(--color-domain-selected-bg)' }}
                      onMouseLeave={e => { if (!isExpanded) e.currentTarget.style.background = '' }}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          toggleExpand(protocol.id)
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-expanded={isExpanded}
                      aria-controls={`matrix-detail-${protocol.id}`}
                      aria-label={(t('matrix.collapseAriaLabel') as (name: string, expanded: boolean) => string)(protocol.name, isExpanded)}
                    >
                      {/* Comparison checkbox */}
                      <td style={{ ...tdStyle, padding: '0.5rem', width: '44px' }}>
                        <label
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '44px',
                            height: '44px',
                            cursor: 'pointer',
                          }}
                          onClick={e => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={selectedIds.has(protocol.id)}
                            disabled={!selectedIds.has(protocol.id) && selectedIds.size >= MAX_COMPARE}
                            title={
                              !selectedIds.has(protocol.id) && selectedIds.size >= MAX_COMPARE
                                ? t('matrix.maxSelection') as string
                                : undefined
                            }
                            onChange={() => toggleCompare(protocol.id)}
                            onClick={e => e.stopPropagation()}
                            onKeyDown={e => e.stopPropagation()}
                            aria-label={(t('matrix.selectAriaLabel') as (name: string) => string)(protocol.name)}
                            data-testid={`matrix-compare-checkbox-${protocol.id}`}
                            style={{
                              width: '18px',
                              height: '18px',
                              cursor: !selectedIds.has(protocol.id) && selectedIds.size >= MAX_COMPARE ? 'not-allowed' : 'pointer',
                              accentColor: 'var(--color-brand-primary)',
                            }}
                          />
                        </label>
                      </td>

                      {/* Name — sticky on mobile, with chevron */}
                      <td style={{
                        ...tdStyle,
                        position: 'sticky',
                        left: 0,
                        zIndex: 1,
                        background: isExpanded ? 'var(--color-domain-selected-bg)' : 'white',
                        fontWeight: 600,
                        color: 'var(--color-brand-primary)',
                        minWidth: '140px',
                      }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <span
                            data-testid={`matrix-expand-toggle-${protocol.id}`}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '24px',
                              height: '24px',
                              transition: 'transform 200ms ease',
                              color: 'var(--color-brand-primary)',
                              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                              flexShrink: 0,
                            }}
                            aria-hidden="true"
                          >
                            <ChevronRight size={16} />
                          </span>
                          {protocol.name}
                        </span>
                      </td>

                      {/* Entity Type */}
                      <td style={tdStyle}>
                        <span style={{
                          ...ENTITY_BADGE_STYLE,
                          display: 'inline-block',
                          padding: '0.25rem 0.625rem',
                          borderRadius: '9999px',
                        }}>
                          {protocol.entityType}
                        </span>
                      </td>

                      {/* Architecture — outline badge */}
                      <td style={tdStyle}>
                        <span style={{
                          ...badgeBase,
                          ...ARCH_BADGE_STYLE[protocol.architectureType],
                        }}>
                          {t(`badge.architecture.${protocol.architectureType}`) as string}
                        </span>
                      </td>

                      {/* Governance — filled badge */}
                      <td style={tdStyle}>
                        <span style={{
                          ...badgeBase,
                          ...GOV_BADGE_STYLE,
                        }}>
                          {t(`badge.governance.${protocol.governanceModel}`) as string}
                        </span>
                      </td>

                      {/* Capture Risk — dot + text */}
                      <td style={tdStyle}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                          <span
                            style={{
                              width: '0.5rem',
                              height: '0.5rem',
                              borderRadius: '50%',
                              backgroundColor: RISK_DOT_COLOR[protocol.captureRisk],
                              flexShrink: 0,
                            }}
                            aria-hidden="true"
                          />
                          {t(`badge.captureRisk.${protocol.captureRisk}`) as string}
                        </span>
                      </td>

                      {/* Dev Status */}
                      <td style={{ ...tdStyle, color: 'var(--color-brand-text)', opacity: protocol.devStatus ? 1 : 0.4 }}>
                        {protocol.devStatus ?? '\u2014'}
                      </td>

                      {/* Last Investigated */}
                      <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>
                        {dateFormatter.format(new Date(protocol.lastInvestigated))}
                      </td>
                    </tr>

                    {isExpanded && (
                    <tr
                      id={`matrix-detail-${protocol.id}`}
                      data-testid={`matrix-row-detail-${protocol.id}`}
                      style={{
                        background: 'var(--color-brand-bg)',
                        borderBottom: '1px solid rgba(139, 69, 19, 0.08)',
                      }}
                    >
                      <td
                        colSpan={8}
                        role="region"
                        aria-label={(t('matrix.detailsAriaLabel') as (name: string) => string)(protocol.name)}
                        style={{ padding: 0 }}
                      >
                        <div style={{
                          background: 'var(--color-brand-bg)',
                          border: '2px solid rgba(139, 69, 19, 0.25)',
                          borderRadius: '0.75rem',
                          padding: '1.25rem',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                          margin: '0.5rem 0.75rem 0.75rem',
                          overflowWrap: 'break-word',
                          wordBreak: 'break-word',
                        }}>
                          {/* Header: name + entity badge + close */}
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            gap: '0.75rem',
                            marginBottom: '0.75rem',
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
                              <h3 style={{
                                fontSize: '1.125rem',
                                fontWeight: 700,
                                color: 'var(--color-brand-primary)',
                                margin: 0,
                                lineHeight: 1.3,
                              }}>
                                {protocol.name}
                              </h3>
                              <span style={{
                                ...ENTITY_BADGE_STYLE,
                                display: 'inline-block',
                                padding: '0.25rem 0.625rem',
                                borderRadius: '9999px',
                              }}>
                                {protocol.entityType}
                              </span>
                            </div>
                            <button
                              onClick={e => { e.stopPropagation(); closeExpand(protocol.id) }}
                              aria-label={t('matrix.closeDetails') as string}
                              tabIndex={0}
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

                          {/* Description */}
                          {protocol.description && (
                            <p style={{
                              fontSize: '0.9375rem',
                              lineHeight: 1.6,
                              color: 'var(--color-brand-text)',
                              margin: '0 0 0.75rem 0',
                            }}>
                              {protocol.description}
                            </p>
                          )}

                          {/* View full page CTA — prominent, left-aligned */}
                          <div style={{ marginBottom: '1rem' }}>
                            <a
                              href={`${localePrefix}/prototype/protocols/${protocol.id}`}
                              onClick={e => e.stopPropagation()}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.375rem',
                                padding: '0.625rem 1.25rem',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: 'white',
                                background: 'var(--color-brand-primary)',
                                border: 'none',
                                borderRadius: '0.5rem',
                                textDecoration: 'none',
                                transition: 'opacity 0.15s ease',
                                minHeight: '44px',
                                minWidth: '44px',
                              }}
                              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
                              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                              onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-focus-ring)' }}
                              onBlur={e => { e.currentTarget.style.boxShadow = '' }}
                              data-testid={`matrix-view-full-page-${protocol.id}`}
                            >
                              {t('matrix.viewFullPage') as string}
                              <span aria-hidden="true">&rarr;</span>
                            </a>
                          </div>

                          {/* Badge row */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                            <span style={{ ...badgeBase, ...ARCH_BADGE_STYLE[protocol.architectureType] }}>
                              {t(`badge.architecture.${protocol.architectureType}`) as string}
                            </span>
                            <span style={{ ...badgeBase, ...GOV_BADGE_STYLE }}>
                              {t(`badge.governance.${protocol.governanceModel}`) as string}
                            </span>
                            <span style={{
                              ...badgeBase,
                              color: 'var(--color-brand-text)',
                              background: 'transparent',
                              border: '1px solid rgba(139, 69, 19, 0.15)',
                            }}>
                              <span
                                style={{
                                  width: '0.5rem',
                                  height: '0.5rem',
                                  borderRadius: '50%',
                                  backgroundColor: RISK_DOT_COLOR[protocol.captureRisk],
                                  flexShrink: 0,
                                }}
                                aria-hidden="true"
                              />
                              {t(`badge.captureRisk.${protocol.captureRisk}`) as string}
                            </span>
                          </div>

                          {/* Attributes grid */}
                          {detailAttrs.length > 0 && (
                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                              gap: '0.75rem 1.5rem',
                              marginBottom: '1rem',
                            }}>
                              {detailAttrs.map(attr => (
                                <div key={attr.label}>
                                  <div style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    color: 'var(--color-brand-primary)',
                                    textTransform: 'uppercase' as const,
                                    letterSpacing: '0.05em',
                                    marginBottom: '0.25rem',
                                  }}>
                                    {attr.label}
                                  </div>
                                  <div style={{
                                    fontSize: '0.8125rem',
                                    color: 'var(--color-brand-text)',
                                  }}>
                                    {attr.value}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Domain tags */}
                          {protocolDomains.length > 0 && (
                            <div style={{ marginBottom: '0.75rem' }}>
                              <div style={{ ...sectionTitle, marginBottom: '0.5rem' }}>
                                {t('matrix.useCaseDomains') as string}
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {protocolDomains.map(domain => (
                                  <a
                                    key={domain.id}
                                    href={`${localePrefix}/prototype/domains/${domain.slug}`}
                                    onClick={e => e.stopPropagation()}
                                    tabIndex={isExpanded ? 0 : -1}
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '0.25rem',
                                      background: 'var(--color-brand-accent-light)',
                                      border: '1px solid rgba(139, 69, 19, 0.15)',
                                      padding: '0.25rem 0.625rem',
                                      borderRadius: '0.375rem',
                                      fontSize: '0.8125rem',
                                      color: 'var(--color-brand-primary)',
                                      textDecoration: 'none',
                                      transition: 'all 0.15s ease',
                                      minHeight: '44px',
                                      minWidth: '44px',
                                    }}
                                    onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-focus-ring)' }}
                                    onBlur={e => { e.currentTarget.style.boxShadow = '' }}
                                  >
                                    {domain.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Affordance tags */}
                          {protocolAffordances.length > 0 && (
                            <div style={{ marginBottom: '0.75rem' }}>
                              <div style={{ ...sectionTitle, marginBottom: '0.5rem' }}>
                                {t('matrix.affordances') as string}
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {protocolAffordances.map(affordance => (
                                  <span
                                    key={affordance.id}
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      background: 'white',
                                      border: '2px solid rgba(139, 69, 19, 0.25)',
                                      padding: '0.25rem 0.625rem',
                                      borderRadius: '0.375rem',
                                      fontSize: '0.8125rem',
                                      color: 'var(--color-text-secondary)',
                                    }}
                                  >
                                    {affordance.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Community link */}
                          {protocol.communityLink && (
                            <a
                              href={protocol.communityLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              tabIndex={isExpanded ? 0 : -1}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.375rem',
                                padding: '0.5rem 0.875rem',
                                fontSize: '0.8125rem',
                                fontWeight: 600,
                                color: 'var(--color-brand-primary)',
                                background: 'var(--color-brand-accent-light)',
                                border: '1px solid rgba(139, 69, 19, 0.2)',
                                borderRadius: '0.5rem',
                                textDecoration: 'none',
                                transition: 'all 0.15s ease',
                                minHeight: '44px',
                                minWidth: '44px',
                              }}
                              onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-focus-ring)' }}
                              onBlur={e => { e.currentTarget.style.boxShadow = '' }}
                            >
                              {t('matrix.visitCommunity') as string}
                              <span aria-hidden="true">&#8599;</span>
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function DropdownFilter({
  label,
  testId,
  options,
  selected,
  onToggle,
}: {
  label: string
  testId: string
  options: Array<{ value: string; label: string }>
  selected: string[]
  onToggle: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const hasActive = selected.length > 0

  return (
    <div ref={ref} style={{ position: 'relative' }} data-testid={testId}>
      <button
        onClick={() => setOpen(prev => !prev)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.375rem',
          padding: '0.5rem 0.75rem',
          fontSize: '0.8125rem',
          fontWeight: hasActive ? 600 : 500,
          borderRadius: '0.5rem',
          cursor: 'pointer',
          minHeight: '44px',
          border: hasActive ? '2px solid var(--color-brand-primary)' : '2px solid rgba(139, 69, 19, 0.25)',
          background: hasActive ? 'var(--color-brand-accent-light)' : 'white',
          color: hasActive ? 'var(--color-brand-primary)' : 'var(--color-brand-text)',
          transition: 'all 0.15s ease',
        }}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {label}
        {hasActive && (
          <span style={{
            background: 'var(--color-brand-primary)',
            color: 'white',
            borderRadius: '9999px',
            padding: '0.0625rem 0.4375rem',
            fontSize: '0.6875rem',
            fontWeight: 700,
            lineHeight: 1.4,
          }}>
            {selected.length}
          </span>
        )}
        <ChevronDown
          size={14}
          style={{
            transition: 'transform 150ms ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div
          role="listbox"
          aria-multiselectable="true"
          aria-label={label}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 20,
            marginTop: '0.25rem',
            background: 'white',
            border: '2px solid rgba(139, 69, 19, 0.25)',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            minWidth: '180px',
            maxHeight: '260px',
            overflowY: 'auto',
            padding: '0.25rem 0',
          }}
        >
          {options.map(opt => {
            const isSelected = selected.includes(opt.value)
            return (
              <button
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => onToggle(opt.value)}
                data-testid={`${testId}-${opt.value}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.8125rem',
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? 'var(--color-brand-primary)' : 'var(--color-brand-text)',
                  background: isSelected ? 'var(--color-brand-accent-light)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  minHeight: '44px',
                  transition: 'background 0.1s ease',
                }}
                onMouseEnter={e => {
                  if (!isSelected) e.currentTarget.style.background = 'rgba(139, 69, 19, 0.04)'
                }}
                onMouseLeave={e => {
                  if (!isSelected) e.currentTarget.style.background = 'transparent'
                }}
              >
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '18px',
                  height: '18px',
                  borderRadius: '0.25rem',
                  border: isSelected
                    ? '2px solid var(--color-brand-primary)'
                    : '2px solid rgba(139, 69, 19, 0.3)',
                  background: isSelected ? 'var(--color-brand-primary)' : 'transparent',
                  color: 'white',
                  fontSize: '0.625rem',
                  flexShrink: 0,
                }}>
                  {isSelected && '\u2713'}
                </span>
                {opt.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function SortableHeader({
  label,
  sortKey,
  currentKey,
  currentDir,
  onSort,
  sticky,
  t,
}: {
  label: string
  sortKey: SortKey
  currentKey: SortKey
  currentDir: SortDir
  onSort: (key: SortKey) => void
  sticky?: boolean
  t: (key: string) => any
}) {
  const isActive = currentKey === sortKey
  const arrow = isActive ? (currentDir === 'asc' ? ' \u2191' : ' \u2193') : ''

  return (
    <th
      style={{
        ...thStyle,
        cursor: 'pointer',
        userSelect: 'none',
        ...(sticky ? { position: 'sticky' as const, left: 0, zIndex: 2, background: 'var(--color-brand-bg)' } : {}),
      }}
      onClick={() => onSort(sortKey)}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSort(sortKey) } }}
      tabIndex={0}
      role="columnheader"
      aria-sort={isActive ? (currentDir === 'asc' ? 'ascending' : 'descending') : 'none'}
      title={isActive ? (currentDir === 'asc' ? t('matrix.sortDesc') as string : t('matrix.sortAsc') as string) : t('matrix.sortAsc') as string}
    >
      {label}{arrow}
    </th>
  )
}

// ---------------------------------------------------------------------------
// Shared cell styles
// ---------------------------------------------------------------------------

const thStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  textAlign: 'left',
  fontSize: '0.75rem',
  fontWeight: 700,
  color: 'var(--color-brand-primary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  whiteSpace: 'nowrap',
  background: 'var(--color-brand-bg)',
  borderBottom: '2px solid rgba(139, 69, 19, 0.15)',
}

const tdStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  verticalAlign: 'middle',
  fontSize: '0.8125rem',
  color: 'var(--color-brand-text)',
  minHeight: '44px',
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
