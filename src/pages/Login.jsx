import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../lib/auth.jsx'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('admin@farm2you.pk')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()
  const loc = useLocation()
  const from = loc.state?.from?.pathname || '/admin'

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    setLoading(true)
    try {
      await login(email, password)
      nav(from, { replace: true })
    } catch (e) {
      setErr(e.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bone text-ink grid grid-cols-1 lg:grid-cols-2 lg:[grid-template-rows:minmax(100vh,1fr)]">
      {/* Left — editorial */}
      <aside className="relative hidden lg:flex flex-col bg-forest text-bone p-10 overflow-hidden">
        <div className="absolute inset-0 grain opacity-20" />
        <div className="relative">
          <Link to="/" className="flex items-center gap-2.5 cursor-pointer">
            <span className="grid place-items-center w-8 h-8 bg-bone text-forest font-display text-base leading-none">F</span>
            <span className="font-display text-xl tracking-tightest">Farm2You</span>
          </Link>
        </div>
        <div className="relative mt-auto">
          <span className="font-mono text-[11px] tracking-[0.2em] text-ochre">/ ADMIN ACCESS</span>
          <h1 className="mt-4 font-display text-5xl xl:text-7xl tracking-tightest leading-[0.95]">
            From the field,
            <br />
            <span className="italic font-light">to your dashboard.</span>
          </h1>
          <p className="mt-6 max-w-md text-bone/70 leading-relaxed">
            Manage farmer onboarding, listings, livestock trades, expert consultations and the
            waitlist — all from one console.
          </p>
        </div>
        <div className="relative mt-10 grid grid-cols-2 gap-4 text-sm">
          <div className="hairline-t border-bone/20 pt-4">
            <p className="font-mono text-[10px] tracking-[0.2em] text-bone/50">FARMERS</p>
            <p className="font-display text-3xl tracking-tightest mt-1">3,000+</p>
          </div>
          <div className="hairline-t border-bone/20 pt-4">
            <p className="font-mono text-[10px] tracking-[0.2em] text-bone/50">USERS</p>
            <p className="font-display text-3xl tracking-tightest mt-1">30,000+</p>
          </div>
        </div>
      </aside>

      {/* Right — form */}
      <section className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden inline-flex items-center gap-2.5 mb-8 cursor-pointer">
            <span className="grid place-items-center w-8 h-8 bg-forest text-bone font-display text-base leading-none">F</span>
            <span className="font-display text-xl tracking-tightest">Farm2You</span>
          </Link>

          <span className="font-mono text-[11px] tracking-[0.2em] text-clay">// SIGN IN</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl tracking-tightest leading-tight">
            Welcome back.
          </h2>
          <p className="mt-3 text-ink/70 text-sm">Sign in to the Farm2You operations console.</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <Field label="Email" id="email">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full bg-bone border border-ink/25 px-4 py-3 outline-none focus:border-ink"
              />
            </Field>
            <Field label="Password" id="password">
              <div className="relative">
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full bg-bone border border-ink/25 px-4 py-3 pr-11 outline-none focus:border-ink"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 grid place-items-center text-ink/55 hover:text-ink cursor-pointer"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>

            {err && (
              <div className="border border-clay text-clay text-sm px-4 py-3 font-mono">
                ⚠ {err}
              </div>
            )}

            <button
              disabled={loading}
              className="w-full inline-flex items-center justify-between bg-ink text-bone px-5 py-3.5 cursor-pointer hover:bg-clay transition-colors disabled:opacity-60"
            >
              <span>{loading ? 'Signing in…' : 'Sign in'}</span>
              <span>→</span>
            </button>
          </form>

          <div className="mt-8 hairline-t border-ink/15 pt-5 flex items-center justify-between text-xs font-mono tracking-[0.15em] text-ink/60">
            <Link to="/" className="hover:text-ink cursor-pointer">← BACK TO SITE</Link>
            <span>v0.1.0</span>
          </div>

          <p className="mt-6 text-xs text-ink/50 leading-relaxed">
            Default admin: <code className="font-mono">admin@farm2you.pk</code> / <code className="font-mono">farm2you</code>{' '}
            (change immediately after first login).
          </p>
        </div>
      </section>
    </div>
  )
}

function Field({ label, id, children }) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-[10px] tracking-[0.2em] text-ink/60 mb-2 uppercase">
        {label}
      </label>
      {children}
    </div>
  )
}
