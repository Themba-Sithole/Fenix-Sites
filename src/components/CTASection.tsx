import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { brand } from "../lib/content";
import { scaleIn, viewportOnce } from "../lib/motion";

export function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-[#030303] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={scaleIn}
          className="relative max-w-4xl mx-auto"
        >
          {/* Glow */}
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-[#cd3f2c]/40 via-[#db7d30]/20 to-[#edcca5]/30 blur-sm" />

          <div className="relative rounded-3xl border border-white/10 bg-black p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(205,63,44,0.08),transparent_60%)]" />

            <div className="relative z-10">
              <p className="text-[#edcca5] text-xs uppercase tracking-[0.2em] mb-6">
                Let&apos;s build something remarkable
              </p>
              <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight">
                Your next website should be your best salesperson.
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                Tell us about your project. We&apos;ll respond within 24 hours with a clear plan — no pressure, no jargon.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="h-12 px-8 bg-white text-black hover:bg-gray-100 rounded-full font-medium"
                  >
                    {brand.cta.primary}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-8 border-white/20 text-white hover:bg-white/5 rounded-full"
                  >
                    View Pricing
                    <ArrowUpRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <p className="text-gray-600 text-sm mt-8">{brand.contactNote}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
