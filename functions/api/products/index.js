import { json } from '../../_lib/auth.js'

export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url)
  const category = url.searchParams.get('category')
  const q = (url.searchParams.get('q') || '').trim()
  const featured = url.searchParams.get('featured')
  const organic = url.searchParams.get('organic')

  const where = []
  const binds = []
  if (category) { where.push('category = ?'); binds.push(category) }
  if (featured) { where.push('is_featured = 1') }
  if (organic) { where.push('is_organic = 1') }
  if (q) {
    where.push('(name LIKE ? OR name_ur LIKE ? OR description LIKE ?)')
    binds.push(`%${q}%`, `%${q}%`, `%${q}%`)
  }

  const sql = `
    SELECT p.*, f.region as region
    FROM products p
    LEFT JOIN farmers f ON f.id = p.farmer_id
    ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
    ORDER BY is_featured DESC, p.id DESC
    LIMIT 100
  `
  const r = await env.DB.prepare(sql).bind(...binds).all()
  return json({ products: r.results || [] })
}
