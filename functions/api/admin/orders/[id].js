import { json, err } from '../../../_lib/auth.js'

const ALLOWED = new Set(['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'])

export const onRequestPut = async ({ params, request, env }) => {
  const id = Number(params.id)
  if (!id) return err('Invalid id')
  let b
  try { b = await request.json() } catch { return err('Invalid body') }
  if (!ALLOWED.has(b.status)) return err('Invalid status')
  await env.DB.prepare('UPDATE orders SET status = ? WHERE id = ?').bind(b.status, id).run()
  return json({ ok: true })
}
