/**
 * StepHeader — Numbered step indicator with title and subtitle
 * Circle + title on same line, subtitle indented below
 */

interface StepHeaderProps {
  step: number
  title: string
  subtitle: string
}

export default function StepHeader({ step, title, subtitle }: StepHeaderProps) {
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
