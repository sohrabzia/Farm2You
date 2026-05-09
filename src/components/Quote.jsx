export default function Quote() {
  return (
    <section className="relative bg-forest text-bone py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 grain opacity-30" />
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 relative">
        <div className="grid grid-cols-12 gap-x-5 md:gap-x-8 items-center">
          <div className="col-span-12 md:col-span-2">
            <span className="font-display text-9xl text-clay leading-none">&ldquo;</span>
          </div>
          <div className="col-span-12 md:col-span-10">
            <p className="font-display text-3xl md:text-5xl lg:text-6xl tracking-tightest leading-[1.05] text-bone reveal">
              The farmer is the only man in our economy who buys everything at retail, sells everything
              at wholesale,&nbsp;
              <span className="italic font-light text-ochre">and pays the freight both ways.</span>
            </p>
            <div className="mt-10 flex items-center gap-4">
              <span className="block w-10 h-px bg-clay" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-bone/70">JOHN F. KENNEDY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
