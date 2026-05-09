import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CheckCircle2, Truck, Phone, Calendar } from 'lucide-react'
import { api } from '../../lib/api.js'
import { fmtPKR } from '../../lib/cart.jsx'

export default function OrderConfirmed() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api(`/orders/${id}`)
      .then((r) => { setOrder(r.order); setItems(r.items || []) })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="py-20 text-center text-sm font-mono text-ink/60 tracking-[0.2em]">LOADING…</div>
  if (!order) return (
    <div className="py-20 max-w-[600px] mx-auto px-4 text-center">
      <p className="font-display text-3xl tracking-tightest">Order not found.</p>
      <Link to="/shop" className="mt-5 inline-flex items-center gap-2 bg-ink text-bone px-5 py-3 cursor-pointer hover:bg-clay">Continue shopping →</Link>
    </div>
  )

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[800px] mx-auto px-4 md:px-6">
        <div className="text-center">
          <span className="grid place-items-center w-14 h-14 bg-forest text-bone mx-auto">
            <CheckCircle2 size={28} />
          </span>
          <h1 className="mt-5 font-display text-4xl md:text-6xl tracking-tightest leading-[0.95]">
            Order placed.<br/><span className="italic font-light">Shukria, {order.customer_name.split(' ')[0]}.</span>
          </h1>
          <p className="mt-4 text-ink/70">
            We&rsquo;ve received your order. We&rsquo;ll call you on{' '}
            <strong>{order.customer_phone}</strong> to confirm shortly.
          </p>
          <p className="mt-2 font-mono text-xs tracking-[0.2em] text-ink/55">ORDER #{String(order.id).padStart(4, '0')}</p>
        </div>

        <div className="mt-10 hairline border border-ink/15 bg-bone p-5 md:p-6">
          <h2 className="font-display text-2xl tracking-tightest">Summary</h2>
          <ul className="mt-5 divide-y divide-ink/10">
            {items.map((it) => (
              <li key={it.id} className="py-3 flex justify-between gap-4">
                <div>
                  <p className="font-display text-base tracking-tightest">{it.product_name}</p>
                  <p className="text-xs text-ink/55 font-mono">{it.qty} × {fmtPKR(it.unit_price)}/{it.unit}</p>
                </div>
                <span className="font-mono">{fmtPKR(it.line_total)}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-4 hairline-t border-ink/15 pt-4 space-y-2 text-sm">
            <li className="flex justify-between"><span className="text-ink/65">Subtotal</span><span className="font-mono">{fmtPKR(order.subtotal)}</span></li>
            <li className="flex justify-between"><span className="text-ink/65">Delivery</span><span className="font-mono">{order.delivery_fee === 0 ? 'FREE' : fmtPKR(order.delivery_fee)}</span></li>
          </ul>
          <div className="mt-3 hairline-t border-ink/15 pt-3 flex items-baseline justify-between">
            <span className="font-mono text-[11px] tracking-[0.2em] text-ink/55">TOTAL · {order.payment_method === 'cod' ? 'CASH ON DELIVERY' : 'BANK TRANSFER'}</span>
            <span className="font-display text-3xl tracking-tightest">{fmtPKR(order.total)}</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <Info Icon={Truck} title="Delivery" value={`${order.city}`} />
          <Info Icon={Calendar} title="Expected" value="Same / next day" />
          <Info Icon={Phone} title="Support" value="0800-FARM2YOU" />
        </div>

        <div className="mt-8 text-center">
          <Link to="/shop" className="inline-flex items-center gap-2 bg-ink text-bone px-5 py-3.5 cursor-pointer hover:bg-clay">Continue shopping →</Link>
        </div>
      </div>
    </section>
  )
}

function Info({ Icon, title, value }) {
  return (
    <div className="border border-ink/15 bg-bone p-4 flex items-start gap-3">
      <Icon size={18} className="text-clay shrink-0 mt-0.5" />
      <div>
        <p className="font-mono text-[10px] tracking-[0.2em] text-ink/55 uppercase">{title}</p>
        <p className="font-display text-base tracking-tightest mt-0.5">{value}</p>
      </div>
    </div>
  )
}
