import { parseCookies, deleteSession, clearCustomerCookie, json, CUSTOMER_COOKIE_NAME } from '../../_lib/auth.js'

export const onRequestPost = async ({ request, env }) => {
  const token = parseCookies(request)[CUSTOMER_COOKIE_NAME]
  await deleteSession(env, token)
  return json({ ok: true }, { headers: { 'Set-Cookie': clearCustomerCookie() } })
}
