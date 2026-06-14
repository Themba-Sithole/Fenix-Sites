import { ArrowRight, ArrowUpRight, Code2, Star, Zap } from "lucide-react";
import { motion } from "motion/react";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { brand, trustItems, valueProps } from "../lib/content";
import { fadeInUp, slideInLeft, staggerContainer } from "../lib/motion";

const HeroSpline = lazy(() =>
  import("./HeroSpline").then((m) => ({ default: m.HeroSpline }))
);

const statIcons = { Code2, Zap, Star } as const;

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen bg-black overflow-hidden">
      {/* ── Spline: shifted right so robot sits center-right ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-y-0 -right-[10%] w-[120%] sm:w-[110%] lg:left-[22%] lg:right-[-5%] lg:w-auto opacity-75">
          <Suspense
            fallback={
              <div className="w-full h-full bg-gradient-to-b from-black via-[#0a0505] to-black" />
            }
          >
            <HeroSpline />
          </Suspense>
        </div>
        <div
          className="absolute bottom-0 right-0 z-[2] w-72 h-20"
          style={{
            background:
              "linear-gradient(135deg, transparent 25%, rgba(0,0,0,0.98) 60%, #000 100%)",
          }}
        />
      </div>

      {/* ── Lighting ── */}
      <div className="absolute bottom-0 left-1/2 lg:left-[62%] -translate-x-1/2 w-[700px] h-[420px] bg-[#cd3f2c]/30 rounded-full blur-[140px] z-[1] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 lg:left-[62%] -translate-x-1/2 w-[400px] h-[200px] bg-[#db7d30]/20 rounded-full blur-[80px] z-[1] pointer-events-none" />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 38%, rgba(0,0,0,0.08) 58%, transparent 72%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/70 to-transparent z-[1] pointer-events-none" />

      {/* ── Page content ── */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Upper: copy left, robot zone right */}
        <div className="flex-1 flex items-center pt-24 lg:pt-28 pb-8 lg:pb-4">
          <div className="container mx-auto px-5 sm:px-8 lg:px-10 w-full">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left — headline & CTAs */}
              <motion.div
                className="text-left max-w-xl lg:max-w-none"
                initial="hidden"
                animate="visible"
                variants={staggerContainer(0.09, 0.1)}
              >
                <motion.h1
                  variants={slideInLeft}
                  className="font-display font-bold leading-[1.06] tracking-[-0.025em] text-[clamp(2.25rem,5.2vw,4rem)] mb-5"
                >
                  <span className="block text-white">{brand.headline}</span>
                  <span className="block mt-1 text-[#db7d30]">{brand.headlineAccent}</span>
                </motion.h1>

                <motion.p
                  variants={slideInLeft}
                  className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-md font-body"
                >
                  {brand.description}
                </motion.p>

                <motion.div
                  variants={slideInLeft}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                  <Link to="/contact" className="group">
                    <span className="inline-flex items-center justify-center gap-2.5 h-[52px] sm:h-14 px-8 sm:px-9 rounded-2xl text-[15px] sm:text-base font-semibold text-white bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] shadow-[0_8px_32px_-6px_rgba(205,63,44,0.55)] transition-all duration-300 group-hover:brightness-110 group-hover:scale-[1.02] w-full sm:w-auto">
                      {brand.cta.primary}
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                  </Link>
                  <Link to="/portfolio" className="group">
                    <span className="inline-flex items-center justify-center gap-2 h-[52px] sm:h-14 px-8 sm:px-9 rounded-2xl text-[15px] sm:text-base font-medium text-white border border-white/12 bg-black/50 backdrop-blur-sm transition-all duration-300 group-hover:border-[#db7d30]/45 group-hover:bg-white/[0.05] w-full sm:w-auto">
                      {brand.cta.secondary}
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#db7d30]" />
                    </span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right — open zone for robot (visible on all breakpoints) */}
              <div
                className="min-h-[220px] sm:min-h-[280px] lg:min-h-[340px]"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Lower: full-width glass cards + trust bar */}
        <motion.div
          className="container mx-auto px-5 sm:px-8 lg:px-10 pb-8 sm:pb-10 mt-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.1, 0.4)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 w-full mb-7">
            {valueProps.map((prop) => {
              const Icon = statIcons[prop.icon];
              return (
                <motion.div
                  key={prop.label}
                  variants={fadeInUp}
                  className="group flex flex-col items-center text-center px-5 py-6 sm:px-6 sm:py-7 rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-md transition-all duration-300 hover:border-[#db7d30]/30 hover:bg-white/[0.06]"
                >
                  <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#cd3f2c]/12 border border-[#db7d30]/25 mb-4">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#db7d30]" strokeWidth={2} />
                  </div>
                  <p className="font-display text-base sm:text-lg font-bold text-white mb-1.5">
                    {prop.value} {prop.label}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                    {prop.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-500 font-body"
          >
            {trustItems.map((item, i) => (
              <span key={item} className="flex items-center gap-4">
                {i > 0 && (
                  <span className="w-1 h-1 rounded-full bg-[#db7d30]" aria-hidden="true" />
                )}
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
