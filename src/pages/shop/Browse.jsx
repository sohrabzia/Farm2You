import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Filter, X, SlidersHorizontal, Sparkles } from 'lucide-react'
import { api } from '../../lib/api.js'
import ProductCard from '../../components/shop/ProductCard.jsx'

const CATS = [
  { slug: '',            label: 'All' },
  { slug: 'vegetables',  label: 'Vegetables' },
  { slug: 'fruits',      label: 'Fruits' },
  { slug: 'dairy',       label: 'Dairy' },
  { slug: 'grains',      label: 'Grains & Daal' },
  { slug: 'livestock',   label: 'Livestock' },
  { slug: 'agri-inputs', label: 'Agri-Inputs' },
]

const SORTS = [
  { v: 'featured',  label: 'Featured' },
  { v: 'price-asc', label: 'Price: low to high' },
  { v: 'price-desc',label: 'Price: high to low' },
  { v: 'newest',    label: 'Newest first' },
]

export default function Browse() {
  const [params, setParams] = useSearchParams()
  const cat = params.get('category') || ''
  const q = params.get('q') || ''
  const sort = params.get('sort') || 'featured'
  const organic = params.get('organic') === '1'

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
    const qs = new URLSearchParams()
    if (cat) qs.set('category', cat)
    if (q) qs.set('q', q)
    if (organic) qs.set('organic', '1')
    api(`/products?${qs.toString()}`)
      .then((r) => setItems(r.products || []))
      .finally(() => setLoading(false))
  }, [cat, q, organic])

  const sorted = useMemo(() => {
    const arr = [...items]
    if (sort === 'price-asc') arr.sort((a, b) => a.retail_price - b.retail_price)
    else if (sort === 'price-desc') arr.sort((a, b) => b.retail_price - a.retail_price)
    else if (sort === 'newest') arr.sort((a, b) => (b.id || 0) - (a.id || 0))
    else arr.sort((a, b) => (b.is_featured || 0) - (a.is_featured || 0))
    return arr
  }, [items, sort])

  const setParam = (k, v) => {
    const next = new URLSearchParams(params)
    if (v == null || v === '' || v === false) next.delete(k)
    else next.set(k, String(v))
    setParams(next, { replace: true })
  }

  return (
    <>
      {/* Page header */}
      <section className="bg-cream">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <span className="font-mono text-[11px] tracking-[0.22em] text-clay">// MARKETPLACE</span>
              <h1 className="mt-2 font-display text-4xl md:text-6xl tracking-tightest leading-tight">
                {cat
                  ? CATS.find((c) => c.slug === cat)?.label || 'Shop'
                  : q
                  ? `Results for "${q}"`
                  : 'All Products'}
              </h1>
              <p className="mt-2 text-sm text-ink/65 font-mono">
                {loading ? 'Loading…' : `${sorted.length} products`}
                {organic ? ' · Organic only' : ''}
              </p>
            </div>
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 border border-ink/30 px-4 py-2.5 text-sm cursor-pointer"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>

          {/* category chips */}
          <div className="mt-6 flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0">
            {CATS.map((c) => {
              const active = (c.slug || '') === cat
              return (
                <button
                  key={c.slug || 'all'}
                  onClick={() => setParam('category', c.slug)}
                  className={`whitespace-nowrap px-4 py-2 text-sm cursor-pointer border transition-colors ${
                    active
                      ? 'bg-ink text-bone border-ink'
                      : 'bg-bone border-ink/15 hover:border-ink'
                  }`}
                >
                  {c.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden lg:block lg:col-span-3">
            <FilterPanel organic={organic} sort={sort} setParam={setParam} />
          </aside>

          {/* Results */}
          <div className="lg:col-span-9">
            <div className="hidden md:flex items-center justify-between mb-5">
              <span className="text-sm text-ink/55">{loading ? '' : `Showing ${sorted.length} products`}</span>
              <label className="text-sm flex items-center gap-2">
                Sort
                <select value={sort} onChange={(e) => setParam('sort', e.target.value)} className="bg-bone border border-ink/15 px-2.5 py-1.5 text-sm cursor-pointer outline-none">
                  {SORTS.map((s) => <option key={s.v} value={s.v}>{s.label}</option>)}
                </select>
              </label>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 9 }).map((_, i) => <div key={i} className="aspect-[4/5] bg-cream animate-pulse" />)}
              </div>
            ) : sorted.length === 0 ? (
              <div className="text-center py-20 hairline border border-dashed border-ink/20">
                <Sparkles size={26} className="mx-auto text-ink/40" />
                <p className="mt-4 font-display text-2xl tracking-tightest">Nothing found here.</p>
                <p className="mt-2 text-sm text-ink/55">Try a different category or clear your filters.</p>
                <button onClick={() => setParams({})} className="mt-5 inline-flex items-center gap-2 border border-ink/30 px-4 py-2.5 text-sm cursor-pointer hover:bg-ink hover:text-bone">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {sorted.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* mobile filters drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-bone p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-2xl tracking-tightest flex items-center gap-2"><Filter size={18}/> Filters</h3>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close" className="w-9 h-9 grid place-items-center cursor-pointer"><X size={18}/></button>
            </div>
            <FilterPanel organic={organic} sort={sort} setParam={setParam} />
            <button onClick={() => setFiltersOpen(false)} className="mt-6 w-full bg-ink text-bone py-3.5 cursor-pointer hover:bg-clay">Apply</button>
          </div>
        </div>
      )}
    </>
  )
}

function FilterPanel({ organic, sort, setParam }) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-mono text-[10px] tracking-[0.2em] text-ink/55 uppercase mb-3">Sort by</h4>
        <select value={sort} onChange={(e) => setParam('sort', e.target.value)} className="w-full bg-bone border border-ink/20 px-3 py-2.5 text-sm cursor-pointer outline-none">
          {SORTS.map((s) => <option key={s.v} value={s.v}>{s.label}</option>)}
        </select>
      </div>
      <div>
        <h4 className="font-mono text-[10px] tracking-[0.2em] text-ink/55 uppercase mb-3">Special</h4>
        <label className="flex items-center gap-3 cursor-pointer text-sm">
          <input type="checkbox" checked={organic} onChange={(e) => setParam('organic', e.target.checked ? '1' : '')} className="w-4 h-4 accent-forest cursor-pointer" />
          Organic only
        </label>
      </div>
      <div className="hairline-t border-ink/15 pt-5">
        <p className="text-xs text-ink/55 leading-relaxed">
          All products are sourced directly from verified Pakistani farmers and dispatched same-day from
          our Karachi warehouse.
        </p>
      </div>
    </div>
  )
}
