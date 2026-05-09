import { hashPassword, newSalt, createCustomerSession, customerCookie, json, err } from '../../_lib/auth.js'

function normalizePhone(p) {
  return (p || '').replace(/[^\d+]/g, '')
}

export const onRequestPost = async ({ request, env }) => {
  let b
  try { b = await request.json() } catch { return err('Invalid body') }
  const name = (b.name || '').trim()
  const phone = normalizePhone(b.phone)
  const password = b.password || ''
  const city = (b.city || '').trim() || null
  const address = (b.address || '').trim() || null
  if (!name || !phone || !password) return err('Name, phone and password required')
  if (password.length < 6) return err('Password must be at least 6 characters')

  const exists = await env.DB.prepare('SELECT id FROM customers WHERE phone = ?').bind(phone).first()
  if (exists) return err('An account with this phone already exists', 409)

  const salt = newSalt()
  const hash = await hashPassword(password, salt)
  const ins = await env.DB.prepare(
    `INSERT INTO customers (name, phone, password_hash, password_salt, city, address)
     VALUES (?, ?, ?, ?, ?, ?) RETURNING *`,
  ).bind(name, phone, hash, salt, city, address).first()

  const token = await createCustomerSession(env, ins.id)
  return json(
    { customer: { id: ins.id, name, phone, city, address } },
    { status: 201, headers: { 'Set-Cookie': customerCookie(token) } },
  )
}
