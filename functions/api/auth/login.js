import { verifyPassword, createSession, sessionCookie, json, err } from '../../_lib/auth.js'

export const onRequestPost = async ({ request, env }) => {
  let body
  try {
    body = await request.json()
  } catch {
    return err('Invalid request body')
  }
  const email = (body.email || '').trim().toLowerCase()
  const password = body.password || ''
  if (!email || !password) return err('Email and password required')

  const user = await env.DB.prepare(
    'SELECT id, email, name, role, password_hash, password_salt FROM users WHERE email = ?',
  )
    .bind(email)
    .first()
  if (!user) return err('Invalid credentials', 401)

  const ok = await verifyPassword(password, user.password_salt, user.password_hash)
  if (!ok) return err('Invalid credentials', 401)

  const token = await createSession(env, user.id)
  return json(
    { user: { id: user.id, email: user.email, name: user.name, role: user.role } },
    { headers: { 'Set-Cookie': sessionCookie(token) } },
  )
}
