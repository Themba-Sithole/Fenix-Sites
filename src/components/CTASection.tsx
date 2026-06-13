import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { SectionBackground } from "./ui/SectionBackground";
import { brand } from "../lib/content";
import { fadeInUp, viewportOnce } from "../lib/motion";

export function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
      <SectionBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
        >
          <h2 className="text-white text-2xl md:text-3xl mb-4">
            Ready to get your business online?
          </h2>
          <p className="text-gray-400 mb-8">
            Tell us about your project and we&apos;ll get back to you with a clear plan and quote — no pressure, no obligation.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.15, duration: 0.5 }}
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
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/25 text-white hover:bg-white/10 min-w-[220px]"
                >
                  See Pricing
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.p
            className="text-sm text-gray-500 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3 }}
          >
            {brand.contactNote}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
