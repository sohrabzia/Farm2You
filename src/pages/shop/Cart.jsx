import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart, fmtPKR } from '../../lib/cart.jsx'

export default function Cart() {
  const { items, setQty, remove, subtotal } = useCart()
  const delivery = subtotal === 0 ? 0 : subtotal >= 2000 ? 0 : 150
  const total = subtotal + delivery

  if (items.length === 0) {
    return (
      <section className="py-20">
        <div className="max-w-[600px] mx-auto px-4 md:px-6 text-center">
          <ShoppingBag size={42} className="mx-auto text-ink/30" />
          <h1 className="mt-5 font-display text-4xl md:text-5xl tracking-tightest">Your basket is empty.</h1>
          <p className="mt-3 text-ink/65">Browse fresh produce, dairy, livestock and more.</p>
          <Link to="/shop" className="mt-6 inline-flex items-center gap-2 bg-ink text-bone px-5 py-3.5 cursor-pointer hover:bg-clay">
            Start shopping <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <h1 className="font-display text-4xl md:text-6xl tracking-tightest leading-tight">Your basket</h1>
        <p className="mt-2 text-sm text-ink/60 font-mono">{items.length} item{items.length === 1 ? '' : 's'}</p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          <ul className="lg:col-span-8 hairline border border-ink/15 divide-y divide-ink/10 bg-bone">
            {items.map((it) => (
              <li key={it.id} className="p-4 md:p-5 flex gap-4">
                <Link to={`/product/${it.slug}`} className="w-24 md:w-28 aspect-square bg-cream overflow-hidden shrink-0 cursor-pointer">
                  {it.image_url && <img src={it.image_url} alt={it.name} className="w-full h-full object-cover" />}
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link to={`/product/${it.slug}`} className="font-display text-xl tracking-tightest hover:text-clay cursor-pointer">{it.name}</Link>
                      <p className="text-xs text-ink/50 font-mono mt-0.5">{fmtPKR(it.price)} per {it.unit}</p>
                    </div>
                    <button onClick={() => remove(it.id)} aria-label="Remove" className="text-ink/50 hover:text-clay cursor-pointer p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="inline-flex items-center border border-ink/20">
                      <button onClick={() => setQty(it.id, it.qty - 1)} className="w-9 h-9 grid place-items-center hover:bg-cream cursor-pointer" aria-label="Decrease"><Minus size={14} /></button>
                      <span className="w-10 text-center text-sm font-mono">{it.qty}</span>
                      <button onClick={() => setQty(it.id, it.qty + 1)} className="w-9 h-9 grid place-items-center hover:bg-cream cursor-pointer" aria-label="Increase"><Plus size={14} /></button>
                    </div>
                    <span className="font-display text-xl tracking-tightest">{fmtPKR(it.qty * it.price)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="lg:col-span-4">
            <div className="hairline border border-ink/15 bg-bone p-5">
              <h2 className="font-display text-2xl tracking-tightest">Order summary</h2>
              <ul className="mt-5 space-y-2.5 text-sm">
                <li className="flex justify-between"><span className="text-ink/70">Subtotal</span><span className="font-mono">{fmtPKR(subtotal)}</span></li>
                <li className="flex justify-between">
                  <span className="text-ink/70">Delivery (Karachi)</span>
                  <span className="font-mono">{delivery === 0 ? 'FREE' : fmtPKR(delivery)}</span>
                </li>
                {subtotal < 2000 && subtotal > 0 && (
                  <li className="text-xs text-clay">Add {fmtPKR(2000 - subtotal)} more for free delivery.</li>
                )}
              </ul>
              <div className="mt-5 hairline-t border-ink/15 pt-4 flex items-baseline justify-between">
                <span className="font-mono text-[11px] tracking-[0.2em] text-ink/55">TOTAL</span>
                <span className="font-display text-3xl tracking-tightest">{fmtPKR(total)}</span>
              </div>
              <Link to="/checkout" className="mt-5 block text-center bg-ink text-bone px-4 py-3.5 cursor-pointer hover:bg-clay transition-colors">
                Proceed to checkout →
              </Link>
              <Link to="/shop" className="mt-3 block text-center text-sm text-ink/65 hover:text-ink cursor-pointer">
                Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
