import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, UserCheck, ExternalLink } from 'lucide-react';
import BrandLogo from './BrandLogo';

const FacebookIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#241914] text-[#f5ebe0] pt-16 pb-10">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand Information */}
          <div className="sm:col-span-2 lg:col-span-4 flex flex-col gap-4 pr-0 lg:pr-6">
            <Link to="/" className="inline-block w-fit group">
              <BrandLogo size="md" subtitle="Art of Air" theme="dark" />
            </Link>
            <p className="text-xs sm:text-[13px] text-[#c9b8ab] leading-relaxed max-w-sm">
              FANFUN pioneers smart ceiling microclimate fixtures—uniting natural breeze cooling, ceramic PTC heating, and multi-season climate conditioning for modern living spaces.
            </p>
            <div className="pt-1 text-[11px] uppercase tracking-[0.12em] text-[#e6a68a] font-medium">
              5-Year Official Motor Warranty &nbsp;·&nbsp; Safety Certified
            </div>

            {/* Quick Facebook Link */}
            <div className="pt-1">
              <a
                href="https://www.facebook.com/share/18kcsekqpu/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1877F2]/20 hover:bg-[#1877F2] text-[#f9efe4] hover:text-white border border-[#1877F2]/40 transition-all font-semibold text-xs group"
                title="Facebook FANFUN"
              >
                <FacebookIcon className="w-4 h-4 text-[#1877F2] group-hover:text-white fill-current transition-colors" />
                <span>Follow on Facebook</span>
                <ExternalLink size={13} className="opacity-70 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          {/* Col 2: Services & Ecosystem */}
          <div className="lg:col-span-3 flex flex-col gap-3.5">
            <h4 className="text-xs font-semibold text-[#f9efe4] uppercase tracking-[0.12em]">
              Service Ecosystem
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-[#c9b8ab]">
              <li>
                <Link to="/products" className="hover:text-[#f9efe4] transition-colors">
                  FANFUN 3-IN-1 Series
                </Link>
              </li>
              <li>
                <Link to="/ecosystem#app" className="hover:text-[#f9efe4] transition-colors">
                  FanFun App &amp; Web (IoT)
                </Link>
              </li>
              <li>
                <Link to="/ecosystem#care" className="hover:text-[#f9efe4] transition-colors">
                  FanFun Care (5-Year Warranty)
                </Link>
              </li>
              <li>
                <Link to="/ecosystem#filter" className="hover:text-[#f9efe4] transition-colors">
                  FanFun Filter (Periodic Replacement)
                </Link>
              </li>
              <li>
                <Link to="/ecosystem#delivery" className="hover:text-[#f9efe4] transition-colors">
                  FanFun Delivery (Free Laser Survey)
                </Link>
              </li>
              <li>
                <Link to="/ecosystem#energy" className="hover:text-[#f9efe4] transition-colors">
                  FanFun Energy (Efficiency Guide)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: About FANFUN */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <h4 className="text-xs font-semibold text-[#f9efe4] uppercase tracking-[0.12em]">
              About FANFUN
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-[#c9b8ab]">
              <li>
                <Link to="/about" className="hover:text-[#f9efe4] font-medium text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/brand-story" className="hover:text-[#f9efe4] transition-colors">
                  Mission &amp; Brand Story
                </Link>
              </li>
              <li>
                <Link to="/ecosystem" className="hover:text-[#f9efe4] transition-colors">
                  Branded House Architecture
                </Link>
              </li>
              <li>
                <Link to="/culture" className="hover:text-[#f9efe4] transition-colors">
                  Culture &amp; Core Values
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-[#e6a68a] hover:text-[#f9efe4] transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Headquarters */}
          <div className="lg:col-span-3 flex flex-col gap-3.5">
            <h4 className="text-xs font-semibold text-[#f9efe4] uppercase tracking-[0.12em]">
              Contact &amp; Headquarters
            </h4>
            <div className="flex flex-col gap-3 text-xs text-[#c9b8ab] leading-relaxed">
              <a
                href="tel:0918074079"
                className="inline-flex items-center gap-2 text-[#f9efe4] font-semibold hover:text-[#e6a68a] transition-colors"
              >
                <Phone size={14} strokeWidth={1.75} className="text-[#e6a68a] flex-shrink-0" />
                <span>Hotline: 091 8074079</span>
              </a>

              <div className="flex items-center gap-2 pt-0.5">
                <UserCheck size={14} strokeWidth={1.75} className="text-[#e6a68a] flex-shrink-0" />
                <span>Admin: <strong className="text-[#f9efe4] font-semibold">Huynh Nam Phuong</strong></span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin size={14} strokeWidth={1.75} className="text-[#e6a68a] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#f9efe4] font-medium block">Can Tho Headquarters</span>
                  <span>117 Electric Power Residential Area, Hung Phu, Cai Rang, Can Tho</span>
                </div>
              </div>

              {/* Clickable Facebook button */}
              <div className="pt-1">
                <a
                  href="https://www.facebook.com/share/18kcsekqpu/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1877F2] hover:bg-[#166fe5] text-white font-medium text-xs transition-colors shadow-xs"
                >
                  <FacebookIcon className="w-3.5 h-3.5 fill-current" />
                  <span>Connect on Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a99789]">
          <div>
            © {new Date().getFullYear()} FANFUN Smart Living Co., Ltd. Admin: Huynh Nam Phuong.
          </div>
          <div className="text-center sm:text-right text-[11px]">
            117 Electric Power Residential Area, Hung Phu, Cai Rang, Can Tho &nbsp;·&nbsp; Academic Project
          </div>
        </div>
      </div>
    </footer>
  );
}
