import { useState } from 'react'

const links = [
  { label: 'Problem', href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'Market', href: '#marketplace' },
  { label: 'Experts', href: '#experts' },
  { label: 'Roadmap', href: '#roadmap' },
]

export default function Nav({ scrolled }) {
  const [open, setOpen] = useState(false)
  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-bone/85 backdrop-blur-md hairline-b' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group cursor-pointer">
          <span className="grid place-items-center w-8 h-8 bg-forest text-bone font-display text-base leading-none">F</span>
          <span className="font-display text-xl tracking-tightest">Farm2You</span>
          <span className="hidden md:inline label ml-2">/PK·2026</span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink/70 hover:text-ink transition-colors relative group cursor-pointer"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-clay group-hover:w-full transition-[width] duration-300" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="#cta" className="text-sm text-ink/70 hover:text-ink transition-colors cursor-pointer">
            For Farmers
          </a>
          <a
            href="#cta"
            className="group inline-flex items-center gap-2 bg-ink text-bone px-4 py-2.5 text-sm cursor-pointer hover:bg-clay transition-colors"
          >
            Get the App
            <svg width="14" height="14" viewBox="0 0 14 14" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </a>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setOpen(!open)}
          className="md:hidden w-10 h-10 grid place-items-center cursor-pointer"
        >
          <span className="space-y-1.5">
            <span className={`block w-5 h-px bg-ink transition-transform ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
            <span className={`block w-5 h-px bg-ink transition-transform ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-bone hairline-b">
          <div className="px-5 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-2xl font-display tracking-tightest">
                {l.label}
              </a>
            ))}
            <a href="#cta" onClick={() => setOpen(false)} className="bg-ink text-bone px-4 py-3 text-sm w-fit">
              Get the App →
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
