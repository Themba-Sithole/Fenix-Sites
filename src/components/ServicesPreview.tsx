import { Code2, Palette, ShoppingCart, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { SectionHeader } from "./ui/SectionHeader";
import { coreServices } from "../lib/content";
import { fadeInUp, staggerContainer, viewportOnce } from "../lib/motion";

const iconMap = { Code2, ShoppingCart, Palette, TrendingUp };

export function ServicesPreview() {
  return (
    <section id="services" className="py-20 md:py-28 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(205,63,44,0.08),transparent)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="What We Do"
          title="Everything your business needs online"
          description="Four core services — see the full list and pricing on our services page."
          align="center"
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
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6 h-full hover:border-[#db7d30]/40 hover:bg-white/[0.08] transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#cd3f2c]/25 to-[#db7d30]/25 rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-[#edcca5]" />
                  </div>
                  <h3 className="text-white font-medium mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center mt-12">
          <Link to="/services">
            <Button variant="outline" className="border-[#edcca5]/30 text-white hover:bg-white/10">
              View All Services & Pricing
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
