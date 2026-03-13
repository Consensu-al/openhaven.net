import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import type { Affordance } from '@/lib/types'
import StepHeader from '@/components/islands/StepHeader'
import { useTranslations } from '@/i18n'

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
  const t = useTranslations(locale)
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
        title={t('affordances.title') as string}
        subtitle={t('affordances.subtitle') as string}
        badge={t('affordances.badge') as string}
      />

      {/* Controls row: Match mode + Select/Clear all */}
      <div className="flex items-center justify-between mb-4 ml-[52px]">
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: 'var(--color-brand-text)', opacity: 0.45 }}>{t('affordances.matchLabel')}</span>
          <div className="flex rounded-md overflow-hidden border" role="radiogroup" aria-label={t('affordances.matchModeLabel') as string} style={{ borderColor: 'var(--color-card-border)' }}>
            {(['or', 'and'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                role="radio"
                aria-checked={matchMode === mode}
                onClick={() => onMatchModeChange(mode)}
                className="px-2.5 py-1 text-xs font-bold transition-colors cursor-pointer"
                style={matchMode === mode
                  ? { backgroundColor: 'var(--color-brand-primary)', color: 'white' }
                  : { backgroundColor: 'white', color: 'var(--color-brand-text)', opacity: 0.5 }
                }
              >
                {mode === 'or' ? t('affordances.matchAny') : t('affordances.matchAll')}
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
          {someChecked ? t('affordances.clearAll') : t('affordances.selectAll')}
        </button>
      </div>

      {/* Visual nudge callout — shows when no affordances checked */}
      {!someChecked && (
        <div
          role="status"
          data-testid="affordances-nudge"
          className="nudge-callout flex items-center gap-2 ml-[52px] mb-3 px-4 py-3 rounded-xl text-sm"
          style={{
            backgroundColor: 'var(--color-brand-accent-light)',
            color: 'var(--color-brand-primary)',
            border: '1px solid var(--color-brand-accent)',
          }}
        >
          {t('affordances.nudge')}
        </div>
      )}

      {/* Affordance chips — C2 style */}
      <div className="flex flex-wrap gap-2 ml-[52px]" role="group" aria-label={t('affordances.filtersLabel') as string}>
        {affordances.map((a) => {
          const isSelected = selectedAffordances.includes(a.id)
          return (
            <button
              key={a.id}
              type="button"
              aria-pressed={isSelected}
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
