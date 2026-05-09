import { useEffect, useState } from 'react'
import { api } from '../../lib/api.js'
import { PageTitle, Panel, Empty } from './ui.jsx'

export default function Waitlist() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api('/admin/waitlist')
      .then((r) => setList(r.waitlist || []))
      .finally(() => setLoading(false))
  }, [])

  const downloadCsv = () => {
    const rows = [['email', 'role', 'created_at']]
    list.forEach((w) => rows.push([w.email, w.role, w.created_at]))
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `farm2you-waitlist-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8 max-w-[1400px]">
      <PageTitle
        eyebrow="Waitlist"
        title="Pre-launch signups."
        action={
          <button onClick={downloadCsv} className="px-4 py-2.5 text-sm border border-ink/30 hover:border-ink cursor-pointer">
            ↓ Export CSV
          </button>
        }
      />

      <Panel title={`Signups (${list.length})`}>
        {loading ? <Empty msg="Loading…" /> : list.length === 0 ? <Empty msg="No signups yet." /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left font-mono text-[10px] tracking-[0.2em] text-ink/60">
                  <th className="py-2 px-3">EMAIL</th>
                  <th className="py-2 px-3">ROLE</th>
                  <th className="py-2 px-3">DATE</th>
                </tr>
              </thead>
              <tbody>
                {list.map((w) => (
                  <tr key={w.id} className="border-t border-ink/10 hover:bg-cream">
                    <td className="py-3 px-3 font-display tracking-tightest">{w.email}</td>
                    <td className="py-3 px-3 font-mono text-xs uppercase tracking-[0.15em]">{w.role}</td>
                    <td className="py-3 px-3 font-mono text-xs text-ink/60">{new Date(w.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  )
}
