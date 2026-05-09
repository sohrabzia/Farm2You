import { useEffect, useState } from 'react'
import { api } from '../../lib/api.js'
import { PageTitle, StatCard, Panel, Empty } from './ui.jsx'
import { fmtPKR } from '../../lib/cart.jsx'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [recent, setRecent] = useState({ orders: [], farmers: [], products: [] })
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')

  useEffect(() => {
    let alive = true
    Promise.all([api('/admin/stats'), api('/admin/recent')])
      .then(([s, r]) => { if (alive) { setStats(s); setRecent(r) } })
      .catch((e) => alive && setErr(e.message))
      .finally(() => alive && setLoading(false))
    return () => { alive = false }
  }, [])

  return (
    <div className="space-y-8 max-w-[1400px]">
      <PageTitle eyebrow="Overview" title="Operations at a glance." />

      {err && <div className="border border-clay text-clay px-4 py-3 text-sm font-mono">⚠ {err}</div>}

      <div className="grid grid-cols-2 lg:grid-cols-4 hairline border border-ink/15 bg-bone">
        <StatCard label="Products" value={stats?.products ?? '—'} sub="In catalogue" />
        <StatCard label="Orders" value={stats?.orders ?? '—'} sub="All-time" />
        <StatCard label="Customers" value={stats?.customers ?? '—'} sub="Registered" />
        <StatCard label="Revenue" value={stats ? fmtPKR(stats.revenue) : '—'} sub="Gross" />
      </div>

      <div className="grid grid-cols-12 gap-5 md:gap-6">
        <Panel title="Recent orders" cls="col-span-12 lg:col-span-8">
          {loading ? <Skeleton rows={5} /> : recent.orders.length === 0 ? <Empty msg="No orders yet." /> : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left font-mono text-[10px] tracking-[0.2em] text-ink/60">
                  <th className="py-2 px-3">ORDER</th>
                  <th className="py-2 px-3">CUSTOMER</th>
                  <th className="py-2 px-3">CITY</th>
                  <th className="py-2 px-3 text-right">TOTAL</th>
                  <th className="py-2 px-3">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {recent.orders.map((o) => (
                  <tr key={o.id} className="border-t border-ink/10 hover:bg-cream cursor-pointer">
                    <td className="py-3 px-3 font-mono text-xs">#{String(o.id).padStart(4, '0')}</td>
                    <td className="py-3 px-3">{o.customer_name}</td>
                    <td className="py-3 px-3 text-xs">{o.city}</td>
                    <td className="py-3 px-3 text-right font-mono">{fmtPKR(o.total)}</td>
                    <td className="py-3 px-3 font-mono text-xs uppercase tracking-[0.15em]">{o.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Panel>

        <Panel title="New products" cls="col-span-12 lg:col-span-4">
          {loading ? <Skeleton rows={5} /> : recent.products.length === 0 ? <Empty msg="No products yet." /> : (
            <ul className="divide-y divide-ink/10">
              {recent.products.map((p) => (
                <li key={p.id} className="py-3 flex items-center gap-3">
                  <div className="w-12 h-12 bg-cream overflow-hidden shrink-0">
                    {p.image_url && <img src={p.image_url} alt={p.name} loading="lazy" className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-base tracking-tightest truncate">{p.name}</p>
                    <p className="text-xs text-ink/55 font-mono">{p.category} · {fmtPKR(p.retail_price)}/{p.unit}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  )
}

function Skeleton({ rows = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => <div key={i} className="h-9 bg-cream animate-pulse" />)}
    </div>
  )
}
