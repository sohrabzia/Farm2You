export default function Consultations() {
  return (
    <section id="experts" className="relative bg-ink text-bone py-20 md:py-32 overflow-hidden">
      {/* large editorial number background */}
      <div className="absolute -right-12 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.06]">
        <span className="font-display text-[40rem] leading-none tracking-tightest">∞</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-8 relative">
        <div className="grid grid-cols-12 gap-x-5 md:gap-x-8 hairline-b border-bone/15 pb-8 mb-16">
          <div className="col-span-12 md:col-span-3">
            <span className="label !text-bone/60">§ 05 — Experts</span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tightest leading-[0.95] reveal">
              A specialist in
              <br />
              <span className="italic font-light text-ochre">every pocket.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-5 md:gap-x-8 gap-y-10">
          <div className="col-span-12 md:col-span-7 reveal">
            <ExpertPanel />
          </div>

          <div className="col-span-12 md:col-span-5 flex flex-col gap-8 reveal">
            <Stat label="Plant pathologists onboarded" value="120+" sub="Punjab · Sindh · KP" />
            <Stat label="Verified veterinary doctors" value="80+" sub="On-call 7 days a week" />
            <Stat label="Free consultations · Year 1" value="500" sub="Reserved for first farmers" />

            <div className="bg-bone text-ink p-6 md:p-8">
              <span className="label">Languages</span>
              <p className="mt-3 font-display text-2xl md:text-3xl tracking-tightest leading-tight">
                Urdu, Sindhi, Punjabi, Pashto — speak, don&rsquo;t type.
              </p>
            </div>
          </div>
        </div>

        {/* Symptom row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-6 hairline border border-bone/15">
          {['Wheat rust', 'Citrus blight', 'Mastitis', 'Foot-rot', 'Aphids', 'Blue tongue'].map((s, i) => (
            <div
              key={s}
              className={`p-4 md:p-5 ${i !== 0 ? 'md:border-l border-bone/15' : ''} ${
                i < 3 ? 'border-b md:border-b-0 border-bone/15' : ''
              } group hover:bg-clay transition-colors cursor-pointer`}
            >
              <span className="label !text-bone/60 group-hover:!text-bone/80">SYMPTOM 0{i + 1}</span>
              <p className="mt-2 font-display text-xl tracking-tightest">{s}</p>
              <span className="mt-3 inline-flex text-[11px] font-mono text-ochre group-hover:text-bone">→ Diagnose</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stat({ label, value, sub }) {
  return (
    <div className="hairline-b border-bone/20 pb-6">
      <span className="label !text-bone/60">{label}</span>
      <p className="mt-2 font-display text-5xl md:text-6xl tracking-tightest leading-none">{value}</p>
      <p className="mt-2 text-sm text-bone/70">{sub}</p>
    </div>
  )
}

function ExpertPanel() {
  return (
    <div className="aspect-[5/4] bg-forest border border-bone/15 relative overflow-hidden">
      <svg viewBox="0 0 600 480" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="600" height="480" fill="#0F2A20" />
        {/* terminal-style call card */}
        <g transform="translate(40, 40)">
          <rect width="520" height="80" fill="#0E0F0C" stroke="#EDE7D3" strokeOpacity="0.15" />
          <circle cx="20" cy="40" r="6" fill="#C8542A" />
          <text x="40" y="44" fontFamily="JetBrains Mono, monospace" fontSize="12" fill="#EDE7D3" letterSpacing="2">LIVE · DR. AMINA SHEIKH</text>
          <text x="500" y="44" fontFamily="JetBrains Mono, monospace" fontSize="12" fill="#D69A3C" letterSpacing="2" textAnchor="end">04:21</text>
        </g>
        {/* Doctor portrait abstraction */}
        <g transform="translate(40, 150)">
          <rect width="240" height="280" fill="#1B3A2F" />
          <circle cx="120" cy="110" r="50" fill="#D69A3C" />
          <rect x="60" y="170" width="120" height="110" fill="#EDE7D3" />
          <text x="14" y="270" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#EDE7D3" letterSpacing="2" opacity="0.7">PATHOLOGY · 12 YR EXP</text>
        </g>
        {/* Crop image with diagnosis */}
        <g transform="translate(310, 150)">
          <rect width="250" height="130" fill="#8FA88B" />
          <g fill="#0F2A20" opacity="0.6">
            <ellipse cx="60" cy="65" rx="36" ry="22" />
            <ellipse cx="160" cy="80" rx="30" ry="18" />
          </g>
          <circle cx="120" cy="65" r="20" fill="none" stroke="#C8542A" strokeWidth="3" />
          <line x1="138" y1="83" x2="160" y2="105" stroke="#C8542A" strokeWidth="3" />
        </g>
        <g transform="translate(310, 300)">
          <rect width="250" height="130" fill="#0E0F0C" />
          <text x="14" y="32" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#D69A3C" letterSpacing="2">DIAGNOSIS</text>
          <text x="14" y="68" fontFamily="Fraunces, serif" fontSize="22" fill="#EDE7D3">Late Blight</text>
          <text x="14" y="98" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#EDE7D3" opacity="0.7" letterSpacing="2">RX: COPPER + DRAIN ROOTS</text>
          <text x="14" y="118" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#EDE7D3" opacity="0.5" letterSpacing="2">SPRAY EVERY 7 DAYS</text>
        </g>
      </svg>
    </div>
  )
}
