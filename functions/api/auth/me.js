import { getSessionUser, json, err } from '../../_lib/auth.js'

export const onRequestGet = async ({ request, env }) => {
  const user = await getSessionUser(env, request)
  if (!user) return err('Not authenticated', 401)
  return json({ user })
}
