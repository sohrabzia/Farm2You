import { json } from '../../_lib/auth.js'

export const onRequestGet = async ({ env }) => {
  const r = await env.DB.prepare('SELECT * FROM consultations ORDER BY created_at DESC').all()
  return json({ consultations: r.results || [] })
}
