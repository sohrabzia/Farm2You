export async function api(path, opts = {}) {
  const res = await fetch(`/api${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
    ...opts,
    body: opts.body && typeof opts.body !== 'string' ? JSON.stringify(opts.body) : opts.body,
  })
  let data = null
  try {
    data = await res.json()
  } catch (_) {
    /* no body */
  }
  if (!res.ok) {
    const err = new Error((data && data.error) || `Request failed: ${res.status}`)
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}
