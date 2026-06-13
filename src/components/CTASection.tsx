import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { brand } from "../lib/content";
import { fadeInUp, viewportOnce } from "../lib/motion";

export function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(205,63,44,0.1),transparent)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          className="max-w-3xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-[#db7d30]/30 backdrop-blur-xl p-10 md:p-14 text-center">
            <h2 className="text-white text-2xl md:text-4xl font-bold mb-4 tracking-tight">
              Ready to elevate your{" "}
              <span className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] bg-clip-text text-transparent">
                digital presence?
              </span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Tell us about your project and we&apos;ll get back with a clear plan and quote — no pressure, no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] hover:from-[#b33624] hover:to-[#c56d28] min-w-[220px]"
                >
                  {brand.cta.primary}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/25 text-white hover:bg-white/10 min-w-[220px]"
                >
                  See Pricing
                </Button>
              </Link>
            </div>
            <p className="text-gray-500 text-sm mt-6">{brand.contactNote}</p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
