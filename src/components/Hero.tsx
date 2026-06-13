import { ArrowRight, Sparkles, ChevronDown, Zap, Shield, Gauge } from "lucide-react";
import { Button } from "./ui/button";
import { motion, useScroll, useTransform } from "motion/react";
import { lazy, Suspense, useRef } from "react";
import { Link } from "react-router-dom";
import { brand, valueProps } from "../lib/content";
import { fadeInUp, staggerContainer } from "../lib/motion";
import { useMouseParallax } from "../hooks/useMouseParallax";

const HeroSpline = lazy(() =>
  import("./HeroSpline").then((m) => ({ default: m.HeroSpline }))
);

const floatingBadges = [
  { icon: Zap, label: "Blazing Fast", x: "8%", y: "35%", delay: 0 },
  { icon: Shield, label: "Secure", x: "88%", y: "30%", delay: 0.2 },
  { icon: Gauge, label: "98 Score", x: "85%", y: "62%", delay: 0.4 },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallax = useMouseParallax(24);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const splineScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* Spline — full scene, robot visible center-bottom */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: splineScale }}
      >
        <div className="absolute inset-0 opacity-55">
          <Suspense
            fallback={
              <div className="w-full h-full bg-gradient-to-b from-[#cd3f2c]/10 via-black to-[#db7d30]/15 animate-pulse" />
            }
          >
            <HeroSpline />
          </Suspense>
        </div>
      </motion.div>

      {/* Top vignette for headline readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none" />
      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-[2] pointer-events-none" />

      {/* Ambient orbs — mouse parallax */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-72 h-72 bg-[#cd3f2c]/20 rounded-full blur-[100px] z-[1] pointer-events-none"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ x: parallax.x * 1.5, y: parallax.y * 1.5 }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#db7d30]/15 rounded-full blur-[100px] z-[1] pointer-events-none"
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ x: parallax.x * -1.2, y: parallax.y * -1.2 }}
      />

      {/* Orbital ring */}
      <motion.div
        className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[min(90vw,600px)] h-[min(90vw,600px)] rounded-full border border-[#db7d30]/10 z-[1] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[min(70vw,450px)] h-[min(70vw,450px)] rounded-full border border-[#cd3f2c]/15 z-[1] pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating badges */}
      {floatingBadges.map(({ icon: Icon, label, x, y, delay }) => (
        <motion.div
          key={label}
          className="absolute z-[3] hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-md"
          style={{ left: x, top: y, translate: `${parallax.x * (delay + 1)}px 0` }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { delay: 0.8 + delay, duration: 0.5 },
            scale: { delay: 0.8 + delay, duration: 0.5 },
            y: { duration: 3 + delay, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Icon className="w-3.5 h-3.5 text-[#edcca5]" />
          <span className="text-xs text-gray-300">{label}</span>
        </motion.div>
      ))}

      {/* Content — upper portion, robot breathes below */}
      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-48"
        style={{ y: contentY }}
      >
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.08, 0.1)}
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#edcca5]" />
            <span className="text-sm text-gray-200">{brand.tagline}</span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-5 leading-[1.05] tracking-tight"
          >
            <span className="block" style={{ textShadow: "0 4px 40px rgba(0,0,0,0.9)" }}>
              {brand.headline}
            </span>
            <motion.span
              className="block mt-1 bg-gradient-to-r from-[#cd3f2c] via-[#db7d30] to-[#edcca5] bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              {brand.headlineAccent}
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-gray-300/90 text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
          >
            {brand.description}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] hover:from-[#b33624] hover:to-[#c56d28] min-w-[220px] h-12 shadow-lg shadow-[#cd3f2c]/30 rounded-full"
                >
                  {brand.cta.primary}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/portfolio">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 min-w-[220px] h-12 bg-black/40 backdrop-blur-md rounded-full"
                >
                  {brand.cta.secondary}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats glass dock */}
      <motion.div
        className="absolute bottom-8 left-4 right-4 z-10 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="grid grid-cols-3 gap-2 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-xl">
          {valueProps.map((prop) => (
            <div key={prop.label} className="text-center">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] bg-clip-text text-transparent">
                {prop.value}
              </p>
              <p className="text-white text-xs sm:text-sm font-medium">{prop.label}</p>
              <p className="text-gray-500 text-[10px] sm:text-xs hidden sm:block">{prop.detail}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] text-gray-600 uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4 text-gray-600" />
      </motion.div>
    </section>
  );
}
