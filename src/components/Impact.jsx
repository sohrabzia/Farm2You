export default function Impact() {
  const kpis = [
    ['App Downloads', '50,000+', '↑ Y1 target'],
    ['Monthly Active Users', '15–20K', '↑ stable cohort'],
    ['Farmer Registrations', '3,000+', 'Onboarded'],
    ['Shopkeepers', '10,000+', 'Verified bulk buyers'],
    ['Transactions / Mo', '8,000+', 'Across all categories'],
    ['Expert Consults / Mo', '500+', 'Pathology · Vet'],
    ['Repeat Rate', '40–50%', 'Returning users'],
    ['CPA', '150–200 PKR', 'Cost per acquisition'],
  ]

  return (
    <section className="relative bg-bone py-20 md:py-32 grain">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-12 gap-x-5 md:gap-x-8 hairline-b pb-8 mb-14">
          <div className="col-span-12 md:col-span-3">
            <span className="label">§ 07 — Impact</span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tightest leading-[0.95] reveal">
              Numbers we&rsquo;re&nbsp;
              <span className="italic font-light">accountable</span> to.
            </h2>
            <p className="mt-6 text-lg max-w-2xl text-ink/75">
              Year-One operating targets across Karachi and Southern Sindh — the foundation for
              expansion into Punjab and KP by Year Three.
            </p>
          </div>
        </div>

        {/* big revenue panel */}
        <div className="grid grid-cols-12 gap-3 md:gap-4 mb-14">
          <div className="col-span-12 md:col-span-7 bg-forest text-bone p-6 md:p-10 reveal">
            <span className="font-mono text-[11px] tracking-[0.2em] text-ochre">Y1 REVENUE PROJECTION</span>
            <div className="mt-4 flex flex-wrap items-baseline gap-3 md:gap-4">
              <span className="font-display text-7xl md:text-9xl tracking-tightest leading-none">9.15M</span>
              <span className="font-mono text-sm">PKR</span>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-y-3 text-sm">
              <Row k="Transaction Volume" v="406.5M" />
              <Row k="Commission" v="8.0M" />
              <Row k="Consultation Fees" v="154.7K" />
              <Row k="Home Delivery" v="600K" />
              <Row k="Agri-Input Revenue" v="400K" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 bg-clay text-bone p-6 md:p-10 reveal">
            <span className="font-mono text-[11px] tracking-[0.2em]">Y1 OPERATING BUDGET</span>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-7xl md:text-8xl tracking-tightest leading-none">5M</span>
              <span className="font-mono text-sm">PKR</span>
            </div>
            <ul className="mt-8 space-y-3 text-sm">
              <BarRow label="Operations & Salaries" pct={63} />
              <BarRow label="Events & Partnerships" pct={12} />
              <BarRow label="Digital Marketing" pct={10} />
              <BarRow label="Traditional Marketing" pct={8} />
              <BarRow label="App Development" pct={7} />
            </ul>
          </div>
        </div>

        {/* KPI grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 hairline border border-ink/15">
          {kpis.map(([k, v, sub], i) => (
            <div
              key={k}
              className={`p-5 md:p-7 reveal ${i % 4 !== 0 ? 'md:border-l border-ink/15' : ''} ${
                i % 2 !== 0 ? 'border-l md:border-l border-ink/15' : ''
              } ${i < 4 ? 'border-b border-ink/15' : ''}`}
            >
              <span className="label">{k}</span>
              <p className="mt-3 font-display text-3xl md:text-4xl tracking-tightest leading-none">{v}</p>
              <p className="mt-2 text-xs text-ink/60">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Row({ k, v }) {
  return (
    <>
      <span className="text-bone/70">{k}</span>
      <span className="font-mono text-right">{v}</span>
    </>
  )
}

function BarRow({ label, pct }) {
  return (
    <li>
      <div className="flex justify-between mb-1.5">
        <span className="opacity-80">{label}</span>
        <span className="font-mono">{pct}%</span>
      </div>
      <div className="h-1.5 bg-bone/20">
        <div className="h-full bg-bone" style={{ width: `${pct}%` }} />
      </div>
    </li>
  )
}
