import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  VolumeX,
  ShieldCheck,
  Wrench,
  Wifi,
  Wind,
  Flame,
  Snowflake,
  Sparkles,
  Phone,
  Compass,
  Smartphone,
  Truck,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const TRUST_HIGHLIGHTS = [
  { icon: VolumeX, title: 'BLDC < 28dB', subtitle: 'Ultra Silent' },
  { icon: ShieldCheck, title: '5-Year Warranty', subtitle: 'Official Motor Care' },
  { icon: Wrench, title: 'Free Survey', subtitle: 'Laser Measurement' },
  { icon: Wifi, title: 'Smart IoT', subtitle: 'Mobile App Sync' },
];

const MODES = {
  cooling: {
    id: 'cooling',
    title: 'Natural Breeze Cooling',
    subtitle: 'Whisper-quiet 5-blade aerodynamic BLDC motor replicating organic airflow',
    temp: '24.5°C',
    airflow: 'Breeze Level 3 · 14,200 m³/h',
    badge: 'BLDC Inverter Energy Saver',
    glowColor: 'from-emerald-500/15 via-teal-500/10 to-transparent',
    accentColor: 'text-emerald-700',
    icon: Wind,
  },
  heating: {
    id: 'heating',
    title: 'Ceramic PTC Heating',
    subtitle: 'Warmth in 3 seconds without burning oxygen, preserving natural humidity',
    temp: '27.0°C',
    airflow: 'PTC 1500W · Downward Circulation',
    badge: 'PTC Semiconductor Comfort',
    glowColor: 'from-amber-500/20 via-orange-500/10 to-transparent',
    accentColor: 'text-amber-700',
    icon: Flame,
  },
  chilling: {
    id: 'chilling',
    title: 'Gentle Chilling & Clean Air',
    subtitle: 'Rapid thermal reduction with convection circulation and microclimate air filtration',
    temp: '22.0°C',
    airflow: 'Chilling Boost · Ion Purification',
    badge: 'Microclimate Convection',
    glowColor: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    accentColor: 'text-blue-700',
    icon: Snowflake,
  },
};

const TECH_PILLARS = [
  {
    icon: Wind,
    step: '01',
    title: 'NatureBreeze Natural Cooling',
    description:
      '9-speed BLDC inverter motor operating under 28dB. Precision aerodynamic blades simulate gentle organic winds, preventing stiffness or fatigue during sleep.',
    metric: 'Airflow 14,200 m³/h',
  },
  {
    icon: Flame,
    step: '02',
    title: 'Ceramic PTC Heating 1500W',
    description:
      'High-grade semiconductor ceramic PTC elements deliver instant warmth in 3 seconds. Zero glare, zero oxygen consumption, preserving comfortable room moisture.',
    metric: 'Instant warmth in 3 seconds',
  },
  {
    icon: Sparkles,
    step: '03',
    title: 'Chilling & HEPA Air Filtration',
    description:
      'Accelerates room cooling via aerodynamic downward convection paired with a HEPA H13 filter capturing 99.97% of PM2.5 particulates, allergens, and odors.',
    metric: 'Real-time AQI sensing',
  },
];

const ECOSYSTEM_PREVIEWS = [
  {
    name: 'FANFUN 3-IN-1',
    tag: 'Core Product',
    desc: 'Versatile ceiling microclimate fixture combining cooling, chilling, and heating for modern living.',
    icon: Wind,
    link: '/products',
  },
  {
    name: 'FanFun App / Web',
    tag: 'IoT Connectivity',
    desc: 'Voice control, real-time ambient temperature sensing, and automated filter replacement alerts.',
    icon: Smartphone,
    link: '/ecosystem#app',
  },
  {
    name: 'FanFun Care',
    tag: 'Customer Service',
    desc: 'Official 5-year motor warranty, dedicated nationwide on-site technical support, and 24/7 hotline.',
    icon: ShieldCheck,
    link: '/ecosystem#care',
  },
  {
    name: 'FanFun Delivery',
    tag: 'White-Glove Setup',
    desc: 'Ceiling laser surveys and certified clean dust-free installation across Can Tho and surrounding areas.',
    icon: Truck,
    link: '/ecosystem#delivery',
  },
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { addToCart } = useCart();
  const [toastMsg, setToastMsg] = useState('');
  const [activeMode, setActiveMode] = useState('cooling');

  const currentMode = MODES[activeMode];
  const ModeIcon = currentMode.icon;

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
    <div className="flex flex-col w-full overflow-hidden">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#241914] text-[#f5ebe0] px-4 py-3 rounded-lg shadow-lg flex items-center gap-2.5 text-xs font-medium border border-white/10">
          <CheckCircle2 size={16} strokeWidth={1.75} className="text-[#e6a68a] flex-shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 1. HERO SECTION WITH DYNAMIC 3-IN-1 MODE CONTROLLER */}
      <section className="relative w-full bg-surface-container-low py-14 lg:py-24 border-b border-outline-variant/25 overflow-hidden">
        {/* Dynamic Animated Ambient Glow based on activeMode */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 bg-gradient-to-tr ${currentMode.glowColor} pointer-events-none`}
          />
        </AnimatePresence>

        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Editorial Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 flex flex-col items-start space-y-6"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-[0.14em]">
                <Sparkles size={13} />
                Smart 3-in-1 Living Microclimate
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-bold tracking-tight text-on-surface leading-[1.12]">
                FANFUN – Year-Round Comfort, Everyday Intelligence
              </h1>

              <p className="text-sm sm:text-base text-on-surface-variant max-w-xl leading-relaxed">
                Breakthrough microclimate engineering: effortlessly switch between <strong className="text-on-surface font-semibold">natural breeze cooling</strong>, <strong className="text-on-surface font-semibold">ceramic PTC warmth</strong>, and <strong className="text-on-surface font-semibold">gentle chilling</strong> inside one sculptural ceiling fixture.
              </p>

              {/* Mode Switcher Buttons */}
              <div className="w-full space-y-2 pt-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                  Interactive Microclimate Modes:
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveMode('cooling')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                      activeMode === 'cooling'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface border border-outline-variant/40 text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <Wind size={15} />
                    <span>Cooling</span>
                  </button>

                  <button
                    onClick={() => setActiveMode('heating')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                      activeMode === 'heating'
                        ? 'bg-amber-600 text-white'
                        : 'bg-surface border border-outline-variant/40 text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <Flame size={15} />
                    <span>PTC Heating</span>
                  </button>

                  <button
                    onClick={() => setActiveMode('chilling')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                      activeMode === 'chilling'
                        ? 'bg-blue-600 text-white'
                        : 'bg-surface border border-outline-variant/40 text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <Snowflake size={15} />
                    <span>Chilling</span>
                  </button>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to="/products"
                  className="px-6 py-3.5 rounded-xl bg-primary text-on-primary text-sm font-semibold hover:bg-primary-container transition-all inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Explore FANFUN Series</span>
                  <ArrowRight size={16} strokeWidth={1.75} />
                </Link>

                <Link
                  to="/about"
                  className="px-6 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface text-sm font-medium hover:bg-surface-container transition-all inline-flex items-center gap-2 border border-outline-variant/40 shadow-sm"
                >
                  <Compass size={16} className="text-primary" />
                  <span>Mission &amp; About Us</span>
                </Link>
              </div>

              {/* Trust Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-outline-variant/25 w-full">
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
            </motion.div>

            {/* Right Visual Image & Live Microclimate Status */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] border border-outline-variant/30 bg-surface-container shadow-xl">
                <img
                  src="https://res.cloudinary.com/dpfy23tda/image/upload/v1795491622/fanfun_products/ff-apex-3in1.jpg"
                  alt="FANFUN 3-in-1 Living Microclimate"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Dynamic Floating Microclimate Readout */}
                <motion.div
                  key={activeMode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-surface/90 px-4 py-3.5 rounded-xl flex items-center justify-between border border-outline-variant/25 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <ModeIcon size={20} strokeWidth={1.75} className="text-primary animate-pulse-subtle" />
                    </div>
                    <div>
                      <div className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                        {currentMode.badge}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-on-surface">
                        Temperature {currentMode.temp} &nbsp;·&nbsp;{' '}
                        <span className="text-primary">{currentMode.airflow}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold text-emerald-800 flex items-center justify-end gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>AQI 12 · Good</span>
                    </div>
                    <div className="text-[10px] text-on-surface-variant mt-0.5">
                      HEPA H13 Active
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. MISSION & VISION SPOTLIGHT (From landing.txt) */}
      <section className="py-20 bg-surface-container border-b border-outline-variant/25">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="rounded-3xl bg-[#241914] text-[#f5ebe0] p-8 sm:p-14 border border-white/10 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs uppercase tracking-[0.14em] text-[#e6a68a] font-bold">
                  Core Mission &amp; Purpose
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold text-[#f9efe4] tracking-tight">
                  &ldquo;One Fixture – Every Season – Every Living Space&rdquo;
                </h2>
                <blockquote className="text-sm sm:text-base text-[#c9b8ab] leading-relaxed italic border-l-2 border-[#e6a68a] pl-4 py-1">
                  &ldquo;To deliver complete, effortless comfort to every household through versatile smart ceiling fixtures—seamlessly transforming between heater, cooler, and natural breeze circulator so that every moment at home is perfectly conditioned.&rdquo;
                </blockquote>
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <Link
                    to="/brand-story"
                    className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Read Brand Story</span>
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    to="/culture"
                    className="px-5 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-xs text-[#f9efe4] font-medium transition-colors"
                  >
                    Culture &amp; 5 Core Values
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <span className="text-[11px] uppercase tracking-wider text-[#e6a68a] font-bold block">
                  Vision 2030
                </span>
                <p className="text-xs text-[#c9b8ab] leading-relaxed">
                  To become the leading international brand in multi-functional smart home climate appliances, defining standards of sustainable, energy-efficient comfort for global households 365 days a year.
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#f9efe4]">
                  <span>Quality Standard</span>
                  <span className="text-[#e6a68a] font-semibold">100% Inspected Components</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE-IN-ONE TECHNOLOGY HIGHLIGHT */}
      <section id="tech-section" className="py-20 lg:py-24 bg-surface">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">
              Breakthrough Engineering
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-on-surface mt-2 tracking-tight">
              All in One: Cooling, Ceramic Heating &amp; Clean Air
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mt-3 leading-relaxed">
              Replace three cumbersome floor appliances with one sculptural ceiling fixture, reclaiming valuable living area while safeguarding family respiratory health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TECH_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.step}
                  className="p-7 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-primary">
                        <Icon size={24} strokeWidth={1.75} />
                      </div>
                      <span className="text-xs font-mono font-bold text-on-surface-variant/70">
                        {pillar.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-on-surface mb-2.5">{pillar.title}</h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-outline-variant/20 text-xs font-semibold text-primary">
                    {pillar.metric}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. BRANDED HOUSE & ECOSYSTEM PREVIEWS */}
      <section className="py-20 bg-surface-container-low border-y border-outline-variant/25">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">
                Branded House Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mt-1.5 tracking-tight">
                The Unified FANFUN Ecosystem
              </h2>
            </div>
            <Link
              to="/ecosystem"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary-container transition-colors"
            >
              <span>Explore Full Architecture</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ECOSYSTEM_PREVIEWS.map((eco) => {
              const Icon = eco.icon;
              return (
                <Link
                  key={eco.name}
                  to={eco.link}
                  className="p-6 rounded-xl bg-surface border border-outline-variant/30 hover:border-primary/50 transition-all hover:-translate-y-1 block shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {eco.tag}
                  </span>
                  <h4 className="text-base font-bold text-on-surface mt-1 mb-2">{eco.name}</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{eco.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS */}
      <section className="py-20 lg:py-24 bg-surface">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">
                Featured Catalog
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mt-1.5 tracking-tight">
                Best Sellers &amp; Official Accessories
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

      {/* 6. INSTALLATION & SERVICE PROMISE BANNER */}
      <section className="py-20 bg-surface-container border-t border-outline-variant/25">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="rounded-3xl bg-[#241914] text-[#f5ebe0] p-8 sm:p-14 border border-white/10">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.14em] text-[#e6a68a] font-semibold">
                5-Star Service Guarantee · FanFun Care
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mt-2 mb-4 text-[#f9efe4]">
                Complimentary Ceiling Laser Survey &amp; 24-Hour Installation
              </h2>
              <p className="text-sm sm:text-base text-[#c9b8ab] leading-relaxed mb-4">
                FANFUN technicians bring precision laser meters to assess drywall and concrete load capacity, calculate optimal aerodynamic clearances, and perform dust-free installation in Can Tho (117 Electric Power Residential Area, Hung Phu, Cai Rang) and nationwide.
              </p>
              <div className="text-xs text-[#e6a68a] mb-8 font-medium">
                Administrator: <strong className="text-[#f9efe4]">Huynh Nam Phuong</strong> &nbsp;·&nbsp; 24/7 Hotline: <strong className="text-[#f9efe4]">091 8074079</strong>
              </div>

              <div className="flex flex-wrap gap-3.5 items-center">
                <Link
                  to="/products"
                  className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm transition-colors"
                >
                  Book Free Survey
                </Link>
                <a
                  href="tel:0918074079"
                  className="px-6 py-3.5 rounded-xl border border-white/25 hover:bg-white/10 text-[#f9efe4] font-medium text-sm transition-colors inline-flex items-center gap-2"
                >
                  <Phone size={15} strokeWidth={1.75} />
                  <span>Call Hotline 091 8074079</span>
                </a>
                <a
                  href="https://www.facebook.com/share/18kcsekqpu/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-semibold text-sm transition-all inline-flex items-center gap-2 shadow-md cursor-pointer"
                  title="Visit FANFUN on Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook Fanpage</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}