export default function Solution() {
  const features = [
    {
      n: '01',
      title: 'Direct trade, two ways.',
      desc: 'Farmer ↔ Shopkeeper. Farmer ↔ Family. One app, two pricing tiers — wholesale and retail — built into every listing.',
      visual: <DirectArt />,
    },
    {
      n: '02',
      title: 'Image-first, voice-guided.',
      desc: 'Built for low-literacy users. Tap photos, listen to instructions in Urdu and local languages, sell in seconds.',
      visual: <PhoneArt />,
    },
    {
      n: '03',
      title: 'A doctor for every plant.',
      desc: 'Online & physical consultations from plant pathologists and veterinary doctors — no city trip required.',
      visual: <ConsultArt />,
    },
    {
      n: '04',
      title: 'Inputs you can trust.',
      desc: 'Verified seeds, fertilizers, pesticides and tools from local sellers. With optional doorstep transport.',
      visual: <InputsArt />,
    },
  ]

  return (
    <section id="solution" className="relative bg-cream py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-12 gap-x-5 md:gap-x-8 hairline-b pb-8 mb-16">
          <div className="col-span-12 md:col-span-3">
            <span className="label">§ 03 — The Solution</span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tightest leading-[0.95] reveal">
              One window.&nbsp;
              <span className="italic font-light">Every farmer&rsquo;s</span> need.
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-ink/75">
              Farm2You is the complete agri-stack for Pakistan — a single app that replaces the broker,
              the agronomist&rsquo;s phonebook, the input shop and the delivery truck.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-y-16 md:gap-y-24">
          {features.map((f, i) => (
            <div
              key={f.n}
              className={`col-span-12 grid grid-cols-12 gap-x-5 md:gap-x-8 items-center reveal ${
                i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div className="col-span-12 md:col-span-7">
                <div className="aspect-[16/10] bg-bone hairline border border-ink/15 relative overflow-hidden">
                  {f.visual}
                </div>
              </div>
              <div className="col-span-12 md:col-span-5">
                <span className="font-mono text-[11px] tracking-[0.2em] text-clay">F·{f.n}</span>
                <h3 className="mt-3 font-display text-3xl md:text-5xl tracking-tightest leading-[0.95]">
                  {f.title}
                </h3>
                <p className="mt-5 text-[17px] text-ink/75 leading-relaxed max-w-md">{f.desc}</p>
                <a href="#cta" className="mt-6 inline-flex items-center gap-2 text-sm group cursor-pointer">
                  <span className="border-b border-ink pb-0.5 group-hover:text-clay group-hover:border-clay transition-colors">
                    Learn more
                  </span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DirectArt() {
  return (
    <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect width="800" height="500" fill="#EDE7D3" />
      {/* Farmer */}
      <g transform="translate(80, 180)">
        <rect x="0" y="0" width="180" height="140" fill="none" stroke="#0E0F0C" strokeWidth="1.5" />
        <text x="14" y="30" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="2" fill="#0E0F0C">FARMER</text>
        <text x="14" y="80" fontFamily="Fraunces, serif" fontSize="42" fill="#0F2A20">৳ 220/kg</text>
        <text x="14" y="115" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#0E0F0C" opacity="0.6">PAYOUT</text>
      </g>
      {/* Arrow lines */}
      <g stroke="#C8542A" strokeWidth="1.5" fill="none">
        <path d="M280 250 H 510" />
        <path d="M495 240 L 510 250 L 495 260" />
      </g>
      <text x="340" y="240" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2" fill="#C8542A">DIRECT TRADE · NO MIDDLEMAN</text>
      {/* Buyer */}
      <g transform="translate(540, 100)">
        <rect x="0" y="0" width="180" height="100" fill="#0F2A20" />
        <text x="14" y="28" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2" fill="#EDE7D3">SHOPKEEPER · BULK</text>
        <text x="14" y="70" fontFamily="Fraunces, serif" fontSize="32" fill="#EDE7D3">৳ 240</text>
      </g>
      <g transform="translate(540, 260)">
        <rect x="0" y="0" width="180" height="100" fill="#C8542A" />
        <text x="14" y="28" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2" fill="#EDE7D3">FAMILY · RETAIL</text>
        <text x="14" y="70" fontFamily="Fraunces, serif" fontSize="32" fill="#EDE7D3">৳ 280</text>
      </g>
      {/* dots */}
      <circle cx="270" cy="250" r="4" fill="#0E0F0C" />
      <circle cx="520" cy="250" r="4" fill="#0E0F0C" />
    </svg>
  )
}

function PhoneArt() {
  return (
    <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect width="800" height="500" fill="#0F2A20" />
      <g transform="translate(280, 50)">
        <rect x="0" y="0" width="240" height="400" rx="0" fill="#EDE7D3" stroke="#0E0F0C" strokeWidth="2" />
        <rect x="14" y="14" width="212" height="40" fill="#0F2A20" />
        <text x="22" y="40" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#EDE7D3" letterSpacing="2">FARM2YOU</text>
        {/* image cells */}
        {[0,1,2,3,4,5].map(i => (
          <g key={i} transform={`translate(${14 + (i%2)*108}, ${70 + Math.floor(i/2)*84})`}>
            <rect width="100" height="76" fill="#D69A3C" />
            <circle cx="50" cy="32" r="14" fill="#0F2A20" opacity="0.5" />
            <text x="6" y="70" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#0E0F0C" letterSpacing="1.5">{['TOMATO','ONION','WHEAT','MILK','GOAT','SEEDS'][i]}</text>
          </g>
        ))}
        {/* mic */}
        <g transform="translate(108, 340)">
          <circle r="22" fill="#C8542A" />
          <rect x="-3" y="-10" width="6" height="14" fill="#EDE7D3" />
          <path d="M-8 0 a8 8 0 0 0 16 0" stroke="#EDE7D3" strokeWidth="2" fill="none" />
        </g>
      </g>
      <text x="80" y="100" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#EDE7D3" letterSpacing="2">‟ TAP THE TOMATO ”</text>
      <text x="80" y="120" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#D69A3C" letterSpacing="2">— UR · PA · SI · EN</text>
      <text x="560" y="380" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#EDE7D3" letterSpacing="2" opacity="0.7">VOICE GUIDE ON</text>
    </svg>
  )
}

function ConsultArt() {
  return (
    <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect width="800" height="500" fill="#EDE7D3" />
      {/* leaf with magnifier */}
      <g transform="translate(120, 110)">
        <path d="M0 140 C 0 60, 80 0, 200 0 C 200 120, 120 160, 0 140 Z" fill="#1B3A2F" />
        <path d="M0 140 C 60 80, 130 30, 200 0" stroke="#EDE7D3" strokeWidth="2" fill="none" opacity="0.5" />
        <circle cx="160" cy="100" r="40" fill="none" stroke="#C8542A" strokeWidth="3" />
        <line x1="190" y1="130" x2="220" y2="160" stroke="#C8542A" strokeWidth="3" />
      </g>
      {/* card */}
      <g transform="translate(440, 80)">
        <rect width="280" height="120" fill="#0F2A20" />
        <text x="20" y="34" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#D69A3C" letterSpacing="2">DR. AMINA · PATHOLOGY</text>
        <text x="20" y="70" fontFamily="Fraunces, serif" fontSize="28" fill="#EDE7D3">Wheat Rust</text>
        <text x="20" y="100" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#EDE7D3" opacity="0.7" letterSpacing="2">DIAGNOSIS · 3 MIN AGO</text>
      </g>
      <g transform="translate(440, 230)">
        <rect width="280" height="120" fill="#C8542A" />
        <text x="20" y="34" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#EDE7D3" letterSpacing="2">DR. HASSAN · VETERINARY</text>
        <text x="20" y="70" fontFamily="Fraunces, serif" fontSize="28" fill="#EDE7D3">Goat — fever</text>
        <text x="20" y="100" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#EDE7D3" opacity="0.85" letterSpacing="2">VIDEO CALL · LIVE</text>
      </g>
    </svg>
  )
}

function InputsArt() {
  return (
    <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect width="800" height="500" fill="#D69A3C" />
      {/* sacks */}
      <g transform="translate(80, 180)">
        <rect x="0" y="0" width="120" height="160" fill="#EDE7D3" stroke="#0E0F0C" strokeWidth="2" />
        <path d="M30 0 L 90 0 L 80 30 L 40 30 Z" fill="#0F2A20" />
        <text x="14" y="80" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#0E0F0C" letterSpacing="2">SEEDS</text>
        <text x="14" y="100" fontFamily="Fraunces, serif" fontSize="22" fill="#0F2A20">25kg</text>
      </g>
      <g transform="translate(220, 200)">
        <rect x="0" y="0" width="120" height="140" fill="#0F2A20" />
        <text x="14" y="40" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#EDE7D3" letterSpacing="2">FERT.</text>
        <text x="14" y="80" fontFamily="Fraunces, serif" fontSize="22" fill="#EDE7D3">NPK</text>
        <text x="14" y="120" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#D69A3C" letterSpacing="2">VERIFIED</text>
      </g>
      <g transform="translate(360, 220)">
        <rect x="0" y="0" width="120" height="120" fill="#C8542A" />
        <text x="14" y="34" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#EDE7D3" letterSpacing="2">TOOLS</text>
        <text x="14" y="80" fontFamily="Fraunces, serif" fontSize="22" fill="#EDE7D3">∗∗∗∗</text>
      </g>
      {/* truck */}
      <g transform="translate(520, 230)" stroke="#0E0F0C" strokeWidth="2" fill="#EDE7D3">
        <rect x="0" y="0" width="120" height="60" />
        <rect x="120" y="20" width="50" height="40" />
        <circle cx="30" cy="70" r="14" fill="#0E0F0C" />
        <circle cx="140" cy="70" r="14" fill="#0E0F0C" />
      </g>
      <text x="520" y="320" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#0E0F0C" letterSpacing="2">DOORSTEP DELIVERY · OPT</text>
    </svg>
  )
}
