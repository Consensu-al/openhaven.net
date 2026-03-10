import type { RefObject } from 'react'
import { Compass, Sparkles } from 'lucide-react'

const CTA_STRINGS = {
  heading: 'Not sure where to start?',
  subtitle: 'Let us guide you to the right protocols',
  button: 'Guide me',
} as const

interface GuidedDiscoveryCTAProps {
  onOpen: () => void
  ctaButtonRef: RefObject<HTMLButtonElement | null>
  variant?: 'full-width' | 'centered'
}

export default function GuidedDiscoveryCTA({ onOpen, ctaButtonRef, variant = 'centered' }: GuidedDiscoveryCTAProps) {
  if (variant === 'full-width') {
    // CTA B: Full-width with left border accent
    return (
      <div
        className="cta-bar flex items-center justify-between rounded-lg mb-8"
        style={{
          backgroundColor: 'white',
          border: '1px solid var(--color-card-border)',
          borderLeft: '4px solid var(--color-brand-primary)',
        }}
        data-testid="guided-discovery-cta"
      >
        <div>
          <p
            className="text-sm font-semibold !mb-0"
            style={{ color: 'var(--color-brand-primary)' }}
          >
            {CTA_STRINGS.heading}
          </p>
          <p
            className="text-xs !mb-0 mt-0.5"
            style={{ color: 'var(--color-brand-text)', opacity: 0.65 }}
          >
            {CTA_STRINGS.subtitle}
          </p>
        </div>
        <button
          ref={ctaButtonRef}
          type="button"
          onClick={onOpen}
          className="guide-me-btn flex items-center gap-2 rounded-lg text-sm font-semibold cursor-pointer shrink-0 ml-6 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            backgroundColor: 'var(--color-brand-accent-light)',
            color: 'var(--color-brand-primary)',
            border: '1px solid var(--color-brand-accent)',
            // @ts-expect-error CSS custom property for focus ring
            '--tw-ring-color': 'var(--color-focus-ring)',
          }}
          data-testid="guided-discovery-open"
        >
          <Compass className="w-4 h-4" aria-hidden="true" />
          {CTA_STRINGS.button}
        </button>
      </div>
    )
  }

  // CTA B2: Centered, warm tint (default)
  return (
    <div className="flex justify-center mb-8" data-testid="guided-discovery-cta">
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
        <Sparkles className="w-5 h-5 shrink-0" style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
        <div className="flex-1">
          <p
            className="text-sm font-semibold !mb-0"
            style={{ color: 'var(--color-brand-primary)' }}
          >
            {CTA_STRINGS.heading}
          </p>
          <p
            className="text-xs !mb-0 mt-0.5"
            style={{ color: 'var(--color-brand-text)', opacity: 0.65 }}
          >
            {CTA_STRINGS.subtitle}
          </p>
        </div>
        <button
          ref={ctaButtonRef}
          type="button"
          onClick={onOpen}
          className="guide-me-btn flex items-center gap-2 rounded-lg text-sm font-semibold cursor-pointer shrink-0 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            backgroundColor: 'var(--color-brand-accent-light)',
            color: 'var(--color-brand-primary)',
            border: '1px solid var(--color-brand-accent)',
            // @ts-expect-error CSS custom property for focus ring
            '--tw-ring-color': 'var(--color-focus-ring)',
          }}
          data-testid="guided-discovery-open"
        >
          <Compass className="w-4 h-4" aria-hidden="true" />
          {CTA_STRINGS.button}
        </button>
      </div>
    </div>
  )
}
