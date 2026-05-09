import { verifyPassword, createCustomerSession, customerCookie, json, err } from '../../_lib/auth.js'

export const onRequestPost = async ({ request, env }) => {
  let b
  try { b = await request.json() } catch { return err('Invalid body') }
  const phone = (b.phone || '').replace(/[^\d+]/g, '')
  const password = b.password || ''
  if (!phone || !password) return err('Phone and password required')

  const c = await env.DB.prepare(
    'SELECT id, name, phone, email, city, address, password_hash, password_salt FROM customers WHERE phone = ?',
  ).bind(phone).first()
  if (!c || !c.password_hash) return err('Invalid credentials', 401)

  const ok = await verifyPassword(password, c.password_salt, c.password_hash)
  if (!ok) return err('Invalid credentials', 401)

  const token = await createCustomerSession(env, c.id)
  const { password_hash, password_salt, ...safe } = c
  return json({ customer: safe }, { headers: { 'Set-Cookie': customerCookie(token) } })
}
