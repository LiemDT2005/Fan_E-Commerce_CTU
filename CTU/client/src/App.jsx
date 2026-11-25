import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { RequireAuth, RedirectIfLoggedIn } from './components/ProtectedRoute';

// Store Layout & Pages
import StoreLayout from './components/StoreLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import MyOrders from './pages/MyOrders';
import OrderDetail from './pages/OrderDetail';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin Layout & Pages
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminCategories from './pages/admin/AdminCategories';
import AdminOrders from './pages/admin/AdminOrders';
import AdminOrderDetail from './pages/admin/AdminOrderDetail';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminVouchers from './pages/admin/AdminVouchers';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Standalone Auth Pages (Split Screen, No Header & Footer) */}
            <Route path="/login" element={<RedirectIfLoggedIn><Login /></RedirectIfLoggedIn>} />
            <Route path="/register" element={<RedirectIfLoggedIn><Register /></RedirectIfLoggedIn>} />

            {/* ========== Storefront Routes (With Header & Footer) ========== */}
            <Route path="/" element={<StoreLayout />}>
              {/* Public routes */}
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />

              {/* Protected user routes */}
              <Route path="checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
              <Route path="order-success" element={<RequireAuth><OrderSuccess /></RequireAuth>} />
              <Route path="payment/success" element={<RequireAuth><PaymentSuccess /></RequireAuth>} />
              <Route path="payment/cancel" element={<RequireAuth><PaymentCancel /></RequireAuth>} />
              <Route path="orders" element={<RequireAuth><MyOrders /></RequireAuth>} />
              <Route path="orders/:id" element={<RequireAuth><OrderDetail /></RequireAuth>} />
              <Route path="profile" element={<RequireAuth><Profile /></RequireAuth>} />
              <Route path="change-password" element={<RequireAuth><ChangePassword /></RequireAuth>} />
            </Route>

            {/* Admin Portal — Protected by AdminLayout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/new" element={<AdminProductForm />} />
              <Route path="products/:id/edit" element={<AdminProductForm />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="orders/:id" element={<AdminOrderDetail />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="vouchers" element={<AdminVouchers />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
