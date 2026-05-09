import { useEffect, useState } from 'react'
import { api } from '../../lib/api.js'
import { PageTitle, Panel, Btn, Field, Input, Select, Empty } from './ui.jsx'

export default function Farmers() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ name: '', region: 'Sindh', crop: 'Tomato', phone: '' })

  const load = async () => {
    setLoading(true)
    try {
      const r = await api('/admin/farmers')
      setList(r.farmers || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const create = async (e) => {
    e.preventDefault()
    if (!form.name) return
    await api('/admin/farmers', { method: 'POST', body: form })
    setForm({ name: '', region: 'Sindh', crop: 'Tomato', phone: '' })
    setAdding(false)
    load()
  }

  const remove = async (id) => {
    if (!confirm('Delete this farmer?')) return
    await api(`/admin/farmers/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="space-y-8 max-w-[1400px]">
      <PageTitle
        eyebrow="Farmers"
        title="Onboarded farmers."
        action={
          <Btn onClick={() => setAdding((v) => !v)}>{adding ? '× Close' : '+ Add farmer'}</Btn>
        }
      />

      {adding && (
        <Panel title="New farmer">
          <form onSubmit={create} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field label="Name">
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </Field>
            <Field label="Region">
              <Select value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })}>
                <option>Sindh</option>
                <option>Punjab</option>
                <option>KP</option>
                <option>Balochistan</option>
              </Select>
            </Field>
            <Field label="Primary Crop">
              <Input value={form.crop} onChange={(e) => setForm({ ...form, crop: e.target.value })} />
            </Field>
            <Field label="Phone">
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </Field>
            <div className="md:col-span-4 flex gap-2 pt-1">
              <Btn type="submit">Save farmer →</Btn>
              <Btn variant="ghost" onClick={() => setAdding(false)}>Cancel</Btn>
            </div>
          </form>
        </Panel>
      )}

      <Panel title={`All farmers (${list.length})`}>
        {loading ? (
          <Empty msg="Loading…" />
        ) : list.length === 0 ? (
          <Empty msg="No farmers yet — add one above." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left font-mono text-[10px] tracking-[0.2em] text-ink/60">
                  <th className="py-2 px-3">ID</th>
                  <th className="py-2 px-3">NAME</th>
                  <th className="py-2 px-3">REGION</th>
                  <th className="py-2 px-3">CROP</th>
                  <th className="py-2 px-3">PHONE</th>
                  <th className="py-2 px-3">CREATED</th>
                  <th className="py-2 px-3 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {list.map((f) => (
                  <tr key={f.id} className="border-t border-ink/10 hover:bg-cream">
                    <td className="py-3 px-3 font-mono text-xs text-ink/60">#{String(f.id).padStart(4, '0')}</td>
                    <td className="py-3 px-3 font-display text-base tracking-tightest">{f.name}</td>
                    <td className="py-3 px-3">{f.region}</td>
                    <td className="py-3 px-3">{f.crop}</td>
                    <td className="py-3 px-3 font-mono text-xs">{f.phone || '—'}</td>
                    <td className="py-3 px-3 font-mono text-xs text-ink/60">{new Date(f.created_at).toLocaleDateString()}</td>
                    <td className="py-3 px-3 text-right">
                      <button onClick={() => remove(f.id)} className="text-clay text-xs font-mono tracking-[0.15em] hover:underline cursor-pointer">DELETE</button>
                    </td>
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
