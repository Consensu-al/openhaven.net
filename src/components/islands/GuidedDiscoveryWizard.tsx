import { useEffect, useRef, useCallback } from 'react'
import type { Domain } from '@/lib/types'
import { getIcon, HelpCircle, X } from '@/lib/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const SURVEY_ANSWERS = [
  { id: 'communicate', text: 'Talk freely with people and groups', domainSlug: 'communication' },
  { id: 'identity', text: 'Know who I\'m dealing with and control my data', domainSlug: 'identity-trust' },
  { id: 'organize', text: 'Organize a group or make decisions together', domainSlug: 'group-governance' },
  { id: 'help', text: 'Help and support people in my community', domainSlug: 'mutual-aid-exchange' },
  { id: 'create', text: 'Create, learn, or share knowledge together', domainSlug: 'co-creation-knowledge' },
  { id: 'coordinate', text: 'Coordinate events or local projects', domainSlug: 'events-coordination' },
] as const

const WIZARD_STRINGS = {
  question: 'What are you trying to do?',
  close: 'Close',
  tooltipPrefix: 'This maps to:',
  tooltipSuffix: 'in the domain grid below',
} as const

interface GuidedDiscoveryWizardProps {
  domains: Domain[]
  open: boolean
  onSelectDomain: (slug: string) => void
  onClose: () => void
}

export default function GuidedDiscoveryWizard({
  domains,
  open,
  onSelectDomain,
  onClose,
}: GuidedDiscoveryWizardProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  // Handle native dialog close event (Escape key, backdrop click)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleClose = () => {
      if (open) onClose()
    }

    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [open, onClose])

  // Close on backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) {
        onClose()
      }
    },
    [onClose],
  )

  const getDomainBySlug = (slug: string) => domains.find((d) => d.slug === slug)

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto w-[90vw] max-w-lg rounded-xl p-0 backdrop:bg-black/50"
      style={{
        backgroundColor: 'var(--color-brand-bg)',
        border: '1px solid var(--color-card-border)',
        animation: 'dialog-open 200ms ease-out',
      }}
      data-testid="guided-discovery-wizard"
      onClick={handleBackdropClick}
    >
      <TooltipProvider>
        <div className="p-6 sm:p-8">
          {/* Header with close button */}
          <div className="flex items-start justify-between mb-6">
            <h3
              className="text-lg sm:text-xl font-semibold pr-4"
              style={{ color: 'var(--color-brand-primary)' }}
            >
              {WIZARD_STRINGS.question}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-md p-2 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                color: 'var(--color-brand-text)',
                // @ts-expect-error CSS custom property for focus ring
                '--tw-ring-color': 'var(--color-focus-ring)',
              }}
              aria-label={WIZARD_STRINGS.close}
              data-testid="guided-discovery-close"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Answer cards */}
          <div className="flex flex-col gap-3">
            {SURVEY_ANSWERS.map((answer, index) => {
              const domain = getDomainBySlug(answer.domainSlug)
              const Icon = domain ? getIcon(domain.icon) : HelpCircle

              return (
                <div key={answer.id} className="relative flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectDomain(answer.domainSlug)}
                    className="flex-1 flex items-center gap-3 rounded-lg border p-4 text-left transition-all duration-200 cursor-pointer min-h-[44px] focus:outline-none focus:ring-2 focus:ring-offset-2 hover:border-[var(--color-domain-hover-border)] hover:shadow-md"
                    style={{
                      backgroundColor: 'white',
                      borderColor: 'var(--color-card-border)',
                      boxShadow: '0 2px 4px var(--color-card-shadow)',
                      // @ts-expect-error CSS custom property for focus ring
                      '--tw-ring-color': 'var(--color-focus-ring)',
                    }}
                    data-testid={`wizard-answer-${answer.id}`}
                    autoFocus={index === 0}
                  >
                    <Icon
                      className="h-5 w-5 shrink-0"
                      style={{ color: 'var(--color-brand-primary)' }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: 'var(--color-brand-text)' }}
                    >
                      {answer.text}
                    </span>
                  </button>

                  {/* Tooltip showing domain mapping */}
                  {domain && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="shrink-0 rounded-full p-1.5 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2"
                          style={{
                            color: 'var(--color-brand-text)',
                            opacity: 0.5,
                            // @ts-expect-error CSS custom property for focus ring
                            '--tw-ring-color': 'var(--color-focus-ring)',
                          }}
                          aria-label={`${WIZARD_STRINGS.tooltipPrefix} ${domain.name}`}
                          data-testid={`wizard-tooltip-${answer.id}`}
                        >
                          <HelpCircle className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent
                        className="max-w-[200px] text-xs"
                        style={{
                          backgroundColor: 'var(--color-brand-text)',
                          color: 'var(--color-brand-bg)',
                          border: 'none',
                        }}
                      >
                        <p>
                          {WIZARD_STRINGS.tooltipPrefix}{' '}
                          <strong>{domain.name}</strong>{' '}
                          {WIZARD_STRINGS.tooltipSuffix}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </TooltipProvider>
    </dialog>
  )
}
