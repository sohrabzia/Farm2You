import { json } from '../../_lib/auth.js'

export const onRequestGet = async ({ env }) => {
  const [orders, products] = await Promise.all([
    env.DB.prepare('SELECT id, customer_name, city, total, status, created_at FROM orders ORDER BY created_at DESC LIMIT 8').all(),
    env.DB.prepare('SELECT id, name, category, retail_price, unit, image_url FROM products ORDER BY id DESC LIMIT 6').all(),
  ])
  return json({
    orders: orders.results || [],
    products: products.results || [],
  })
}
