import { useEffect, useState } from 'react'
import { api } from '../../lib/api.js'
import { PageTitle, Panel, Empty } from './ui.jsx'
import { fmtPKR } from '../../lib/cart.jsx'

const STATUSES = ['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled']

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const r = await api('/admin/orders')
      setOrders(r.orders || [])
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { load() }, [])

  const setStatus = async (id, status) => {
    await api(`/admin/orders/${id}`, { method: 'PUT', body: { status } })
    load()
  }

  const statusColor = (s) =>
    s === 'delivered' ? 'text-forest' :
    s === 'cancelled' ? 'text-clay' :
    s === 'dispatched' ? 'text-ink' :
    s === 'confirmed' ? 'text-forest' : 'text-ochre'

  return (
    <div className="space-y-8 max-w-[1400px]">
      <PageTitle eyebrow="Orders" title="Customer orders." />

      <Panel title={`Orders (${orders.length})`}>
        {loading ? <Empty msg="Loading…" /> : orders.length === 0 ? <Empty msg="No orders yet." /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left font-mono text-[10px] tracking-[0.2em] text-ink/60">
                  <th className="py-2 px-3">ORDER</th>
                  <th className="py-2 px-3">CUSTOMER</th>
                  <th className="py-2 px-3">PHONE</th>
                  <th className="py-2 px-3">CITY</th>
                  <th className="py-2 px-3">PAYMENT</th>
                  <th className="py-2 px-3 text-right">TOTAL</th>
                  <th className="py-2 px-3">STATUS</th>
                  <th className="py-2 px-3">DATE</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-t border-ink/10 hover:bg-cream">
                    <td className="py-3 px-3 font-mono text-xs">#{String(o.id).padStart(4, '0')}</td>
                    <td className="py-3 px-3 font-display text-base tracking-tightest">{o.customer_name}</td>
                    <td className="py-3 px-3 font-mono text-xs">{o.customer_phone}</td>
                    <td className="py-3 px-3 text-xs">{o.city}</td>
                    <td className="py-3 px-3 text-xs uppercase font-mono tracking-[0.15em]">{o.payment_method}</td>
                    <td className="py-3 px-3 text-right font-mono">{fmtPKR(o.total)}</td>
                    <td className="py-3 px-3">
                      <select
                        value={o.status}
                        onChange={(e) => setStatus(o.id, e.target.value)}
                        className={`bg-transparent border border-ink/20 px-2 py-1 text-xs font-mono uppercase tracking-[0.15em] cursor-pointer ${statusColor(o.status)}`}
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="py-3 px-3 font-mono text-xs text-ink/60">{new Date(o.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  )
}
