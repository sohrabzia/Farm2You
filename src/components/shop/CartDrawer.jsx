import { Link } from 'react-router-dom'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart, fmtPKR } from '../../lib/cart.jsx'

export default function CartDrawer() {
  const { items, drawer, setDrawer, setQty, remove, subtotal } = useCart()
  return (
    <div
      className={`fixed inset-0 z-50 ${drawer ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!drawer}
    >
      <div
        onClick={() => setDrawer(false)}
        className={`absolute inset-0 bg-ink/40 transition-opacity ${drawer ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-bone shadow-2xl flex flex-col transition-transform duration-300 ${
          drawer ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="px-5 h-16 flex items-center justify-between hairline-b border-ink/15">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} />
            <span className="font-display text-xl tracking-tightest">Your basket</span>
            <span className="font-mono text-xs text-ink/50">({items.length})</span>
          </div>
          <button onClick={() => setDrawer(false)} aria-label="Close" className="w-9 h-9 grid place-items-center hover:bg-cream cursor-pointer">
            <X size={18} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex-1 grid place-items-center text-center px-6">
            <div>
              <ShoppingBag size={36} className="mx-auto text-ink/30" />
              <p className="mt-4 font-display text-2xl tracking-tightest">Your basket is empty</p>
              <p className="mt-2 text-sm text-ink/60">Browse fresh produce, dairy and more.</p>
              <Link to="/shop" onClick={() => setDrawer(false)} className="mt-5 inline-flex items-center gap-2 bg-ink text-bone px-4 py-2.5 text-sm cursor-pointer hover:bg-clay">
                Start shopping →
              </Link>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-ink/10">
              {items.map((it) => (
                <li key={it.id} className="p-5 flex gap-4">
                  <div className="w-20 h-20 bg-cream overflow-hidden shrink-0">
                    {it.image_url && (
                      <img src={it.image_url} alt={it.name} className="w-full h-full object-cover" loading="lazy" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-base tracking-tightest leading-tight">{it.name}</p>
                        <p className="text-xs text-ink/50 font-mono">{it.name_ur} · per {it.unit}</p>
                      </div>
                      <button onClick={() => remove(it.id)} aria-label="Remove" className="text-ink/50 hover:text-clay cursor-pointer">
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-ink/20">
                        <button onClick={() => setQty(it.id, it.qty - 1)} className="w-8 h-8 grid place-items-center hover:bg-cream cursor-pointer" aria-label="Decrease"><Minus size={14} /></button>
                        <span className="w-9 text-center text-sm font-mono">{it.qty}</span>
                        <button onClick={() => setQty(it.id, it.qty + 1)} className="w-8 h-8 grid place-items-center hover:bg-cream cursor-pointer" aria-label="Increase"><Plus size={14} /></button>
                      </div>
                      <span className="font-display text-base tracking-tightest">{fmtPKR(it.qty * it.price)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <footer className="p-5 hairline-t border-ink/15 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-ink/70">Subtotal</span>
                <span className="font-display text-2xl tracking-tightest">{fmtPKR(subtotal)}</span>
              </div>
              <p className="text-xs text-ink/55">Delivery fee calculated at checkout. Free over 2,000 Rs in Karachi.</p>
              <Link
                to="/checkout"
                onClick={() => setDrawer(false)}
                className="block text-center bg-ink text-bone px-4 py-3.5 cursor-pointer hover:bg-clay transition-colors"
              >
                Checkout — {fmtPKR(subtotal)} →
              </Link>
              <Link
                to="/shop"
                onClick={() => setDrawer(false)}
                className="block text-center text-sm text-ink/70 hover:text-ink cursor-pointer"
              >
                Continue shopping
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
