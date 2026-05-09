import { json } from '../../_lib/auth.js'

export const onRequestGet = async ({ env }) => {
  const r = await env.DB.prepare('SELECT * FROM waitlist ORDER BY created_at DESC').all()
  return json({ waitlist: r.results || [] })
}
