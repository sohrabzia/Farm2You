export default function Pricing() {
  return (
    <section className="relative bg-bone py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-12 gap-x-5 md:gap-x-8 hairline-b pb-8 mb-14">
          <div className="col-span-12 md:col-span-3">
            <span className="label">§ 09 — Marketing</span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tightest leading-[0.95] reveal">
              The 4 P&rsquo;s,
              <br />
              <span className="italic font-light">in plain language.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 hairline border border-ink/15">
          {p4.map((p, i) => (
            <div
              key={p.label}
              className={`p-6 md:p-9 reveal ${i !== 0 ? 'lg:border-l border-ink/15' : ''} ${
                i % 2 !== 0 ? 'md:border-l border-ink/15' : ''
              } ${i < 2 ? 'border-b md:border-b-0 lg:border-b border-ink/15' : ''} ${
                i < 3 ? 'lg:border-b-0' : ''
              }`}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-7xl md:text-8xl tracking-tightest text-clay leading-none">{p.k}</span>
                <span className="font-mono text-[11px] tracking-[0.2em]">{p.label}</span>
              </div>
              <h3 className="mt-6 font-display text-xl md:text-2xl tracking-tightest leading-tight">{p.title}</h3>
              <p className="mt-3 text-sm text-ink/70 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Channels */}
        <div className="mt-20 grid grid-cols-12 gap-x-5 md:gap-x-8">
          <div className="col-span-12 md:col-span-4">
            <span className="label">Channels</span>
            <h3 className="mt-3 font-display text-3xl md:text-4xl tracking-tightest leading-tight">
              Where we&rsquo;ll meet farmers and families.
            </h3>
          </div>
          <div className="col-span-12 md:col-span-8 mt-6 md:mt-0">
            <ul className="hairline-b border-ink/15">
              {channels.map((c) => (
                <li key={c.name} className="border-t border-ink/15 py-5 md:py-6 grid grid-cols-12 gap-x-4 items-baseline group cursor-pointer">
                  <span className="col-span-1 font-mono text-xs text-ink/50 group-hover:text-clay transition-colors">{c.id}</span>
                  <span className="col-span-3 md:col-span-2 font-display text-xl md:text-2xl tracking-tightest">{c.name}</span>
                  <span className="col-span-8 md:col-span-9 text-sm md:text-[15px] text-ink/75 leading-relaxed">{c.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

const p4 = [
  {
    k: 'P',
    label: 'PRODUCT',
    title: 'A whole-stack agri app.',
    desc: 'Direct trade, expert consultations, livestock marketplace, agri-inputs, optional logistics — all in one.',
  },
  {
    k: 'P',
    label: 'PRICE',
    title: 'Differentiated, never extracted.',
    desc: 'Retail vs. wholesale tiers. Minimal commission on expert fees. Fair to the farmer, fair to the family.',
  },
  {
    k: 'P',
    label: 'PLACE',
    title: 'Mobile-first, locally rooted.',
    desc: 'Punjab, Sindh, KP — both rural villages and urban centers. The phone in your pocket, not the desk in your office.',
  },
  {
    k: 'P',
    label: 'PROMOTION',
    title: 'Digital meets ground.',
    desc: 'Facebook, TikTok, YouTube influencers — paired with farm visits, expos and demo days.',
  },
]

const channels = [
  { id: 'C·01', name: 'Social Media', desc: 'Facebook, TikTok, WhatsApp — short videos, testimonials and farmer success stories.' },
  { id: 'C·02', name: 'Physical Visits', desc: 'On-the-ground visits to farms, shops, grocery stores and market places.' },
  { id: 'C·03', name: 'SMS / WhatsApp', desc: 'Targeted promotional campaigns in Urdu and local languages.' },
  { id: 'C·04', name: 'Referral', desc: 'Farmers and retailers earn wallet credits — 200 PKR per successful signup.' },
  { id: 'C·05', name: 'Influencers', desc: 'Partnerships with rural and urban farming creators on YouTube.' },
  { id: 'C·06', name: 'Events', desc: 'Farmer expos, agri fairs and seasonal demo events across the country.' },
]
