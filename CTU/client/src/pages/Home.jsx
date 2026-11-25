import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  VolumeX,
  ShieldCheck,
  Wrench,
  Wifi,
  Wind,
  Flame,
  Sparkles,
  Phone,
  PlayCircle,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const TRUST_HIGHLIGHTS = [
  { icon: VolumeX, title: 'BLDC 28dB', subtitle: 'Ultra Silent' },
  { icon: ShieldCheck, title: '5-Yr Warranty', subtitle: 'Official Service' },
  { icon: Wrench, title: 'Free Survey', subtitle: 'Hanoi & HCMC' },
  { icon: Wifi, title: 'Wi-Fi Smart', subtitle: 'Mobile App Sync' },
];

const TECH_PILLARS = [
  {
    icon: Wind,
    step: '01',
    title: 'NatureBreeze Cooling',
    description:
      '9-speed BLDC inverter motor with biomimetic algorithms replicating gentle natural airflow. Whisper-quiet operation under 28dB for undisturbed rest.',
    metric: 'Airflow 14,200 m³/h',
  },
  {
    icon: Flame,
    step: '02',
    title: 'Ceramic PTC Heating 1500W',
    description:
      'Semiconductor PTC heating without burning oxygen, preserving natural indoor humidity. Even downward circulation warms living spaces comfortably.',
    metric: 'Instant warmth in 3 seconds',
  },
  {
    icon: Sparkles,
    step: '03',
    title: 'Multi-Stage HEPA H13 Filtration',
    description:
      'Medical-grade HEPA H13 filter capturing 99.97% of PM2.5 particulates, paired with activated carbon deodorizing and negative ion purification.',
    metric: 'Real-time AQI monitoring',
  },
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { addToCart } = useCart();
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFeaturedProducts(data.data.slice(0, 4));
        }
      })
      .catch(console.error);
  }, []);

  const handleQuickAdd = (p) => {
    addToCart(p, 1);
    setToastMsg(`Added "${p.name}" to cart.`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#241914] text-[#f5ebe0] px-4 py-3 rounded-lg shadow-lg flex items-center gap-2.5 text-xs font-medium">
          <CheckCircle2 size={16} strokeWidth={1.75} className="text-[#e6a68a] flex-shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 1. HERO SECTION */}
      <section className="w-full bg-surface-container-low py-14 lg:py-24 border-b border-outline-variant/25">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Editorial Content */}
            <div className="lg:col-span-6 flex flex-col items-start space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Next-Gen &nbsp;·&nbsp; 3-in-1 Living Microclimate
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-bold tracking-tight text-on-surface leading-[1.12]">
                FANFUN – Year-Round Comfort, Everyday Intelligence
              </h1>

              <p className="text-sm sm:text-base text-on-surface-variant max-w-xl leading-relaxed">
                Comprehensive microclimate conditioning: natural breeze cooling, gentle ceramic PTC heating, and medical-grade air purification integrated into one architectural ceiling fixture.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Link
                  to="/products"
                  className="px-6 py-3 rounded-lg bg-primary text-on-primary text-sm font-semibold hover:bg-primary-container transition-colors inline-flex items-center gap-2"
                >
                  <span>Explore Products</span>
                  <ArrowRight size={16} strokeWidth={1.75} />
                </Link>

                <a
                  href="#tech-section"
                  className="px-6 py-3 rounded-lg bg-surface-container-lowest text-on-surface text-sm font-medium hover:bg-surface-container transition-colors inline-flex items-center gap-2 border border-outline-variant/40"
                >
                  <PlayCircle size={17} strokeWidth={1.75} className="text-primary" />
                  <span>Discover 3-in-1 Tech</span>
                </a>
              </div>

              {/* Clean Trust Highlights (No Icon Boxes) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-6 border-t border-outline-variant/25 w-full">
                {TRUST_HIGHLIGHTS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-2.5">
                      <Icon size={18} strokeWidth={1.75} className="text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-on-surface leading-tight">{item.title}</div>
                        <div className="text-[11px] text-on-surface-variant mt-0.5">{item.subtitle}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] border border-outline-variant/25 bg-surface-container">
                <img
                  src="https://res.cloudinary.com/dpfy23tda/image/upload/v1795491622/fanfun_products/ff-apex-3in1.jpg"
                  alt="FANFUN 3-in-1 Living"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Subtle Microclimate Readout */}
                <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-surface/95 px-4 py-3 rounded-xl flex items-center justify-between border border-outline-variant/25">
                  <div className="flex items-center gap-3">
                    <Wind size={20} strokeWidth={1.75} className="text-primary flex-shrink-0" />
                    <div>
                      <div className="text-[11px] text-on-surface-variant">Living Room Microclimate</div>
                      <div className="text-xs sm:text-sm font-semibold text-on-surface">
                        24.5°C &nbsp;·&nbsp; <span className="text-primary">Breeze Level 3</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-emerald-800">AQI 12 · Good</div>
                    <div className="text-[10px] text-on-surface-variant mt-0.5">HEPA H13 Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE-IN-ONE TECHNOLOGY HIGHLIGHT */}
      <section id="tech-section" className="py-20 lg:py-24 bg-surface">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">
              Breakthrough Technology
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-on-surface mt-2 tracking-tight">
              All in One: Cooling, Heating &amp; Air Purification
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mt-3 leading-relaxed">
              Replace three separate floor appliances with one streamlined ceiling-mounted system, preserving open floor space and interior harmony.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            {TECH_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.step}
                  className="pt-6 border-t border-outline-variant/40 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Icon size={24} strokeWidth={1.6} className="text-primary" />
                      <span className="text-xs font-mono text-on-surface-variant/70">{pillar.step}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-on-surface mb-2.5">{pillar.title}</h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="mt-5 text-xs font-semibold text-primary">
                    {pillar.metric}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="py-20 lg:py-24 bg-surface-container-low border-y border-outline-variant/25">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">
                Featured Catalog
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mt-1.5 tracking-tight">
                Best Sellers &amp; New Arrivals
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary-container transition-colors"
            >
              <span>View All Products</span>
              <ArrowRight size={16} strokeWidth={1.75} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleQuickAdd} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. INSTALLATION & SERVICE PROMISE */}
      <section className="py-20 lg:py-24 bg-surface">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="rounded-2xl bg-[#241914] text-[#f5ebe0] p-8 sm:p-14 border border-white/10">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.14em] text-[#e6a68a] font-semibold">
                5-Star Service Guarantee
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mt-2 mb-4 text-[#f9efe4]">
                Free On-Site Survey &amp; 24-Hour Installation
              </h2>
              <p className="text-sm sm:text-base text-[#c9b8ab] leading-relaxed mb-8">
                FANFUN technicians bring laser distance meters to inspect drywall ceiling load-bearing capacity, measure optimal airflow clearances, and complete dust-free installation.
              </p>

              <div className="flex flex-wrap gap-3.5">
                <Link
                  to="/products"
                  className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm transition-colors"
                >
                  Book Free Survey Now
                </Link>
                <a
                  href="tel:19006868"
                  className="px-6 py-3 rounded-lg border border-white/25 hover:bg-white/10 text-[#f9efe4] font-medium text-sm transition-colors inline-flex items-center gap-2"
                >
                  <Phone size={15} strokeWidth={1.75} />
                  <span>Hotline 1900 6868</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
