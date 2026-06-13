import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
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
    <section id="home" className="relative min-h-screen bg-black flex flex-col">
      {/* ── Spline background layer ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-50">
          <Suspense
            fallback={
              <div className="w-full h-full bg-gradient-to-b from-black via-[#0a0505] to-black" />
            }
          >
            <HeroSpline />
          </Suspense>
        </div>

        {/* Zone gradients — top readable, center clear, bottom HUD */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/90 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[42%] bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </div>

      {/* ── Top content zone ── */}
      <div className="relative z-10 flex-shrink-0 pt-24 pb-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.08, 0.1)}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#edcca5]" />
              <span className="text-xs tracking-wide text-gray-300 uppercase">
                {brand.tagline}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-4"
            >
              {brand.headline}{" "}
              <span className="bg-gradient-to-r from-[#cd3f2c] via-[#db7d30] to-[#edcca5] bg-clip-text text-transparent">
                {brand.headlineAccent}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-7 max-w-xl mx-auto"
            >
              {brand.description}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] hover:from-[#b33624] hover:to-[#c56d28] h-11 px-7 rounded-full shadow-lg shadow-[#cd3f2c]/25"
                >
                  {brand.cta.primary}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 px-7 rounded-full border-white/20 text-white bg-black/40 backdrop-blur-sm hover:bg-white/10"
                >
                  {brand.cta.secondary}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Middle spacer — robot breathes here ── */}
      <div className="relative z-0 flex-1 min-h-[200px]" />

      {/* ── Bottom HUD stats bar ── */}
      <motion.div
        className="relative z-10 flex-shrink-0 border-t border-white/[0.06] bg-black/60 backdrop-blur-md"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-white/[0.06] py-5 max-w-3xl mx-auto">
            {valueProps.map((prop) => (
              <div key={prop.label} className="text-center px-2 sm:px-6">
                <p className="text-lg sm:text-2xl font-bold text-[#db7d30] mb-0.5">
                  {prop.value}
                </p>
                <p className="text-white text-xs sm:text-sm font-medium">{prop.label}</p>
                <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5 hidden sm:block">
                  {prop.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
