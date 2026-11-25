import React from 'react';
import { NavLink, Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import {
  Lock,
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Ticket,
  Users,
  Store,
  LogOut,
  Search,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import BrandLogo from './BrandLogo';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Not logged in -> redirect to Login page
  if (!user) {
    return <Navigate to="/login" state={{ from: '/admin' }} replace />;
  }

  // Logged in but NOT Admin -> show access restricted screen
  if (!user.isAdmin) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-xl bg-surface-container-low border border-outline-variant/25 text-center space-y-4">
          <div className="w-12 h-12 rounded-lg bg-error/10 text-error flex items-center justify-center mx-auto">
            <Lock size={24} strokeWidth={1.75} />
          </div>
          <h2 className="text-xl font-bold text-on-surface">Administrator Area</h2>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            You are currently signed in as <strong>{user.tier || 'Customer'}</strong> ({user.name}). This portal is restricted to Operations &amp; Admin personnel.
          </p>
          <div className="flex gap-3 pt-3">
            <button
              onClick={() => { logout(); navigate('/login'); }}
              className="flex-1 py-2.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container transition"
            >
              Switch to Admin Account
            </button>
            <Link
              to="/"
              className="flex-1 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-medium text-on-surface transition flex items-center justify-center"
            >
              Back to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
      isActive
        ? 'bg-surface-container text-primary font-semibold'
        : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
    }`;

  return (
    <div className="min-h-screen bg-surface text-on-surface flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-low z-50 flex flex-col justify-between py-6 px-4 border-r border-outline-variant/20">
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <Link to="/" className="px-2 block group">
            <BrandLogo size="sm" subtitle="Smart Living Admin" />
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            <NavLink to="/admin" end className={navItemClass}>
              <LayoutDashboard size={17} strokeWidth={1.75} />
              <span>Overview</span>
            </NavLink>
            <NavLink to="/admin/orders" className={navItemClass}>
              <ShoppingBag size={17} strokeWidth={1.75} />
              <span>Orders Management</span>
            </NavLink>
            <NavLink to="/admin/products" className={navItemClass}>
              <Package size={17} strokeWidth={1.75} />
              <span>Products &amp; Stock</span>
            </NavLink>
            <NavLink to="/admin/categories" className={navItemClass}>
              <Layers size={17} strokeWidth={1.75} />
              <span>Categories</span>
            </NavLink>
            <NavLink to="/admin/vouchers" className={navItemClass}>
              <Ticket size={17} strokeWidth={1.75} />
              <span>Vouchers &amp; Promos</span>
            </NavLink>
            <NavLink to="/admin/customers" className={navItemClass}>
              <Users size={17} strokeWidth={1.75} />
              <span>Customers</span>
            </NavLink>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-2 px-1">
          <Link
            to="/"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-primary hover:bg-surface-container transition-colors"
          >
            <Store size={16} strokeWidth={1.75} />
            <span>Back to Storefront</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-error hover:bg-error-container/20 transition-colors text-left"
          >
            <LogOut size={16} strokeWidth={1.75} />
            <span>Sign Out</span>
          </button>
          <div className="px-3 py-1.5 rounded-md bg-surface-container flex items-center justify-between text-on-surface-variant text-[11px]">
            <span>Version</span>
            <span className="font-semibold text-primary">v1.2.0-MVP</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="pl-64 flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 right-0 h-16 bg-surface/90 backdrop-blur-md z-40 flex items-center justify-between px-8 border-b border-outline-variant/20">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search size={15} strokeWidth={1.75} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
              <input
                type="text"
                placeholder="Search orders, products, customers..."
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-md bg-surface-container text-xs text-on-surface-variant">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span>System: Online</span>
            </div>

            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary-container font-medium transition-colors"
            >
              <span>View Storefront</span>
              <ArrowRight size={13} strokeWidth={1.75} />
            </Link>

            <div className="h-4 w-px bg-outline-variant/30"></div>

            <div className="flex items-center gap-2.5">
              <div className="flex flex-col text-right hidden sm:flex">
                <span className="text-xs font-semibold text-on-surface leading-tight">Admin System</span>
                <span className="text-[11px] text-on-surface-variant">Operations Manager</span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold text-xs">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Route Content */}
        <main className="p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
