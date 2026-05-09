export default function Problem() {
  const points = [
    {
      n: '01',
      t: 'The middleman keeps half the harvest.',
      d: 'Brokers charge 50–100% margins on both ends — bleeding farmers and inflating shelf prices.',
    },
    {
      n: '02',
      t: 'Shopkeepers and families pay too much.',
      d: 'Opaque pricing layers between the field and the kitchen erode trust and basket value.',
    },
    {
      n: '03',
      t: 'No one to call when crops fail.',
      d: 'Plant pathology and veterinary care are inaccessible for most rural producers.',
    },
    {
      n: '04',
      t: 'Inputs are unverified and overpriced.',
      d: 'Seeds, fertilizers and tools come from a fragmented market with no quality guarantee.',
    },
  ]
  return (
    <section id="problem" className="relative bg-bone py-20 md:py-32 grain">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-12 gap-x-5 md:gap-x-8 hairline-b pb-8 mb-16">
          <div className="col-span-12 md:col-span-3">
            <span className="label">§ 02 — The Problem</span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tightest leading-[0.95] reveal">
              The supply chain&nbsp;
              <span className="italic font-light">forgot</span> the farmer.
            </h2>
          </div>
        </div>

        {/* Big stat */}
        <div className="grid grid-cols-12 gap-x-5 md:gap-x-8 mb-20 md:mb-28">
          <div className="col-span-12 md:col-span-7 reveal">
            <div className="flex items-baseline gap-4 md:gap-6">
              <span className="font-display text-[28vw] md:text-[16rem] leading-[0.8] tracking-tightest text-clay">
                100<span className="text-ink/20">%</span>
              </span>
            </div>
            <p className="mt-6 text-xl md:text-2xl leading-snug max-w-xl text-ink/80">
              The intermediary&rsquo;s margin can reach a full doubling of price — applied to both the
              farmer who grows it and the family who eats it.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 md:pl-8 md:border-l md:border-ink/15 mt-10 md:mt-0">
            <span className="label">Did you know</span>
            <p className="mt-4 font-display text-2xl md:text-3xl tracking-tightest leading-snug">
              For every <span className="text-clay">PKR 100</span> a family pays for fresh produce, only{' '}
              <span className="underline decoration-clay decoration-2 underline-offset-4">PKR 35</span>{' '}
              reaches the farmer who grew it.
            </p>
          </div>
        </div>

        {/* Problem grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 hairline border-y border-ink/15">
          {points.map((p, i) => (
            <div
              key={p.n}
              className={`p-6 md:p-10 reveal ${i % 2 === 1 ? 'md:border-l md:border-ink/15' : ''} ${
                i < 2 ? 'border-b border-ink/15' : ''
              }`}
            >
              <div className="flex items-start gap-5">
                <span className="font-mono text-xs text-ink/50 mt-1">{p.n}</span>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl tracking-tightest leading-tight">{p.t}</h3>
                  <p className="mt-3 text-[15px] text-ink/70 leading-relaxed max-w-md">{p.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
