import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, RequireAuth } from './lib/auth.jsx'
import { CustomerProvider, RequireCustomer } from './lib/customer.jsx'
import { CartProvider } from './lib/cart.jsx'
import { I18nProvider } from './lib/i18n.jsx'
import LangModal from './components/LangModal.jsx'

import ShopLayout from './components/shop/ShopLayout.jsx'
import Home from './pages/shop/Home.jsx'
import Browse from './pages/shop/Browse.jsx'
import Product from './pages/shop/Product.jsx'
import Cart from './pages/shop/Cart.jsx'
import Checkout from './pages/shop/Checkout.jsx'
import OrderConfirmed from './pages/shop/OrderConfirmed.jsx'
import Account from './pages/shop/Account.jsx'
import { CustomerLogin, CustomerSignup } from './pages/shop/AccountAuth.jsx'

import Login from './pages/Login.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import Products from './pages/admin/Products.jsx'
import Farmers from './pages/admin/Farmers.jsx'
import Orders from './pages/admin/Orders.jsx'
import Consultations from './pages/admin/Consultations.jsx'

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <AuthProvider>
          <CustomerProvider>
            <CartProvider>
              <LangModal />
              <Routes>
                <Route element={<ShopLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Browse />} />
                  <Route path="/product/:slug" element={<Product />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order/:id/confirmed" element={<OrderConfirmed />} />
                  <Route path="/account/login" element={<CustomerLogin />} />
                  <Route path="/account/signup" element={<CustomerSignup />} />
                  <Route path="/account" element={<RequireCustomer><Account /></RequireCustomer>} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route
                  path="/admin"
                  element={<RequireAuth><AdminLayout /></RequireAuth>}
                >
                  <Route index element={<Dashboard />} />
                  <Route path="products" element={<Products />} />
                  <Route path="farmers" element={<Farmers />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="consultations" element={<Consultations />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </CartProvider>
          </CustomerProvider>
        </AuthProvider>
      </BrowserRouter>
    </I18nProvider>
  )
}
