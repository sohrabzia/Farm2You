import { json, err } from '../../../_lib/auth.js'

export const onRequestGet = async ({ env }) => {
  const r = await env.DB.prepare('SELECT * FROM products ORDER BY id DESC').all()
  return json({ products: r.results || [] })
}

export const onRequestPost = async ({ request, env }) => {
  let b
  try { b = await request.json() } catch { return err('Invalid body') }
  const required = ['slug', 'name', 'category', 'unit']
  for (const k of required) if (!b[k]) return err(`${k} is required`)
  try {
    const r = await env.DB.prepare(
      `INSERT INTO products (slug, name, name_ur, description, category, unit, retail_price, wholesale_price, stock, image_url, is_organic, is_featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`,
    ).bind(
      b.slug, b.name, b.name_ur || null, b.description || null,
      b.category, b.unit, Number(b.retail_price || 0), b.wholesale_price ? Number(b.wholesale_price) : null,
      Number(b.stock || 0), b.image_url || null, b.is_organic ? 1 : 0, b.is_featured ? 1 : 0,
    ).first()
    return json({ product: r }, { status: 201 })
  } catch (e) {
    if (String(e.message).includes('UNIQUE')) return err('Slug already exists', 409)
    throw e
  }
}
