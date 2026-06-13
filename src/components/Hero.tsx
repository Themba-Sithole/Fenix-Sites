import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { brand, valueProps } from "../lib/content";
import { BrowserFrame } from "./ui/BrowserFrame";
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from "../lib/motion";
import { usePublicProjects } from "../hooks/usePublicProjects";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const { projects } = usePublicProjects({ featuredOnly: true });
  const previewImages = projects.slice(0, 2);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#030303] pt-24 pb-16"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(205,63,44,0.18),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_50%,rgba(219,125,48,0.08),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.1, 0.15)}
          >
            <motion.div variants={slideInLeft}>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#edcca5] mb-8">
                <span className="w-2 h-2 rounded-full bg-[#db7d30] animate-pulse" />
                {brand.tagline}
              </span>
            </motion.div>

            <motion.h1
              variants={slideInLeft}
              className="text-white text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[3.5rem] font-bold leading-[1.05] tracking-tight mb-6"
            >
              {brand.headline}{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-[#cd3f2c] via-[#db7d30] to-[#edcca5] bg-clip-text text-transparent">
                  {brand.headlineAccent}
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={slideInLeft}
              className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg"
            >
              {brand.description}
            </motion.p>

            <motion.div variants={slideInLeft} className="flex flex-wrap gap-4 mb-14">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="group h-12 px-7 bg-white text-black hover:bg-gray-100 font-medium rounded-full"
                >
                  {brand.cta.primary}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-7 border-white/20 text-white hover:bg-white/5 rounded-full backdrop-blur-sm"
                >
                  {brand.cta.secondary}
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.08, 0.3)}
              className="flex flex-wrap gap-8 pt-8 border-t border-white/[0.08]"
            >
              {valueProps.map((prop) => (
                <motion.div key={prop.label} variants={fadeInUp}>
                  <p className="text-2xl font-bold text-white mb-0.5">{prop.value}</p>
                  <p className="text-sm text-gray-300">{prop.label}</p>
                  <p className="text-xs text-gray-500">{prop.detail}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual showcase */}
          <motion.div style={{ y, opacity }} className="relative hidden lg:block">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer(0.15, 0.4)}
              className="relative"
            >
              <div className="absolute -inset-8 bg-gradient-to-br from-[#cd3f2c]/20 via-transparent to-[#db7d30]/10 rounded-3xl blur-3xl" />

              {previewImages[0] && (
                <motion.div variants={slideInRight} className="relative z-10">
                  <BrowserFrame
                    image={previewImages[0].image}
                    title={previewImages[0].title}
                    url="client-store.co.za"
                  />
                </motion.div>
              )}

              {previewImages[1] && (
                <motion.div
                  variants={slideInRight}
                  className="absolute -bottom-12 -left-8 w-[75%] z-20"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <BrowserFrame
                    image={previewImages[1].image}
                    title={previewImages[1].title}
                    url="startup-launch.com"
                    delay={0.2}
                  />
                </motion.div>
              )}

              {/* Floating quality badge */}
              <motion.div
                className="absolute -top-4 -right-4 z-30 px-4 py-3 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-xl"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Performance</p>
                <p className="text-white font-semibold">98 Lighthouse</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
