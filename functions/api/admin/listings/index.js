import { json, err } from '../../../_lib/auth.js'

export const onRequestGet = async ({ env }) => {
  const r = await env.DB.prepare(
    `SELECT l.*, f.name as farmer_name, f.region as region
       FROM listings l JOIN farmers f ON f.id = l.farmer_id
       ORDER BY l.created_at DESC`,
  ).all()
  return json({ listings: r.results || [] })
}

export const onRequestPost = async ({ request, env }) => {
  let b
  try { b = await request.json() } catch { return err('Invalid body') }
  const { farmer_id, product, category, qty_kg, retail_price, wholesale_price } = b
  if (!farmer_id || !product || !category) return err('farmer_id, product, category required')
  const r = await env.DB.prepare(
    `INSERT INTO listings (farmer_id, product, category, qty_kg, retail_price, wholesale_price)
     VALUES (?, ?, ?, ?, ?, ?) RETURNING *`,
  ).bind(farmer_id, product, category, qty_kg || 0, retail_price || 0, wholesale_price || 0).first()
  return json({ listing: r }, { status: 201 })
}
