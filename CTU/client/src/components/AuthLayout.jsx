import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

/**
 * Shared split-screen layout for standalone authentication pages (Login, Register).
 */
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-surface text-on-surface">
      {/* ================= LEFT HALF: IMMERSIVE VISUAL IMAGE ================= */}
      <div className="hidden lg:relative lg:flex lg:flex-col lg:justify-between p-12 overflow-hidden bg-surface-container-highest">
        {/* Background Image */}
        <img
          src="https://res.cloudinary.com/dpfy23tda/image/upload/v1795491622/fanfun_products/ff-apex-3in1.jpg"
          alt="FANFUN Smart Living Interior"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 hover:scale-100 transition-transform duration-1000"
        />

        {/* Gradient Overlay for high readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60 pointer-events-none" />

        {/* Top Header on Image */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/" className="inline-block group">
            <BrandLogo size="md" subtitle="Smart Living" theme="dark" />
          </Link>
          <Link
            to="/"
            className="text-xs font-semibold text-white/80 hover:text-white px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all"
          >
            Return to Store
          </Link>
        </div>

        {/* Bottom Headline & Brand Proposition */}
        <div className="relative z-10 max-w-lg space-y-4 text-white">
          <div className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold uppercase tracking-widest text-primary-fixed border border-white/15">
            3-in-1 Living Microclimate
          </div>
          <h2 className="text-3xl xl:text-4xl font-extrabold tracking-tight leading-tight">
            The Art of Air in Every Living Space.
          </h2>
          <p className="text-sm text-white/85 leading-relaxed">
            Engineered with a whisper-quiet 28dB BLDC inverter motor, instant ceramic PTC heating, and medical-grade HEPA H13 negative ion purification.
          </p>
          <div className="pt-2 flex items-center gap-6 text-xs text-white/70 font-medium">
            <span>5-Year Official Motor Warranty</span>
            <span>•</span>
            <span>Free On-Site Ceiling Survey</span>
          </div>
        </div>
      </div>

      {/* ================= RIGHT HALF: AUTH FORM ================= */}
      <div className="flex flex-col justify-center items-center px-6 sm:px-12 lg:px-16 xl:px-24 py-12 bg-surface">
        <div className="w-full max-w-md space-y-7">
          {/* Mobile Top Brand & Return Link */}
          <div className="flex items-center justify-between lg:hidden pb-4 border-b border-outline-variant/20">
            <Link to="/">
              <BrandLogo size="sm" subtitle="Smart Living" />
            </Link>
            <Link to="/" className="text-xs font-semibold text-primary hover:underline">
              Return to Store
            </Link>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
