import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import type { Domain, Affordance, Protocol } from '@/lib/types'
import DomainGrid from '@/components/islands/DomainGrid'
import GuidedDiscoveryCTA from '@/components/islands/GuidedDiscoveryCTA'
import GuidedDiscoveryWizard from '@/components/islands/GuidedDiscoveryWizard'
import AffordancesPanel from '@/components/islands/AffordancesPanel'
import ProtocolResults from '@/components/islands/ProtocolResults'
import StepHeader from '@/components/islands/StepHeader'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Info } from 'lucide-react'

const NAVIGATOR_STRINGS = {
  heading: 'Choose a Use Case Domain',
  stepIndicator: 'Step 1',
  emptyState:
    'No use case domains are loaded yet — check back soon as we\'re actively mapping the open protocol landscape.',
  showingResults: 'Showing results for:',
  resultsHeading: 'Protocols',
  allProtocolsHint: (name: string) => `Showing all ${name} protocols — check affordances above to refine`,
  step2Indicator: 'Step 2',
  step2Heading: 'Refine Results',
} as const

/** Update URL query string while preserving any hash fragment */
function updateUrl(params: URLSearchParams) {
  const qs = params.toString()
  const hash = window.location.hash
  const base = qs ? `?${qs}` : window.location.pathname
  window.history.replaceState({}, '', `${base}${hash}`)
}

interface NavigatorSectionProps {
  domains: Domain[]
  affordances: Affordance[]
  protocols: Protocol[]
  locale?: string
}

export default function NavigatorSection({ domains, affordances, protocols, locale = 'en' }: NavigatorSectionProps) {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
  const [selectedAffordances, setSelectedAffordances] = useState<string[]>([])
  const [matchMode, setMatchMode] = useState<'or' | 'and'>('or')
  const [wizardOpen, setWizardOpen] = useState(false)
  const ctaButtonRef = useRef<HTMLButtonElement>(null)

  // Restore all state from current URL
  const restoreFromUrl = useCallback(() => {
    const params = new URLSearchParams(window.location.search)
    const useCase = params.get('useCase')
    if (!useCase) {
      setSelectedDomain(null)
      setSelectedAffordances([])
      setMatchMode('or')
      return
    }
    setSelectedDomain(useCase)
    const affordanceParam = params.get('affordance')
    if (affordanceParam !== null) {
      const domainAffs = affordances.filter(a => a.domainIds.includes(useCase))
      const urlIds = affordanceParam.split(',').filter(Boolean)
      const validIds = urlIds.filter(id => domainAffs.some(a => a.id === id))
      setSelectedAffordances(validIds)
    } else {
      // No affordance param = no affordance filter (additive model)
      setSelectedAffordances([])
    }
    setMatchMode(params.get('matchMode') === 'and' ? 'and' : 'or')
  }, [affordances])

  // Restore on mount + sync on browser back/forward
  useEffect(() => {
    restoreFromUrl()
    const onPopState = () => restoreFromUrl()
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [restoreFromUrl])

  const selectDomain = useCallback((slug: string | null) => {
    setSelectedDomain(slug)
    const params = new URLSearchParams(window.location.search)
    if (slug) {
      params.set('useCase', slug)
      // Start with no affordances checked (additive model)
      setSelectedAffordances([])
    } else {
      params.delete('useCase')
      setSelectedAffordances([])
    }
    // Reset affordance + matchMode when domain changes
    params.delete('affordance')
    params.delete('matchMode')
    setMatchMode('or')
    updateUrl(params)
  }, [])

  const toggleAffordance = useCallback((id: string) => {
    if (!selectedDomain) return
    const domainAffs = affordances.filter(a => a.domainIds.includes(selectedDomain))
    setSelectedAffordances(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      // Defer URL update to avoid mixing DOM reads with React batched updates
      queueMicrotask(() => {
        const params = new URLSearchParams(window.location.search)
        if (next.length === 0) {
          params.delete('affordance')
        } else {
          const allChecked = domainAffs.every(a => next.includes(a.id))
          if (allChecked) {
            params.delete('affordance')
          } else {
            params.set('affordance', next.join(','))
          }
        }
        updateUrl(params)
      })
      return next
    })
  }, [affordances, selectedDomain])

  const handleMatchModeChange = useCallback((mode: 'or' | 'and') => {
    setMatchMode(mode)
    const params = new URLSearchParams(window.location.search)
    if (mode === 'and') {
      params.set('matchMode', 'and')
    } else {
      params.delete('matchMode')
    }
    updateUrl(params)
  }, [])

  const handleWizardSelect = useCallback((slug: string) => {
    selectDomain(slug)
    setWizardOpen(false)
  }, [selectDomain])

  const handleWizardClose = useCallback(() => {
    setWizardOpen(false)
    // Return focus to CTA button
    ctaButtonRef.current?.focus()
  }, [])

  const selectedDomainData = selectedDomain
    ? domains.find((d) => d.slug === selectedDomain)
    : null

  // Derived value — memoized to avoid re-filtering on every render
  const domainAffordances = useMemo(
    () => selectedDomain
      ? affordances.filter(a => a.domainIds.includes(selectedDomain))
      : [],
    [affordances, selectedDomain]
  )

  if (domains.length === 0) {
    return (
      <div className="text-center py-12">
        <p style={{ color: 'var(--color-brand-text)', opacity: 0.7 }}>
          {NAVIGATOR_STRINGS.emptyState}
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Step 1 heading */}
      <StepHeader
        step={1}
        title="Choose a Use Case"
        subtitle="Select the category that best describes your need"
        badge="Required"
      />

      {/* Domain Grid */}

      {/* Guided Discovery Wizard — modal dialog */}
      <GuidedDiscoveryWizard
        domains={domains}
        open={wizardOpen}
        onSelectDomain={handleWizardSelect}
        onClose={handleWizardClose}
      />

      {/* Step 1: Domain Grid — always rendered */}
      <DomainGrid
        domains={domains}
        selectedDomain={selectedDomain}
        onSelectDomain={selectDomain}
      />

      {/* Step 2: Affordances Panel — render when domain is selected */}
      {selectedDomain && domainAffordances.length > 0 && (
        <div className="mt-12">
          <AffordancesPanel
          key={selectedDomain}
          affordances={domainAffordances}
          selectedAffordances={selectedAffordances}
          onToggle={toggleAffordance}
          matchMode={matchMode}
          onMatchModeChange={handleMatchModeChange}
          locale={locale}
        />
        </div>
      )}

      {/* Protocol Results — only rendered when a domain is selected */}
      {selectedDomain && selectedDomainData && (
        <div className="mt-12" key={`results-${selectedDomain}`}>
          <Tooltip.Provider delayDuration={200}>
          <StepHeader
            step={3}
            title="Review Matching Protocols"
            subtitle={
              <>
                Showing only{' '}
                <span
                  className="font-semibold px-1.5 py-0.5 rounded"
                  style={{
                    color: 'var(--color-brand-primary)',
                    backgroundColor: 'var(--color-brand-accent-light)',
                  }}
                >
                  {selectedDomainData.name}
                </span>
                {' '}protocols.
                {selectedAffordances.length > 0 && (
                  <span> — filtered by {selectedAffordances.length} affordance{selectedAffordances.length > 1 ? 's' : ''}</span>
                )}

                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center cursor-pointer align-middle ml-1"
                      style={{
                        width: '1rem',
                        height: '1rem',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-brand-accent-light)',
                        border: '1px solid rgba(139, 69, 19, 0.3)',
                        verticalAlign: 'middle',
                        position: 'relative',
                        top: '-1px',
                      }}
                    >
                      <Info className="w-2.5 h-2.5" style={{ color: 'var(--color-brand-primary)' }} />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="z-50 max-w-xs rounded-lg px-3 py-2 text-xs shadow-lg"
                      style={{
                        backgroundColor: 'var(--color-brand-primary)',
                        color: 'white',
                        lineHeight: 1.5,
                      }}
                      sideOffset={6}
                    >
                      To see others, scroll up to Step 1 to change your selected Use Case or view the full Matrix.
                      <Tooltip.Arrow style={{ fill: 'var(--color-brand-primary)' }} />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </>
            }
          />
          </Tooltip.Provider>
          <ProtocolResults
            protocols={protocols}
            selectedDomain={selectedDomain}
            selectedAffordances={selectedAffordances}
            matchMode={matchMode}
            locale={locale}
          />
        </div>
      )}
    </div>
  )
}
