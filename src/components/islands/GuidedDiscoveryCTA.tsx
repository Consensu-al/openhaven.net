import type { RefObject } from 'react'
import { HelpCircle } from 'lucide-react'

const CTA_STRINGS = {
  heading: 'Not sure where to start?',
  subtitle: 'Answer one quick question and we\u2019ll point you in the right direction.',
  button: 'Help me choose',
} as const

interface GuidedDiscoveryCTAProps {
  onOpen: () => void
  ctaButtonRef: RefObject<HTMLButtonElement | null>
}

export default function GuidedDiscoveryCTA({ onOpen, ctaButtonRef }: GuidedDiscoveryCTAProps) {
  return (
    <div
      className="rounded-lg border p-4 sm:p-6 mb-6 text-center"
      style={{
        backgroundColor: 'var(--color-brand-accent-light)',
        borderColor: 'var(--color-brand-primary)',
      }}
      data-testid="guided-discovery-cta"
    >
      <p
        className="text-base font-semibold mb-1"
        style={{ color: 'var(--color-brand-primary)' }}
      >
        {CTA_STRINGS.heading}
      </p>
      <p
        className="text-sm mb-4"
        style={{ color: 'var(--color-brand-text)', opacity: 0.7 }}
      >
        {CTA_STRINGS.subtitle}
      </p>
      <button
        ref={ctaButtonRef}
        type="button"
        onClick={onOpen}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium min-h-[44px] cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          backgroundColor: 'var(--color-brand-primary)',
          color: 'white',
          // @ts-expect-error CSS custom property for focus ring
          '--tw-ring-color': 'var(--color-focus-ring)',
        }}
        data-testid="guided-discovery-open"
      >
        <HelpCircle className="w-4 h-4" aria-hidden="true" />
        {CTA_STRINGS.button}
      </button>
    </div>
  )
}
