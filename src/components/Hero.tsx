import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import Spline from "@splinetool/react-spline";
import { Link } from "react-router-dom";
import { brand, valueProps } from "../lib/content";
import { fadeInUp, staggerContainer } from "../lib/motion";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20"
    >
      <div className="absolute inset-0 w-full h-full opacity-40">
        <Spline scene="https://prod.spline.design/LxhntEvU9daSOxfF/scene.splinecode" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-[5]" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#cd3f2c]/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#db7d30]/15 rounded-full blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.12, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.12, 0.1)}
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#edcca5]" />
            <span className="text-sm text-gray-200">{brand.tagline}</span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight"
          >
            Websites that look{" "}
            <motion.span
              className="bg-gradient-to-r from-[#cd3f2c] via-[#db7d30] to-[#edcca5] bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              professional
            </motion.span>{" "}
            and drive results
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-gray-300 text-lg mb-10 max-w-xl mx-auto"
          >
            {brand.description}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] hover:from-[#b33624] hover:to-[#c56d28] min-w-[220px]"
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
                  className="border-white/25 text-white hover:bg-white/10 min-w-[220px] bg-white/5 backdrop-blur-sm"
                >
                  {brand.cta.secondary}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.08, 0.2)}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10"
          >
            {valueProps.map((prop) => (
              <motion.div key={prop.label} variants={fadeInUp}>
                <p className="text-white font-medium mb-1">{prop.label}</p>
                <p className="text-sm text-gray-400">{prop.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
