import { Link } from 'react-router-dom'
import { Plus, Leaf } from 'lucide-react'
import { useCart, fmtPKR } from '../../lib/cart.jsx'

export default function ProductCard({ product, compact = false }) {
  const { add } = useCart()
  const handle = (e) => { e.preventDefault(); e.stopPropagation(); add(product, 1) }
  return (
    <Link to={`/product/${product.slug}`} className="group block bg-bone hairline border border-ink/15 hover:border-ink transition-colors cursor-pointer">
      <div className="relative aspect-[5/4] bg-cream overflow-hidden">
        {product.image_url && (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
        )}
        {product.is_organic ? (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-forest text-bone text-[10px] font-mono tracking-[0.2em] px-2 py-1">
            <Leaf size={11} /> ORGANIC
          </span>
        ) : null}
        {product.stock <= 10 && product.stock > 0 ? (
          <span className="absolute top-3 right-3 bg-clay text-bone text-[10px] font-mono tracking-[0.2em] px-2 py-1">
            ONLY {product.stock}
          </span>
        ) : null}
      </div>
      <div className={`p-4 ${compact ? '' : 'md:p-5'}`}>
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg md:text-xl tracking-tightest leading-tight truncate">{product.name}</h3>
          {product.name_ur && <span className="font-mono text-[11px] text-ink/45">{product.name_ur}</span>}
        </div>
        <p className="mt-1 text-xs text-ink/50 font-mono uppercase tracking-[0.15em]">{product.category}</p>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="font-display text-2xl tracking-tightest leading-none">{fmtPKR(product.retail_price)}</p>
            <p className="text-[11px] text-ink/55 mt-1">per {product.unit}</p>
          </div>
          <button
            onClick={handle}
            aria-label={`Add ${product.name} to cart`}
            className="w-10 h-10 grid place-items-center bg-ink text-bone hover:bg-clay cursor-pointer transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </Link>
  )
}
