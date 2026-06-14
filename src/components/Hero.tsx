import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { brand, valueProps } from "../lib/content";
import { fadeInUp, staggerContainer } from "../lib/motion";

const HeroSpline = lazy(() =>
  import("./HeroSpline").then((m) => ({ default: m.HeroSpline }))
);

export function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen min-h-[640px] bg-black overflow-hidden"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 hero-premium-grid opacity-[0.35] z-[1] pointer-events-none" />

      {/* Orange ambient glow — centered behind robot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[35%] w-[min(900px,90vw)] h-[min(560px,70vh)] bg-[#cd3f2c]/20 rounded-full blur-[130px] z-[1] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[30%] w-[min(480px,60vw)] h-[min(320px,45vh)] bg-[#db7d30]/12 rounded-full blur-[90px] z-[1] pointer-events-none" />

      {/* Cinematic edge vignette — keeps center clear for robot */}
      <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_45%,rgba(0,0,0,0.55)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent z-[2] pointer-events-none" />

      {/* Robot — centered, behind content, floating */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 -top-[6%] flex items-center justify-center"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-[115%] max-w-[100vw] opacity-80">
            <Suspense
              fallback={
                <div className="w-full h-full bg-gradient-to-b from-black via-[#0a0505] to-black" />
              }
            >
              <HeroSpline />
            </Suspense>
          </div>
        </motion.div>
        <div
          className="absolute bottom-0 right-0 z-[2] w-72 h-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, transparent 25%, rgba(0,0,0,0.98) 60%, #000 100%)",
          }}
        />
      </div>

      {/* Hero content — centered stack */}
      <div className="relative z-10 h-full flex items-center justify-center px-5 sm:px-8 pt-20 pb-10">
        <motion.div
          className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.09, 0.12)}
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#db7d30]/30 bg-white/[0.04] backdrop-blur-md shadow-[0_0_24px_-6px_rgba(219,125,48,0.35)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#db7d30]" />
            <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase text-gray-200 font-medium">
              {brand.tagline}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="font-display font-bold leading-[1.02] tracking-[-0.03em] text-[clamp(2.5rem,6.5vw,6rem)] mb-6 hero-headline-shadow"
          >
            <span className="block text-white">{brand.headline}</span>
            <span className="block mt-1 text-[#db7d30]">{brand.headlineAccent}</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeInUp}
            className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed max-w-[700px] mb-10 font-body"
          >
            {brand.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-14"
          >
            <Link to="/contact" className="group w-full sm:w-auto">
              <span className="hero-btn-primary inline-flex items-center justify-center gap-2.5 h-14 px-9 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] shadow-[0_8px_32px_-6px_rgba(205,63,44,0.55)] transition-all duration-300 w-full sm:w-auto">
                {brand.cta.primary}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link to="/portfolio" className="group w-full sm:w-auto">
              <span className="inline-flex items-center justify-center gap-2 h-14 px-9 rounded-2xl text-base font-medium text-white border border-white/12 bg-white/[0.04] backdrop-blur-md transition-all duration-300 group-hover:border-[#db7d30]/45 group-hover:bg-white/[0.08] group-hover:shadow-[0_0_28px_-8px_rgba(219,125,48,0.4)] w-full sm:w-auto">
                {brand.cta.secondary}
                <ArrowUpRight className="w-5 h-5 text-[#db7d30] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </motion.div>

          {/* Stat cards */}
          <motion.div
            variants={staggerContainer(0.08, 0.2)}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl"
          >
            {valueProps.map((prop) => (
              <motion.div
                key={prop.label}
                variants={fadeInUp}
                className="hero-stat-card flex flex-col items-center justify-center py-6 px-4 rounded-2xl border border-[#db7d30]/15 bg-black/30 backdrop-blur-md text-center"
              >
                <p className="font-display text-2xl sm:text-3xl font-bold text-[#db7d30] leading-none mb-2">
                  {prop.value}
                </p>
                <p className="text-white text-sm sm:text-base font-medium tracking-wide">
                  {prop.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
