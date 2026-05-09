import { useEffect, useState } from 'react'
import { api } from '../../lib/api.js'
import { PageTitle, Panel, Btn, Field, Input, Select, Empty } from './ui.jsx'
import { fmtPKR } from '../../lib/cart.jsx'

const CATS = ['vegetables', 'fruits', 'dairy', 'grains', 'livestock', 'agri-inputs']
const UNITS = ['kg', 'piece', 'dozen', 'liter', 'pack', 'bag', 'bunch']

const blank = {
  slug: '', name: '', name_ur: '', description: '', category: 'vegetables', unit: 'kg',
  retail_price: 100, wholesale_price: 80, stock: 100, image_url: '',
  is_organic: 0, is_featured: 0,
}

export default function Products() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(blank)

  const load = async () => {
    setLoading(true)
    try {
      const r = await api('/admin/products')
      setList(r.products || [])
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { load() }, [])

  const startCreate = () => { setEditing('new'); setForm(blank) }
  const startEdit = (p) => { setEditing(p.id); setForm({ ...blank, ...p }) }
  const cancel = () => { setEditing(null); setForm(blank) }

  const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const save = async (e) => {
    e.preventDefault()
    const payload = { ...form, slug: form.slug || slugify(form.name) }
    if (editing === 'new') {
      await api('/admin/products', { method: 'POST', body: payload })
    } else {
      await api(`/admin/products/${editing}`, { method: 'PUT', body: payload })
    }
    cancel(); load()
  }

  const remove = async (id) => {
    if (!confirm('Delete this product?')) return
    await api(`/admin/products/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="space-y-8 max-w-[1400px]">
      <PageTitle
        eyebrow="Products"
        title="Manage your catalogue."
        action={<Btn onClick={editing ? cancel : startCreate}>{editing ? '× Cancel' : '+ Add product'}</Btn>}
      />

      {editing && (
        <Panel title={editing === 'new' ? 'New product' : `Edit product #${editing}`}>
          <form onSubmit={save} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Name (English)"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></Field>
            <Field label="Name (Urdu)"><Input value={form.name_ur || ''} onChange={(e) => setForm({ ...form, name_ur: e.target.value })} /></Field>
            <Field label="Slug (auto if empty)"><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></Field>
            <Field label="Category">
              <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
              </Select>
            </Field>
            <Field label="Unit">
              <Select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}>
                {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
              </Select>
            </Field>
            <Field label="Stock"><Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} /></Field>
            <Field label="Retail price (PKR)"><Input type="number" value={form.retail_price} onChange={(e) => setForm({ ...form, retail_price: Number(e.target.value) })} /></Field>
            <Field label="Wholesale price (PKR)"><Input type="number" value={form.wholesale_price || 0} onChange={(e) => setForm({ ...form, wholesale_price: Number(e.target.value) })} /></Field>
            <Field label="Image URL (Unsplash etc.)"><Input value={form.image_url || ''} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://images.unsplash.com/..." /></Field>
            <Field label="Description" cls="md:col-span-3">
              <textarea value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full bg-bone border border-ink/25 px-3 py-2.5 outline-none focus:border-ink resize-none" />
            </Field>
            <div className="md:col-span-3 flex items-center gap-5">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input type="checkbox" checked={!!form.is_organic} onChange={(e) => setForm({ ...form, is_organic: e.target.checked ? 1 : 0 })} className="w-4 h-4 accent-forest cursor-pointer" />
                Organic
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input type="checkbox" checked={!!form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked ? 1 : 0 })} className="w-4 h-4 accent-clay cursor-pointer" />
                Featured on home
              </label>
            </div>
            <div className="md:col-span-3 flex gap-2 pt-2">
              <Btn type="submit">{editing === 'new' ? 'Save product →' : 'Update →'}</Btn>
              <Btn variant="ghost" onClick={cancel}>Cancel</Btn>
            </div>
          </form>
        </Panel>
      )}

      <Panel title={`Catalogue (${list.length})`}>
        {loading ? <Empty msg="Loading…" /> : list.length === 0 ? <Empty msg="No products yet — add one above." /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left font-mono text-[10px] tracking-[0.2em] text-ink/60">
                  <th className="py-2 px-3 w-16">IMG</th>
                  <th className="py-2 px-3">PRODUCT</th>
                  <th className="py-2 px-3">CATEGORY</th>
                  <th className="py-2 px-3 text-right">PRICE</th>
                  <th className="py-2 px-3 text-right">STOCK</th>
                  <th className="py-2 px-3">FLAGS</th>
                  <th className="py-2 px-3 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {list.map((p) => (
                  <tr key={p.id} className="border-t border-ink/10 hover:bg-cream">
                    <td className="py-2 px-3">
                      <div className="w-12 h-12 bg-cream overflow-hidden">
                        {p.image_url && <img src={p.image_url} alt={p.name} loading="lazy" className="w-full h-full object-cover" />}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-display text-base tracking-tightest">{p.name}</p>
                      <p className="text-xs text-ink/55 font-mono">{p.slug}</p>
                    </td>
                    <td className="py-3 px-3 text-xs uppercase font-mono tracking-[0.15em]">{p.category}</td>
                    <td className="py-3 px-3 text-right font-mono">{fmtPKR(p.retail_price)}/{p.unit}</td>
                    <td className="py-3 px-3 text-right font-mono">{p.stock}</td>
                    <td className="py-3 px-3 text-xs space-x-1">
                      {p.is_organic ? <span className="bg-forest text-bone font-mono tracking-[0.15em] px-1.5 py-0.5">ORG</span> : null}
                      {p.is_featured ? <span className="bg-clay text-bone font-mono tracking-[0.15em] px-1.5 py-0.5">FEAT</span> : null}
                    </td>
                    <td className="py-3 px-3 text-right space-x-3">
                      <button onClick={() => startEdit(p)} className="text-ink text-xs font-mono tracking-[0.15em] hover:underline cursor-pointer">EDIT</button>
                      <button onClick={() => remove(p.id)} className="text-clay text-xs font-mono tracking-[0.15em] hover:underline cursor-pointer">DELETE</button>
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
