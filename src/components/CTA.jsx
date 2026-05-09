import { useState } from 'react'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('farmer')
  const [sent, setSent] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!email) return
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      })
    } catch (_) {}
    setSent(true)
  }

  return (
    <section id="cta" className="relative bg-bone py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-12 gap-x-5 md:gap-x-8 hairline border border-ink p-6 md:p-12 lg:p-16 bg-clay text-bone reveal">
          <div className="col-span-12 md:col-span-7">
            <span className="font-mono text-[11px] tracking-[0.2em]">JOIN THE WAITLIST</span>
            <h2 className="mt-4 font-display text-4xl md:text-6xl lg:text-7xl tracking-tightest leading-[0.95]">
              Kisaan ka haq.
              <br />
              <span className="italic font-light">Kissan tak.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed opacity-90">
              Get early access to the Farm2You app — and be among the first 500 farmers eligible for a
              free expert consultation.
            </p>
          </div>

          <div className="col-span-12 md:col-span-5 mt-10 md:mt-0 flex flex-col justify-end">
            {sent ? (
              <div className="border border-bone p-6">
                <span className="font-mono text-[11px] tracking-[0.2em]">CONFIRMED</span>
                <p className="mt-3 font-display text-2xl tracking-tightest">
                  You&rsquo;re on the list. We&rsquo;ll be in touch.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <div className="flex gap-1.5 mb-2">
                  {['farmer', 'shopkeeper', 'family', 'expert'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`px-3 py-1.5 text-xs font-mono tracking-[0.15em] uppercase cursor-pointer transition-colors ${
                        role === r ? 'bg-bone text-clay' : 'border border-bone/50 hover:border-bone'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                <div className="flex">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    aria-label="email address"
                    className="flex-1 bg-transparent border border-bone/50 text-bone placeholder:text-bone/50 px-4 py-3.5 outline-none focus:border-bone"
                  />
                  <button
                    type="submit"
                    className="bg-ink text-bone px-5 py-3.5 cursor-pointer hover:bg-bone hover:text-clay transition-colors"
                  >
                    Join →
                  </button>
                </div>
                <p className="text-xs opacity-80 mt-2">
                  We respect your inbox. One launch announcement, no spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
