import { json, err } from '../../_lib/auth.js'

export const onRequestGet = async ({ params, env }) => {
  const r = await env.DB.prepare(
    `SELECT p.*, f.region as region, f.name as farmer_name
       FROM products p
       LEFT JOIN farmers f ON f.id = p.farmer_id
       WHERE p.slug = ?`,
  ).bind(params.slug).first()
  if (!r) return err('Product not found', 404)
  return json({ product: r })
}
