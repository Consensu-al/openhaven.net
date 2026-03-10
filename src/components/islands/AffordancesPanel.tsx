import { useState, useEffect } from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Check } from 'lucide-react'
import type { Affordance } from '@/lib/types'
import StepHeader from '@/components/islands/StepHeader'

const AFFORDANCES_STRINGS = {
  stepIndicator: 'Step 2',
  heading: 'Refine by Affordance',
  helperText: 'Check affordances to narrow results',
  nudgeText: 'Narrow your results — check the affordances that matter to you',
  groupLabel: 'Refine by affordance',
  matchModeLabel: 'Filter mode',
  matchModeOr: 'ANY',
  matchModeAnd: 'ALL',
  matchModeOrDesc: 'Show protocols matching ANY selected affordance',
  matchModeAndDesc: 'Show only protocols matching ALL selected affordances',
  selectAll: 'Select all',
  clearAll: 'Clear all',
} as const

interface AffordancesPanelProps {
  affordances: Affordance[]
  selectedAffordances: string[]
  onToggle: (id: string) => void
  matchMode: 'or' | 'and'
  onMatchModeChange: (mode: 'or' | 'and') => void
  locale?: string
}

export default function AffordancesPanel({
  affordances,
  selectedAffordances,
  onToggle,
  matchMode,
  onMatchModeChange,
  locale = 'en',
}: AffordancesPanelProps) {
  const allChecked = affordances.every(a => selectedAffordances.includes(a.id))
  const someChecked = selectedAffordances.length > 0
  const [nudgeAnimating, setNudgeAnimating] = useState(true)

  // Stop the pulse animation after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setNudgeAnimating(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleSelectClear = () => {
    if (someChecked) {
      // Clear all — toggle off each selected affordance
      selectedAffordances.forEach(id => onToggle(id))
    } else {
      // Select all — toggle on each unselected affordance
      affordances
        .filter(a => !selectedAffordances.includes(a.id))
        .forEach(a => onToggle(a.id))
    }
  }

  return (
    <div
      className="affordances-panel-enter mt-8 mb-4"
      data-testid="affordances-panel"
    >
      {/* Step 2 heading */}
      <StepHeader
        step={2}
        title="Refine by Affordance"
        subtitle="Narrow your results — check the affordances that matter to you"
      />

      {/* AND/OR toggle */}
      <div className="text-center mb-6">
        <div
          className="flex items-center justify-center gap-2"
          role="radiogroup"
          aria-label={AFFORDANCES_STRINGS.matchModeLabel}
          data-testid="match-mode-toggle"
        >
          <button
            type="button"
            role="radio"
            aria-checked={matchMode === 'or'}
            onClick={() => onMatchModeChange('or')}
            className="px-3 py-1 min-h-[44px] rounded-l-full border text-sm font-medium transition-colors cursor-pointer"
            style={matchMode === 'or'
              ? {
                  backgroundColor: 'var(--color-brand-primary)',
                  color: 'var(--color-brand-bg)',
                  borderColor: 'var(--color-brand-primary)',
                }
              : {
                  backgroundColor: 'var(--color-chip-unchecked-bg)',
                  color: 'var(--color-brand-text)',
                  borderColor: 'var(--color-card-border)',
                }
            }
          >
            {AFFORDANCES_STRINGS.matchModeOr}
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={matchMode === 'and'}
            onClick={() => onMatchModeChange('and')}
            className="px-3 py-1 min-h-[44px] rounded-r-full border text-sm font-medium transition-colors cursor-pointer"
            style={matchMode === 'and'
              ? {
                  backgroundColor: 'var(--color-brand-primary)',
                  color: 'var(--color-brand-bg)',
                  borderColor: 'var(--color-brand-primary)',
                }
              : {
                  backgroundColor: 'var(--color-chip-unchecked-bg)',
                  color: 'var(--color-brand-text)',
                  borderColor: 'var(--color-card-border)',
                }
            }
          >
            {AFFORDANCES_STRINGS.matchModeAnd}
          </button>
        </div>
        <p
          className="text-xs mt-1"
          style={{ color: 'var(--color-brand-text)', opacity: 0.6 }}
          data-testid="match-mode-description"
        >
          {matchMode === 'or'
            ? AFFORDANCES_STRINGS.matchModeOrDesc
            : AFFORDANCES_STRINGS.matchModeAndDesc}
        </p>
      </div>

      {/* Affordance chips */}
      <ToggleGroup
        type="multiple"
        value={selectedAffordances}
        onValueChange={(values: string[]) => {
          const prev = selectedAffordances
          const added = values.filter((id) => !prev.includes(id))
          const removed = prev.filter((id) => !values.includes(id))
          ;[...added, ...removed].forEach((id) => onToggle(id))
        }}
        aria-label={AFFORDANCES_STRINGS.groupLabel}
        className="flex flex-wrap gap-2 justify-center"
      >
        {affordances.map((a) => {
          const isChecked = selectedAffordances.includes(a.id)
          return (
            <ToggleGroupItem
              key={a.id}
              value={a.id}
              data-testid={`affordance-chip-${a.id}`}
              className="affordance-chip rounded-full text-sm px-3 min-h-[44px] transition-colors cursor-pointer focus:ring-2 focus:ring-offset-2"
              style={
                isChecked
                  ? {
                      backgroundColor: 'var(--color-brand-accent-light)',
                      color: 'var(--color-brand-primary)',
                      border: '1px solid var(--color-brand-primary)',
                    }
                  : {
                      backgroundColor: 'var(--color-chip-unchecked-bg)',
                      color: 'var(--color-brand-text)',
                      border: '1px dashed var(--color-card-border)',
                    }
              }
            >
              {isChecked && <Check className="w-3.5 h-3.5 shrink-0 mr-1" aria-hidden="true" />}
              {a.name}
            </ToggleGroupItem>
          )
        })}
      </ToggleGroup>

      {/* Select all / Clear all toggle */}
      <div className="text-center mt-3">
        <button
          type="button"
          onClick={handleSelectClear}
          className="text-xs underline underline-offset-2 min-h-[44px] cursor-pointer"
          style={{ color: 'var(--color-brand-primary)' }}
        >
          {someChecked ? AFFORDANCES_STRINGS.clearAll : AFFORDANCES_STRINGS.selectAll}
        </button>
      </div>
    </div>
  )
}
