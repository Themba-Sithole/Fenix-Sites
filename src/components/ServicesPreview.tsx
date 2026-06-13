import { Code2, Palette, ShoppingCart, TrendingUp, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { SectionHeader } from "./ui/SectionHeader";
import { coreServices } from "../lib/content";
import { fadeInUp, scaleIn, staggerContainer, viewportOnce } from "../lib/motion";

const iconMap = { Code2, ShoppingCart, Palette, TrendingUp };

export function ServicesPreview() {
  const featured = coreServices.find((s) => s.featured)!;
  const others = coreServices.filter((s) => !s.featured);
  const FeaturedIcon = iconMap[featured.icon];

  return (
    <section id="services" className="py-24 md:py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Capabilities"
          title="Built for brands that refuse to look average"
          description="From single landing pages to full e-commerce — every deliverable is crafted with intention."
          large
        />

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.08)}
        >
          {/* Featured bento cell */}
          <motion.div variants={scaleIn} className="md:row-span-2">
            <div className="h-full min-h-[320px] rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#cd3f2c]/10 via-transparent to-[#db7d30]/5 p-8 flex flex-col justify-between group hover:border-[#db7d30]/30 transition-colors duration-500">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#cd3f2c] to-[#db7d30] flex items-center justify-center mb-6">
                  <FeaturedIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-3">{featured.title}</h3>
                <p className="text-gray-400 leading-relaxed">{featured.description}</p>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-[#edcca5] text-sm mt-8 group-hover:text-white transition-colors"
              >
                Explore services <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Other services */}
          {others.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div key={service.title} variants={fadeInUp}>
                <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/15 transition-all duration-500 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-[#db7d30]/10 transition-colors">
                    <Icon className="w-5 h-5 text-[#edcca5]" />
                  </div>
                  <h3 className="text-white font-medium mb-2">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
