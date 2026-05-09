import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Truck, ShieldCheck, Leaf, Phone, Sprout, Stethoscope, Tractor } from 'lucide-react'
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
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 py-10 md:py-16 lg:py-20 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-clay">
              <span className="w-1.5 h-1.5 bg-clay" /> {t('hero.eyebrow')}
            </span>
            <h1 className={`mt-4 font-display leading-[0.92] tracking-tightest ${isUrdu ? 'text-4xl md:text-5xl lg:text-6xl leading-[1.5]' : 'text-5xl md:text-7xl lg:text-[5.5rem]'}`}>
              {t('hero.title.1')}
              <br />
              <span className={isUrdu ? '' : 'italic font-light'}>{t('hero.title.2')}</span>
            </h1>
            <p className={`mt-6 text-ink/75 max-w-xl leading-relaxed ${isUrdu ? 'text-lg md:text-xl' : 'text-base md:text-lg'}`}>
              {t('hero.subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="inline-flex items-center gap-2 bg-ink text-bone px-5 py-3.5 cursor-pointer hover:bg-clay transition-colors">
                {t('hero.cta.shop')} <ArrowRight size={16} />
              </Link>
              <a href="tel:0800327628" className="inline-flex items-center gap-2 border border-ink/40 px-5 py-3.5 cursor-pointer hover:bg-ink hover:text-bone transition-colors">
                <Phone size={15} /> {t('hero.cta.call')}
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg">
              <Trust Icon={Truck} label={t('hero.trust.same_day')} />
              <Trust Icon={ShieldCheck} label={t('hero.trust.cod')} />
              <Trust Icon={Leaf} label={t('hero.trust.verified')} />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="grid grid-cols-6 grid-rows-6 gap-3 h-[420px] md:h-[520px]">
              <Tile className="col-span-4 row-span-4" img="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80" tag="Vegetables" />
              <Tile className="col-span-2 row-span-3" img="https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=900&q=80" tag="Mango Sindhri" />
              <Tile className="col-span-2 row-span-3" img="https://images.unsplash.com/photo-1563636619-e9143da7973b?w=900&q=80" tag="Fresh Milk" />
              <Tile className="col-span-3 row-span-2" img="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=900&q=80" tag="Atta · Daal" />
              <Tile className="col-span-3 row-span-2" img="https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=900&q=80" tag="Kinnow" />
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

      {/* FEATURED PRODUCTS */}
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => <div key={i} className="aspect-[4/5] bg-bone animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
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

function Trust({ Icon, label }) {
  return (
    <div className="flex items-start gap-2">
      <Icon size={16} className="text-clay mt-0.5 shrink-0" />
      <span className="text-xs text-ink/75 leading-tight">{label}</span>
    </div>
  )
}
function Tile({ className = '', img, tag }) {
  return (
    <div className={`relative overflow-hidden hairline border border-ink/15 ${className}`}>
      <img src={img} alt={tag} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      <span className="absolute bottom-2 left-2 bg-bone/90 px-2 py-1 font-mono text-[10px] tracking-[0.2em] uppercase">
        {tag}
      </span>
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
