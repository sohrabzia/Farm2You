export function PageTitle({ eyebrow, title, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 hairline-b border-ink/15 pb-6">
      <div>
        <span className="font-mono text-[11px] tracking-[0.2em] text-clay">// {eyebrow?.toUpperCase()}</span>
        <h1 className="mt-2 font-display text-3xl md:text-5xl tracking-tightest leading-[0.95]">{title}</h1>
      </div>
      {action}
    </div>
  )
}

export function StatCard({ label, value, sub, accent }) {
  return (
    <div className="p-5 md:p-7 border-l first:border-l-0 border-ink/15 first:[border-l:0] [&:not(:first-child)]:border-l">
      <span className="font-mono text-[10px] tracking-[0.2em] text-ink/60">{label}</span>
      <p className={`mt-3 font-display text-3xl md:text-4xl tracking-tightest leading-none ${accent || ''}`}>{value}</p>
      <p className="mt-2 text-xs text-ink/60">{sub}</p>
    </div>
  )
}

export function Panel({ title, cls = '', children, action }) {
  return (
    <section className={`bg-bone border border-ink/15 ${cls}`}>
      <header className="flex items-center justify-between p-4 md:p-5 hairline-b border-ink/10">
        <h3 className="font-display text-lg md:text-xl tracking-tightest">{title}</h3>
        {action}
      </header>
      <div className="p-4 md:p-5">{children}</div>
    </section>
  )
}

export function Empty({ msg }) {
  return (
    <div className="py-10 text-center">
      <p className="font-mono text-xs tracking-[0.2em] text-ink/50 uppercase">{msg}</p>
    </div>
  )
}

export function Btn({ children, onClick, variant = 'primary', type = 'button', disabled }) {
  const cls =
    variant === 'primary'
      ? 'bg-ink text-bone hover:bg-clay'
      : variant === 'danger'
      ? 'bg-clay text-bone hover:bg-ink'
      : 'border border-ink/30 hover:border-ink'
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`px-4 py-2.5 text-sm cursor-pointer transition-colors disabled:opacity-50 ${cls}`}
    >
      {children}
    </button>
  )
}

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] tracking-[0.2em] text-ink/60 mb-1.5 uppercase">{label}</span>
      {children}
    </label>
  )
}

export function Input(props) {
  return (
    <input
      {...props}
      className={`w-full bg-bone border border-ink/25 px-3 py-2.5 outline-none focus:border-ink ${props.className || ''}`}
    />
  )
}

export function Select(props) {
  return (
    <select
      {...props}
      className={`w-full bg-bone border border-ink/25 px-3 py-2.5 outline-none focus:border-ink ${props.className || ''}`}
    />
  )
}
