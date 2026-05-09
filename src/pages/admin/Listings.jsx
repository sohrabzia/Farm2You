import { useEffect, useState } from 'react'
import { api } from '../../lib/api.js'
import { PageTitle, Panel, Btn, Field, Input, Select, Empty } from './ui.jsx'

export default function Listings() {
  const [list, setList] = useState([])
  const [farmers, setFarmers] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({
    farmer_id: '',
    product: 'Tomato',
    category: 'Produce',
    qty_kg: 50,
    retail_price: 80,
    wholesale_price: 60,
  })

  const load = async () => {
    setLoading(true)
    try {
      const [l, f] = await Promise.all([api('/admin/listings'), api('/admin/farmers')])
      setList(l.listings || [])
      setFarmers(f.farmers || [])
      if (!form.farmer_id && f.farmers?.[0]) setForm((s) => ({ ...s, farmer_id: f.farmers[0].id }))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const create = async (e) => {
    e.preventDefault()
    await api('/admin/listings', { method: 'POST', body: form })
    setAdding(false)
    load()
  }

  const remove = async (id) => {
    if (!confirm('Delete listing?')) return
    await api(`/admin/listings/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="space-y-8 max-w-[1400px]">
      <PageTitle
        eyebrow="Listings"
        title="Active marketplace listings."
        action={<Btn onClick={() => setAdding((v) => !v)}>{adding ? '× Close' : '+ New listing'}</Btn>}
      />

      {adding && (
        <Panel title="New listing">
          <form onSubmit={create} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Farmer">
              <Select value={form.farmer_id} onChange={(e) => setForm({ ...form, farmer_id: Number(e.target.value) })}>
                {farmers.map((f) => <option key={f.id} value={f.id}>{f.name} — {f.region}</option>)}
              </Select>
            </Field>
            <Field label="Product">
              <Input value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} required />
            </Field>
            <Field label="Category">
              <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option>Produce</option>
                <option>Livestock</option>
                <option>Agri-Inputs</option>
              </Select>
            </Field>
            <Field label="Qty (kg)">
              <Input type="number" value={form.qty_kg} onChange={(e) => setForm({ ...form, qty_kg: Number(e.target.value) })} />
            </Field>
            <Field label="Retail Price (PKR)">
              <Input type="number" value={form.retail_price} onChange={(e) => setForm({ ...form, retail_price: Number(e.target.value) })} />
            </Field>
            <Field label="Wholesale Price (PKR)">
              <Input type="number" value={form.wholesale_price} onChange={(e) => setForm({ ...form, wholesale_price: Number(e.target.value) })} />
            </Field>
            <div className="md:col-span-3"><Btn type="submit">Publish listing →</Btn></div>
          </form>
        </Panel>
      )}

      <Panel title={`Listings (${list.length})`}>
        {loading ? <Empty msg="Loading…" /> : list.length === 0 ? <Empty msg="No listings yet." /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((l) => (
              <div key={l.id} className="border border-ink/15 bg-bone p-5 hover:border-ink transition-colors">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-clay">{l.category?.toUpperCase()}</span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-ink/50">#{String(l.id).padStart(4, '0')}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl tracking-tightest">{l.product}</h3>
                <p className="mt-1 text-xs text-ink/60 font-mono">{l.farmer_name} · {l.region}</p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                  <KV label="QTY" v={`${l.qty_kg} kg`} />
                  <KV label="RETAIL" v={`${l.retail_price} ৳`} />
                  <KV label="WHOLESALE" v={`${l.wholesale_price} ৳`} />
                </div>
                <button onClick={() => remove(l.id)} className="mt-4 text-clay text-xs font-mono tracking-[0.15em] hover:underline cursor-pointer">DELETE</button>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  )
}

function KV({ label, v }) {
  return (
    <div className="border-t border-ink/10 pt-2">
      <p className="font-mono text-[9px] tracking-[0.2em] text-ink/50">{label}</p>
      <p className="font-display text-lg tracking-tightest mt-0.5">{v}</p>
    </div>
  )
}
