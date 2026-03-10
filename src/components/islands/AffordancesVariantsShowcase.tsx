import { useState } from 'react'
import { getIcon } from '@/lib/icons'
import { Check, ChevronsUpDown } from 'lucide-react'

interface Domain {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  isPrimary: boolean
}

interface Affordance {
  id: string
  name: string
}

interface Props {
  domains: Domain[]
  affordances: Affordance[]
}

// ============================================================================
// Shared: Step header (matches homepage)
// ============================================================================
function StepHeader({ step, title, subtitle }: { step: number; title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-base font-bold shrink-0"
          style={{ backgroundColor: 'var(--color-brand-primary)', color: 'white' }}
        >
          {step}
        </div>
        <h2
          className="h-10 flex items-center text-lg font-semibold !mt-0 !mb-0"
          style={{ color: 'var(--color-brand-primary)' }}
        >
          {title}
        </h2>
      </div>
      <p className="text-sm !mb-0 mt-1 ml-[52px]" style={{ color: 'var(--color-brand-text)', opacity: 0.55 }}>
        {subtitle}
      </p>
    </div>
  )
}

// ============================================================================
// Shared: Domain cards (Card 5 — matches homepage exactly)
// ============================================================================
function DomainCards({ domains }: { domains: Domain[] }) {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {domains.map((domain) => {
        const Icon = getIcon(domain.icon)
        const isSelected = selected === domain.slug
        return (
          <button
            key={domain.id}
            type="button"
            onClick={() => setSelected(isSelected ? null : domain.slug)}
            className="card-pad-lg group relative flex flex-col rounded-2xl border transition-all duration-200 cursor-pointer text-left overflow-hidden"
            style={{
              borderColor: isSelected ? 'var(--color-brand-primary)' : 'var(--color-card-border)',
              backgroundColor: isSelected ? 'var(--color-domain-selected-bg)' : 'white',
              boxShadow: isSelected
                ? '0 8px 24px rgba(139, 69, 19, 0.14)'
                : '0 2px 8px rgba(0,0,0,0.06)',
              borderTop: isSelected ? '3px solid var(--color-brand-primary)' : '3px solid transparent',
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: isSelected ? 'var(--color-brand-primary)' : 'var(--color-brand-accent-light)' }}
            >
              <Icon className="h-5 w-5" style={{ color: isSelected ? 'white' : 'var(--color-brand-primary)' }} />
            </div>
            <span className="block text-sm font-semibold mb-2 !mt-0" style={{ color: 'var(--color-brand-text)' }}>
              {domain.name}
            </span>
            <p className="text-xs leading-relaxed !mb-0" style={{ color: 'var(--color-brand-text)', opacity: 0.6 }}>
              {domain.description}
            </p>
            {isSelected && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-brand-primary)' }}>
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}

// ============================================================================
// Shared: Variant label divider
// ============================================================================
function VariantLabel({ label, description }: { label: string; description: string }) {
  return (
    <div className="mt-14 mb-8 pb-4 border-b-2" style={{ borderColor: 'var(--color-brand-accent)' }}>
      <span
        className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2"
        style={{ color: 'white', backgroundColor: 'var(--color-brand-primary)' }}
      >
        {label}
      </span>
      <p className="text-sm !mb-0" style={{ color: 'var(--color-brand-text)', opacity: 0.65 }}>
        {description}
      </p>
    </div>
  )
}

// ============================================================================
// AFFORDANCES VARIANT A
// Inline controls: ANY/ALL pill toggle + "Select all" link sit on the SAME row
// as the section subtitle. Chips use a rounded-xl style that rhymes with cards.
// Optionality implied via muted dashed border on unselected chips.
// ============================================================================
function AffordancesVariantA({ affordances }: { affordances: Affordance[] }) {
  const [selected, setSelected] = useState<string[]>([])
  const [matchMode, setMatchMode] = useState<'or' | 'and'>('or')

  const toggle = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])

  const allSelected = affordances.every((a) => selected.includes(a.id))

  const toggleAll = () =>
    setSelected(allSelected ? [] : affordances.map((a) => a.id))

  return (
    <div>
      <StepHeader
        step={2}
        title="Refine by Affordance"
        subtitle="Narrow your results — check the affordances that matter to you"
      />

      {/* Controls row: ANY/ALL + Select all — all inline, no separate row */}
      <div className="flex items-center gap-3 mb-4 ml-[52px] flex-wrap">
        {/* ANY / ALL segmented pill */}
        <div className="flex rounded-full overflow-hidden border"
          style={{ borderColor: 'var(--color-card-border)' }}>
          {(['or', 'and'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setMatchMode(mode)}
              className="px-3 py-1 text-xs font-semibold transition-colors cursor-pointer"
              style={matchMode === mode
                ? { backgroundColor: 'var(--color-brand-primary)', color: 'white' }
                : { backgroundColor: 'white', color: 'var(--color-brand-text)' }
              }
            >
              {mode === 'or' ? 'ANY' : 'ALL'}
            </button>
          ))}
        </div>
        <span className="text-xs" style={{ color: 'var(--color-brand-text)', opacity: 0.45 }}>
          {matchMode === 'or' ? 'match any selected' : 'match all selected'}
        </span>
        <span style={{ color: 'var(--color-card-border)' }}>·</span>
        <button
          type="button"
          onClick={toggleAll}
          className="text-xs cursor-pointer underline underline-offset-2"
          style={{ color: 'var(--color-brand-primary)', opacity: 0.7 }}
        >
          {allSelected ? 'Clear all' : 'Select all'}
        </button>
      </div>

      {/* Chips — rounded-xl mirrors the card corner radius, dashed border implies optional */}
      <div className="flex flex-wrap gap-2 ml-[52px]">
        {affordances.map((a) => {
          const isSelected = selected.includes(a.id)
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => toggle(a.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm transition-all duration-150 cursor-pointer"
              style={isSelected
                ? {
                    backgroundColor: 'var(--color-domain-selected-bg)',
                    color: 'var(--color-brand-primary)',
                    border: '1px solid var(--color-brand-primary)',
                    borderTop: '2px solid var(--color-brand-primary)',
                    fontWeight: 600,
                  }
                : {
                    backgroundColor: 'white',
                    color: 'var(--color-brand-text)',
                    border: '1px dashed var(--color-card-border)',
                    opacity: 0.75,
                  }
              }
            >
              {isSelected && <Check className="w-3 h-3 shrink-0" />}
              {a.name}
            </button>
          )
        })}
        {selected.length > 0 && (
          <button
            type="button"
            onClick={() => setSelected([])}
            className="flex items-center px-3 py-1.5 rounded-xl text-sm cursor-pointer"
            style={{ color: 'var(--color-brand-primary)', opacity: 0.5, border: '1px solid transparent' }}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// AFFORDANCES VARIANT B
// Chips are pill-shaped (rounded-full) — softer, more tag-like.
// Controls row is compacted to right of step header subtitle.
// Unselected chips have a very light fill + no border to signal optionality.
// Selected chips fill solid, matching card's selected icon container color.
// ============================================================================
function AffordancesVariantB({ affordances }: { affordances: Affordance[] }) {
  const [selected, setSelected] = useState<string[]>([])
  const [matchMode, setMatchMode] = useState<'or' | 'and'>('or')

  const toggle = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])

  const allSelected = affordances.every((a) => selected.includes(a.id))

  return (
    <div>
      <StepHeader
        step={2}
        title="Refine by Affordance"
        subtitle="Narrow your results — check the affordances that matter to you"
      />

      <div className="flex flex-wrap gap-2 ml-[52px]">
        {affordances.map((a) => {
          const isSelected = selected.includes(a.id)
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => toggle(a.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer"
              style={isSelected
                ? {
                    backgroundColor: 'var(--color-brand-primary)',
                    color: 'white',
                    border: '1px solid var(--color-brand-primary)',
                  }
                : {
                    backgroundColor: 'var(--color-brand-accent-light)',
                    color: 'var(--color-brand-text)',
                    border: '1px solid transparent',
                    opacity: 0.8,
                  }
              }
            >
              {isSelected && <Check className="w-3 h-3 shrink-0" />}
              {a.name}
            </button>
          )
        })}
      </div>

      {/* Inline controls below chips, compact */}
      <div className="flex items-center gap-3 mt-3 ml-[52px]">
        <div className="flex rounded-full overflow-hidden border" style={{ borderColor: 'var(--color-card-border)' }}>
          {(['or', 'and'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setMatchMode(mode)}
              className="px-3 py-1 text-xs font-semibold transition-colors cursor-pointer"
              style={matchMode === mode
                ? { backgroundColor: 'var(--color-brand-primary)', color: 'white' }
                : { backgroundColor: 'white', color: 'var(--color-brand-text)', opacity: 0.6 }
              }
            >
              {mode === 'or' ? 'ANY' : 'ALL'}
            </button>
          ))}
        </div>
        <span className="text-xs" style={{ color: 'var(--color-brand-text)', opacity: 0.4 }}>
          {matchMode === 'or' ? 'match any' : 'match all'}
        </span>
        {selected.length > 0 && (
          <>
            <span style={{ color: 'var(--color-card-border)' }}>·</span>
            <button
              type="button"
              onClick={() => setSelected([])}
              className="text-xs cursor-pointer underline underline-offset-2"
              style={{ color: 'var(--color-brand-primary)', opacity: 0.6 }}
            >
              Clear all
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// AFFORDANCES VARIANT C
// Chips styled as mini-cards — same border radius (rounded-xl), same top-border
// accent on selection as the domain cards. Strong visual family connection.
// ANY/ALL and select-all tucked into a single compact line above the chips.
// ============================================================================
function AffordancesVariantC({ affordances }: { affordances: Affordance[] }) {
  const [selected, setSelected] = useState<string[]>([])
  const [matchMode, setMatchMode] = useState<'or' | 'and'>('or')

  const toggle = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])

  const allSelected = affordances.every((a) => selected.includes(a.id))
  const toggleAll = () => setSelected(allSelected ? [] : affordances.map((a) => a.id))

  return (
    <div>
      <StepHeader
        step={2}
        title="Refine by Affordance"
        subtitle="Narrow your results — check the affordances that matter to you"
      />

      {/* Single compact control row */}
      <div className="flex items-center justify-between mb-4 ml-[52px]">
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: 'var(--color-brand-text)', opacity: 0.45 }}>Match:</span>
          <div className="flex rounded-md overflow-hidden border" style={{ borderColor: 'var(--color-card-border)' }}>
            {(['or', 'and'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setMatchMode(mode)}
                className="px-2.5 py-0.5 text-xs font-bold transition-colors cursor-pointer"
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
          onClick={toggleAll}
          className="text-xs cursor-pointer"
          style={{ color: 'var(--color-brand-primary)', opacity: 0.6 }}
        >
          {allSelected ? 'Clear all' : 'Select all'}
        </button>
      </div>

      {/* Mini-card chips — top border accent matches domain card pattern */}
      <div className="flex flex-wrap gap-2 ml-[52px]">
        {affordances.map((a) => {
          const isSelected = selected.includes(a.id)
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => toggle(a.id)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all duration-150 cursor-pointer overflow-hidden"
              style={isSelected
                ? {
                    backgroundColor: 'var(--color-domain-selected-bg)',
                    color: 'var(--color-brand-primary)',
                    border: '1px solid var(--color-brand-primary)',
                    borderTop: '2px solid var(--color-brand-primary)',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(139, 69, 19, 0.10)',
                  }
                : {
                    backgroundColor: 'white',
                    color: 'var(--color-brand-text)',
                    border: '1px solid var(--color-card-border)',
                    borderTop: '2px solid transparent',
                    opacity: 0.7,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
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

// ============================================================================
// AFFORDANCES VARIANT C2 — Variant C with more defined borders
// ============================================================================
function AffordancesVariantC2({ affordances }: { affordances: Affordance[] }) {
  const [selected, setSelected] = useState<string[]>([])
  const [matchMode, setMatchMode] = useState<'or' | 'and'>('or')

  const toggle = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])

  const allSelected = affordances.every((a) => selected.includes(a.id))
  const toggleAll = () => setSelected(allSelected ? [] : affordances.map((a) => a.id))

  return (
    <div>
      <StepHeader
        step={2}
        title="Refine by Affordance"
        subtitle="Narrow your results — check the affordances that matter to you"
      />

      <div className="flex items-center justify-between mb-4 ml-[52px]">
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: 'var(--color-brand-text)', opacity: 0.45 }}>Match:</span>
          <div className="flex rounded-md overflow-hidden border" style={{ borderColor: 'var(--color-card-border)' }}>
            {(['or', 'and'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setMatchMode(mode)}
                className="px-2.5 py-0.5 text-xs font-bold transition-colors cursor-pointer"
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
          onClick={toggleAll}
          className="text-xs cursor-pointer"
          style={{ color: 'var(--color-brand-primary)', opacity: 0.6 }}
        >
          {allSelected ? 'Clear all' : 'Select all'}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 ml-[52px]">
        {affordances.map((a) => {
          const isSelected = selected.includes(a.id)
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => toggle(a.id)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all duration-150 cursor-pointer overflow-hidden"
              style={isSelected
                ? {
                    backgroundColor: 'var(--color-domain-selected-bg)',
                    color: 'var(--color-brand-primary)',
                    border: '2px solid var(--color-brand-primary)',
                    borderTop: '3px solid var(--color-brand-primary)',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(139, 69, 19, 0.10)',
                  }
                : {
                    backgroundColor: 'white',
                    color: 'var(--color-brand-text)',
                    border: '2px solid rgba(139, 69, 19, 0.25)',
                    borderTop: '3px solid transparent',
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
export default function AffordancesVariantsShowcase({ domains, affordances }: Props) {
  return (
    <div>
      {/* Step 1 — same as homepage, shown once as shared context */}
      <StepHeader
        step={1}
        title="Choose a Use Case Domain"
        subtitle="Select the category that best describes your need"
      />
      <DomainCards domains={domains} />

      <VariantLabel
        label="Affordances Variant A"
        description="Rounded-xl chips mirror card corners. ANY/ALL + Select all on one compact row above chips. Dashed border on unselected chips signals optionality."
      />
      <AffordancesVariantA affordances={affordances} />

      <VariantLabel
        label="Affordances Variant B"
        description="Pill-shaped chips (rounded-full) — softer, tag-like. Unselected chips use light warm fill with no border to signal they are optional. Controls compact below chips."
      />
      <AffordancesVariantB affordances={affordances} />

      <VariantLabel
        label="Affordances Variant C"
        description="Mini-cards with the same top-border accent as domain cards — strong visual family. ANY/ALL and Select all on a single justified row above chips."
      />
      <AffordancesVariantC affordances={affordances} />

      <VariantLabel
        label="Affordances Variant C2"
        description="Same as C but with a more defined 2px border on unselected chips so they stand out clearly against the light background."
      />
      <AffordancesVariantC2 affordances={affordances} />
    </div>
  )
}
