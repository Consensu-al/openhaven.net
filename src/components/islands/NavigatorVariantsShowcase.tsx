import { useState } from 'react'
import { getIcon } from '@/lib/icons'
import { Check, Compass, Sparkles } from 'lucide-react'

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
      <p className="text-sm !mb-0" style={{ color: 'var(--color-brand-text)', opacity: 0.7 }}>
        {description}
      </p>
    </div>
  )
}

// Step subheader: circle + title on same line, subtitle indented below
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

// Domain card grid — icon on left, text on right
function DomainCards({ domains }: { domains: Domain[] }) {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {domains.slice(0, 6).map((domain) => {
        const Icon = getIcon(domain.icon)
        const isSelected = selected === domain.slug
        return (
          <button
            key={domain.id}
            type="button"
            onClick={() => setSelected(isSelected ? null : domain.slug)}
            className="domain-card-btn group relative flex items-start gap-3 rounded-xl border-2 transition-all duration-200 cursor-pointer text-left"
            style={{
              borderColor: isSelected ? 'var(--color-brand-primary)' : 'var(--color-card-border)',
              backgroundColor: isSelected ? 'var(--color-domain-selected-bg)' : 'white',
              boxShadow: isSelected
                ? '0 4px 14px rgba(139, 69, 19, 0.12)'
                : '0 1px 4px rgba(0,0,0,0.05)',
            }}
          >
            {/* Icon */}
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
              style={{
                backgroundColor: isSelected ? 'var(--color-brand-primary)' : 'var(--color-brand-accent-light)',
              }}
            >
              <Icon
                className="h-4 w-4"
                style={{ color: isSelected ? 'white' : 'var(--color-brand-primary)' }}
              />
            </div>
            {/* Text */}
            <div className="flex-1 min-w-0">
              <span
                className="block text-sm font-semibold leading-snug mb-1"
                style={{ color: 'var(--color-brand-text)' }}
              >
                {domain.name}
              </span>
              <p
                className="text-xs leading-relaxed !mb-0"
                style={{ color: 'var(--color-brand-text)', opacity: 0.6 }}
              >
                {domain.description}
              </p>
            </div>
            {/* Selected checkmark */}
            {isSelected && (
              <div
                className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-brand-primary)' }}
              >
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
// CTA VARIANT B: Left border accent, full-width
// ============================================================================
function CtaVariantB() {
  return (
    <div
      className="cta-bar flex items-center justify-between rounded-lg mb-8"
      style={{
        backgroundColor: 'white',
        border: '1px solid var(--color-card-border)',
        borderLeft: '4px solid var(--color-brand-primary)',
      }}
    >
      <div>
        <p className="text-sm font-semibold !mb-0" style={{ color: 'var(--color-brand-primary)' }}>
          Not sure where to start?
        </p>
        <p className="text-xs !mb-0 mt-0.5" style={{ color: 'var(--color-brand-text)', opacity: 0.65 }}>
          Let us guide you to the right protocols
        </p>
      </div>
      <button
        type="button"
        className="guide-me-btn flex items-center gap-2 rounded-lg text-sm font-semibold cursor-pointer shrink-0 ml-6"
        style={{
          backgroundColor: 'var(--color-brand-accent-light)',
          color: 'var(--color-brand-primary)',
          border: '1px solid var(--color-brand-accent)',
        }}
      >
        <Compass className="w-4 h-4" />
        Guide me
      </button>
    </div>
  )
}

// ============================================================================
// CTA VARIANT B2: Left border accent, centered/hugged, warm tinted background
// ============================================================================
function CtaVariantB2() {
  return (
    <div className="flex justify-center mb-8">
      <div
        className="cta-bar flex items-center gap-6 rounded-lg"
        style={{
          backgroundColor: 'rgba(139,69,19,0.04)',
          border: '1px solid var(--color-brand-accent)',
          borderLeft: '4px solid var(--color-brand-primary)',
          maxWidth: '480px',
          width: '100%',
        }}
      >
        <Sparkles className="w-5 h-5 shrink-0" style={{ color: 'var(--color-brand-primary)' }} />
        <div className="flex-1">
          <p className="text-sm font-semibold !mb-0" style={{ color: 'var(--color-brand-primary)' }}>
            Not sure where to start?
          </p>
          <p className="text-xs !mb-0 mt-0.5" style={{ color: 'var(--color-brand-text)', opacity: 0.65 }}>
            Let us guide you to the right protocols
          </p>
        </div>
        <button
          type="button"
          className="guide-me-btn flex items-center gap-2 rounded-lg text-sm font-semibold cursor-pointer shrink-0"
          style={{
            backgroundColor: 'var(--color-brand-accent-light)',
            color: 'var(--color-brand-primary)',
            border: '1px solid var(--color-brand-accent)',
          }}
        >
          <Compass className="w-4 h-4" />
          Guide me
        </button>
      </div>
    </div>
  )
}

// ============================================================================
// CTA VARIANT C: Compact inline, icon + text, ghost button
// ============================================================================
function CtaVariantC() {
  return (
    <div
      className="flex items-center gap-3 rounded-lg px-5 py-3 mb-8"
      style={{
        backgroundColor: 'rgba(139,69,19,0.04)',
        border: '1px solid var(--color-card-border)',
      }}
    >
      <Sparkles className="w-4 h-4 shrink-0" style={{ color: 'var(--color-brand-primary)' }} />
      <p className="text-sm !mb-0 flex-1" style={{ color: 'var(--color-brand-text)', opacity: 0.75 }}>
        Not sure where to start?{' '}
        <button
          type="button"
          className="font-semibold cursor-pointer"
          style={{ color: 'var(--color-brand-primary)' }}
        >
          Let us guide you.
        </button>
      </p>
    </div>
  )
}

// ============================================================================
// VARIANT B: Full section with 3 CTA sub-variants
// ============================================================================
function VariantB({ domains }: { domains: Domain[] }) {
  return (
    <div className="variant-section">
      <SectionHeader
        variant="Variant B: Enhanced Visual Hierarchy"
        description="Left-aligned icon + text cards, step header with numbered circle, multiple CTA styles."
      />

      <p className="text-xs font-bold uppercase tracking-wider !mb-3" style={{ color: 'var(--color-brand-primary)', opacity: 0.5 }}>CTA — Variant B: Left border, full-width</p>
      <CtaVariantB />

      <p className="text-xs font-bold uppercase tracking-wider !mb-3" style={{ color: 'var(--color-brand-primary)', opacity: 0.5 }}>CTA — Variant B2: Left border, centered, warm tint</p>
      <CtaVariantB2 />

      <p className="text-xs font-bold uppercase tracking-wider !mb-3" style={{ color: 'var(--color-brand-primary)', opacity: 0.5 }}>CTA — Variant C: Inline text</p>
      <CtaVariantC />

      <div className="step-header-wrapper">
        <StepHeader
          step={1}
          title="Choose a Use Case Domain"
          subtitle="Select the category that best describes your need"
        />
        <DomainCards domains={domains} />
      </div>
    </div>
  )
}

// ============================================================================
// Main Showcase Component
// ============================================================================
export default function NavigatorVariantsShowcase({ domains, affordances }: Props) {
  return (
    <div>
      <VariantB domains={domains} />
    </div>
  )
}
