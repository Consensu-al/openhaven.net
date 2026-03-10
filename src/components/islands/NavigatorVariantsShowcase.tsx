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

// Shared section header component
function SectionHeader({ variant, description }: { variant: string; description: string }) {
  return (
    <div className="mb-8 pb-4 border-b-2" style={{ borderColor: 'var(--color-brand-accent)' }}>
      <span
        className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3"
        style={{
          color: 'white',
          backgroundColor: 'var(--color-brand-primary)',
        }}
      >
        {variant}
      </span>
      <p className="text-sm" style={{ color: 'var(--color-brand-text)', opacity: 0.7 }}>
        {description}
      </p>
    </div>
  )
}

// ============================================================================
// VARIANT A: Current Design (Baseline)
// ============================================================================
function VariantA({ domains }: { domains: Domain[] }) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="variant-section">
      <SectionHeader
        variant="Variant A: Current Design"
        description="The existing layout with cluster headings and basic card styling"
      />

      {/* Guided Discovery CTA */}
      <div
        className="rounded-lg border p-4 sm:p-6 mb-6 text-center"
        style={{
          backgroundColor: 'var(--color-brand-accent-light)',
          borderColor: 'var(--color-brand-primary)',
        }}
      >
        <p className="text-base font-semibold mb-1" style={{ color: 'var(--color-brand-primary)' }}>
          Not sure where to start?
        </p>
        <p className="text-sm mb-4" style={{ color: 'var(--color-brand-text)', opacity: 0.7 }}>
          Answer one quick question and we'll point you in the right direction.
        </p>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer"
          style={{ backgroundColor: 'var(--color-brand-primary)', color: 'white' }}
        >
          <HelpCircle className="w-4 h-4" />
          Help me choose
        </button>
      </div>

      {/* Step indicator */}
      <div className="text-center mb-6">
        <span
          className="inline-block text-xs font-semibold uppercase tracking-wider mb-2 px-3 py-1 rounded-full"
          style={{
            color: 'var(--color-mvp-text)',
            backgroundColor: 'var(--color-mvp-bg)',
            border: '1px solid var(--color-mvp-border)',
          }}
        >
          Step 1
        </span>
        <h2 className="text-2xl font-semibold" style={{ color: 'var(--color-brand-primary)' }}>
          Choose a Use Case Domain
        </h2>
      </div>

      {/* Cluster heading */}
      <h4
        className="text-xs font-medium uppercase tracking-wider mb-3"
        style={{ color: 'var(--color-brand-text)', opacity: 0.4 }}
      >
        Connecting
      </h4>

      {/* Domain grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {domains.slice(0, 6).map((domain) => {
          const Icon = getIcon(domain.icon)
          const isSelected = selected === domain.slug
          return (
            <button
              key={domain.id}
              type="button"
              onClick={() => setSelected(isSelected ? null : domain.slug)}
              className="flex flex-col items-start gap-2 rounded-lg border text-left p-4 sm:p-6 transition-all duration-200 cursor-pointer"
              style={{
                borderColor: isSelected ? 'var(--color-brand-primary)' : 'var(--color-card-border)',
                backgroundColor: isSelected ? 'var(--color-domain-selected-bg)' : 'white',
                boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.08)',
              }}
            >
              <Icon className="h-6 w-6" style={{ color: 'var(--color-brand-primary)' }} />
              <span className="text-base font-semibold" style={{ color: 'var(--color-brand-text)' }}>
                {domain.name}
              </span>
              <p className="text-xs" style={{ color: 'var(--color-brand-text)', opacity: 0.6 }}>
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
// VARIANT B: Card-Heavy with Visual Hierarchy
// ============================================================================
function VariantB({ domains }: { domains: Domain[] }) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="variant-section">
      <SectionHeader
        variant="Variant B: Enhanced Visual Hierarchy"
        description="Larger icons, better spacing, and more prominent selected state with accent border"
      />

      {/* Integrated CTA - more subtle */}
      <div
        className="flex items-center justify-between rounded-xl p-4 mb-8"
        style={{
          backgroundColor: 'rgba(139, 69, 19, 0.04)',
          border: '1px dashed var(--color-brand-primary)',
        }}
      >
        <div>
          <p className="text-sm font-medium" style={{ color: 'var(--color-brand-primary)' }}>
            Not sure where to start?
          </p>
          <p className="text-xs" style={{ color: 'var(--color-brand-text)', opacity: 0.6 }}>
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

      {/* Section header with step number */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
          style={{ backgroundColor: 'var(--color-brand-primary)', color: 'white' }}
        >
          1
        </div>
        <div>
          <h2 className="text-xl font-semibold" style={{ color: 'var(--color-brand-primary)' }}>
            Choose a Use Case Domain
          </h2>
          <p className="text-xs" style={{ color: 'var(--color-brand-text)', opacity: 0.6 }}>
            Select the category that best describes your need
          </p>
        </div>
      </div>

      {/* Cards with larger icons and hover effect */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {domains.slice(0, 6).map((domain) => {
          const Icon = getIcon(domain.icon)
          const isSelected = selected === domain.slug
          return (
            <button
              key={domain.id}
              type="button"
              onClick={() => setSelected(isSelected ? null : domain.slug)}
              className="group relative flex flex-col items-center text-center rounded-2xl border-2 p-6 transition-all duration-200 cursor-pointer"
              style={{
                borderColor: isSelected ? 'var(--color-brand-primary)' : 'transparent',
                backgroundColor: isSelected ? 'var(--color-domain-selected-bg)' : 'white',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              }}
            >
              {isSelected && (
                <div
                  className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-brand-primary)' }}
                >
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                style={{
                  backgroundColor: isSelected ? 'var(--color-brand-primary)' : 'var(--color-brand-accent-light)',
                }}
              >
                <Icon
                  className="h-7 w-7"
                  style={{ color: isSelected ? 'white' : 'var(--color-brand-primary)' }}
                />
              </div>
              <span className="text-base font-semibold mb-1" style={{ color: 'var(--color-brand-text)' }}>
                {domain.name}
              </span>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-brand-text)', opacity: 0.6 }}>
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
// VARIANT C: Compact List Style
// ============================================================================
function VariantC({ domains }: { domains: Domain[] }) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="variant-section">
      <SectionHeader
        variant="Variant C: Compact List"
        description="Horizontal layout with inline descriptions, better for scanning many options"
      />

      {/* Minimal CTA inline */}
      <div className="flex items-center justify-center gap-2 mb-8">
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

      {/* Header */}
      <div className="text-center mb-6">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
          style={{ backgroundColor: 'var(--color-brand-accent-light)' }}
        >
          <span className="text-xs font-bold" style={{ color: 'var(--color-brand-primary)' }}>
            STEP 1
          </span>
          <span className="text-sm font-medium" style={{ color: 'var(--color-brand-primary)' }}>
            Choose a Use Case Domain
          </span>
        </div>
      </div>

      {/* List layout */}
      <div className="flex flex-col gap-2">
        {domains.slice(0, 6).map((domain) => {
          const Icon = getIcon(domain.icon)
          const isSelected = selected === domain.slug
          return (
            <button
              key={domain.id}
              type="button"
              onClick={() => setSelected(isSelected ? null : domain.slug)}
              className="flex items-center gap-4 rounded-xl border p-4 transition-all duration-200 cursor-pointer text-left"
              style={{
                borderColor: isSelected ? 'var(--color-brand-primary)' : 'var(--color-card-border)',
                backgroundColor: isSelected ? 'var(--color-domain-selected-bg)' : 'white',
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: isSelected ? 'var(--color-brand-primary)' : 'var(--color-brand-accent-light)',
                }}
              >
                <Icon
                  className="h-5 w-5"
                  style={{ color: isSelected ? 'white' : 'var(--color-brand-primary)' }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold block" style={{ color: 'var(--color-brand-text)' }}>
                  {domain.name}
                </span>
                <p className="text-xs truncate" style={{ color: 'var(--color-brand-text)', opacity: 0.6 }}>
                  {domain.description}
                </p>
              </div>
              {isSelected && (
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'var(--color-brand-primary)' }}
                >
                  <Check className="w-4 h-4 text-white" />
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
// VARIANT D: Floating Cards with Depth
// ============================================================================
function VariantD({ domains }: { domains: Domain[] }) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="variant-section">
      <SectionHeader
        variant="Variant D: Elevated Cards"
        description="Floating cards with depth, accent color on hover, and prominent icons"
      />

      {/* CTA as banner */}
      <div
        className="rounded-2xl p-6 mb-8 text-center"
        style={{
          background: 'linear-gradient(135deg, var(--color-brand-accent-light) 0%, rgba(244, 208, 63, 0.3) 100%)',
          border: '2px solid var(--color-brand-accent)',
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <HelpCircle className="w-5 h-5" style={{ color: 'var(--color-brand-primary)' }} />
          <span className="font-semibold" style={{ color: 'var(--color-brand-primary)' }}>
            Need help finding the right protocol?
          </span>
        </div>
        <button
          type="button"
          className="mt-2 px-6 py-2 rounded-full text-sm font-medium cursor-pointer"
          style={{ backgroundColor: 'var(--color-brand-primary)', color: 'white' }}
        >
          Take the guided quiz
        </button>
      </div>

      {/* Section header */}
      <div className="mb-8">
        <div className="flex items-baseline gap-3 mb-2">
          <span
            className="text-4xl font-bold"
            style={{ color: 'var(--color-brand-accent)' }}
          >
            01
          </span>
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--color-brand-primary)' }}>
            Choose Your Domain
          </h2>
        </div>
        <p className="text-sm pl-12" style={{ color: 'var(--color-brand-text)', opacity: 0.6 }}>
          What type of interaction are you looking to enable?
        </p>
      </div>

      {/* Elevated cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {domains.slice(0, 6).map((domain) => {
          const Icon = getIcon(domain.icon)
          const isSelected = selected === domain.slug
          return (
            <button
              key={domain.id}
              type="button"
              onClick={() => setSelected(isSelected ? null : domain.slug)}
              className="relative flex flex-col items-start rounded-2xl p-5 transition-all duration-300 cursor-pointer text-left"
              style={{
                backgroundColor: isSelected ? 'var(--color-brand-primary)' : 'white',
                boxShadow: isSelected
                  ? '0 20px 40px rgba(139, 69, 19, 0.25)'
                  : '0 8px 24px rgba(0, 0, 0, 0.08)',
                transform: isSelected ? 'translateY(-4px)' : 'translateY(0)',
              }}
            >
              <Icon
                className="h-8 w-8 mb-4"
                style={{ color: isSelected ? 'white' : 'var(--color-brand-primary)' }}
              />
              <span
                className="text-base font-semibold mb-2"
                style={{ color: isSelected ? 'white' : 'var(--color-brand-text)' }}
              >
                {domain.name}
              </span>
              <p
                className="text-xs leading-relaxed"
                style={{
                  color: isSelected ? 'rgba(255,255,255,0.8)' : 'var(--color-brand-text)',
                  opacity: isSelected ? 1 : 0.6,
                }}
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
// Main Showcase Component
// ============================================================================
export default function NavigatorVariantsShowcase({ domains, affordances }: Props) {
  return (
    <div className="space-y-16">
      <VariantA domains={domains} />
      <hr style={{ borderColor: 'var(--color-card-border)', margin: '3rem 0' }} />
      <VariantB domains={domains} />
      <hr style={{ borderColor: 'var(--color-card-border)', margin: '3rem 0' }} />
      <VariantC domains={domains} />
      <hr style={{ borderColor: 'var(--color-card-border)', margin: '3rem 0' }} />
      <VariantD domains={domains} />
    </div>
  )
}
