import { json, err } from '../../../_lib/auth.js'

export const onRequestGet = async ({ env }) => {
  const r = await env.DB.prepare('SELECT * FROM farmers ORDER BY created_at DESC').all()
  return json({ farmers: r.results || [] })
}

export const onRequestPost = async ({ request, env }) => {
  let body
  try { body = await request.json() } catch { return err('Invalid body') }
  const { name, region, crop, phone } = body
  if (!name || !region || !crop) return err('name, region, crop required')
  const r = await env.DB.prepare(
    'INSERT INTO farmers (name, region, crop, phone) VALUES (?, ?, ?, ?) RETURNING *',
  ).bind(name, region, crop, phone || null).first()
  return json({ farmer: r }, { status: 201 })
}
