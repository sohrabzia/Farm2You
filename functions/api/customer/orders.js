import { getSessionCustomer, json, err } from '../../_lib/auth.js'

export const onRequestGet = async ({ request, env }) => {
  const c = await getSessionCustomer(env, request)
  if (!c) return err('Not authenticated', 401)
  const r = await env.DB.prepare(
    `SELECT o.*, (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) as item_count
       FROM orders o
       WHERE customer_id = ?
       ORDER BY created_at DESC`,
  ).bind(c.id).all()
  return json({ orders: r.results || [] })
}
