export default function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-12 gap-x-5 md:gap-x-8 gap-y-10">
          <div className="col-span-12 md:col-span-5">
            <span className="font-display text-5xl md:text-7xl tracking-tightest leading-[0.95]">
              Farm2You
            </span>
            <p className="mt-6 max-w-md text-bone/70 text-sm leading-relaxed">
              From the field, to the family. Pakistan&rsquo;s direct-trade agri-stack — one app for
              farmers, shopkeepers, families and experts.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Social label="Facebook" />
              <Social label="Instagram" />
              <Social label="TikTok" />
              <Social label="YouTube" />
            </div>
          </div>

          <div className="col-span-6 md:col-span-2">
            <Heading>Product</Heading>
            <ul className="space-y-2.5 text-sm text-bone/70">
              <Item>Marketplace</Item>
              <Item>Livestock</Item>
              <Item>Agri-Inputs</Item>
              <Item>Logistics</Item>
              <Item>Consultations</Item>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <Heading>Company</Heading>
            <ul className="space-y-2.5 text-sm text-bone/70">
              <Item>About</Item>
              <Item>Mission</Item>
              <Item>Roadmap</Item>
              <Item>Careers</Item>
              <Item>Press</Item>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-3">
            <Heading>Karachi HQ</Heading>
            <p className="text-sm text-bone/70 leading-relaxed">
              Plot 14, Sector 24<br />
              Korangi Industrial Area<br />
              Karachi · Sindh · 74900
            </p>
            <p className="mt-3 text-sm text-bone/70">hello@farm2you.pk</p>
            <a href="/admin" className="mt-6 inline-flex items-center gap-2 text-sm border border-bone/30 px-3 py-2 hover:border-clay hover:text-clay transition-colors cursor-pointer">
              Admin Login →
            </a>
          </div>
        </div>

        <div className="mt-16 hairline-t border-bone/15 pt-6 grid grid-cols-12 gap-y-3 items-center">
          <p className="col-span-12 md:col-span-6 text-xs font-mono tracking-[0.2em] text-bone/50">
            © 2026 FARM2YOU PVT LTD · ALL RIGHTS RESERVED
          </p>
          <div className="col-span-12 md:col-span-6 flex md:justify-end gap-6 text-xs font-mono tracking-[0.2em] text-bone/50">
            <a href="#" className="hover:text-bone cursor-pointer">PRIVACY</a>
            <a href="#" className="hover:text-bone cursor-pointer">TERMS</a>
            <a href="#" className="hover:text-bone cursor-pointer">COOKIES</a>
            <span>v0.1.0</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function Heading({ children }) {
  return <h4 className="label !text-bone/60 mb-4">{children}</h4>
}
function Item({ children }) {
  return <li><a href="#" className="hover:text-bone transition-colors cursor-pointer">{children}</a></li>
}

function Social({ label }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="w-9 h-9 grid place-items-center border border-bone/30 hover:bg-clay hover:border-clay transition-colors cursor-pointer"
    >
      <span className="font-mono text-[10px] tracking-[0.15em]">{label[0]}</span>
    </a>
  )
}
