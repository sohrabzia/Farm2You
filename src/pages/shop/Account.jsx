import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, User, Phone, MapPin, Package } from 'lucide-react'
import { useCustomer } from '../../lib/customer.jsx'
import { api } from '../../lib/api.js'
import { fmtPKR } from '../../lib/cart.jsx'

export default function Account() {
  const { customer, logout } = useCustomer()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const nav = useNavigate()

  useEffect(() => {
    api('/customer/orders').then((r) => setOrders(r.orders || [])).finally(() => setLoading(false))
  }, [])

  const onLogout = async () => { await logout(); nav('/', { replace: true }) }

  return (
    <section className="py-10 md:py-14">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[11px] tracking-[0.22em] text-clay">// MY ACCOUNT</span>
            <h1 className="mt-2 font-display text-4xl md:text-5xl tracking-tightest">Hi, {customer?.name?.split(' ')[0]}.</h1>
            <p className="mt-2 text-sm text-ink/65 font-mono">{customer?.phone}</p>
          </div>
          <button onClick={onLogout} className="inline-flex items-center gap-2 border border-ink/30 px-4 py-2.5 text-sm cursor-pointer hover:bg-ink hover:text-bone transition-colors">
            <LogOut size={14} /> Sign out
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Tile Icon={User} title="Name" value={customer?.name} />
          <Tile Icon={Phone} title="Mobile" value={customer?.phone} />
          <Tile Icon={MapPin} title="City" value={customer?.city || '—'} />
        </div>

        <h2 className="mt-12 font-display text-2xl md:text-3xl tracking-tightest flex items-center gap-2"><Package size={20} /> Order history</h2>
        <div className="mt-5 hairline border border-ink/15 bg-bone">
          {loading ? (
            <div className="p-8 text-center text-sm font-mono text-ink/60 tracking-[0.2em]">LOADING…</div>
          ) : orders.length === 0 ? (
            <div className="p-10 text-center">
              <p className="font-display text-2xl tracking-tightest">No orders yet.</p>
              <Link to="/shop" className="mt-4 inline-flex items-center gap-2 bg-ink text-bone px-5 py-3 cursor-pointer hover:bg-clay">Start shopping →</Link>
            </div>
          ) : (
            <ul className="divide-y divide-ink/10">
              {orders.map((o) => (
                <li key={o.id} className="p-5 grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 md:col-span-3">
                    <p className="font-mono text-[11px] tracking-[0.2em] text-ink/55">ORDER #{String(o.id).padStart(4, '0')}</p>
                    <p className="font-display text-base mt-1">{new Date(o.created_at).toLocaleDateString('en-PK', { dateStyle: 'medium' })}</p>
                  </div>
                  <p className="col-span-6 md:col-span-3 text-sm text-ink/65">{o.item_count} item{o.item_count === 1 ? '' : 's'}</p>
                  <p className="col-span-6 md:col-span-3 font-display text-lg tracking-tightest">{fmtPKR(o.total)}</p>
                  <span className={`col-span-6 md:col-span-2 font-mono text-[11px] tracking-[0.18em] uppercase ${
                    o.status === 'delivered' ? 'text-forest' : o.status === 'cancelled' ? 'text-clay' : 'text-ochre'
                  }`}>● {o.status}</span>
                  <Link to={`/order/${o.id}/confirmed`} className="col-span-12 md:col-span-1 md:text-right text-sm text-ink/60 hover:text-clay cursor-pointer">View →</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

function Tile({ Icon, title, value }) {
  return (
    <div className="bg-bone border border-ink/15 p-5 flex items-start gap-3">
      <span className="grid place-items-center w-10 h-10 bg-cream text-clay shrink-0">
        <Icon size={18} />
      </span>
      <div>
        <p className="font-mono text-[10px] tracking-[0.2em] text-ink/55 uppercase">{title}</p>
        <p className="mt-1 font-display text-xl tracking-tightest">{value}</p>
      </div>
    </div>
  )
}
