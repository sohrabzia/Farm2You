import { getSessionCustomer, json, err } from '../../_lib/auth.js'

export const onRequestGet = async ({ request, env }) => {
  const c = await getSessionCustomer(env, request)
  if (!c) return err('Not authenticated', 401)
  return json({ customer: c })
}
