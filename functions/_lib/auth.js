// Auth helpers for Cloudflare Pages Functions + D1.
// Supports both admin user sessions and customer sessions in one table.

const ADMIN_COOKIE = 'f2y_session'
const CUSTOMER_COOKIE = 'f2y_customer'
const SESSION_DAYS = 14

const enc = new TextEncoder()

async function pbkdf2(password, salt) {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: enc.encode(salt), iterations: 100_000, hash: 'SHA-256' },
    key,
    256,
  )
  let bin = ''
  const arr = new Uint8Array(bits)
  for (let i = 0; i < arr.length; i++) bin += String.fromCharCode(arr[i])
  return btoa(bin)
}

export async function hashPassword(password, salt) { return pbkdf2(password, salt) }

export async function verifyPassword(password, salt, expected) {
  const got = await pbkdf2(password, salt)
  if (got.length !== expected.length) return false
  let diff = 0
  for (let i = 0; i < got.length; i++) diff |= got.charCodeAt(i) ^ expected.charCodeAt(i)
  return diff === 0
}

export function randomToken(bytes = 32) {
  const buf = new Uint8Array(bytes)
  crypto.getRandomValues(buf)
  return Array.from(buf).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export function newSalt() {
  return randomToken(16)
}

export function parseCookies(req) {
  const out = {}
  const h = req.headers.get('Cookie') || ''
  h.split(';').forEach((p) => {
    const [k, ...v] = p.trim().split('=')
    if (k) out[k] = decodeURIComponent(v.join('='))
  })
  return out
}

function makeCookie(name, token, daysFromNow = SESSION_DAYS) {
  const expires = new Date(Date.now() + daysFromNow * 86_400_000).toUTCString()
  return `${name}=${token}; HttpOnly; Path=/; SameSite=Lax; Secure; Expires=${expires}`
}

function clearCookieRaw(name) {
  return `${name}=; HttpOnly; Path=/; SameSite=Lax; Secure; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
}

export const sessionCookie = (token) => makeCookie(ADMIN_COOKIE, token)
export const clearCookie = () => clearCookieRaw(ADMIN_COOKIE)
export const customerCookie = (token) => makeCookie(CUSTOMER_COOKIE, token)
export const clearCustomerCookie = () => clearCookieRaw(CUSTOMER_COOKIE)

export const SESSION_COOKIE_NAME = ADMIN_COOKIE
export const CUSTOMER_COOKIE_NAME = CUSTOMER_COOKIE

export async function getSessionUser(env, req) {
  const token = parseCookies(req)[ADMIN_COOKIE]
  if (!token) return null
  const row = await env.DB.prepare(
    `SELECT u.id, u.email, u.name, u.role, s.expires_at
       FROM sessions s JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.user_id IS NOT NULL`,
  ).bind(token).first()
  if (!row) return null
  if (new Date(row.expires_at) < new Date()) {
    await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run()
    return null
  }
  return { id: row.id, email: row.email, name: row.name, role: row.role }
}

export async function getSessionCustomer(env, req) {
  const token = parseCookies(req)[CUSTOMER_COOKIE]
  if (!token) return null
  const row = await env.DB.prepare(
    `SELECT c.id, c.name, c.phone, c.email, c.city, c.address, s.expires_at
       FROM sessions s JOIN customers c ON c.id = s.customer_id
       WHERE s.token = ? AND s.customer_id IS NOT NULL`,
  ).bind(token).first()
  if (!row) return null
  if (new Date(row.expires_at) < new Date()) {
    await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run()
    return null
  }
  const { expires_at, ...c } = row
  return c
}

export async function createSession(env, userId) {
  const token = randomToken(32)
  const expires = new Date(Date.now() + SESSION_DAYS * 86_400_000).toISOString()
  await env.DB.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)')
    .bind(token, userId, expires).run()
  return token
}

export async function createCustomerSession(env, customerId) {
  const token = randomToken(32)
  const expires = new Date(Date.now() + SESSION_DAYS * 86_400_000).toISOString()
  await env.DB.prepare('INSERT INTO sessions (token, customer_id, expires_at) VALUES (?, ?, ?)')
    .bind(token, customerId, expires).run()
  return token
}

export async function deleteSession(env, token) {
  if (!token) return
  await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run()
}

export function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
  })
}

export function err(message, status = 400) {
  return json({ error: message }, { status })
}
