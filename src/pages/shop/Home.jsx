import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Truck, ShieldCheck, Leaf, Phone, Sprout, Stethoscope, Tractor } from 'lucide-react'
import { api } from '../../lib/api.js'
import ProductCard from '../../components/shop/ProductCard.jsx'
import { useI18n } from '../../lib/i18n.jsx'

const catImgs = {
  vegetables:  'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=900&q=80',
  fruits:      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=900&q=80',
  dairy:       'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=900&q=80',
  grains:      'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=900&q=80',
  livestock:   'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=900&q=80',
  'agri-inputs': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&q=80',
}
const catList = [
  { slug: 'vegetables',  key: 'cat.vegetables', ur: 'سبزیاں' },
  { slug: 'fruits',      key: 'cat.fruits',     ur: 'پھل' },
  { slug: 'dairy',       key: 'cat.dairy',      ur: 'ڈیری' },
  { slug: 'grains',      key: 'cat.grains',     ur: 'اناج' },
  { slug: 'livestock',   key: 'cat.livestock',  ur: 'مویشی' },
  { slug: 'agri-inputs', key: 'cat.agri',       ur: 'زرعی سامان' },
]

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { t, isUrdu } = useI18n()

  useEffect(() => {
    api('/products?featured=1')
      .then((r) => setProducts(r.products || []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      {/* HERO */}
      <section className="relative bg-cream grain overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:min-h-[calc(100svh-10rem)] flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-6 md:py-8 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <h1 className={`font-display tracking-tightest leading-[0.9] ${isUrdu ? 'text-4xl md:text-5xl lg:text-6xl !leading-[1.25]' : 'text-5xl md:text-7xl lg:text-[5.5rem]'}`}>
                {t('hero.title.1')}
                <br />
                <span className="relative inline-block">
                  <span className={isUrdu ? '' : 'italic font-light'}>{t('hero.title.2')}</span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full pointer-events-none"
                    viewBox="0 0 600 18"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d="M2 14 C 150 2, 450 2, 598 14" stroke="#C8542A" strokeWidth="3" fill="none" />
                  </svg>
                </span>
              </h1>

              <p className={`mt-5 md:mt-6 text-ink/75 max-w-xl leading-relaxed ${isUrdu ? 'text-base md:text-lg' : 'text-base md:text-[17px]'}`}>
                {t('hero.subtitle')}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-2 bg-ink text-bone px-5 py-3 cursor-pointer hover:bg-clay transition-colors"
                >
                  {t('hero.cta.shop')}
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <a
                  href="tel:0800327628"
                  className="inline-flex items-center gap-2 border border-ink/40 px-5 py-3 cursor-pointer hover:bg-ink hover:text-bone transition-colors"
                >
                  <Phone size={15} /> {t('hero.cta.call')}
                </a>
              </div>

              {/* inline trust strip */}
              <div className="mt-7 pt-5 border-t border-ink/15 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink/75">
                <span className="inline-flex items-center gap-2">
                  <Truck size={14} className="text-clay" /> {t('hero.trust.same_day')}
                </span>
                <span className="hidden sm:inline-block w-px h-3 bg-ink/20" />
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck size={14} className="text-clay" /> {t('hero.trust.cod')}
                </span>
                <span className="hidden sm:inline-block w-px h-3 bg-ink/20" />
                <span className="inline-flex items-center gap-2">
                  <Leaf size={14} className="text-clay" /> {t('hero.trust.verified')}
                </span>
              </div>
            </div>

            {/* visual editorial column */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative">
                {/* Pick of the day */}
                <div className="relative aspect-[4/5] lg:aspect-[5/4.4] overflow-hidden hairline border border-ink/15">
                  <img
                    src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=1200&q=80"
                    alt={t('hero.pick.title')}
                    loading="eager"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/35 to-transparent" />
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                    <span className="bg-bone/90 text-ink px-2 py-0.5 font-mono text-[10px] tracking-[0.22em]">
                      {t('hero.pick.tag')}
                    </span>
                    <span className="bg-clay text-bone px-2 py-0.5 font-mono text-[10px] tracking-[0.22em]">
                      {t('hero.pick.fresh')}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 text-bone">
                    <p className="font-mono text-[10px] tracking-[0.22em] opacity-85">
                      {t('hero.pick.meta')}
                    </p>
                    <p className="font-display text-xl md:text-2xl tracking-tightest mt-1 leading-tight">
                      {t('hero.pick.title')}
                    </p>
                    <div className="mt-3 flex items-end justify-between">
                      <p className="font-mono text-sm">{t('hero.pick.price')}</p>
                      <Link
                        to="/shop?category=vegetables"
                        className="group inline-flex items-center gap-1.5 text-xs font-mono tracking-[0.18em] hover:text-ochre transition-colors"
                      >
                        {t('hero.pick.cta')}
                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Stat band */}
                <div className="mt-2.5 grid grid-cols-2 hairline border border-ink/15 bg-bone">
                  <div className="p-3 md:p-4 border-r border-ink/15">
                    <p className="font-mono text-[10px] tracking-[0.22em] text-ink/60">
                      {t('hero.stat.payout')}
                    </p>
                    <p className="font-display text-2xl md:text-3xl tracking-tightest mt-0.5">+87%</p>
                  </div>
                  <div className="p-3 md:p-4">
                    <p className="font-mono text-[10px] tracking-[0.22em] text-ink/60">
                      {t('hero.stat.save')}
                    </p>
                    <p className="font-display text-2xl md:text-3xl tracking-tightest mt-0.5 text-clay">−32%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-[11px] tracking-[0.22em] text-clay">{t('cat.eyebrow')}</span>
              <h2 className="mt-2 font-display text-3xl md:text-5xl tracking-tightest leading-tight">{t('cat.title')}</h2>
            </div>
            <Link to="/shop" className="hidden md:inline-flex items-center gap-1.5 text-sm hover:text-clay cursor-pointer">
              {t('cat.view_all')} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {catList.map((c) => (
              <Link
                key={c.slug}
                to={`/shop?category=${c.slug}`}
                className="group relative aspect-square overflow-hidden cursor-pointer hairline border border-ink/15"
              >
                <img src={catImgs[c.slug]} alt={t(c.key)} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 text-bone">
                  <p className="font-display text-lg md:text-2xl tracking-tightest leading-tight">{t(c.key)}</p>
                  {!isUrdu && <p className="font-mono text-[11px] tracking-[0.18em] opacity-80 mt-0.5">{c.ur}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS — CAROUSEL */}
      <section className="py-10 md:py-16 bg-cream">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-[11px] tracking-[0.22em] text-clay">{t('feat.eyebrow')}</span>
              <h2 className="mt-2 font-display text-3xl md:text-5xl tracking-tightest leading-tight">{t('feat.title')}</h2>
            </div>
            <Link to="/shop" className="hidden md:inline-flex items-center gap-1.5 text-sm hover:text-clay cursor-pointer">
              {t('feat.see_all')} <ArrowRight size={14} />
            </Link>
          </div>
          {loading ? (
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="shrink-0 w-[70%] sm:w-[45%] md:w-[33%] lg:w-[24%] aspect-[4/5] bg-bone animate-pulse" />
              ))}
            </div>
          ) : (
            <ProductCarousel products={products} />
          )}
        </div>
      </section>

      {/* MISSION STRIP */}
      <section className="py-14 md:py-20 bg-forest text-bone">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Pillar Icon={Tractor}     title={t('pillar.direct.title')}  desc={t('pillar.direct.desc')} />
          <Pillar Icon={Stethoscope} title={t('pillar.expert.title')}  desc={t('pillar.expert.desc')} />
          <Pillar Icon={Sprout}      title={t('pillar.fresh.title')}   desc={t('pillar.fresh.desc')} />
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="py-14 md:py-20 bg-bone">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 hairline border border-ink/20">
          <div className="bg-clay text-bone p-8 md:p-12">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase">{t('dual.family.eyebrow')}</span>
            <h3 className="mt-3 font-display text-3xl md:text-5xl tracking-tightest leading-[0.95]">
              {t('dual.family.title.1')}<br /><span className={isUrdu ? '' : 'italic font-light'}>{t('dual.family.title.2')}</span>
            </h3>
            <p className="mt-4 max-w-md text-bone/90">{t('dual.family.desc')}</p>
            <Link to="/shop" className="mt-6 inline-flex items-center gap-2 bg-bone text-clay px-5 py-3 cursor-pointer hover:bg-ink hover:text-bone transition-colors">
              {t('dual.family.cta')} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="bg-ochre text-ink p-8 md:p-12">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase">{t('dual.shop.eyebrow')}</span>
            <h3 className="mt-3 font-display text-3xl md:text-5xl tracking-tightest leading-[0.95]">
              {t('dual.shop.title')}
            </h3>
            <p className="mt-4 max-w-md text-ink/80">{t('dual.shop.desc')}</p>
            <Link to="/shop" className="mt-6 inline-flex items-center gap-2 bg-ink text-bone px-5 py-3 cursor-pointer hover:bg-forest transition-colors">
              {t('dual.shop.cta')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function ProductCarousel({ products }) {
  const trackRef = useRef(null)
  const [paused, setPaused] = useState(false)

  const scrollByCard = (dir) => {
    const el = trackRef.current
    if (!el) return
    const first = el.firstElementChild
    const step = (first?.getBoundingClientRect().width || 280) + 16
    const max = el.scrollWidth - el.clientWidth - 4
    let next = el.scrollLeft + dir * step
    if (dir > 0 && el.scrollLeft >= max) next = 0
    else if (dir < 0 && el.scrollLeft <= 4) next = max
    el.scrollTo({ left: next, behavior: 'smooth' })
  }

  useEffect(() => {
    if (paused || !products?.length) return
    const id = setInterval(() => scrollByCard(1), 3500)
    return () => clearInterval(id)
  }, [paused, products?.length])

  if (!products?.length) return null

  return (
    <div
      className="relative group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-1 px-1 scrollbar-none"
        style={{ scrollbarWidth: 'none' }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="snap-start shrink-0 w-[72%] sm:w-[46%] md:w-[32%] lg:w-[23.5%]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scrollByCard(-1)}
        aria-label="Previous"
        className="hidden md:grid place-items-center absolute top-1/2 -translate-y-1/2 -left-3 lg:-left-5 w-11 h-11 bg-bone text-ink border border-ink/20 hover:bg-ink hover:text-bone transition-colors cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
      >
        <ArrowLeft size={18} />
      </button>
      <button
        onClick={() => scrollByCard(1)}
        aria-label="Next"
        className="hidden md:grid place-items-center absolute top-1/2 -translate-y-1/2 -right-3 lg:-right-5 w-11 h-11 bg-bone text-ink border border-ink/20 hover:bg-ink hover:text-bone transition-colors cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
      >
        <ArrowRight size={18} />
      </button>
    </div>
  )
}

function Pillar({ Icon, title, desc }) {
  return (
    <div className="flex gap-4">
      <span className="grid place-items-center w-12 h-12 bg-bone/10 text-ochre shrink-0">
        <Icon size={22} />
      </span>
      <div>
        <h3 className="font-display text-2xl tracking-tightest">{title}</h3>
        <p className="mt-2 text-sm text-bone/75 leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}
