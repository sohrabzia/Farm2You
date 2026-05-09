export default function FlowDiagram() {
  return (
    <section className="relative bg-cream py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-12 gap-x-5 md:gap-x-8 hairline-b pb-8 mb-14">
          <div className="col-span-12 md:col-span-3">
            <span className="label">§ 06 — Flow</span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tightest leading-[0.95] reveal">
              Goods &amp; service&nbsp;
              <span className="italic font-light">flow.</span>
            </h2>
          </div>
        </div>

        <div className="hairline border border-ink/20 bg-bone p-5 md:p-10 reveal">
          <svg viewBox="0 0 1200 620" className="w-full h-auto" aria-hidden="true">
            {/* grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0 L0 0 0 40" stroke="#0E0F0C" strokeOpacity="0.06" strokeWidth="1" />
              </pattern>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#0E0F0C" />
              </marker>
              <marker id="arrowClay" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#C8542A" />
              </marker>
            </defs>
            <rect width="1200" height="620" fill="url(#grid)" />

            {/* Center node — Warehouse */}
            <g>
              <rect x="500" y="250" width="200" height="120" fill="#0F2A20" />
              <text x="600" y="290" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#D69A3C" letterSpacing="2">FARM2YOU</text>
              <text x="600" y="320" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="26" fill="#EDE7D3">Warehouse</text>
              <text x="600" y="345" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#EDE7D3" opacity="0.7" letterSpacing="2">PICKUP · STORAGE · DISPATCH</text>
            </g>

            {/* Nodes */}
            <Node x={60} y={60} w={220} h={90} title="Vet & Plant Pathology" sub="ONLINE / VISIT" />
            <Node x={920} y={60} w={220} h={90} title="Agri-Input Dealer" sub="SEEDS · FERT · TOOLS" />
            <Node x={60} y={470} w={220} h={90} title="Farmer" sub="SUPPLY-SIDE" tone="clay" />
            <Node x={920} y={470} w={220} h={90} title="Consumer" sub="DEMAND-SIDE" tone="clay" />
            <Node x={490} y={500} w={220} h={90} title="Shopkeeper / Bulk Buyer" sub="WHOLESALE" tone="ochre" />
            <Node x={60} y={260} w={220} h={90} title="Livestock Buyer" sub="LIVE TRADE" />

            {/* Lines (with labels) */}
            <Line x1={170} y1={150} x2={550} y2={250} label="ONLINE / VISIT" />
            <Line x1={1030} y1={150} x2={650} y2={250} label="PICKUP BY F2Y" clay />
            <Line x1={170} y1={470} x2={500} y2={310} label="AGRI O/P · DELIVERED" />
            <Line x1={170} y1={350} x2={500} y2={330} label="LIVESTOCK" />
            <Line x1={700} y1={310} x2={1030} y2={500} label="DELIVERED BY F2Y" clay />
            <Line x1={600} y1={370} x2={600} y2={500} label="DELIVERY / PICKUP" />
            <Line x1={500} y1={310} x2={170} y2={500} label="AGRI I/P · DELIVERY" />

            {/* Legend */}
            <g transform="translate(60, 580)">
              <rect width="14" height="14" fill="#0F2A20" />
              <text x="22" y="12" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#0E0F0C" letterSpacing="2">F2Y NETWORK</text>
              <rect x="160" width="14" height="14" fill="#C8542A" />
              <text x="182" y="12" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#0E0F0C" letterSpacing="2">DIRECT TRADE</text>
              <rect x="320" width="14" height="14" fill="#D69A3C" />
              <text x="342" y="12" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#0E0F0C" letterSpacing="2">RETAIL POINT</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}

function Node({ x, y, w, h, title, sub, tone = 'bone' }) {
  const fill = tone === 'clay' ? '#C8542A' : tone === 'ochre' ? '#D69A3C' : '#EDE7D3'
  const text = tone === 'clay' ? '#EDE7D3' : '#0E0F0C'
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke="#0E0F0C" strokeWidth="1.5" />
      <text x={x + 16} y={y + 30} fontFamily="JetBrains Mono, monospace" fontSize="10" fill={text} opacity="0.8" letterSpacing="2">
        {sub}
      </text>
      <text x={x + 16} y={y + 64} fontFamily="Fraunces, serif" fontSize="22" fill={text}>
        {title}
      </text>
    </g>
  )
}

function Line({ x1, y1, x2, y2, label, clay }) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  return (
    <g>
      <path
        d={`M ${x1} ${y1} L ${x2} ${y2}`}
        stroke={clay ? '#C8542A' : '#0E0F0C'}
        strokeWidth="1.5"
        fill="none"
        markerEnd={`url(#${clay ? 'arrowClay' : 'arrow'})`}
        strokeDasharray={clay ? '4 4' : ''}
      />
      <text
        x={mx}
        y={my - 6}
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
        fill={clay ? '#C8542A' : '#0E0F0C'}
        letterSpacing="2"
      >
        {label}
      </text>
    </g>
  )
}
