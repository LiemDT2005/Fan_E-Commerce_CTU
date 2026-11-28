import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Wind,
  SunMedium,
  Snowflake,
  Compass,
  ArrowRight,
  Heart,
  Home as HomeIcon,
} from 'lucide-react';

export default function BrandStory() {
  return (
    <div className="bg-surface text-on-surface overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative py-20 lg:py-28 bg-surface-container-low border-b border-outline-variant/25">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 right-10 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse-subtle" />
          <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl" />
        </div>

        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-5">
              <Sparkles size={14} />
              Brand Story &amp; Purpose
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-on-surface leading-[1.18]">
              FANFUN – One Fixture, Multiple Solutions for Modern Living
            </h1>
            <p className="mt-6 text-base sm:text-lg text-on-surface-variant leading-relaxed">
              We started with a simple yet vital question: Why should contemporary homes be cluttered with winter floor heaters, summer desk fans, and bulky air purifiers, when all these functions can be harmoniously integrated into a single architectural ceiling system?
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Mission & Vision Dual Card */}
      <section className="py-20 max-w-[1280px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-8 sm:p-10 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
              <Compass size={28} />
            </div>
            <span className="text-xs uppercase tracking-[0.14em] text-primary font-bold">
              Mission
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface mt-2 mb-4">
              Complete Year-Round Comfort for Every Family
            </h2>
            <blockquote className="text-sm sm:text-base text-on-surface-variant leading-relaxed italic border-l-2 border-primary pl-4 py-1">
              &ldquo;To deliver complete comfort to every home with versatile smart ceiling fixtures—seamlessly transforming between heater, cooler, and breeze circulator so that every moment at home is effortlessly soothing.&rdquo;
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-8 sm:p-10 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-6">
              <Sparkles size={28} />
            </div>
            <span className="text-xs uppercase tracking-[0.14em] text-primary font-bold">
              Vision
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface mt-2 mb-4">
              Pioneering Multi-Functional Smart Appliances
            </h2>
            <blockquote className="text-sm sm:text-base text-on-surface-variant leading-relaxed italic border-l-2 border-amber-600 pl-4 py-1">
              &ldquo;To become the benchmark brand in versatile smart climate appliances, crafting standards of convenient, energy-efficient living and delivering complete comfort 365 days a year for consumers worldwide.&rdquo;
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* 3. Deep Storyline: Inspiration & Context */}
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
                Context &amp; Challenge
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-on-surface tracking-tight">
                When Climate Fluctuation Meets Space Constraints
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                In modern life, seasonal weather swings make domestic microclimate regulation more crucial than ever. Scorching summers demand gentle, uninterrupted breezes; sudden cold snaps necessitate cozy warmth that will not dry out skin or deplete room humidity.
              </p>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                At the same time, air quality, particulate dust (PM2.5), and stuffiness in urban apartments, studios, and rental homes are growing concerns. Rather than purchasing 3 or 4 separate machines that congest walking paths, FANFUN was engineered to unite them all overhead.
              </p>

              <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-surface border border-outline-variant/30 flex items-center gap-3">
                  <Wind className="text-primary flex-shrink-0" size={20} />
                  <span className="text-xs font-semibold">Natural Cooling</span>
                </div>
                <div className="p-4 rounded-xl bg-surface border border-outline-variant/30 flex items-center gap-3">
                  <SunMedium className="text-amber-600 flex-shrink-0" size={20} />
                  <span className="text-xs font-semibold">PTC Warmth</span>
                </div>
                <div className="p-4 rounded-xl bg-surface border border-outline-variant/30 flex items-center gap-3">
                  <Snowflake className="text-cyan-600 flex-shrink-0" size={20} />
                  <span className="text-xs font-semibold">Gentle Chilling</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-6"
            >
              <div className="relative rounded-3xl overflow-hidden border border-outline-variant/25 shadow-lg">
                <img
                  src="https://res.cloudinary.com/dpfy23tda/image/upload/v1795491622/fanfun_products/ff-apex-3in1.jpg"
                  alt="FanFun 3 in 1 Living Solution"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#e6a68a]">
                    Core Philosophy
                  </div>
                  <div className="text-lg font-bold">
                    &ldquo;Comfort should never be confined to just one season.&rdquo;
                  </div>
                  <p className="text-xs text-white/80">
                    Hot or cold, clear or humid, FANFUN keeps your home effortlessly comfortable year-round.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Spaces Served */}
      <section className="py-20 max-w-[1280px] mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">
            Target Living Environments
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mt-2 tracking-tight">
            Streamlined Design for Every Living Space
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mt-3">
            FANFUN configures microclimate solutions tailored to the diverse lifestyles and floorplans of contemporary homes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <HomeIcon size={22} />
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2">Studios &amp; Compact Rentals</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Reclaim precious floor square footage. Eliminate the clutter of portable heaters, pedestal fans, and floor air filters.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-outline-variant/20 text-xs font-semibold text-primary">
              Maximum Floor Liberation
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Sparkles size={22} />
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2">Modern Urban Condos</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Minimalist ceiling aesthetic paired with smart controls via mobile app, remote, and voice assistants, seamlessly complementing Japandi and Scandinavian decors.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-outline-variant/20 text-xs font-semibold text-primary">
              Elevated Architectural Style
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Heart size={22} />
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2">Multi-Generational Households</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Protects the sleep and health of elders and infants with sub-28dB acoustic operation, draft-free natural air circulation, and PM2.5 filtration.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-outline-variant/20 text-xs font-semibold text-primary">
              Whole-Family Health Shield
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Navigation */}
      <section className="py-16 bg-[#241914] text-[#f5ebe0]">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f9efe4]">
            Discover the Complete Ecosystem &amp; Values of FANFUN
          </h2>
          <p className="mt-3 text-sm text-[#c9b8ab] max-w-xl mx-auto">
            Learn about our Branded House architecture and the core values that establish our trusted reputation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/about"
              className="px-6 py-3 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container transition-colors inline-flex items-center gap-2"
            >
              <span>Back to Main About Us</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/ecosystem"
              className="px-6 py-3 rounded-xl border border-white/25 hover:bg-white/10 text-[#f9efe4] text-sm font-medium transition-colors"
            >
              Explore Service Ecosystem
            </Link>
            <Link
              to="/culture"
              className="px-6 py-3 rounded-xl border border-white/25 hover:bg-white/10 text-[#f9efe4] text-sm font-medium transition-colors"
            >
              Corporate Culture
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}