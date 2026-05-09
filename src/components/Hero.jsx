export default function Hero() {
  return (
    <section id="top" className="relative grain pt-10 md:pt-14 pb-16 md:pb-24">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        {/* Top meta strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 hairline-b pb-5">
          <span className="label">∗ Farm2You · Mobile App · Pakistan</span>
          <span className="label hidden sm:block">No.001 — From Fields to Families</span>
          <span className="label">Karachi · Sindh · Estd. 2026</span>
        </div>

        {/* Hero grid */}
        <div className="mt-10 md:mt-16 grid grid-cols-12 gap-x-5 md:gap-x-8 gap-y-10">
          {/* Left small column */}
          <div className="col-span-12 md:col-span-3 order-2 md:order-1">
            <div className="md:sticky md:top-28">
              <p className="label mb-4">A·001</p>
              <p className="text-[15px] leading-relaxed text-ink/75 max-w-xs">
                Pakistan&rsquo;s first farm-to-family supply chain. We&rsquo;re cutting middlemen out of
                the field and putting the margin back where it belongs — with the farmer.
              </p>
              <div className="mt-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-clay" />
                <span className="font-mono text-[11px] tracking-[0.2em]">LIVE IN BETA</span>
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="col-span-12 md:col-span-9 order-1 md:order-2">
            <h1 className="font-display tracking-tightest text-[14vw] md:text-[10vw] lg:text-[9.4rem] leading-[0.88] text-ink">
              From the
              <span className="italic font-light"> field, </span>
              <br />
              to the&nbsp;
              <span className="relative inline-block">
                family.
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 600 18"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 14 C 150 2, 450 2, 598 14" stroke="#C8542A" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h1>

            <div className="mt-10 md:mt-14 grid grid-cols-12 gap-x-5 md:gap-x-8">
              <p className="col-span-12 md:col-span-7 text-lg md:text-[22px] leading-snug text-ink/80 max-w-2xl">
                A direct, transparent marketplace connecting Pakistani farmers with shopkeepers and
                families — plus on-demand pathologists, vets, livestock trade and agri-inputs.
              </p>
              <div className="col-span-12 md:col-span-5 flex flex-col gap-4 md:items-end">
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#cta"
                    className="group inline-flex items-center gap-3 bg-ink text-bone px-5 py-3.5 cursor-pointer hover:bg-clay transition-colors"
                  >
                    <span className="text-sm tracking-wide">Download for Farmers</span>
                    <Arrow />
                  </a>
                  <a
                    href="#solution"
                    className="group inline-flex items-center gap-3 hairline border-ink/40 border px-5 py-3.5 cursor-pointer hover:bg-ink hover:text-bone transition-colors"
                  >
                    <span className="text-sm tracking-wide">How it works</span>
                  </a>
                </div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-ink/60">
                  AVAILABLE ON · iOS · ANDROID
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero visual collage */}
        <div className="mt-16 md:mt-20 grid grid-cols-12 gap-3 md:gap-4">
          <FieldCard
            className="col-span-12 md:col-span-7 aspect-[16/10] md:aspect-[16/9]"
            tone="forest"
            label="01 / Fresh Harvest"
            caption="Tomato. Punjab. Picked 06:14 AM."
          />
          <div className="col-span-12 md:col-span-5 grid grid-cols-2 gap-3 md:gap-4">
            <FieldCard className="aspect-[4/5] col-span-1" tone="clay" label="02" caption="Wholesale tier" />
            <FieldCard className="aspect-[4/5] col-span-1" tone="ochre" label="03" caption="Vet on call" />
            <div className="col-span-2 hairline border border-ink/15 p-4 md:p-5 flex items-center justify-between">
              <div>
                <p className="label">Avg. farmer payout</p>
                <p className="font-display text-3xl md:text-4xl tracking-tightest mt-1">+87%</p>
              </div>
              <div className="text-right">
                <p className="label">Consumer price</p>
                <p className="font-display text-3xl md:text-4xl tracking-tightest mt-1 text-clay">−32%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero stats row */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 hairline border-y border-ink/15">
          {[
            ['3,000', 'Farmers in Year 1'],
            ['30,000', 'Active Users'],
            ['8,000', 'Monthly Trades'],
            ['500+', 'Expert Consults'],
          ].map(([n, l], i) => (
            <div
              key={i}
              className={`p-5 md:p-8 ${i !== 0 ? 'border-l border-ink/15' : ''} ${
                i < 2 ? 'border-b md:border-b-0 border-ink/15' : ''
              }`}
            >
              <p className="font-display text-4xl md:text-6xl tracking-tightest leading-none">{n}</p>
              <p className="mt-2 label">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function FieldCard({ className = '', tone = 'forest', label, caption }) {
  const bg =
    tone === 'forest'
      ? 'bg-forest text-bone'
      : tone === 'clay'
      ? 'bg-clay text-bone'
      : 'bg-ochre text-ink'
  return (
    <div className={`relative overflow-hidden ${bg} ${className}`}>
      <FieldArt tone={tone} />
      <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-between">
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase opacity-80">{label}</span>
        <span className="font-display text-base md:text-lg tracking-tightest">{caption}</span>
      </div>
    </div>
  )
}

function FieldArt({ tone }) {
  if (tone === 'forest') {
    return (
      <svg viewBox="0 0 800 480" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <pattern id="rows" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M0 22 L22 0" stroke="#EDE7D3" strokeOpacity="0.08" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="800" height="480" fill="#0F2A20" />
        <rect width="800" height="480" fill="url(#rows)" />
        {/* horizon */}
        <path d="M0 320 Q 200 280 400 310 T 800 290 L 800 480 L 0 480 Z" fill="#1B3A2F" />
        <path d="M0 360 Q 220 320 420 350 T 800 340 L 800 480 L 0 480 Z" fill="#0E1F18" />
        {/* sun */}
        <circle cx="640" cy="120" r="60" fill="#D69A3C" opacity="0.85" />
        {/* trees */}
        <g fill="#0E1F18">
          <circle cx="120" cy="300" r="18" />
          <rect x="118" y="298" width="4" height="32" />
          <circle cx="170" cy="290" r="14" />
          <rect x="168" y="290" width="4" height="34" />
          <circle cx="700" cy="295" r="22" />
          <rect x="698" y="290" width="4" height="38" />
        </g>
        {/* rolling crop rows */}
        <g stroke="#8FA88B" strokeOpacity="0.35" strokeWidth="1.3" fill="none">
          <path d="M0 400 Q 200 380 400 395 T 800 385" />
          <path d="M0 420 Q 200 402 400 415 T 800 405" />
          <path d="M0 440 Q 200 425 400 435 T 800 428" />
          <path d="M0 460 Q 200 446 400 455 T 800 450" />
        </g>
      </svg>
    )
  }
  if (tone === 'clay') {
    return (
      <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="500" fill="#C8542A" />
        <g fill="#EDE7D3" opacity="0.18">
          <circle cx="80" cy="380" r="60" />
          <circle cx="200" cy="350" r="80" />
          <circle cx="320" cy="400" r="50" />
        </g>
        <g stroke="#EDE7D3" strokeOpacity="0.3" strokeWidth="1" fill="none">
          <path d="M0 100 H 400" />
          <path d="M0 130 H 400" />
          <path d="M0 160 H 400" />
        </g>
        <text x="20" y="80" fill="#EDE7D3" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">
          PKR / KG
        </text>
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="500" fill="#D69A3C" />
      <g stroke="#0E0F0C" strokeOpacity="0.25" strokeWidth="1" fill="none">
        <circle cx="200" cy="250" r="120" />
        <circle cx="200" cy="250" r="80" />
        <circle cx="200" cy="250" r="40" />
      </g>
      <g fill="#0E0F0C">
        <circle cx="200" cy="250" r="6" />
      </g>
    </svg>
  )
}
