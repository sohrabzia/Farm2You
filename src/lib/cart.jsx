import { createContext, useContext, useEffect, useState } from 'react'

const CartCtx = createContext(null)
const STORAGE_KEY = 'f2y_cart_v1'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => load())
  const [drawer, setDrawer] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* ignore quota */
    }
  }, [items])

  const add = (product, qty = 1) => {
    setItems((cur) => {
      const idx = cur.findIndex((c) => c.id === product.id)
      if (idx >= 0) {
        const copy = [...cur]
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty }
        return copy
      }
      return [
        ...cur,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          name_ur: product.name_ur,
          unit: product.unit,
          price: product.retail_price,
          image_url: product.image_url,
          qty,
        },
      ]
    })
    setDrawer(true)
  }

  const setQty = (id, qty) =>
    setItems((cur) => cur.map((c) => (c.id === id ? { ...c, qty: Math.max(1, qty) } : c)))

  const remove = (id) => setItems((cur) => cur.filter((c) => c.id !== id))
  const clear = () => setItems([])

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <CartCtx.Provider value={{ items, add, setQty, remove, clear, subtotal, count, drawer, setDrawer }}>
      {children}
    </CartCtx.Provider>
  )
}

export function useCart() {
  return useContext(CartCtx)
}

export function fmtPKR(n) {
  return new Intl.NumberFormat('en-PK').format(Math.round(n || 0)) + ' Rs'
}
