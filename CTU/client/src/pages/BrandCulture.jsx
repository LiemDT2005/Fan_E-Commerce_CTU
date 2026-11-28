import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Lightbulb,
  Users,
  Compass,
  Smile,
  Cpu,
  Leaf,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const CORE_VALUES = [
  {
    name: 'Honesty',
    slogan: 'Say what is true, do what is right, keep every promise',
    desc: 'FANFUN does not inflate specifications or conceal flaws, and always proactively notifies customers before issues arise with products or deliveries.',
    standards: 'Provide accurate information regarding power consumption, safety ratings, and performance; absolute transparency across all channels.',
    icon: Compass,
    color: 'from-amber-600/10 to-orange-600/20',
  },
  {
    name: 'Dedication',
    slogan: 'Listen genuinely, resolve promptly',
    desc: 'Every design and operational decision begins with genuine customer needs. We listen attentively and resolve feedback swiftly.',
    standards: 'Decisions originate from real customer requirements; actively gather feedback and rectify challenges immediately, before and after sales.',
    icon: HeartHandshake,
    color: 'from-rose-600/10 to-red-600/20',
  },
  {
    name: 'Safety',
    slogan: 'Safety first, never compromised for cost',
    desc: 'We never sacrifice safety for profit margins; uncertified parts never leave our factory floor under any circumstance.',
    standards: 'Absolute priority on electrical, thermal, and flame-retardant standards; any team member has the authority to halt delivery if safety is in question.',
    icon: ShieldCheck,
    color: 'from-emerald-600/10 to-teal-600/20',
  },
  {
    name: 'Innovation',
    slogan: 'Continuous learning, daring to pioneer',
    desc: 'Encouraging ongoing curiosity and new methodologies to engineer smarter, highly energy-efficient microclimate solutions.',
    standards: 'Staff are empowered to propose novel concepts, experiment boldly, and learn from mistakes to refine products and operating workflows.',
    icon: Lightbulb,
    color: 'from-blue-600/10 to-cyan-600/20',
  },
  {
    name: 'Responsibility',
    slogan: 'Accountable as one team for society & environment',
    desc: 'Stepping up to own our responsibilities, collaborating seamlessly as a unified team with deep ecological stewardship.',
    standards: 'R&D, manufacturing, marketing, and support divisions coordinate closely, taking collective ownership over client experiences and green sustainability.',
    icon: Users,
    color: 'from-purple-600/10 to-indigo-600/20',
  },
];

const BRAND_PERSONALITIES = [
  {
    title: 'Smart',
    desc: 'Remote app sync, voice integration, autonomous ambient temperature adaptation, and intelligent maintenance alerts.',
    icon: Cpu,
  },
  {
    title: 'Caring',
    desc: 'Sincere attention to family respiratory health: active PM2.5 filtration, odor removal, and lifelong attentive after-sales care.',
    icon: HeartHandshake,
  },
  {
    title: 'Modern',
    desc: 'Minimalist Scandinavian architectural aesthetics, quiet inverter BLDC motors, and advanced semiconductor PTC ceramic heating.',
    icon: Sparkles,
  },
  {
    title: 'Reliable',
    desc: 'Flame-retardant structural alloys, solid hardware assembly, 5-year official motor warranty, and prompt replacement policies.',
    icon: ShieldCheck,
  },
  {
    title: 'Friendly',
    desc: 'Intuitive interface accessible to all generations, thorough consultation, and complimentary on-site laser surveys and installation.',
    icon: Smile,
  },
  {
    title: 'Responsible',
    desc: 'Committed to energy conservation, reducing domestic carbon footprints, and maintaining sustainable filter replacement cycles.',
    icon: Leaf,
  },
];

const EMPLOYEE_BEHAVIORS = [
  'Know the Product',
  'Know the Customer',
  'Always Honest',
  'Always Safe',
  'Always Innovating',
  'Always Responsible',
];

export default function BrandCulture() {
  return (
    <div className="bg-surface text-on-surface overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative py-20 lg:py-28 bg-surface-container-low border-b border-outline-variant/25">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-5">
              <HeartHandshake size={14} />
              Brand Culture &amp; Core Values
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-on-surface leading-[1.18]">
              The Spirit of &ldquo;One Fixture – Every Season – Every Living Space&rdquo;
            </h1>
            <p className="mt-6 text-base sm:text-lg text-on-surface-variant leading-relaxed">
              FANFUN’s corporate culture is not merely reflected in every 3-in-1 ceiling appliance delivered, but lived through shared beliefs, ethical standards, and dedication to service across our entire organization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Brand Belief */}
      <section className="py-20 max-w-[1280px] mx-auto px-4 lg:px-8">
        <div className="rounded-3xl bg-surface-container-lowest border border-outline-variant/30 p-8 sm:p-14 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-[0.14em] text-primary font-bold">
                Philosophy &amp; Conviction
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
                Technology Must Serve Human Peace of Mind
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                FANFUN believes technology only holds genuine value when it makes daily life simpler, more convenient, and more peaceful. We do not merely sell an appliance; we provide a complete temperature and comfort solution for your home 365 days a year.
              </p>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-medium">
                An exceptional product must simultaneously fulfill three balanced pillars:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30">
                  <div className="text-primary font-bold text-sm">01. For Customers</div>
                  <div className="text-xs text-on-surface-variant mt-1">Uncompromising safety and versatile utility.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30">
                  <div className="text-primary font-bold text-sm">02. For the Enterprise</div>
                  <div className="text-xs text-on-surface-variant mt-1">Sustainable efficiency and enduring reputation.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30">
                  <div className="text-primary font-bold text-sm">03. For Society</div>
                  <div className="text-xs text-on-surface-variant mt-1">Ecological responsibility and community care.</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-primary/10 border-4 border-dashed border-primary/30 flex flex-col items-center justify-center p-6 text-center animate-spin-slow">
                <Leaf size={32} className="text-primary mb-2" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">365 Days</span>
                <span className="text-[11px] text-on-surface-variant mt-1">Pure Air &amp; Comfort</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 5 Core Values in Detail */}
      <section className="py-20 bg-surface-container-low border-y border-outline-variant/25">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">
              Guiding Compass
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-on-surface mt-2 tracking-tight">
              5 Core Values &amp; Operational Standards
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mt-3">
              Unyielding commitments governing research &amp; development, manufacturing, delivery, consultation, and after-sales support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.name}
                  whileHover={{ y: -4 }}
                  className="p-7 rounded-3xl bg-surface border border-outline-variant/30 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center mb-5">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      {val.name}
                    </span>
                    <h3 className="text-base font-bold text-on-surface mt-1 mb-2">
                      {val.slogan}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
                      {val.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-outline-variant/20">
                    <span className="text-[11px] font-semibold text-on-surface block mb-1">
                      Applied Standard:
                    </span>
                    <p className="text-xs text-on-surface-variant/90 leading-relaxed italic">
                      &ldquo;{val.standards}&rdquo;
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. 6 Brand Personalities */}
      <section className="py-20 max-w-[1280px] mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">
            Brand Personality
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mt-2 tracking-tight">
            6 Core Brand Traits of FANFUN
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mt-3">
            How our brand interacts, converses, and builds emotional bonds with thousands of contemporary families.
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
                  <h3 className="text-sm font-bold text-on-surface">{p.title}</h3>
                  <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Employee Code of Conduct */}
      <section className="py-16 bg-surface-container border-t border-outline-variant/25">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.14em] text-primary font-bold">
              Internal Behavioral Tenets
            </span>
            <h2 className="text-xl sm:text-3xl font-bold text-on-surface">
              Daily Action Code of Every Team Member
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto">
              Corporate culture does not live on paper; it is forged by the everyday conduct of our personnel.
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {EMPLOYEE_BEHAVIORS.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-xs sm:text-sm font-bold text-primary shadow-sm inline-flex items-center gap-2"
                >
                  <CheckCircle2 size={16} className="text-primary" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Navigation Footer */}
      <section className="py-16 bg-[#241914] text-[#f5ebe0]">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f9efe4]">
            Partner with FANFUN for Sustainable, Intelligent Living Spaces
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/about"
              className="px-6 py-3 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container transition-colors inline-flex items-center gap-2"
            >
              <span>Back to Main About Us</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/brand-story"
              className="px-6 py-3 rounded-xl border border-white/25 hover:bg-white/10 text-[#f9efe4] text-sm font-medium transition-colors"
            >
              Brand Story
            </Link>
            <Link
              to="/ecosystem"
              className="px-6 py-3 rounded-xl border border-white/25 hover:bg-white/10 text-[#f9efe4] text-sm font-medium transition-colors"
            >
              Ecosystem &amp; Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}