import { useEffect, useState } from 'react'
import { api } from '../../lib/api.js'
import { PageTitle, Panel, Empty } from './ui.jsx'

export default function Consultations() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api('/admin/consultations')
      .then((r) => setList(r.consultations || []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-8 max-w-[1400px]">
      <PageTitle eyebrow="Consultations" title="Expert consultations." />

      <Panel title={`Sessions (${list.length})`}>
        {loading ? <Empty msg="Loading…" /> : list.length === 0 ? <Empty msg="No consultations yet." /> : (
          <ul className="divide-y divide-ink/10">
            {list.map((c) => (
              <li key={c.id} className="py-4 grid grid-cols-12 gap-3 items-center">
                <span className="col-span-2 md:col-span-1 font-mono text-xs text-ink/60">#{String(c.id).padStart(4, '0')}</span>
                <div className="col-span-10 md:col-span-3">
                  <p className="font-display text-base tracking-tightest">{c.farmer_name}</p>
                  <p className="text-xs text-ink/60 font-mono">{c.region}</p>
                </div>
                <div className="col-span-6 md:col-span-3">
                  <p className="text-xs font-mono text-ink/60 uppercase tracking-[0.15em]">{c.specialty}</p>
                  <p className="font-display text-base tracking-tightest">{c.expert_name}</p>
                </div>
                <div className="col-span-6 md:col-span-3">
                  <p className="text-xs font-mono text-clay uppercase tracking-[0.15em]">DIAGNOSIS</p>
                  <p className="text-sm">{c.diagnosis}</p>
                </div>
                <span className="col-span-12 md:col-span-2 md:text-right font-mono text-xs text-ink/60">
                  {new Date(c.created_at).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  )
}
