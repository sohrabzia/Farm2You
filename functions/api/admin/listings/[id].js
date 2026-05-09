import { json, err } from '../../../_lib/auth.js'

export const onRequestDelete = async ({ params, env }) => {
  const id = Number(params.id)
  if (!id) return err('Invalid id')
  await env.DB.prepare('DELETE FROM listings WHERE id = ?').bind(id).run()
  return json({ ok: true })
}
