export default function Ticker() {
  const items = [
    'KISAAN KA HAQ — KISSAN TAK',
    'EST. KARACHI 2026',
    'DIRECT FROM FARM, NEVER A MIDDLEMAN',
    '50–100% MORE INCOME FOR FARMERS',
    'ORGANIC · TRANSPARENT · FRESH',
    'LIVE PATHOLOGISTS & VETS, ONLINE',
  ]
  const row = [...items, ...items, ...items]
  return (
    <div className="bg-ink text-bone overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-2.5 will-change-transform">
        {row.map((t, i) => (
          <span key={i} className="font-mono text-[11px] tracking-[0.25em] mx-8 inline-flex items-center">
            <span className="inline-block w-1.5 h-1.5 bg-clay mr-3" />
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
