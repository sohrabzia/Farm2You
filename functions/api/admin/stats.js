import { json } from '../../_lib/auth.js'

export const onRequestGet = async ({ env }) => {
  const [products, orders, customers, revenue] = await Promise.all([
    env.DB.prepare('SELECT COUNT(*) as c FROM products').first(),
    env.DB.prepare('SELECT COUNT(*) as c FROM orders').first(),
    env.DB.prepare('SELECT COUNT(*) as c FROM customers').first(),
    env.DB.prepare("SELECT COALESCE(SUM(total),0) as t FROM orders WHERE status != 'cancelled'").first(),
  ])
  return json({
    products: products?.c || 0,
    orders: orders?.c || 0,
    customers: customers?.c || 0,
    revenue: revenue?.t || 0,
  })
}
