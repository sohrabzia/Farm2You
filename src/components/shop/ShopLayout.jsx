import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Search, ShoppingBag, User, Menu, X, Phone, MapPin, Truck, ShieldCheck, Sprout, Leaf, ChevronRight, Globe,
} from 'lucide-react'
import { useCart, fmtPKR } from '../../lib/cart.jsx'
import { useCustomer } from '../../lib/customer.jsx'
import { useI18n } from '../../lib/i18n.jsx'
import CartDrawer from './CartDrawer.jsx'

const catKeys = [
  { slug: 'vegetables',  key: 'cat.vegetables', ur: 'سبزیاں' },
  { slug: 'fruits',      key: 'cat.fruits',     ur: 'پھل' },
  { slug: 'dairy',       key: 'cat.dairy',      ur: 'ڈیری' },
  { slug: 'grains',      key: 'cat.grains',     ur: 'اناج' },
  { slug: 'livestock',   key: 'cat.livestock',  ur: 'مویشی' },
  { slug: 'agri-inputs', key: 'cat.agri',       ur: 'زرعی سامان' },
]

export default function ShopLayout() {
  const { count, setDrawer } = useCart()
  const { customer } = useCustomer()
  const { t, lang, setLang, isUrdu } = useI18n()
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const nav = useNavigate()
  const loc = useLocation()

  useEffect(() => { setOpen(false); window.scrollTo(0, 0) }, [loc.pathname])

  const submitSearch = (e) => {
    e.preventDefault()
    if (search.trim()) nav(`/shop?q=${encodeURIComponent(search.trim())}`)
  }

  return (
    <div className="min-h-screen bg-bone text-ink flex flex-col">
      {/* announcement bar */}
      <div className="bg-forest text-bone text-xs">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-9 flex items-center justify-between gap-4">
          <span className={`font-mono tracking-[0.18em] truncate ${isUrdu ? 'text-[13px]' : ''}`}>
            🇵🇰 {t('announce.tagline')}
          </span>
          <span className="hidden md:flex items-center gap-3 font-mono tracking-[0.15em]">
            <button
              onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
              className="inline-flex items-center gap-1.5 hover:text-ochre cursor-pointer"
              aria-label="Toggle language"
            >
              <Globe size={13} />
              {lang === 'en' ? 'اردو' : 'English'}
            </button>
            <span className="opacity-40">·</span>
            <Phone size={13} /> 0800-FARM2YOU
          </span>
        </div>
      </div>

      {/* main header */}
      <header className="sticky top-0 z-40 bg-bone/95 backdrop-blur hairline-b border-ink/15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2.5 cursor-pointer">
            <span className="grid place-items-center w-9 h-9 bg-forest text-bone">
              <Sprout size={18} strokeWidth={2.2} />
            </span>
            <span className="font-display text-2xl tracking-tightest leading-none">Farm2You</span>
          </Link>

          <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-xl mx-6 relative">
            <Search size={18} className={`absolute top-1/2 -translate-y-1/2 text-ink/50 ${isUrdu ? 'right-3' : 'left-3'}`} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('nav.search_placeholder')}
              className={`w-full bg-cream border border-ink/15 py-2.5 outline-none focus:border-ink text-sm ${isUrdu ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'}`}
            />
          </form>

          <div className="ml-auto flex items-center gap-1 md:gap-2">
            <Link
              to={customer ? '/account' : '/account/login'}
              className="hidden md:flex items-center gap-2 px-3 py-2 hover:bg-cream cursor-pointer"
            >
              <User size={18} />
              <span className="text-sm">{customer ? customer.name.split(' ')[0] : t('nav.account')}</span>
            </Link>
            <button
              onClick={() => setDrawer(true)}
              className="relative flex items-center gap-2 px-3 py-2 hover:bg-cream cursor-pointer"
              aria-label={`Cart (${count} items)`}
            >
              <ShoppingBag size={18} />
              <span className="hidden md:inline text-sm">{t('nav.cart')}</span>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 md:static md:ml-1 bg-clay text-bone text-[10px] min-w-[18px] h-[18px] px-1 grid place-items-center font-mono">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden w-10 h-10 grid place-items-center cursor-pointer"
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* category strip */}
        <nav className="hidden lg:block hairline-t border-ink/10">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-11 flex items-center gap-1">
            <NavLink to="/shop" end className={({ isActive }) => `px-3 py-2 text-sm cursor-pointer hover:bg-cream ${isActive ? 'font-medium' : 'text-ink/70 hover:text-ink'}`}>
              {t('nav.all')}
            </NavLink>
            {catKeys.map((c) => (
              <NavLink
                key={c.slug}
                to={`/shop?category=${c.slug}`}
                className="px-3 py-2 text-sm cursor-pointer hover:bg-cream text-ink/70 hover:text-ink"
              >
                {t(c.key)}
              </NavLink>
            ))}
            <span className="ml-auto flex items-center gap-4 text-xs text-ink/60">
              <span className="flex items-center gap-1.5"><Truck size={14} /> {t('nav.same_day')}</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} /> {t('nav.cod')}</span>
            </span>
          </div>
        </nav>

        {/* mobile menu */}
        {open && (
          <div className="lg:hidden bg-bone hairline-b border-ink/15 p-4 space-y-3">
            <form onSubmit={submitSearch} className="relative">
              <Search size={18} className={`absolute top-1/2 -translate-y-1/2 text-ink/50 ${isUrdu ? 'right-3' : 'left-3'}`} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('nav.search_placeholder')}
                className={`w-full bg-cream border border-ink/15 py-3 outline-none focus:border-ink text-sm ${isUrdu ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'}`}
              />
            </form>
            <Link to="/shop" className="block py-2 font-display text-2xl tracking-tightest cursor-pointer">{t('nav.all')} →</Link>
            {catKeys.map((c) => (
              <Link key={c.slug} to={`/shop?category=${c.slug}`} className="block py-2 font-display text-2xl tracking-tightest cursor-pointer">
                {t(c.key)}
              </Link>
            ))}
            <button onClick={() => setLang(lang === 'en' ? 'ur' : 'en')} className="flex items-center gap-2 pt-3 border-t border-ink/10 text-sm cursor-pointer">
              <Globe size={16} /> {lang === 'en' ? 'اردو میں دیکھیں' : 'Switch to English'}
            </button>
            <Link to={customer ? '/account' : '/account/login'} className="flex items-center gap-2 cursor-pointer">
              <User size={16} /> {customer ? customer.name : t('nav.signin_signup')}
            </Link>
          </div>
        )}
      </header>

      {/* page */}
      <main className="flex-1">
        <Outlet />
      </main>

      <CartDrawer />
      <ShopFooter />
    </div>
  )
}

function ShopFooter() {
  const { t } = useI18n()
  return (
    <footer className="bg-ink text-bone mt-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-9 h-9 bg-bone text-forest">
              <Sprout size={18} strokeWidth={2.2} />
            </span>
            <span className="font-display text-2xl tracking-tightest">Farm2You</span>
          </div>
          <p className="mt-4 text-sm text-bone/70 max-w-md leading-relaxed">
            Pakistan&rsquo;s farm-to-family marketplace. Order fresh produce, dairy, livestock and
            agri-inputs directly from verified farmers — delivered the same day in Karachi.
          </p>
        </div>
        <div>
          <h4 className="font-mono text-[11px] tracking-[0.2em] text-bone/50 uppercase">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm text-bone/75">
            {catKeys.slice(0,5).map((c) => (
              <li key={c.slug}>
                <Link to={`/shop?category=${c.slug}`} className="hover:text-bone cursor-pointer flex items-center gap-1.5">
                  <Leaf size={12} /> {t(c.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-[11px] tracking-[0.2em] text-bone/50 uppercase">Help</h4>
          <ul className="mt-4 space-y-2 text-sm text-bone/75">
            <li className="flex items-center gap-2"><Phone size={13} /> 0800-FARM2YOU</li>
            <li className="flex items-center gap-2"><MapPin size={13} /> Karachi · Sindh</li>
            <li><Link to="/account" className="hover:text-bone cursor-pointer">My Account</Link></li>
            <li><Link to="/admin" className="hover:text-bone cursor-pointer">Admin Login</Link></li>
          </ul>
        </div>
      </div>
      <div className="hairline-t border-bone/10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 min-h-12 py-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs font-mono tracking-[0.18em] text-bone/50">
          <span>© 2026 FARM2YOU PVT LTD</span>
          <span>
            v0.2.0 · Created by{' '}
            <a
              href="https://sohrabzia.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bone/80 hover:text-clay underline-offset-4 hover:underline cursor-pointer"
            >
              Soharab
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

