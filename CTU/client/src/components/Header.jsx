import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { totalCount } = useCart();
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Top Banner */}
      <div className="bg-primary text-on-primary py-1 px-4 text-center text-xs tracking-wide font-medium">
        <span className="inline-flex items-center gap-2 justify-center flex-wrap">
          <span className="material-symbols-outlined text-[14px]">verified</span>
          Miễn phí khảo sát & lắp đặt tận nhà tại Hà Nội & TP.HCM • Hotline 1900 6868 • Bảo hành chính hãng 5 năm
        </span>
      </div>

      {/* Main Header */}
      <div className="h-20 max-w-[1280px] mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-[0_4px_12px_rgba(156,63,17,0.25)] group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">mode_fan</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-on-surface">FANFUN</span>
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Smart Living</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-on-surface-variant">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <Link to="/products" className="hover:text-primary transition-colors">Sản phẩm & Hệ sinh thái</Link>
          <Link to="/products?category=quat-tran-thong-minh" className="hover:text-primary transition-colors">Công nghệ 3-in-1</Link>
          <Link to="/orders" className="hover:text-primary transition-colors">Đơn hàng của tôi</Link>
          <Link to="/admin/products" className="text-primary bg-primary-fixed/60 px-3 py-1 rounded-full text-xs hover:bg-primary-fixed transition-colors">
            ⚙️ Quản trị Admin
          </Link>
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xs mx-4">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm quạt thông minh, phụ kiện..."
              className="w-full h-10 pl-9 pr-4 rounded-xl bg-surface-container-low text-on-surface text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest placeholder:text-outline transition-all"
            />
          </div>
        </form>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href="tel:19006868"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-[20px] text-primary">call</span>
            <span className="hidden lg:inline">1900 6868</span>
          </a>

          {/* User Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors text-xs font-semibold"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-[18px]">person</span>
              </div>
              <span className="hidden lg:inline">{user ? user.name : 'Tài khoản'}</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 py-2 z-50">
                {user ? (
                  <>
                    <div className="px-4 py-2 border-b border-surface-container">
                      <div className="font-semibold text-sm text-on-surface">{user.name}</div>
                      <div className="text-xs text-on-surface-variant">{user.email}</div>
                      <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold">
                        {user.tier || 'Thành viên'}
                      </span>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-on-surface hover:bg-surface-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">badge</span>
                      Hồ sơ cá nhân
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-on-surface hover:bg-surface-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                      Đơn hàng của tôi
                    </Link>
                    <Link
                      to="/change-password"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-on-surface hover:bg-surface-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                      Đổi mật khẩu
                    </Link>
                    <Link
                      to="/admin/products"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-primary font-semibold hover:bg-surface-container transition-colors border-t border-surface-container"
                    >
                      <span className="material-symbols-outlined text-[18px]">dashboard</span>
                      Trang quản trị Admin
                    </Link>
                    <button
                      onClick={() => { logout(); setShowUserMenu(false); }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-error hover:bg-error-container/30 transition-colors border-t border-surface-container"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-primary hover:bg-surface-container"
                    >
                      <span className="material-symbols-outlined text-[18px]">login</span>
                      Đăng nhập tài khoản
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs text-on-surface hover:bg-surface-container"
                    >
                      <span className="material-symbols-outlined text-[18px]">person_add</span>
                      Đăng ký tài khoản mới
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Cart Button */}
          <Link
            to="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center shadow-sm animate-bounce">
                {totalCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
