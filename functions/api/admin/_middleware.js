import { getSessionUser, err } from '../../_lib/auth.js'

export const onRequest = async (ctx) => {
  const user = await getSessionUser(ctx.env, ctx.request)
  if (!user) return err('Authentication required', 401)
  ctx.data.user = user
  return ctx.next()
}
