import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Truck, ShieldCheck, ChevronLeft, Banknote, Building2 } from 'lucide-react'
import { useCart, fmtPKR } from '../../lib/cart.jsx'
import { useCustomer } from '../../lib/customer.jsx'
import { api } from '../../lib/api.js'

const cities = ['Karachi', 'Hyderabad', 'Sukkur', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Multan', 'Faisalabad']

export default function Checkout() {
  const { items, subtotal, clear } = useCart()
  const { customer } = useCustomer()
  const nav = useNavigate()

  const [form, setForm] = useState({
    name: customer?.name || '',
    phone: customer?.phone || '',
    address: customer?.address || '',
    city: customer?.city || 'Karachi',
    notes: '',
    payment_method: 'cod',
  })
  const [err, setErr] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const delivery = subtotal === 0 ? 0 : subtotal >= 2000 ? 0 : 150
  const total = subtotal + delivery

  if (items.length === 0) {
    return (
      <section className="py-20 text-center max-w-[600px] mx-auto px-4">
        <p className="font-display text-3xl tracking-tightest">Your basket is empty.</p>
        <Link to="/shop" className="mt-5 inline-flex items-center gap-2 bg-ink text-bone px-5 py-3 cursor-pointer hover:bg-clay">Start shopping →</Link>
      </section>
    )
  }

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    if (!form.name || !form.phone || !form.address) { setErr('Please fill in name, phone and address.'); return }
    if (!/^0?3\d{2}-?\d{7}$/.test(form.phone.replace(/\s/g, ''))) {
      setErr('Please enter a valid Pakistani mobile number (e.g. 0300-1234567).')
      return
    }
    setSubmitting(true)
    try {
      const payload = {
        ...form,
        items: items.map((i) => ({ product_id: i.id, qty: i.qty })),
      }
      const res = await api('/orders', { method: 'POST', body: payload })
      clear()
      nav(`/order/${res.order.id}/confirmed`, { replace: true })
    } catch (e) {
      setErr(e.message || 'Could not place order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <Link to="/cart" className="inline-flex items-center gap-1.5 text-sm text-ink/65 hover:text-ink cursor-pointer mb-4">
          <ChevronLeft size={14} /> Back to basket
        </Link>
        <h1 className="font-display text-4xl md:text-6xl tracking-tightest leading-tight">Checkout</h1>
        <p className="mt-2 text-sm text-ink/65">Pay with cash on delivery — no online payment needed.</p>

        <form onSubmit={submit} className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          <div className="lg:col-span-8 space-y-8">
            <Section title="Delivery details" sub="Where should we send your order?">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Full name" required>
                  <Input value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Aisha Khan" />
                </Field>
                <Field label="Mobile number" required>
                  <Input value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="0300-1234567" />
                </Field>
                <Field label="Full address" required cls="md:col-span-2">
                  <Input value={form.address} onChange={(v) => setForm({ ...form, address: v })} placeholder="House # / Street / Area / Landmark" />
                </Field>
                <Field label="City" required>
                  <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full bg-bone border border-ink/25 px-3 py-3 outline-none focus:border-ink cursor-pointer">
                    {cities.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Order notes (optional)" cls="md:col-span-2">
                  <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} placeholder="e.g. ring the bell twice, ask for Aisha" className="w-full bg-bone border border-ink/25 px-3 py-3 outline-none focus:border-ink resize-none" />
                </Field>
              </div>
            </Section>

            <Section title="Payment method" sub="We currently support cash on delivery and bank transfer.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <PayOption
                  active={form.payment_method === 'cod'}
                  onClick={() => setForm({ ...form, payment_method: 'cod' })}
                  Icon={Banknote}
                  title="Cash on Delivery"
                  desc="Pay our rider in cash when your order arrives."
                  recommended
                />
                <PayOption
                  active={form.payment_method === 'bank'}
                  onClick={() => setForm({ ...form, payment_method: 'bank' })}
                  Icon={Building2}
                  title="Bank Transfer"
                  desc="Pay via JazzCash, EasyPaisa or IBFT after order confirmation."
                />
              </div>
            </Section>

            {err && <div className="border border-clay text-clay px-4 py-3 text-sm font-mono">⚠ {err}</div>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-clay text-bone px-6 py-4 text-base cursor-pointer hover:bg-ink transition-colors disabled:opacity-60"
            >
              {submitting ? 'Placing order…' : `Place order — ${fmtPKR(total)}`}
            </button>
          </div>

          <aside className="lg:col-span-4">
            <div className="hairline border border-ink/15 bg-bone p-5 lg:sticky lg:top-24">
              <h3 className="font-display text-xl tracking-tightest">Your order</h3>
              <ul className="mt-4 divide-y divide-ink/10">
                {items.map((it) => (
                  <li key={it.id} className="py-3 flex gap-3">
                    <div className="w-14 h-14 bg-cream overflow-hidden shrink-0">
                      {it.image_url && <img src={it.image_url} alt={it.name} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm tracking-tightest truncate">{it.name}</p>
                      <p className="text-xs text-ink/55 font-mono">{it.qty} × {fmtPKR(it.price)}/{it.unit}</p>
                    </div>
                    <span className="font-mono text-sm shrink-0">{fmtPKR(it.qty * it.price)}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 hairline-t border-ink/15 pt-4 space-y-2 text-sm">
                <li className="flex justify-between"><span className="text-ink/65">Subtotal</span><span className="font-mono">{fmtPKR(subtotal)}</span></li>
                <li className="flex justify-between"><span className="text-ink/65">Delivery</span><span className="font-mono">{delivery === 0 ? 'FREE' : fmtPKR(delivery)}</span></li>
              </ul>
              <div className="mt-4 hairline-t border-ink/15 pt-3 flex items-baseline justify-between">
                <span className="font-mono text-[11px] tracking-[0.2em] text-ink/55">TOTAL</span>
                <span className="font-display text-3xl tracking-tightest">{fmtPKR(total)}</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-ink/65">
                <span className="flex items-center gap-1.5"><Truck size={13}/> Same-day Karachi</span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={13}/> Cash on Delivery</span>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </section>
  )
}

function Section({ title, sub, children }) {
  return (
    <section className="hairline border border-ink/15 bg-bone p-5 md:p-6">
      <h2 className="font-display text-2xl tracking-tightest">{title}</h2>
      {sub && <p className="text-sm text-ink/60 mt-1">{sub}</p>}
      <div className="mt-5">{children}</div>
    </section>
  )
}
function Field({ label, required, cls = '', children }) {
  return (
    <label className={`block ${cls}`}>
      <span className="block text-sm text-ink/75 mb-1.5">
        {label} {required && <span className="text-clay">*</span>}
      </span>
      {children}
    </label>
  )
}
function Input({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-bone border border-ink/25 px-3 py-3 outline-none focus:border-ink"
    />
  )
}
function PayOption({ active, onClick, Icon, title, desc, recommended }) {
  return (
    <button type="button" onClick={onClick} className={`text-left p-4 cursor-pointer transition-colors flex items-start gap-3 border ${active ? 'border-ink bg-ink/5' : 'border-ink/20 hover:border-ink/50'}`}>
      <span className={`grid place-items-center w-10 h-10 ${active ? 'bg-ink text-bone' : 'bg-cream text-ink'}`}>
        <Icon size={18} />
      </span>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-display text-base tracking-tightest">{title}</p>
          {recommended && <span className="font-mono text-[10px] tracking-[0.18em] bg-forest text-bone px-1.5 py-0.5">RECOMMENDED</span>}
        </div>
        <p className="text-xs text-ink/65 mt-1 leading-relaxed">{desc}</p>
      </div>
    </button>
  )
}
