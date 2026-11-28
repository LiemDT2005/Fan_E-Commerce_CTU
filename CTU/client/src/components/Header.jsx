import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Phone,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Package,
  KeyRound,
  LayoutDashboard,
  LogOut,
  LogIn,
  UserPlus,
  SlidersHorizontal,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import BrandLogo from './BrandLogo';

const PRIMARY_NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products & Ecosystem' },
  { to: '/about', label: 'About Us' },
  { to: '/orders', label: 'My Orders' },
];

export default function Header() {
  const { totalCount } = useCart();
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setShowUserMenu(false);
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant/25">
      {/* Top Announcement Strip */}
      <div className="bg-[#241914] text-[#f5ebe0] py-1.5 px-4 text-center text-[11px] tracking-wide">
        <span>
          Can Tho: 117 Electric Power Residential Area, Hung Phu, Cai Rang &nbsp;·&nbsp; Admin: Huynh Nam Phuong &nbsp;·&nbsp; Hotline 091 8074079
        </span>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-16 lg:h-[72px] max-w-[1280px] mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center flex-shrink-0 group">
          <BrandLogo size="md" subtitle="Art of Air" />
        </Link>

        {/* Center: Primary Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-on-surface-variant">
          {PRIMARY_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `py-1 transition-colors whitespace-nowrap ${
                  isActive && !(item.to.includes('?') && !location.search)
                    ? 'text-primary font-semibold'
                    : 'hover:text-on-surface'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: Search + Account & Utility Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Search Input (Desktop) */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center w-48 lg:w-56">
            <div className="relative w-full">
              <Search
                size={15}
                strokeWidth={1.75}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search fans, filters..."
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface text-xs focus:outline-none focus:border-primary focus:bg-surface-container-lowest placeholder:text-outline transition-colors"
              />
            </div>
          </form>

          {/* Subtle Divider */}
          <div className="hidden md:block h-5 w-px bg-outline-variant/40" />

          {/* Admin Portal Link (Distinguishable without pill clutter) */}
          {user?.isAdmin && (
            <Link
              to="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-primary/30 text-primary hover:bg-primary/5 transition-colors text-xs font-medium whitespace-nowrap"
            >
              <SlidersHorizontal size={14} strokeWidth={1.75} />
              <span>Admin</span>
            </Link>
          )}

          {/* Facebook Link */}
          <a
            href="https://www.facebook.com/share/18kcsekqpu/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#1877F2] hover:bg-[#1877F2]/10 transition-colors text-xs font-semibold whitespace-nowrap"
            title="Fanpage Facebook FANFUN"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="hidden md:inline">Facebook</span>
          </a>

          {/* Hotline */}
          <a
            href="tel:0918074079"
            className="hidden xl:inline-flex items-center gap-1.5 px-2 py-1.5 text-on-surface-variant hover:text-primary transition-colors text-xs font-medium whitespace-nowrap"
            title="Hotline 091 8074079"
          >
            <Phone size={15} strokeWidth={1.75} className="text-primary" />
            <span>091 8074079</span>
          </a>

          {/* User Account Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              type="button"
              onClick={() => setShowUserMenu((prev) => !prev)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors text-xs font-medium"
              aria-expanded={showUserMenu}
              aria-label="Account menu"
            >
              <User size={18} strokeWidth={1.75} className="text-on-surface" />
              <span className="hidden sm:inline max-w-[110px] truncate">
                {user ? user.name : 'Account'}
              </span>
              <ChevronDown size={14} strokeWidth={1.75} className="hidden sm:inline opacity-60" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/30 py-1.5 z-50">
                {user ? (
                  <>
                    <div className="px-4 py-2.5 border-b border-outline-variant/20">
                      <div className="font-semibold text-xs text-on-surface truncate">{user.name}</div>
                      <div className="text-[11px] text-on-surface-variant truncate">{user.email}</div>
                      <span className="inline-block mt-1 text-[10px] uppercase tracking-wider text-primary font-semibold">
                        {user.tier || 'Member'}
                      </span>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-on-surface hover:bg-surface-container-low transition-colors"
                    >
                      <User size={15} strokeWidth={1.75} className="text-on-surface-variant" />
                      Personal Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-on-surface hover:bg-surface-container-low transition-colors"
                    >
                      <Package size={15} strokeWidth={1.75} className="text-on-surface-variant" />
                      My Orders
                    </Link>
                    <Link
                      to="/change-password"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-on-surface hover:bg-surface-container-low transition-colors"
                    >
                      <KeyRound size={15} strokeWidth={1.75} className="text-on-surface-variant" />
                      Change Password
                    </Link>
                    {user?.isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-primary font-medium hover:bg-surface-container-low transition-colors border-t border-outline-variant/20"
                      >
                        <LayoutDashboard size={15} strokeWidth={1.75} />
                        Admin Portal
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-error hover:bg-error-container/20 transition-colors border-t border-outline-variant/20"
                    >
                      <LogOut size={15} strokeWidth={1.75} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-primary hover:bg-surface-container-low transition-colors"
                    >
                      <LogIn size={15} strokeWidth={1.75} />
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-on-surface hover:bg-surface-container-low transition-colors"
                    >
                      <UserPlus size={15} strokeWidth={1.75} className="text-on-surface-variant" />
                      Create New Account
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Shopping Bag */}
          <Link
            to="/cart"
            className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-surface-container-low text-on-surface transition-colors"
            aria-label="Shopping Bag"
          >
            <ShoppingBag size={19} strokeWidth={1.75} />
            {totalCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-on-primary text-[10px] font-semibold flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-surface-container-low text-on-surface transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-outline-variant/25 bg-surface px-4 py-4 space-y-4">
          <form onSubmit={handleSearch} className="md:hidden">
            <div className="relative">
              <Search
                size={15}
                strokeWidth={1.75}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search smart fans, filters..."
                className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface text-xs focus:outline-none focus:border-primary"
              />
            </div>
          </form>

          <nav className="flex flex-col space-y-1">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-on-surface hover:bg-surface-container-low transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {user?.isAdmin && (
              <Link
                to="/admin"
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-primary hover:bg-surface-container-low transition-colors flex items-center gap-2"
              >
                <SlidersHorizontal size={15} strokeWidth={1.75} />
                Admin Portal
              </Link>
            )}
          </nav>

          <div className="pt-3 border-t border-outline-variant/20 flex flex-col gap-2.5 text-xs text-on-surface-variant">
            <div className="flex items-center justify-between">
              <a href="tel:0918074079" className="inline-flex items-center gap-1.5 font-medium text-primary">
                <Phone size={14} strokeWidth={1.75} />
                Hotline: 091 8074079
              </a>
              <a
                href="https://www.facebook.com/share/18kcsekqpu/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-[#1877F2]"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook FANFUN</span>
              </a>
            </div>
            <div className="text-[11px] text-on-surface-variant/80">
              Can Tho: 117 Electric Power Residential Area, Hung Phu, Cai Rang
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
