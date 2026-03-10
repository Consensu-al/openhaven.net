import type { ReactNode } from 'react'

/**
 * StepHeader — Numbered step indicator with title and subtitle.
 * Circle + title on same line, subtitle indented below.
 * subtitle accepts ReactNode so inline highlights can be passed.
 * badge renders a small pill next to the title (e.g. "Optional").
 */

interface StepHeaderProps {
  step: number
  title: string
  subtitle: ReactNode
  badge?: string
}

export default function StepHeader({ step, title, subtitle, badge }: StepHeaderProps) {
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
        {badge && (
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              color: 'var(--color-brand-primary)',
              backgroundColor: 'var(--color-brand-accent-light)',
              border: '1px solid rgba(139, 69, 19, 0.2)',
              opacity: 0.8,
            }}
          >
            {badge}
          </span>
        )}
      </div>
      <p className="text-sm !mb-0 mt-1 ml-[52px]" style={{ color: 'var(--color-brand-text)', opacity: 0.55 }}>
        {subtitle}
      </p>
    </div>
  )
}
