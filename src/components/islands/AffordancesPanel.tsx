import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import type { Affordance } from '@/lib/types'
import StepHeader from '@/components/islands/StepHeader'

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

  const handleSelectClear = () => {
    if (someChecked) {
      selectedAffordances.forEach(id => onToggle(id))
    } else {
      affordances
        .filter(a => !selectedAffordances.includes(a.id))
        .forEach(a => onToggle(a.id))
    }
  }

  return (
    <div
      className="mt-8 mb-4"
      data-testid="affordances-panel"
    >
      {/* Step 2 heading */}
      <StepHeader
        step={2}
        title="Refine by Affordance"
        subtitle="Narrow your results — check the affordances that matter to you"
      />

      {/* Controls row: Match mode + Select/Clear all */}
      <div className="flex items-center justify-between mb-4 ml-[52px]">
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: 'var(--color-brand-text)', opacity: 0.45 }}>Match:</span>
          <div className="flex rounded-md overflow-hidden border" style={{ borderColor: 'var(--color-card-border)' }}>
            {(['or', 'and'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => onMatchModeChange(mode)}
                className="px-2.5 py-1 text-xs font-bold transition-colors cursor-pointer"
                style={matchMode === mode
                  ? { backgroundColor: 'var(--color-brand-primary)', color: 'white' }
                  : { backgroundColor: 'white', color: 'var(--color-brand-text)', opacity: 0.5 }
                }
              >
                {mode === 'or' ? 'ANY' : 'ALL'}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={handleSelectClear}
          className="text-xs cursor-pointer"
          style={{ color: 'var(--color-brand-primary)', opacity: 0.6 }}
        >
          {someChecked ? 'Clear all' : 'Select all'}
        </button>
      </div>

      {/* Affordance chips — C2 style */}
      <div className="flex flex-wrap gap-2 ml-[52px]">
        {affordances.map((a) => {
          const isSelected = selectedAffordances.includes(a.id)
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => onToggle(a.id)}
              data-testid={`affordance-chip-${a.id}`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all duration-150 cursor-pointer"
              style={isSelected
                ? {
                    backgroundColor: 'var(--color-domain-selected-bg)',
                    color: 'var(--color-brand-primary)',
                    border: '2px solid var(--color-brand-primary)',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(139, 69, 19, 0.10)',
                  }
                : {
                    backgroundColor: 'white',
                    color: 'var(--color-brand-text)',
                    border: '2px solid rgba(139, 69, 19, 0.25)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  }
              }
            >
              {isSelected && <Check className="w-3 h-3 shrink-0" />}
              {a.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
