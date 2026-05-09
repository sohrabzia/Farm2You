export default function Roadmap() {
  const phases = [
    {
      n: 'Phase 01',
      time: 'Month 1',
      title: 'Pre-Launch',
      desc: 'Finalize MVP, onboard first farmers and pathologists, register brand and domain.',
      tone: 'bone',
    },
    {
      n: 'Phase 02',
      time: 'Month 2–3',
      title: 'Launch',
      desc: 'Brand awareness on FB / YouTube / TikTok. Local demos in Punjab and Sindh villages. Activate referral rewards.',
      tone: 'ochre',
    },
    {
      n: 'Phase 03',
      time: 'Month 4–6',
      title: 'Growth',
      desc: 'Influencer campaigns, expert content, more shopkeepers, loyalty rewards begin.',
      tone: 'clay',
    },
    {
      n: 'Phase 04',
      time: 'Month 7–12',
      title: 'Expansion',
      desc: 'Onboard 3,000 farmers and 20,000 users. Expand pathology team and agri-input marketplace.',
      tone: 'forest',
    },
  ]
  return (
    <section id="roadmap" className="relative bg-cream py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-12 gap-x-5 md:gap-x-8 hairline-b pb-8 mb-14">
          <div className="col-span-12 md:col-span-3">
            <span className="label">§ 08 — Roadmap</span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tightest leading-[0.95] reveal">
              Twelve months,
              <br />
              <span className="italic font-light">four moves.</span>
            </h2>
          </div>
        </div>

        <div className="relative">
          {/* timeline rail */}
          <div className="hidden md:block absolute left-0 right-0 top-12 h-px bg-ink/20" />
          <div className="grid grid-cols-1 md:grid-cols-4">
            {phases.map((p, i) => (
              <div key={p.n} className="relative pl-0 md:pr-8 reveal">
                <div className="hidden md:block absolute left-0 top-9 w-3 h-3 bg-ink" />
                <div className="hidden md:block absolute left-3 top-10 right-0 h-px bg-ink/20" />
                <div className="md:pt-20">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-clay">{p.n}</span>
                  <p className="mt-2 font-mono text-xs text-ink/60">{p.time}</p>
                  <h3 className="mt-4 font-display text-3xl md:text-4xl tracking-tightest leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-[15px] text-ink/75 leading-relaxed max-w-[28ch]">{p.desc}</p>

                  <div className={`mt-6 h-1.5 ${
                    p.tone === 'bone' ? 'bg-ink/15' : p.tone === 'ochre' ? 'bg-ochre' : p.tone === 'clay' ? 'bg-clay' : 'bg-forest'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3-year horizon */}
        <div className="mt-20 grid grid-cols-12 gap-x-5 md:gap-x-8 hairline-t border-t border-ink/15 pt-10">
          <div className="col-span-12 md:col-span-4">
            <span className="label">3-Year Horizon</span>
            <p className="mt-3 font-display text-3xl md:text-4xl tracking-tightest leading-tight">
              Three cities. Ten thousand farmers. A hundred thousand users.
            </p>
          </div>
          <div className="col-span-12 md:col-span-8 md:pl-8">
            <p className="text-lg text-ink/75 leading-relaxed">
              By year three, Farm2You will be the dominant agri-tech platform in Pakistan — a
              one-window solution that has fundamentally re-priced fresh produce in three major urban
              markets and built the country&rsquo;s most trusted livestock and agri-input network.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
