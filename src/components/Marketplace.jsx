export default function Marketplace() {
  const items = [
    {
      cat: 'Produce',
      title: 'Fruits & Vegetables',
      tier: 'Retail · Wholesale',
      price: 'from 60 PKR / kg',
      tone: 'forest',
      desc: 'Organic, traceable, picked the day you order it.',
    },
    {
      cat: 'Livestock',
      title: 'Goats · Cattle · Poultry',
      tier: 'Direct Listing',
      price: 'Live auction',
      tone: 'clay',
      desc: 'Verified sellers, vet-certified animals, transparent paperwork.',
    },
    {
      cat: 'Agri-Inputs',
      title: 'Seeds · Fertilizer · Tools',
      tier: 'Local Sellers',
      price: 'Bundled discounts',
      tone: 'ochre',
      desc: 'Quality-assured inputs from your nearest verified dealer.',
    },
    {
      cat: 'Logistics',
      title: 'Doorstep Delivery',
      tier: 'Optional',
      price: 'Pay only on use',
      tone: 'ink',
      desc: 'Hand-off pickup or full doorstep transport — your choice.',
    },
  ]
  return (
    <section id="marketplace" className="relative bg-bone py-20 md:py-32 grain">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-12 gap-x-5 md:gap-x-8 hairline-b pb-8 mb-14">
          <div className="col-span-12 md:col-span-3">
            <span className="label">§ 04 — Marketplace</span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tightest leading-[0.95] reveal">
              Four shelves.
              <br />
              <span className="italic font-light">One trusted</span> aisle.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 hairline border border-ink/15">
          {items.map((it, i) => (
            <Card key={it.title} item={it} idx={i} total={items.length} />
          ))}
        </div>

        {/* Pricing tier explainer */}
        <div className="mt-16 grid grid-cols-12 gap-x-5 md:gap-x-8 items-end reveal">
          <div className="col-span-12 md:col-span-5">
            <span className="label">Pricing logic</span>
            <h3 className="mt-3 font-display text-3xl md:text-5xl tracking-tightest leading-tight">
              Two tiers, baked into every listing.
            </h3>
          </div>
          <div className="col-span-12 md:col-span-7 grid grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-0">
            <div className="bg-forest text-bone p-6 md:p-8">
              <span className="font-mono text-[11px] tracking-[0.2em] text-ochre">RETAIL · FAMILY</span>
              <p className="mt-3 font-display text-3xl md:text-4xl tracking-tightest">
                Mandi rate-list, often less.
              </p>
              <p className="mt-3 text-sm opacity-80">Buy by the kg, the bag, or the basket. Pay what wholesalers pay.</p>
            </div>
            <div className="bg-clay text-bone p-6 md:p-8">
              <span className="font-mono text-[11px] tracking-[0.2em]">WHOLESALE · BULK</span>
              <p className="mt-3 font-display text-3xl md:text-4xl tracking-tightest">
                Volume tiers for shopkeepers.
              </p>
              <p className="mt-3 text-sm opacity-90">50–500 kg weekly orders. The more you take, the less you pay.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Card({ item, idx, total }) {
  const tone = item.tone
  const wrap =
    tone === 'forest'
      ? 'bg-forest text-bone'
      : tone === 'clay'
      ? 'bg-clay text-bone'
      : tone === 'ochre'
      ? 'bg-ochre text-ink'
      : 'bg-ink text-bone'
  return (
    <article
      className={`group relative ${wrap} p-6 md:p-8 min-h-[360px] md:min-h-[460px] flex flex-col justify-between cursor-pointer overflow-hidden transition-colors duration-300 ${
        idx !== 0 ? 'md:border-l border-ink/15' : ''
      } ${idx < 3 ? 'border-b md:border-b-0' : ''}`}
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-[11px] tracking-[0.2em] opacity-80">M·0{idx + 1}</span>
        <span className="font-mono text-[11px] tracking-[0.2em] opacity-60">{idx + 1} / {total}</span>
      </div>

      <div className="my-8 transition-transform duration-500 group-hover:-translate-y-1">
        <CardArt tone={tone} />
      </div>

      <div>
        <span className="font-mono text-[11px] tracking-[0.2em] opacity-70">{item.cat}</span>
        <h3 className="mt-2 font-display text-2xl md:text-3xl tracking-tightest leading-[1.05]">{item.title}</h3>
        <p className="mt-3 text-sm opacity-80 leading-relaxed max-w-[26ch]">{item.desc}</p>
        <div className="mt-5 flex items-center justify-between hairline-b border-current/30 pb-3 opacity-90">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase">{item.tier}</span>
          <span className="font-display text-base">{item.price}</span>
        </div>
        <span className="mt-4 inline-flex items-center gap-2 text-sm opacity-90 group-hover:opacity-100">
          Browse listings
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </article>
  )
}

function CardArt({ tone }) {
  const stroke = tone === 'ochre' ? '#0E0F0C' : '#EDE7D3'
  const accent = tone === 'forest' ? '#D69A3C' : tone === 'clay' ? '#EDE7D3' : tone === 'ochre' ? '#C8542A' : '#D69A3C'
  return (
    <svg viewBox="0 0 240 160" className="w-full h-32 md:h-40" aria-hidden="true">
      <g stroke={stroke} strokeWidth="1.2" fill="none" opacity="0.6">
        <line x1="0" y1="40" x2="240" y2="40" />
        <line x1="0" y1="80" x2="240" y2="80" />
        <line x1="0" y1="120" x2="240" y2="120" />
      </g>
      <g fill={accent}>
        {tone === 'forest' && (
          <>
            <circle cx="40" cy="100" r="22" />
            <circle cx="100" cy="80" r="30" />
            <circle cx="170" cy="105" r="18" />
            <rect x="38" y="100" width="4" height="22" fill={stroke} />
            <rect x="98" y="80" width="4" height="40" fill={stroke} />
            <rect x="168" y="105" width="4" height="22" fill={stroke} />
          </>
        )}
        {tone === 'clay' && (
          <>
            <ellipse cx="80" cy="110" rx="46" ry="22" />
            <rect x="58" y="60" width="44" height="36" />
            <ellipse cx="170" cy="110" rx="34" ry="16" />
          </>
        )}
        {tone === 'ochre' && (
          <>
            <rect x="40" y="60" width="50" height="80" />
            <rect x="100" y="80" width="40" height="60" />
            <rect x="150" y="50" width="60" height="90" />
          </>
        )}
        {tone === 'ink' && (
          <>
            <rect x="30" y="80" width="120" height="50" />
            <rect x="150" y="95" width="40" height="35" />
            <circle cx="60" cy="138" r="10" fill={stroke} />
            <circle cx="170" cy="138" r="10" fill={stroke} />
          </>
        )}
      </g>
    </svg>
  )
}
