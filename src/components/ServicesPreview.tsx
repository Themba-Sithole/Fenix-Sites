import { Code2, Palette, ShoppingCart, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { SectionHeader } from "./ui/SectionHeader";
import { SectionBackground } from "./ui/SectionBackground";
import { coreServices } from "../lib/content";
import { fadeInUp, staggerContainer, viewportOnce } from "../lib/motion";

const iconMap = {
  Code2,
  ShoppingCart,
  Palette,
  TrendingUp,
};

export function ServicesPreview() {
  return (
    <section id="services" className="py-20 md:py-28 bg-black relative overflow-hidden">
      <SectionBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="What We Do"
          title="Everything you need to grow online"
          description="Four core services — explore the full list on our services page."
        />

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.08)}
        >
          {coreServices.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div key={service.title} variants={fadeInUp}>
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6 h-full hover:border-[#db7d30]/40 hover:bg-white/[0.07] transition-colors group">
                  <motion.div
                    className="w-11 h-11 bg-gradient-to-br from-[#cd3f2c]/20 to-[#db7d30]/20 rounded-lg flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.08, rotate: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-5 h-5 text-[#edcca5]" />
                  </motion.div>
                  <h3 className="text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/services">
            <Button
              variant="outline"
              className="border-[#edcca5]/30 text-white hover:bg-white/10"
            >
              View All Services & Pricing
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
