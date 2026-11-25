import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';
import BrandLogo from './BrandLogo';

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
              FANFUN pioneers smart ceiling fans and integrated microclimate systems—uniting natural breeze cooling, ceramic PTC heating, and medical-grade HEPA H13 air purification for contemporary living spaces.
            </p>
            <div className="pt-1 text-[11px] uppercase tracking-[0.12em] text-[#e6a68a] font-medium">
              5-Year Official Motor Warranty &nbsp;·&nbsp; IEC 60335 Certified
            </div>
          </div>

          {/* Col 2: Products & Technology */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <h4 className="text-xs font-semibold text-[#f9efe4] uppercase tracking-[0.12em]">
              Products &amp; Tech
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#c9b8ab]">
              <li>
                <Link to="/products" className="hover:text-[#f9efe4] transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=smart-ceiling-fan" className="hover:text-[#f9efe4] transition-colors">
                  3-in-1 Technology
                </Link>
              </li>
              <li>
                <Link to="/#tech-section" className="hover:text-[#f9efe4] transition-colors">
                  Product Features
                </Link>
              </li>
              <li>
                <Link to="/products?category=services" className="hover:text-[#f9efe4] transition-colors">
                  Installation Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Support */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <h4 className="text-xs font-semibold text-[#f9efe4] uppercase tracking-[0.12em]">
              Customer Support
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#c9b8ab]">
              <li>
                <a href="tel:19006868" className="hover:text-[#f9efe4] transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#f9efe4] transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-[#f9efe4] transition-colors">
                  Warranty Policy
                </Link>
              </li>
              <li>
                <Link to="/products?category=services" className="hover:text-[#f9efe4] transition-colors">
                  Installation Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Company & Legal */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <h4 className="text-xs font-semibold text-[#f9efe4] uppercase tracking-[0.12em]">
              Company &amp; Legal
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#c9b8ab]">
              <li>
                <Link to="/" className="hover:text-[#f9efe4] transition-colors">
                  About FANFUN
                </Link>
              </li>
              <li>
                <a href="#privacy" className="hover:text-[#f9efe4] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-[#f9efe4] transition-colors">
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <Link to="/admin" className="text-[#e6a68a] hover:text-[#f9efe4] transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Information */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <h4 className="text-xs font-semibold text-[#f9efe4] uppercase tracking-[0.12em]">
              Contact
            </h4>
            <div className="flex flex-col gap-3 text-xs text-[#c9b8ab] leading-relaxed">
              <a
                href="tel:19006868"
                className="inline-flex items-center gap-2 text-[#f9efe4] font-semibold hover:text-[#e6a68a] transition-colors"
              >
                <Phone size={14} strokeWidth={1.75} className="text-[#e6a68a] flex-shrink-0" />
                <span>Hotline: 1900 6868</span>
              </a>

              <div className="flex items-start gap-2">
                <MapPin size={14} strokeWidth={1.75} className="text-[#e6a68a] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#f9efe4] font-medium block">Hanoi</span>
                  <span>Level 2, Vincom Center Metropolis, 29 Lieu Giai, Ba Dinh</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin size={14} strokeWidth={1.75} className="text-[#e6a68a] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#f9efe4] font-medium block">Ho Chi Minh City</span>
                  <span>188 Nguyen Van Troi, Ward 8, Phu Nhuan District</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a99789]">
          <div>
            © {new Date().getFullYear()} FANFUN Smart Living Co., Ltd. All rights reserved.
          </div>
          <div className="text-center sm:text-right text-[11px]">
            Đây là dự án học tập; việc này không tự động miễn trừ các nghĩa vụ pháp lý hoặc thuế (nếu có).
          </div>
        </div>
      </div>
    </footer>
  );
}
