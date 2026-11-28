import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Wind,
  Flame,
  Snowflake,
  ShieldCheck,
  Compass,
  HeartHandshake,
  Lightbulb,
  Users,
  CheckCircle2,
  ArrowRight,
  Phone,
  Layers,
  Cpu,
  Smartphone,
  Filter,
  Truck,
  Zap,
  MapPin,
  Smile,
  Leaf,
  ChevronRight,
  Quote,
} from 'lucide-react';

const CORE_VALUES = [
  {
    name: 'Honesty',
    slogan: 'Say what is true, do what is right, keep promises',
    desc: 'FANFUN does not inflate specifications or hide flaws, proactively notifying customers before issues arise.',
    icon: Compass,
    color: 'border-amber-500/40 bg-amber-500/5',
  },
  {
    name: 'Dedication',
    slogan: 'Listen genuinely, resolve promptly',
    desc: 'Every engineering decision stems from real customer needs, resolving feedback with agility and care.',
    icon: HeartHandshake,
    color: 'border-rose-500/40 bg-rose-500/5',
  },
  {
    name: 'Safety',
    slogan: 'Never compromise safety for cost',
    desc: 'Uncertified parts never leave our factory floor; any team member has the authority to halt production for safety.',
    icon: ShieldCheck,
    color: 'border-emerald-500/40 bg-emerald-500/5',
  },
  {
    name: 'Innovation',
    slogan: 'Dare to pioneer new solutions',
    desc: 'Encouraging relentless learning and bold experimentation to craft smarter, energy-efficient microclimates.',
    icon: Lightbulb,
    color: 'border-blue-500/40 bg-blue-500/5',
  },
  {
    name: 'Responsibility',
    slogan: 'United as one team for society & environment',
    desc: 'Owning our commitments, operating as one united team with deep environmental stewardship.',
    icon: Users,
    color: 'border-purple-500/40 bg-purple-500/5',
  },
];

const BRAND_PERSONALITIES = [
  {
    title: 'Smart',
    desc: 'Voice integration, mobile IoT app sync, automated climate sensing, and smart maintenance reminders.',
    icon: Cpu,
  },
  {
    title: 'Caring',
    desc: 'Active HEPA PM2.5 particulate filtration, odor neutralization, and attentive lifelong after-sales care.',
    icon: HeartHandshake,
  },
  {
    title: 'Modern',
    desc: 'Sculptural Scandinavian minimalism, whisper-quiet inverter BLDC motor, and ceramic PTC warmth.',
    icon: Sparkles,
  },
  {
    title: 'Reliable',
    desc: 'Flame-retardant structural metals, 5-year official motor warranty, and prompt replacement policies.',
    icon: ShieldCheck,
  },
  {
    title: 'Friendly',
    desc: 'Intuitive interface for all generations, thoughtful consultation, and complimentary white-glove installation.',
    icon: Smile,
  },
  {
    title: 'Responsible',
    desc: 'Eco-conscious energy savings up to 60%, sustainable filter replacement cycles, and low carbon footprint.',
    icon: Leaf,
  },
];

export default function About() {
  const [activeStoryMode, setActiveStoryMode] = useState('cooling'); // 'cooling' | 'heating' | 'chilling'

  return (
    <div className="bg-surface text-on-surface overflow-hidden">
      {/* 1. Hero Banner with Animated Ambient Glow */}
      <section className="relative py-20 lg:py-28 border-b border-outline-variant/25 bg-surface-container-low overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-1/4 w-[450px] h-[450px] rounded-full bg-primary/10 blur-[100px] animate-pulse-subtle" />
          <div className="absolute -bottom-20 left-10 w-[350px] h-[350px] rounded-full bg-amber-500/10 blur-[80px]" />
        </div>

        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-5">
              <Sparkles size={14} />
              About FANFUN Smart Living
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-on-surface leading-[1.14]">
              One Fixture · Every Season · Every Living Space
            </h1>

            <p className="mt-6 text-base sm:text-lg text-on-surface-variant leading-relaxed">
              FANFUN was born from a singular conviction: comfort should never be confined to just one season. By unifying natural breeze cooling, gentle chilling, and semiconductor ceramic PTC heating into an architectural ceiling statement, we deliver balanced domestic comfort 365 days a year.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-sm font-semibold transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <span>Explore Products</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href="tel:0918074079"
                className="px-6 py-3.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/40 text-on-surface text-sm font-medium transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <Phone size={15} className="text-primary" />
                <span>Hotline 091 8074079</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Mission & Vision Highlighting Section */}
      <section className="py-20 max-w-[1280px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-10 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs uppercase tracking-[0.14em] text-primary font-bold">
                  Mission
                </span>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Compass size={24} />
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-4">
                Effortless Comfort for Every Family
              </h2>
              <blockquote className="text-sm sm:text-base text-on-surface-variant leading-relaxed italic border-l-4 border-primary pl-4 py-1">
                &ldquo;To deliver complete comfort to every home with versatile smart ceiling fixtures—seamlessly transforming between heater, cooler, and breeze circulator so that every moment at home is effortlessly soothing.&rdquo;
              </blockquote>
            </div>
            <div className="mt-8 pt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
              <span>Goal: Every contemporary residence</span>
              <CheckCircle2 size={16} className="text-primary" />
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-10 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs uppercase tracking-[0.14em] text-amber-700 font-bold">
                  Vision
                </span>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
                  <Sparkles size={24} />
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-4">
                Pioneering Smart Multi-Functional Living
              </h2>
              <blockquote className="text-sm sm:text-base text-on-surface-variant leading-relaxed italic border-l-4 border-amber-600 pl-4 py-1">
                &ldquo;To become the benchmark brand in versatile smart climate appliances, crafting standards of convenient, energy-efficient living and delivering complete comfort 365 days a year for consumers worldwide.&rdquo;
              </blockquote>
            </div>
            <div className="mt-8 pt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
              <span>Commitment: Sustainable Global Standards</span>
              <CheckCircle2 size={16} className="text-amber-600" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Brand Story & Interactive 3-Season Solution */}
      <section className="py-20 bg-surface-container-low border-y border-outline-variant/25">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 space-y-6"
            >
              <span className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">
                Brand Story
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-on-surface tracking-tight">
                FANFUN – One Fixture, Multiple Microclimate Solutions
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                Modern weather is increasingly unpredictable, making indoor comfort paramount. Sweltering days require soothing cooling; cold snaps call for gentle, skin-friendly warmth without drying out the air; urban pollution demands continuous air purification.
              </p>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                Instead of burdening studios, apartments, and modern family residences with three separate clunky appliances, FANFUN unites cooling, chilling, and heating into one architectural fixture.
              </p>

              {/* Mode Switcher Buttons */}
              <div className="pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">
                  Select a mode to explore the engineering:
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => setActiveStoryMode('cooling')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                      activeStoryMode === 'cooling'
                        ? 'bg-primary text-on-primary shadow-sm scale-105'
                        : 'bg-surface border border-outline-variant/40 text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <Wind size={15} />
                    <span>Natural Cooling (BLDC)</span>
                  </button>

                  <button
                    onClick={() => setActiveStoryMode('heating')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                      activeStoryMode === 'heating'
                        ? 'bg-amber-600 text-white shadow-sm scale-105'
                        : 'bg-surface border border-outline-variant/40 text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <Flame size={15} />
                    <span>PTC Ceramic Heating</span>
                  </button>

                  <button
                    onClick={() => setActiveStoryMode('chilling')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                      activeStoryMode === 'chilling'
                        ? 'bg-blue-600 text-white shadow-sm scale-105'
                        : 'bg-surface border border-outline-variant/40 text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <Snowflake size={15} />
                    <span>Gentle Chilling</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Mode Details Box */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStoryMode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-5 rounded-2xl bg-surface border border-outline-variant/30 text-xs sm:text-sm text-on-surface-variant leading-relaxed"
                >
                  {activeStoryMode === 'cooling' && (
                    <div>
                      <strong className="text-primary block text-sm mb-1">
                        Natural Breeze Cooling (BLDC Inverter):
                      </strong>
                      5-blade aerodynamic architecture paired with whisper-quiet BLDC motor under 28dB, replicating organic wind dynamics to protect sleep quality for seniors and infants.
                    </div>
                  )}
                  {activeStoryMode === 'heating' && (
                    <div>
                      <strong className="text-amber-700 block text-sm mb-1">
                        PTC Ceramic Heating:
                      </strong>
                      Semiconductor ceramic PTC warms the room in 3 seconds without consuming oxygen or drying skin, maintaining balanced natural indoor humidity.
                    </div>
                  )}
                  {activeStoryMode === 'chilling' && (
                    <div>
                      <strong className="text-blue-600 block text-sm mb-1">
                        Gentle Chilling &amp; Convection:
                      </strong>
                      Accelerates thermal relief when paired with downward air circulation and HEPA microclimate filtration, dispelling humidity and stagnant indoor air.
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div>
                <Link
                  to="/brand-story"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary-container transition-colors"
                >
                  <span>Read the complete brand story</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>

            {/* Visual Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-6"
            >
              <div className="relative rounded-3xl overflow-hidden border border-outline-variant/30 bg-surface shadow-xl">
                <img
                  src="https://res.cloudinary.com/dpfy23tda/image/upload/v1795491622/fanfun_products/ff-apex-3in1.jpg"
                  alt="FanFun 3-in-1 Living"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider inline-block">
                    One Fixture – 3 Modalities
                  </span>
                  <h3 className="text-xl font-bold">
                    Reclaims Floor Space · Minimalist Aesthetics · Energy Efficient
                  </h3>
                  <p className="text-xs text-white/80">
                    Perfect for open living halls, master bedrooms, modern condos, and urban studios.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Brand Architecture (Branded House) Section */}
      <section className="py-20 max-w-[1280px] mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">
            Brand Architecture
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-on-surface mt-2 tracking-tight">
            The Branded House Architecture
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mt-3 leading-relaxed">
            FANFUN serves as the master brand, encompassing the flagship FANFUN 3-IN-1 appliance and a unified ecosystem of supporting digital and field services.
          </p>
        </div>

        {/* Tree Diagram Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm mb-12">
          {/* Root Level */}
          <div className="flex flex-col items-center">
            <div className="bg-[#241914] text-[#f5ebe0] px-8 py-5 rounded-2xl shadow-md text-center max-w-md w-full border border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e6a68a] block">
                MASTER BRAND
              </span>
              <span className="text-2xl sm:text-3xl font-black tracking-wider block mt-0.5">
                FANFUN
              </span>
              <span className="text-xs text-[#c9b8ab] mt-1 block">
                Convenience · Intelligence · Efficiency · Family Wellness
              </span>
            </div>

            {/* Tree Branch Line */}
            <div className="w-0.5 h-10 bg-primary/40 my-2" />

            {/* 3 Pillars */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* Product */}
              <div className="p-6 rounded-2xl bg-surface-container-low border border-primary/30">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary block mb-1">
                  Core Product
                </span>
                <h4 className="text-base font-bold text-on-surface">FANFUN 3-IN-1</h4>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-surface border border-outline-variant/20">
                    <Wind size={14} className="mx-auto text-primary mb-1" />
                    <span>Cooling</span>
                  </div>
                  <div className="p-2 rounded-lg bg-surface border border-outline-variant/20">
                    <Snowflake size={14} className="mx-auto text-blue-600 mb-1" />
                    <span>Chilling</span>
                  </div>
                  <div className="p-2 rounded-lg bg-surface border border-outline-variant/20">
                    <Flame size={14} className="mx-auto text-amber-600 mb-1" />
                    <span>PTC Heat</span>
                  </div>
                </div>
              </div>

              {/* Digital Platform */}
              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block mb-1">
                  Digital Platforms
                </span>
                <h4 className="text-base font-bold text-on-surface">FANFUN WEB &amp; APP</h4>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                  Wi-Fi remote controls, schedule automation, real-time AQI sensing, and smart filter maintenance notifications.
                </p>
              </div>

              {/* After-sales */}
              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                  Care &amp; Support
                </span>
                <h4 className="text-base font-bold text-on-surface">FANFUN CARE</h4>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                  Official 5-year motor warranty, certified authentic replacement components, and nationwide service technicians.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Reasons to Choose Branded House */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { title: 'Brand Clarity', desc: 'Consumers recall a single distinguished brand name across products and services.' },
            { title: 'Reinforced Trust', desc: 'Appliance durability naturally reinforces confidence in the entire service suite.' },
            { title: 'Seamless Expansion', desc: 'Enables future product family extensions like FanFun Mini or FanFun Pro.' },
            { title: 'Marketing Synergy', desc: 'Centralizes communication investments under one unified brand identity.' },
            { title: 'Holistic Ecosystem', desc: 'Hardware, mobile apps, and service guarantees align under one standard.' },
          ].map((item, idx) => (
            <div
              key={item.title}
              className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 text-center"
            >
              <div className="text-xs font-mono font-bold text-primary mb-1">0{idx + 1}</div>
              <h5 className="text-sm font-bold text-on-surface mb-1.5">{item.title}</h5>
              <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/ecosystem"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:text-primary-container transition-colors"
          >
            <span>Explore all services in the FANFUN Ecosystem</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* 5. Core Values */}
      <section className="py-20 bg-surface-container-low border-y border-outline-variant/25">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">
              Core Values
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-on-surface mt-2 tracking-tight">
              5 Uncompromising Commitments
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mt-3 leading-relaxed">
              Every unit produced and every service rendered rests upon these five enduring pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.name}
                  whileHover={{ y: -4 }}
                  className={`p-7 rounded-3xl border shadow-sm flex flex-col justify-between ${val.color}`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center mb-5 shadow-xs">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      {val.name}
                    </span>
                    <h3 className="text-lg font-bold text-on-surface mt-1 mb-2">
                      {val.slogan}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center gap-1.5 text-xs text-primary font-semibold">
                    <CheckCircle2 size={15} />
                    <span>FANFUN Standard Guaranteed</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Brand Personality */}
      <section className="py-20 max-w-[1280px] mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">
            Brand Personality
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-on-surface mt-2 tracking-tight">
            Characterized by Intelligence &amp; Care
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mt-3 leading-relaxed">
            FANFUN connects with families through six human-centered, modern traits that prioritize everyday wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRAND_PERSONALITIES.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface">{p.title}</h4>
                  <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Brand Culture & Code of Conduct */}
      <section className="py-20 bg-surface-container border-t border-outline-variant/25">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="rounded-3xl bg-[#241914] text-[#f5ebe0] p-8 sm:p-14 border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs uppercase tracking-[0.14em] text-[#e6a68a] font-bold">
                  Brand Culture
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold text-[#f9efe4] tracking-tight">
                  &ldquo;One Fixture – Every Season – Every Living Space&rdquo;
                </h2>
                <p className="text-sm text-[#c9b8ab] leading-relaxed">
                  We believe technology only creates true value when it makes daily life simpler, more comfortable, and peaceful. We do not merely sell ceiling fans; we provide a balanced microclimate so you always feel at home.
                </p>

                <div className="pt-2">
                  <span className="text-xs font-semibold text-[#f9efe4] block mb-2 uppercase tracking-wider">
                    Staff Code of Conduct:
                  </span>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-[#e6a68a] leading-relaxed">
                    &ldquo;Know the Product · Know the Customer · Always Honest · Always Safe · Always Innovating · Always Responsible.&rdquo;
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    to="/culture"
                    className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm transition-colors inline-flex items-center gap-2"
                  >
                    <span>Read Corporate Culture</span>
                    <ArrowRight size={15} />
                  </Link>
                  <a
                    href="tel:0918074079"
                    className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 text-[#f9efe4] font-medium text-sm transition-colors inline-flex items-center gap-2"
                  >
                    <Phone size={15} />
                    <span>Hotline 091 8074079</span>
                  </a>
                </div>
              </div>

              {/* Showroom & Headquarters Hubs */}
              <div className="lg:col-span-5 space-y-4 text-xs text-[#c9b8ab] border-t lg:border-t-0 lg:border-l border-white/15 pt-6 lg:pt-0 lg:pl-8">
                <span className="text-xs uppercase tracking-[0.14em] text-[#e6a68a] font-semibold block">
                  Headquarters &amp; Experience Showroom
                </span>

                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#e6a68a] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#f9efe4] font-semibold block text-sm mb-0.5">Can Tho Headquarters</span>
                    <span className="leading-relaxed">117 Electric Power Residential Area, Hung Phu, Cai Rang, Can Tho</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-[#f9efe4] font-medium text-xs">
                    Administrator: <strong className="text-[#e6a68a]">Huynh Nam Phuong</strong>
                  </div>
                  <div className="text-[11px] text-[#c9b8ab]">
                    Operations Management &amp; Technical Support Lead
                  </div>
                </div>

                {/* Facebook Community Button */}
                <div className="pt-1">
                  <a
                    href="https://www.facebook.com/share/18kcsekqpu/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-semibold text-xs transition-colors shadow-md"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Official Facebook Fanpage</span>
                  </a>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                  <span>Operating Hours: 08:00 - 21:00 Daily</span>
                  <span className="text-[#e6a68a] font-semibold">Nationwide Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}