import { json, err } from '../_lib/auth.js'

const ALLOWED_ROLES = new Set(['farmer', 'shopkeeper', 'family', 'expert'])

export const onRequestPost = async ({ request, env }) => {
  let body
  try { body = await request.json() } catch { return err('Invalid body') }
  const email = (body.email || '').trim().toLowerCase()
  const role = ALLOWED_ROLES.has(body.role) ? body.role : 'farmer'
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return err('Valid email required')
  try {
    await env.DB.prepare('INSERT INTO waitlist (email, role) VALUES (?, ?)').bind(email, role).run()
  } catch {
    // unique violation — treat as success (idempotent)
  }
  return json({ ok: true })
}
