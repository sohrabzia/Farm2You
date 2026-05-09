import { json, err } from '../../../_lib/auth.js'

export const onRequestPut = async ({ params, request, env }) => {
  const id = Number(params.id)
  if (!id) return err('Invalid id')
  let b
  try { b = await request.json() } catch { return err('Invalid body') }
  await env.DB.prepare(
    `UPDATE products SET
       slug = COALESCE(?, slug),
       name = COALESCE(?, name),
       name_ur = ?,
       description = ?,
       category = COALESCE(?, category),
       unit = COALESCE(?, unit),
       retail_price = COALESCE(?, retail_price),
       wholesale_price = ?,
       stock = COALESCE(?, stock),
       image_url = ?,
       is_organic = COALESCE(?, is_organic),
       is_featured = COALESCE(?, is_featured)
     WHERE id = ?`,
  ).bind(
    b.slug || null, b.name || null, b.name_ur || null, b.description || null,
    b.category || null, b.unit || null,
    b.retail_price != null ? Number(b.retail_price) : null,
    b.wholesale_price != null ? Number(b.wholesale_price) : null,
    b.stock != null ? Number(b.stock) : null,
    b.image_url || null,
    b.is_organic != null ? (b.is_organic ? 1 : 0) : null,
    b.is_featured != null ? (b.is_featured ? 1 : 0) : null,
    id,
  ).run()
  return json({ ok: true })
}

export const onRequestDelete = async ({ params, env }) => {
  const id = Number(params.id)
  if (!id) return err('Invalid id')
  await env.DB.prepare('DELETE FROM products WHERE id = ?').bind(id).run()
  return json({ ok: true })
}
