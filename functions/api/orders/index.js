import { getSessionCustomer, json, err } from '../../_lib/auth.js'

export const onRequestPost = async ({ request, env }) => {
  let b
  try { b = await request.json() } catch { return err('Invalid body') }

  const customer = await getSessionCustomer(env, request)
  const customer_id = customer?.id || null

  const name = (b.name || '').trim()
  const phone = (b.phone || '').replace(/[^\d+]/g, '')
  const address = (b.address || '').trim()
  const city = (b.city || '').trim() || 'Karachi'
  const payment_method = b.payment_method === 'bank' ? 'bank' : 'cod'
  const notes = (b.notes || '').trim() || null
  const items = Array.isArray(b.items) ? b.items : []

  if (!name || !phone || !address) return err('Name, phone and address required')
  if (items.length === 0) return err('Cart is empty')

  // Pull product prices from DB (trust no client-side prices)
  const ids = items.map((i) => Number(i.product_id)).filter(Boolean)
  if (ids.length === 0) return err('No valid products')
  const placeholders = ids.map(() => '?').join(',')
  const rows = await env.DB.prepare(
    `SELECT id, name, unit, retail_price, stock FROM products WHERE id IN (${placeholders})`,
  ).bind(...ids).all()
  const byId = new Map((rows.results || []).map((r) => [r.id, r]))

  const lineRows = []
  let subtotal = 0
  for (const it of items) {
    const p = byId.get(Number(it.product_id))
    if (!p) return err(`Product ${it.product_id} not found`, 404)
    const qty = Math.max(1, Math.floor(Number(it.qty) || 0))
    const lineTotal = p.retail_price * qty
    subtotal += lineTotal
    lineRows.push({
      product_id: p.id,
      product_name: p.name,
      unit: p.unit,
      qty,
      unit_price: p.retail_price,
      line_total: lineTotal,
    })
  }

  const delivery_fee = subtotal >= 2000 ? 0 : 150
  const total = subtotal + delivery_fee

  const inserted = await env.DB.prepare(
    `INSERT INTO orders (customer_id, customer_name, customer_phone, customer_address, city, payment_method, subtotal, delivery_fee, total, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`,
  ).bind(customer_id, name, phone, address, city, payment_method, subtotal, delivery_fee, total, notes).first()

  const orderId = inserted.id
  const itemStmt = env.DB.prepare(
    `INSERT INTO order_items (order_id, product_id, product_name, unit, qty, unit_price, line_total)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  )
  await env.DB.batch(lineRows.map((r) =>
    itemStmt.bind(orderId, r.product_id, r.product_name, r.unit, r.qty, r.unit_price, r.line_total),
  ))

  return json({ order: { id: orderId, total, subtotal, delivery_fee } }, { status: 201 })
}
