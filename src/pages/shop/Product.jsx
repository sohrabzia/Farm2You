import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Truck, ShieldCheck, Leaf, ChevronRight, MapPin, Check } from 'lucide-react'
import { api } from '../../lib/api.js'
import { useCart, fmtPKR } from '../../lib/cart.jsx'
import ProductCard from '../../components/shop/ProductCard.jsx'

export default function Product() {
  const { slug } = useParams()
  const [p, setP] = useState(null)
  const [related, setRelated] = useState([])
  const [qty, setQty] = useState(1)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(true)
  const { add, setDrawer } = useCart()

  useEffect(() => {
    setLoading(true)
    setP(null)
    api(`/products/${slug}`)
      .then(async (r) => {
        setP(r.product)
        if (r.product?.category) {
          const rel = await api(`/products?category=${r.product.category}`)
          setRelated((rel.products || []).filter((x) => x.id !== r.product.id).slice(0, 4))
        }
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
      <div className="aspect-square bg-cream" />
      <div className="space-y-4">
        <div className="h-8 w-1/2 bg-cream" />
        <div className="h-12 w-2/3 bg-cream" />
        <div className="h-4 w-full bg-cream" />
        <div className="h-4 w-4/5 bg-cream" />
      </div>
    </div>
  }
  if (err || !p) {
    return <div className="max-w-[800px] mx-auto px-4 md:px-6 py-20 text-center">
      <p className="font-display text-3xl tracking-tightest">Product not found.</p>
      <p className="mt-2 text-sm text-ink/60">{err || 'It may have sold out.'}</p>
      <Link to="/shop" className="mt-6 inline-flex items-center gap-2 bg-ink text-bone px-5 py-3 cursor-pointer hover:bg-clay">Back to shop →</Link>
    </div>
  }

  const handleAdd = () => add(p, qty)
  const buyNow = () => { add(p, qty); setDrawer(false); window.location.href = '/checkout' }

  return (
    <>
      <section className="bg-cream/60">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3 text-xs font-mono text-ink/55 flex items-center gap-1.5">
          <Link to="/" className="hover:text-ink cursor-pointer">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-ink cursor-pointer">Shop</Link>
          <ChevronRight size={12} />
          <Link to={`/shop?category=${p.category}`} className="hover:text-ink cursor-pointer capitalize">{p.category}</Link>
          <ChevronRight size={12} />
          <span className="text-ink/80">{p.name}</span>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <div className="space-y-3">
            <div className="aspect-square bg-cream overflow-hidden hairline border border-ink/15 relative">
              {p.image_url && <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />}
              {p.is_organic ? (
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-forest text-bone text-[11px] font-mono tracking-[0.2em] px-2.5 py-1.5">
                  <Leaf size={12} /> ORGANIC
                </span>
              ) : null}
            </div>
            <div className="grid grid-cols-4 gap-2 md:gap-3">
              {[0,1,2,3].map((i) => (
                <div key={i} className="aspect-square bg-cream overflow-hidden hairline border border-ink/15 opacity-80">
                  {p.image_url && <img src={`${p.image_url.split('?')[0]}?w=400&q=70&sat=${-30 + i*15}`} alt="" className="w-full h-full object-cover" />}
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="font-mono text-[11px] tracking-[0.22em] text-clay uppercase">{p.category}</span>
            <h1 className="mt-2 font-display text-4xl md:text-6xl tracking-tightest leading-[0.95]">{p.name}</h1>
            {p.name_ur && <p className="mt-1 text-xl text-ink/55 font-mono">{p.name_ur}</p>}

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-5xl tracking-tightest leading-none">{fmtPKR(p.retail_price)}</span>
              <span className="text-sm text-ink/55">per {p.unit}</span>
              {p.wholesale_price ? (
                <span className="ml-3 font-mono text-[11px] tracking-[0.18em] bg-ochre text-ink px-2 py-1">
                  WHOLESALE {fmtPKR(p.wholesale_price)}/{p.unit}
                </span>
              ) : null}
            </div>

            <p className="mt-6 text-base text-ink/75 leading-relaxed max-w-prose">{p.description}</p>

            <div className="mt-8">
              <p className="font-mono text-[10px] tracking-[0.2em] text-ink/55 uppercase mb-2">Quantity ({p.unit})</p>
              <div className="flex items-stretch gap-3">
                <div className="inline-flex items-center border border-ink/25">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-11 h-11 grid place-items-center hover:bg-cream cursor-pointer" aria-label="Decrease">
                    <Minus size={16} />
                  </button>
                  <span className="w-14 text-center font-display text-lg">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="w-11 h-11 grid place-items-center hover:bg-cream cursor-pointer" aria-label="Increase">
                    <Plus size={16} />
                  </button>
                </div>
                <span className="self-center text-sm text-ink/60">
                  Total <span className="font-display text-ink text-base ml-1">{fmtPKR(p.retail_price * qty)}</span>
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-ink text-bone px-5 py-3.5 cursor-pointer hover:bg-clay transition-colors"
              >
                <ShoppingBag size={16} /> Add to basket
              </button>
              <button
                onClick={buyNow}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-clay text-bone px-5 py-3.5 cursor-pointer hover:bg-ink transition-colors"
              >
                Buy now (COD) →
              </button>
            </div>

            <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <Pill Icon={Truck}      label="Same-day delivery in Karachi" />
              <Pill Icon={ShieldCheck} label="Cash on Delivery available" />
              <Pill Icon={Check}      label={`In stock — ${p.stock} ${p.unit} available`} />
              <Pill Icon={MapPin}     label={`Sourced in ${p.region || 'Sindh / Punjab'}`} />
            </ul>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-12 md:py-16 bg-cream">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6">
            <h2 className="font-display text-2xl md:text-4xl tracking-tightest leading-tight mb-6">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((r) => <ProductCard key={r.id} product={r} />)}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

function Pill({ Icon, label }) {
  return (
    <li className="flex items-center gap-2.5 border border-ink/15 px-3 py-2.5 bg-bone">
      <Icon size={15} className="text-clay shrink-0" />
      <span className="text-ink/80">{label}</span>
    </li>
  )
}
