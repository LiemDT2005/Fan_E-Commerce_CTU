import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Layers,
  Wind,
  Flame,
  Snowflake,
  Smartphone,
  ShieldCheck,
  Filter,
  Truck,
  Zap,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Cpu,
} from 'lucide-react';

const ECOSYSTEM_SERVICES = [
  {
    id: 'app',
    name: 'FanFun App / Web',
    tagline: 'Smart IoT Control & Climate Sensing',
    desc: 'Mobile Wi-Fi app allowing remote fan speed tuning, scheduling, live ambient room temperature monitoring, and automated alerts for filter cleaning or replacement.',
    icon: Smartphone,
    color: 'from-blue-500/20 to-indigo-500/10',
    iconColor: 'text-blue-600',
  },
  {
    id: 'care',
    name: 'FanFun Care',
    tagline: '5-Year Warranty & Dedicated Support',
    desc: 'Comprehensive 5-year official motor warranty, on-site technical assistance, 24/7 hotline service, and hassle-free replacements for manufacturer defects.',
    icon: ShieldCheck,
    color: 'from-amber-500/20 to-orange-500/10',
    iconColor: 'text-amber-700',
  },
  {
    id: 'filter',
    name: 'FanFun Filter',
    tagline: 'Certified Periodic Filter Replacements',
    desc: 'Medical-grade PM2.5 and activated carbon deodorizing replacement filters. Easily reorder through the mobile app or subscribe to automatic periodic delivery.',
    icon: Filter,
    color: 'from-emerald-500/20 to-teal-500/10',
    iconColor: 'text-emerald-700',
  },
  {
    id: 'delivery',
    name: 'FanFun Delivery',
    tagline: 'Rapid Delivery & Free Laser Installation',
    desc: 'Certified technicians conduct on-site ceiling laser surveys and complete dust-free, safety-checked installations free of charge in Can Tho and surrounding regions.',
    icon: Truck,
    color: 'from-purple-500/20 to-pink-500/10',
    iconColor: 'text-purple-600',
  },
  {
    id: 'energy',
    name: 'FanFun Energy',
    tagline: 'Efficiency Optimization & Power Savings',
    desc: 'Guided air circulation techniques pairing ceiling fans with air conditioning, utilizing inverter BLDC engineering to save up to 60% in household electricity consumption.',
    icon: Zap,
    color: 'from-rose-500/20 to-red-500/10',
    iconColor: 'text-rose-600',
  },
];

const BRANDED_HOUSE_REASONS = [
  {
    title: 'Brand Clarity',
    desc: 'Customers associate a single distinguished name—FANFUN—across physical fixtures, mobile software, and long-term customer service.',
  },
  {
    title: 'Reinforced Trust',
    desc: 'High engineering standards and safety certifications on core hardware directly build credibility across the entire service ecosystem.',
  },
  {
    title: 'Effortless Expansion',
    desc: 'Establishes a solid foundation for future line expansions, such as FanFun Mini, FanFun Pro, or complementary smart living devices.',
  },
  {
    title: 'Marketing Synergy',
    desc: 'Focuses communication and brand-building investments under a unified identity rather than diluting resources across fragmented sub-brands.',
  },
  {
    title: 'Holistic Ecosystem',
    desc: 'Hardware, software applications, filter supplies, and warranty assurances interact seamlessly under one standard of excellence.',
  },
];

export default function BrandArchitecture() {
  const [activeBranch, setActiveBranch] = useState('product'); // 'product' | 'services'

  return (
    <div className="bg-surface text-on-surface overflow-hidden">
      {/* 1. Header Banner */}
      <section className="relative py-20 lg:py-28 bg-surface-container-low border-b border-outline-variant/25">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-5">
              <Layers size={14} />
              Brand Architecture &amp; Ecosystem
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-on-surface leading-[1.18]">
              The Branded House Model – The Unified Power of FANFUN
            </h1>
            <p className="mt-6 text-base sm:text-lg text-on-surface-variant leading-relaxed">
              FANFUN operates as a Branded House, where the master brand anchors our flagship FANFUN 3-IN-1 appliance and a harmonious ecosystem of companion digital and field services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Interactive Animated Brand Architecture Tree Diagram */}
      <section className="py-20 max-w-[1280px] mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">
            Visual Architecture Hierarchy
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-on-surface mt-2 tracking-tight">
            FANFUN Brand Architecture
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mt-3">
            Every product and microclimate solution aligns under one respected emblem, creating lifelong value for homeowners.
          </p>
        </div>

        {/* Tree Visual Container */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 sm:p-12 shadow-sm relative overflow-hidden">
          {/* Root: Mother Brand */}
          <div className="flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-primary text-on-primary px-8 py-5 rounded-2xl shadow-md text-center max-w-md w-full border border-primary-container"
            >
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-white/80">
                MASTER BRAND
              </div>
              <div className="text-2xl sm:text-3xl font-black mt-1 tracking-wider">
                FANFUN
              </div>
              <div className="text-xs text-white/90 mt-1 font-normal">
                Comfort · Intelligence · Efficiency · Family Wellness
              </div>
            </motion.div>

            {/* Connecting Vertical Trunk */}
            <div className="w-0.5 h-12 bg-primary/40 my-2" />

            {/* Sub-Brand Branches */}
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* Branch 1: Main Product */}
              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => setActiveBranch('product')}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  activeBranch === 'product'
                    ? 'bg-primary/5 border-primary shadow-md'
                    : 'bg-surface border-outline-variant/30 hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
                  <Cpu size={16} />
                  <span>Flagship Appliance</span>
                </div>
                <h3 className="text-lg font-bold text-on-surface">FANFUN 3-IN-1</h3>
                <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                  Unified ceiling fixture integrating cooling, chilling, and semiconductor PTC ceramic heating.
                </p>

                {/* 3 Sub-capabilities */}
                <div className="mt-4 pt-3 border-t border-outline-variant/20 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-surface-container-low p-2 rounded-lg">
                    <Wind size={15} className="mx-auto text-primary mb-1" />
                    <span className="text-[11px] font-semibold block">Cooling</span>
                    <span className="text-[9px] text-on-surface-variant">BLDC Motor</span>
                  </div>
                  <div className="bg-surface-container-low p-2 rounded-lg">
                    <Snowflake size={15} className="mx-auto text-blue-600 mb-1" />
                    <span className="text-[11px] font-semibold block">Chilling</span>
                    <span className="text-[9px] text-on-surface-variant">Rapid Relief</span>
                  </div>
                  <div className="bg-surface-container-low p-2 rounded-lg">
                    <Flame size={15} className="mx-auto text-amber-600 mb-1" />
                    <span className="text-[11px] font-semibold block">PTC Heat</span>
                    <span className="text-[9px] text-on-surface-variant">Ceramic</span>
                  </div>
                </div>
              </motion.div>

              {/* Branch 2: Web & App */}
              <motion.div
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-surface border border-outline-variant/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
                    <Smartphone size={16} />
                    <span>Digital Systems</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface">FANFUN Web &amp; App</h3>
                  <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                    Voice control, wireless IoT synchronization, live ambient room metrics, and automated filter service reminders.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-outline-variant/20 text-xs text-blue-600 font-semibold flex items-center justify-between">
                  <span>Smart Experience</span>
                  <ChevronRight size={14} />
                </div>
              </motion.div>

              {/* Branch 3: Care Services */}
              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => setActiveBranch('services')}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  activeBranch === 'services'
                    ? 'bg-primary/5 border-primary shadow-md'
                    : 'bg-surface border-outline-variant/30 hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
                  <ShieldCheck size={16} />
                  <span>Support &amp; Warranty</span>
                </div>
                <h3 className="text-lg font-bold text-on-surface">FANFUN CARE</h3>
                <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                  5-year official motor warranty, certified authentic replacement components, and prompt nationwide technician visits.
                </p>
                <div className="mt-4 pt-3 border-t border-outline-variant/20 text-xs text-amber-700 font-semibold flex items-center justify-between">
                  <span>Quality Assurance</span>
                  <ChevronRight size={14} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deep Dive: 5 Services in the FanFun Ecosystem */}
      <section className="py-20 bg-surface-container-low border-y border-outline-variant/25">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">
              Integrated Lifecycle
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-on-surface mt-2 tracking-tight">
              Synchronized Services Under the FANFUN Banner
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mt-3">
              Beyond engineering premium appliances, we accompany clients throughout their entire ownership lifecycle with dedicated services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ECOSYSTEM_SERVICES.map((srv) => {
              const Icon = srv.icon;
              return (
                <motion.div
                  key={srv.id}
                  id={srv.id}
                  whileHover={{ y: -6 }}
                  className="p-7 rounded-3xl bg-surface border border-outline-variant/30 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center mb-5">
                      <Icon className={srv.iconColor} size={24} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                      {srv.tagline}
                    </span>
                    <h3 className="text-lg font-bold text-on-surface mt-1 mb-2.5">
                      {srv.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center text-xs font-semibold text-primary gap-1">
                    <CheckCircle2 size={14} />
                    <span>100% FANFUN Certified Standard</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Why Choose the Branded House Strategy? */}
      <section className="py-20 max-w-[1280px] mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">
            Brand Strategy
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mt-2 tracking-tight">
            Why FANFUN Chose the Branded House Model
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mt-3">
            By focusing on an outstanding core product and directly supporting services, maintaining a single brand identity yields distinct strategic advantages.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANDED_HOUSE_REASONS.map((reason, idx) => (
            <div
              key={reason.title}
              className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30"
            >
              <div className="text-3xl font-black font-mono text-primary/40 mb-3">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-on-surface mb-2">{reason.title}</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Navigation Bar */}
      <section className="py-16 bg-[#241914] text-[#f5ebe0]">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f9efe4]">
            Experience the Intelligent FANFUN Ecosystem Today
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/products"
              className="px-6 py-3 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container transition-colors inline-flex items-center gap-2"
            >
              <span>Explore 3-in-1 Lineup</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/brand-story"
              className="px-6 py-3 rounded-xl border border-white/25 hover:bg-white/10 text-[#f9efe4] text-sm font-medium transition-colors"
            >
              Brand Story &amp; Purpose
            </Link>
            <Link
              to="/culture"
              className="px-6 py-3 rounded-xl border border-white/25 hover:bg-white/10 text-[#f9efe4] text-sm font-medium transition-colors"
            >
              Corporate Culture &amp; Values
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}