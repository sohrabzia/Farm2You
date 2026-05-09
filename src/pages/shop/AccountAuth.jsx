import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Sprout, Phone, Lock, User, MapPin, Eye, EyeOff } from 'lucide-react'
import { useCustomer } from '../../lib/customer.jsx'

function PasswordField({ value, onChange, autoComplete = 'current-password', minLength, label = 'Password' }) {
  const [show, setShow] = useState(false)
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-sm text-ink/75 mb-1.5"><Lock size={13} /> {label}</span>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          minLength={minLength}
          autoComplete={autoComplete}
          className="w-full bg-bone border border-ink/25 px-3 py-3 pr-11 outline-none focus:border-ink"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 grid place-items-center text-ink/55 hover:text-ink cursor-pointer"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </label>
  )
}

export function CustomerLogin() {
  const { login } = useCustomer()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()
  const loc = useLocation()
  const from = loc.state?.from?.pathname || '/account'

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr(''); setLoading(true)
    try { await login(phone, password); nav(from, { replace: true }) }
    catch (e) { setErr(e.message || 'Sign-in failed') }
    finally { setLoading(false) }
  }

  return (
    <AuthShell title="Welcome back." sub="Sign in to track orders and reorder favorites." link={{ label: 'Create an account', to: '/account/signup' }}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Mobile number" Icon={Phone}>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="0300-1234567" autoComplete="tel" className="w-full bg-bone border border-ink/25 px-3 py-3 outline-none focus:border-ink" />
        </Field>
        <PasswordField value={password} onChange={setPassword} />
        {err && <p className="border border-clay text-clay text-sm font-mono px-3 py-2.5">⚠ {err}</p>}
        <button disabled={loading} className="w-full bg-ink text-bone px-4 py-3.5 cursor-pointer hover:bg-clay transition-colors disabled:opacity-60">
          {loading ? 'Signing in…' : 'Sign in →'}
        </button>
      </form>
    </AuthShell>
  )
}

export function CustomerSignup() {
  const { signup } = useCustomer()
  const [form, setForm] = useState({ name: '', phone: '', password: '', city: 'Karachi', address: '' })
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr(''); setLoading(true)
    try { await signup(form); nav('/account', { replace: true }) }
    catch (e) { setErr(e.message || 'Could not create account') }
    finally { setLoading(false) }
  }

  return (
    <AuthShell title="Create your account." sub="One account for faster checkout and order history." link={{ label: 'I already have an account', to: '/account/login' }}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Full name" Icon={User}>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required autoComplete="name" className="w-full bg-bone border border-ink/25 px-3 py-3 outline-none focus:border-ink" />
        </Field>
        <Field label="Mobile number" Icon={Phone}>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required placeholder="0300-1234567" autoComplete="tel" className="w-full bg-bone border border-ink/25 px-3 py-3 outline-none focus:border-ink" />
        </Field>
        <PasswordField
          label="Password (min 6 chars)"
          value={form.password}
          onChange={(v) => setForm({ ...form, password: v })}
          autoComplete="new-password"
          minLength={6}
        />
        <Field label="City + address (optional)" Icon={MapPin}>
          <div className="grid grid-cols-3 gap-2">
            <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Karachi" className="col-span-1 bg-bone border border-ink/25 px-3 py-3 outline-none focus:border-ink" />
            <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="House / Street / Area" className="col-span-2 bg-bone border border-ink/25 px-3 py-3 outline-none focus:border-ink" />
          </div>
        </Field>
        {err && <p className="border border-clay text-clay text-sm font-mono px-3 py-2.5">⚠ {err}</p>}
        <button disabled={loading} className="w-full bg-ink text-bone px-4 py-3.5 cursor-pointer hover:bg-clay transition-colors disabled:opacity-60">
          {loading ? 'Creating…' : 'Create account →'}
        </button>
        <p className="text-xs text-ink/55 leading-relaxed">By creating an account you agree to our terms. We&rsquo;ll only contact you about orders.</p>
      </form>
    </AuthShell>
  )
}

function AuthShell({ title, sub, link, children }) {
  return (
    <section className="py-10 md:py-16">
      <div className="max-w-[460px] mx-auto px-4 md:px-6">
        <Link to="/" className="inline-flex items-center gap-2 cursor-pointer mb-8">
          <span className="grid place-items-center w-9 h-9 bg-forest text-bone"><Sprout size={18} /></span>
          <span className="font-display text-2xl tracking-tightest">Farm2You</span>
        </Link>
        <h1 className="font-display text-4xl md:text-5xl tracking-tightest leading-tight">{title}</h1>
        <p className="mt-2 text-ink/65">{sub}</p>
        <div className="mt-8">{children}</div>
        <div className="mt-6 hairline-t border-ink/15 pt-4 text-sm text-ink/65">
          {link.label}? <Link to={link.to} className="text-ink hover:text-clay underline underline-offset-2 cursor-pointer">Tap here</Link>
        </div>
      </div>
    </section>
  )
}

function Field({ label, Icon, children }) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-sm text-ink/75 mb-1.5">{Icon && <Icon size={13} />} {label}</span>
      {children}
    </label>
  )
}
