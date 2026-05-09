import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { LayoutDashboard, ShoppingBasket, Package, Users, Stethoscope, LogOut, Menu, X, Sprout, Activity } from 'lucide-react'
import { useAuth } from '../../lib/auth.jsx'

const navItems = [
  { to: '/admin',                end: true, label: 'Overview',     Icon: LayoutDashboard },
  { to: '/admin/products',                 label: 'Products',     Icon: Package },
  { to: '/admin/orders',                   label: 'Orders',       Icon: ShoppingBasket },
  { to: '/admin/farmers',                  label: 'Farmers',      Icon: Users },
  { to: '/admin/consultations',            label: 'Consults',     Icon: Stethoscope },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const onLogout = async () => {
    await logout()
    nav('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-bone text-ink flex">
      <aside
        className={`fixed lg:sticky top-0 z-40 h-screen w-64 bg-ink text-bone flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Link to="/" className="px-6 h-16 flex items-center gap-2.5 cursor-pointer hairline-b border-bone/15">
          <span className="grid place-items-center w-9 h-9 bg-bone text-ink"><Sprout size={18} /></span>
          <span className="font-display text-xl tracking-tightest">Farm2You</span>
          <span className="ml-auto font-mono text-[10px] tracking-[0.2em] text-bone/50">ADMIN</span>
        </Link>

        <nav className="flex-1 py-6">
          {navItems.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm transition-colors cursor-pointer relative ${
                  isActive ? 'bg-bone/5 text-bone' : 'text-bone/60 hover:text-bone hover:bg-bone/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-clay" />}
                  <it.Icon size={16} />
                  <span>{it.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 hairline-t border-bone/15">
          <p className="font-mono text-[10px] tracking-[0.2em] text-bone/50 mb-2">SIGNED IN</p>
          <p className="font-display text-base tracking-tightest truncate">{user?.name || user?.email}</p>
          <p className="text-xs text-bone/50 truncate">{user?.email}</p>
          <button
            onClick={onLogout}
            className="mt-4 w-full inline-flex items-center justify-between text-sm border border-bone/30 px-3 py-2 hover:border-clay hover:text-clay transition-colors cursor-pointer"
          >
            Sign out <LogOut size={14} />
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-ink/50 z-30" onClick={() => setMobileOpen(false)} />
      )}

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 bg-bone/85 backdrop-blur-md hairline-b border-ink/15">
          <div className="h-16 px-5 md:px-8 flex items-center justify-between gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="lg:hidden w-10 h-10 grid place-items-center cursor-pointer"
            >
              <Menu size={18} />
            </button>
            <p className="font-mono text-[11px] tracking-[0.2em] text-ink/60">// CONSOLE / OPERATIONS</p>
            <div className="flex items-center gap-2 text-xs">
              <Activity size={13} className="text-clay" />
              <span className="font-mono tracking-[0.2em] text-ink/60">D1 · LIVE</span>
            </div>
          </div>
        </header>
        <main className="p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
