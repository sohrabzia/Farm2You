import { json, err } from '../../_lib/auth.js'

export const onRequestGet = async ({ params, env }) => {
  const id = Number(params.id)
  if (!id) return err('Invalid id')
  const order = await env.DB.prepare('SELECT * FROM orders WHERE id = ?').bind(id).first()
  if (!order) return err('Not found', 404)
  const items = await env.DB.prepare('SELECT * FROM order_items WHERE order_id = ? ORDER BY id').bind(id).all()
  return json({ order, items: items.results || [] })
}
