import { useState } from 'react'
import { getIcon } from '@/lib/icons'
import { HelpCircle, Check } from 'lucide-react'

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
  domainIds: string[]
}

interface Props {
  domains: Domain[]
  affordances: Affordance[]
}

// Shared section header label
function SectionHeader({ variant, description }: { variant: string; description: string }) {
  return (
    <div className="mb-10 pb-5 border-b-2" style={{ borderColor: 'var(--color-brand-accent)' }}>
      <span
        className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3"
        style={{ color: 'white', backgroundColor: 'var(--color-brand-primary)' }}
      >
        {variant}
      </span>
      <p className="text-sm" style={{ color: 'var(--color-brand-text)', opacity: 0.7 }}>
        {description}
      </p>
    </div>
  )
}

// Shared step subheader: large numbered circle + title + indented subtitle (from D)
function StepHeader({ step, title, subtitle }: { step: number; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold shrink-0"
        style={{ backgroundColor: 'var(--color-brand-primary)', color: 'white' }}
      >
        {step}
      </div>
      <div>
        <h2 className="text-xl font-semibold leading-tight" style={{ color: 'var(--color-brand-primary)' }}>
          {title}
        </h2>
        <p className="text-sm mt-0.5" style={{ color: 'var(--color-brand-text)', opacity: 0.55 }}>
          {subtitle}
        </p>
      </div>
    </div>
  )
}

// ============================================================================
// VARIANT B: Left-aligned cards, smaller icon, generous spacing
// ============================================================================
function VariantB({ domains }: { domains: Domain[] }) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="variant-section">
      <SectionHeader
        variant="Variant B: Enhanced Visual Hierarchy"
        description="Left-aligned text, smaller icons, generous padding. Step number prominently circles the digit."
      />

      {/* CTA bar */}
      <div
        className="flex items-center justify-between rounded-xl px-6 py-4 mb-10"
        style={{
          backgroundColor: 'rgba(139, 69, 19, 0.04)',
          border: '1px dashed var(--color-brand-primary)',
        }}
      >
        <div>
          <p className="text-sm font-medium" style={{ color: 'var(--color-brand-primary)' }}>
            Not sure where to start?
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-brand-text)', opacity: 0.6 }}>
            Let us guide you to the right protocols
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer"
          style={{
            backgroundColor: 'white',
            color: 'var(--color-brand-primary)',
            border: '2px solid var(--color-brand-primary)',
          }}
        >
          <HelpCircle className="w-4 h-4" />
          Guide me
        </button>
      </div>

      <StepHeader
        step={1}
        title="Choose a Use Case Domain"
        subtitle="Select the category that best describes your need"
      />

      {/* Cards: left-aligned, smaller icon, generous internal padding */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {domains.slice(0, 6).map((domain) => {
          const Icon = getIcon(domain.icon)
          const isSelected = selected === domain.slug
          return (
            <button
              key={domain.id}
              type="button"
              onClick={() => setSelected(isSelected ? null : domain.slug)}
              className="group relative flex flex-col items-start rounded-2xl border-2 p-6 transition-all duration-200 cursor-pointer text-left"
              style={{
                borderColor: isSelected ? 'var(--color-brand-primary)' : 'var(--color-card-border)',
                backgroundColor: isSelected ? 'var(--color-domain-selected-bg)' : 'white',
                boxShadow: isSelected
                  ? '0 6px 20px rgba(139, 69, 19, 0.12)'
                  : '0 2px 8px rgba(0,0,0,0.05)',
              }}
            >
              {isSelected && (
                <div
                  className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-brand-primary)' }}
                >
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              {/* Small icon container */}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                style={{
                  backgroundColor: isSelected
                    ? 'var(--color-brand-primary)'
                    : 'var(--color-brand-accent-light)',
                }}
              >
                <Icon
                  className="h-5 w-5"
                  style={{ color: isSelected ? 'white' : 'var(--color-brand-primary)' }}
                />
              </div>
              <span
                className="text-base font-semibold mb-2 leading-snug"
                style={{ color: 'var(--color-brand-text)' }}
              >
                {domain.name}
              </span>
              <p
                className="text-xs leading-relaxed"
                style={{ color: 'var(--color-brand-text)', opacity: 0.6 }}
              >
                {domain.description}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================================
// VARIANT C: Compact List Style (with upgraded step header)
// ============================================================================
function VariantC({ domains }: { domains: Domain[] }) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="variant-section">
      <SectionHeader
        variant="Variant C: Compact List"
        description="Horizontal list layout for fast scanning, inline icon, generous row padding."
      />

      {/* Minimal CTA */}
      <div className="flex items-center justify-center gap-2 mb-10">
        <span className="text-sm" style={{ color: 'var(--color-brand-text)', opacity: 0.6 }}>
          Not sure?
        </span>
        <button
          type="button"
          className="text-sm font-medium underline underline-offset-2 cursor-pointer"
          style={{ color: 'var(--color-brand-primary)' }}
        >
          Help me choose
        </button>
      </div>

      <StepHeader
        step={1}
        title="Choose a Use Case Domain"
        subtitle="What type of interaction are you looking to enable?"
      />

      {/* List rows */}
      <div className="flex flex-col gap-3">
        {domains.slice(0, 6).map((domain) => {
          const Icon = getIcon(domain.icon)
          const isSelected = selected === domain.slug
          return (
            <button
              key={domain.id}
              type="button"
              onClick={() => setSelected(isSelected ? null : domain.slug)}
              className="flex items-center gap-5 rounded-xl border px-5 py-4 transition-all duration-200 cursor-pointer text-left"
              style={{
                borderColor: isSelected ? 'var(--color-brand-primary)' : 'var(--color-card-border)',
                backgroundColor: isSelected ? 'var(--color-domain-selected-bg)' : 'white',
                boxShadow: isSelected
                  ? '0 4px 12px rgba(139, 69, 19, 0.10)'
                  : '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: isSelected
                    ? 'var(--color-brand-primary)'
                    : 'var(--color-brand-accent-light)',
                }}
              >
                <Icon
                  className="h-5 w-5"
                  style={{ color: isSelected ? 'white' : 'var(--color-brand-primary)' }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <span
                  className="text-sm font-semibold block mb-0.5"
                  style={{ color: 'var(--color-brand-text)' }}
                >
                  {domain.name}
                </span>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--color-brand-text)', opacity: 0.6 }}
                >
                  {domain.description}
                </p>
              </div>
              {isSelected && (
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'var(--color-brand-primary)' }}
                >
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================================
// Main Showcase Component
// ============================================================================
export default function NavigatorVariantsShowcase({ domains, affordances }: Props) {
  return (
    <div className="space-y-16">
      <VariantB domains={domains} />
      <hr style={{ borderColor: 'var(--color-card-border)', margin: '3rem 0' }} />
      <VariantC domains={domains} />
    </div>
  )
}
