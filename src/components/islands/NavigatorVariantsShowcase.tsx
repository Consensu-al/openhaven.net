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

// Step subheader: circle + title on same line, subtitle below
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
// CARD VARIANT 1: Icon top, title + description below (gallery style)
// Large icon area, full description visible, clean elevation
// ============================================================================
function CardVariant1({ domains }: { domains: Domain[] }) {
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
            className="card-pad-lg group relative flex flex-col rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left"
            style={{
              borderColor: isSelected ? 'var(--color-brand-primary)' : 'var(--color-card-border)',
              backgroundColor: isSelected ? 'var(--color-domain-selected-bg)' : 'white',
              boxShadow: isSelected
                ? '0 8px 24px rgba(139, 69, 19, 0.14)'
                : '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
              style={{
                backgroundColor: isSelected ? 'var(--color-brand-primary)' : 'var(--color-brand-accent-light)',
              }}
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
// CARD VARIANT 2: Horizontal row — icon left, text right, compact
// Full-width rows like a list but with card elevation
// ============================================================================
function CardVariant2({ domains }: { domains: Domain[] }) {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <div className="flex flex-col gap-3">
      {domains.slice(0, 6).map((domain) => {
        const Icon = getIcon(domain.icon)
        const isSelected = selected === domain.slug
        return (
          <button
            key={domain.id}
            type="button"
            onClick={() => setSelected(isSelected ? null : domain.slug)}
            className="card-pad-md group relative flex items-center gap-4 rounded-xl border-2 transition-all duration-200 cursor-pointer text-left"
            style={{
              borderColor: isSelected ? 'var(--color-brand-primary)' : 'var(--color-card-border)',
              backgroundColor: isSelected ? 'var(--color-domain-selected-bg)' : 'white',
              boxShadow: isSelected
                ? '0 4px 14px rgba(139, 69, 19, 0.12)'
                : '0 1px 4px rgba(0,0,0,0.05)',
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{
                backgroundColor: isSelected ? 'var(--color-brand-primary)' : 'var(--color-brand-accent-light)',
              }}
            >
              <Icon className="h-5 w-5" style={{ color: isSelected ? 'white' : 'var(--color-brand-primary)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-sm font-semibold !mt-0" style={{ color: 'var(--color-brand-text)' }}>
                {domain.name}
              </span>
              <p className="text-xs leading-snug !mb-0 mt-0.5" style={{ color: 'var(--color-brand-text)', opacity: 0.6 }}>
                {domain.description}
              </p>
            </div>
            {isSelected && (
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
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
// CARD VARIANT 3: Pill-style chips — icon + name only, no description
// Compact tag-like buttons, 4-column grid
// ============================================================================
function CardVariant3({ domains }: { domains: Domain[] }) {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {domains.slice(0, 6).map((domain) => {
        const Icon = getIcon(domain.icon)
        const isSelected = selected === domain.slug
        return (
          <button
            key={domain.id}
            type="button"
            onClick={() => setSelected(isSelected ? null : domain.slug)}
            className="card-pad-sm group flex items-center gap-3 rounded-full border-2 transition-all duration-200 cursor-pointer text-left"
            style={{
              borderColor: isSelected ? 'var(--color-brand-primary)' : 'var(--color-card-border)',
              backgroundColor: isSelected ? 'var(--color-brand-primary)' : 'white',
              boxShadow: isSelected ? '0 4px 12px rgba(139, 69, 19, 0.18)' : '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{
                backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : 'var(--color-brand-accent-light)',
              }}
            >
              <Icon className="h-4 w-4" style={{ color: isSelected ? 'white' : 'var(--color-brand-primary)' }} />
            </div>
            <span
              className="text-sm font-semibold !mt-0"
              style={{ color: isSelected ? 'white' : 'var(--color-brand-text)' }}
            >
              {domain.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}

// ============================================================================
// CARD VARIANT 4: Large icon-top cards with accent top-border on selection
// Premium feel, generous spacing, colored top border indicates selection
// ============================================================================
function CardVariant4({ domains }: { domains: Domain[] }) {
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
            className="card-pad-lg group relative flex flex-col rounded-2xl border transition-all duration-200 cursor-pointer text-left overflow-hidden"
            style={{
              borderColor: isSelected ? 'var(--color-brand-primary)' : 'var(--color-card-border)',
              backgroundColor: 'white',
              boxShadow: isSelected
                ? '0 8px 28px rgba(139, 69, 19, 0.16)'
                : '0 2px 10px rgba(0,0,0,0.06)',
              borderTop: isSelected ? '3px solid var(--color-brand-primary)' : '3px solid transparent',
            }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
              style={{
                backgroundColor: isSelected ? 'var(--color-brand-primary)' : 'var(--color-brand-accent-light)',
              }}
            >
              <Icon className="h-6 w-6" style={{ color: isSelected ? 'white' : 'var(--color-brand-primary)' }} />
            </div>
            <span
              className="block text-sm font-semibold mb-2 !mt-0"
              style={{ color: isSelected ? 'var(--color-brand-primary)' : 'var(--color-brand-text)' }}
            >
              {domain.name}
            </span>
            <p className="text-xs leading-relaxed !mb-0" style={{ color: 'var(--color-brand-text)', opacity: 0.6 }}>
              {domain.description}
            </p>
          </button>
        )
      })}
    </div>
  )
}

// ============================================================================
// CARD VARIANT 5 (Hybrid 1+4): Icon-top, colored top border + background change
// + check badge on selection. Gallery grid, premium feel.
// ============================================================================
function CardVariant5({ domains }: { domains: Domain[] }) {
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
              style={{
                backgroundColor: isSelected ? 'var(--color-brand-primary)' : 'var(--color-brand-accent-light)',
              }}
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

function CtaVariantB2() {
  return (
    <div className="flex justify-center mb-8">
      <div
        className="cta-bar flex items-center gap-5 rounded-lg"
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
        <button type="button" className="font-semibold cursor-pointer" style={{ color: 'var(--color-brand-primary)' }}>
          Let us guide you.
        </button>
      </p>
    </div>
  )
}

// ============================================================================
// MAIN VARIANT SECTION
// ============================================================================
function CardVariantLabel({ label, description }: { label: string; description: string }) {
  return (
    <div className="mt-10 mb-5 pb-3 border-b" style={{ borderColor: 'var(--color-card-border)' }}>
      <span
        className="inline-block text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-1"
        style={{ backgroundColor: 'var(--color-brand-accent-light)', color: 'var(--color-brand-primary)' }}
      >
        {label}
      </span>
      <p className="text-xs !mb-0" style={{ color: 'var(--color-brand-text)', opacity: 0.55 }}>
        {description}
      </p>
    </div>
  )
}

function VariantB({ domains }: { domains: Domain[] }) {
  return (
    <div className="variant-section">
      <SectionHeader
        variant="Variant B: Enhanced Visual Hierarchy"
        description="CTA options above, then 4 card design variants to compare below."
      />

      <p className="text-xs font-bold uppercase tracking-wider !mb-3" style={{ color: 'var(--color-brand-primary)', opacity: 0.5 }}>CTA B: Left border, full-width</p>
      <CtaVariantB />

      <p className="text-xs font-bold uppercase tracking-wider !mb-3" style={{ color: 'var(--color-brand-primary)', opacity: 0.5 }}>CTA B2: Centered, warm tint</p>
      <CtaVariantB2 />

      <p className="text-xs font-bold uppercase tracking-wider !mb-3" style={{ color: 'var(--color-brand-primary)', opacity: 0.5 }}>CTA C: Inline text</p>
      <CtaVariantC />

      <div className="step-header-wrapper">
        <StepHeader
          step={1}
          title="Choose a Use Case Domain"
          subtitle="Select the category that best describes your need"
        />
      </div>

      <CardVariantLabel
        label="Cards 1: Icon top, title + description"
        description="Gallery style — icon above text, clean elevation on hover/select."
      />
      <CardVariant1 domains={domains} />

      <CardVariantLabel
        label="Cards 2: Horizontal rows"
        description="Full-width list rows with icon on left — easy to scan."
      />
      <CardVariant2 domains={domains} />

      <CardVariantLabel
        label="Cards 3: Pill chips — icon + name only"
        description="Compact tags, filled on selection. Best when description is shown elsewhere."
      />
      <CardVariant3 domains={domains} />

      <CardVariantLabel
        label="Cards 4: Large icon top, accent top border on selection"
        description="Premium feel — colored top border signals selection, generous spacing."
      />
      <CardVariant4 domains={domains} />

      <CardVariantLabel
        label="Cards 5: Hybrid 1+4 — top border + background change + check badge"
        description="Colored top border activates on selection alongside background tint and check badge."
      />
      <CardVariant5 domains={domains} />
    </div>
  )
}

export default function NavigatorVariantsShowcase({ domains, affordances }: Props) {
  return (
    <div>
      <VariantB domains={domains} />
    </div>
  )
}
