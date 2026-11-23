import React from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
      isActive
        ? 'bg-primary-container text-on-primary-container shadow-sm'
        : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
    }`;

  return (
    <div className="min-h-screen bg-surface text-on-surface flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-low z-50 flex flex-col justify-between py-6 px-4 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-outline-variant/20">
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div className="px-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
              <span className="material-symbols-outlined text-2xl">mode_fan</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-on-surface leading-none">FANFUN</span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold mt-1">Smart Living Admin</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            <NavLink to="/admin" end className={navItemClass}>
              <span className="material-symbols-outlined text-xl">dashboard</span>
              <span>Tổng quan</span>
            </NavLink>
            <NavLink to="/admin/orders" className={navItemClass}>
              <span className="material-symbols-outlined text-xl">shopping_bag</span>
              <span>Quản lý đơn hàng</span>
            </NavLink>
            <NavLink to="/admin/products" className={navItemClass}>
              <span className="material-symbols-outlined text-xl">inventory_2</span>
              <span>Quản lý sản phẩm</span>
            </NavLink>
            <NavLink to="/admin/categories" className={navItemClass}>
              <span className="material-symbols-outlined text-xl">category</span>
              <span>Quản lý danh mục</span>
            </NavLink>
            <NavLink to="/admin/vouchers" className={navItemClass}>
              <span className="material-symbols-outlined text-xl">confirmation_number</span>
              <span>Khuyến mãi & Voucher</span>
            </NavLink>
            <NavLink to="/admin/customers" className={navItemClass}>
              <span className="material-symbols-outlined text-xl">group</span>
              <span>Khách hàng</span>
            </NavLink>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-3 px-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-primary hover:bg-surface-container transition-all"
          >
            <span className="material-symbols-outlined text-lg">storefront</span>
            <span>Về trang chủ Store</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-error hover:bg-error-container/30 transition-all text-left"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            <span>Đăng xuất</span>
          </button>
          <div className="px-4 py-2 rounded-lg bg-surface-container flex items-center justify-between text-on-surface-variant">
            <span className="text-[11px]">Phiên bản</span>
            <span className="text-[11px] font-semibold text-primary">V1.2.0-MVP</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="pl-72 flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 right-0 h-16 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-8 border-b border-outline-variant/20">
          <div className="flex items-center gap-4 flex-1 max-w-lg">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">search</span>
              <input
                type="text"
                placeholder="Tìm kiếm mã đơn, sản phẩm, khách hàng..."
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-surface-container-lowest text-xs text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container text-xs font-medium text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span>Hệ thống: Hoạt động</span>
            </div>

            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary-container font-semibold transition-colors"
            >
              <span>Xem Storefront</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>

            <div className="h-5 w-px bg-surface-container-highest"></div>

            <div className="flex items-center gap-3">
              <div className="flex flex-col text-right hidden sm:flex">
                <span className="text-xs font-semibold text-on-surface leading-tight">Admin System</span>
                <span className="text-[11px] text-on-surface-variant">Quản trị viên cấp cao</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-xs">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8 flex-1 bg-surface">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
