import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { motion } from "motion/react";
import { SectionHeader } from "./ui/SectionHeader";
import { testimonials } from "../lib/content";
import { fadeInUp, scaleIn, staggerContainer, viewportOnce } from "../lib/motion";

export function Testimonials() {
  const featured = testimonials.find((t) => t.featured)!;
  const others = testimonials.filter((t) => !t.featured);

  return (
    <section className="py-24 md:py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Client Words"
          title="Trusted by businesses who care about quality"
          align="center"
          large
        />

        <motion.div
          className="grid lg:grid-cols-5 gap-6 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.12)}
        >
          {/* Featured quote */}
          <motion.div variants={scaleIn} className="lg:col-span-3">
            <div className="relative h-full rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent p-8 md:p-10">
              <Quote className="w-10 h-10 text-[#cd3f2c]/30 mb-6" />
              <div className="flex gap-1 mb-6">
                {Array.from({ length: featured.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#db7d30] text-[#db7d30]" />
                ))}
              </div>
              <p className="text-white text-lg md:text-xl leading-relaxed mb-8">
                &ldquo;{featured.text}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 bg-gradient-to-br from-[#cd3f2c] to-[#db7d30]">
                  <AvatarFallback className="text-white">{featured.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium">{featured.name}</p>
                  <p className="text-gray-500 text-sm">{featured.role}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary quotes */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {others.map((t) => (
              <motion.div key={t.name} variants={fadeInUp}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 h-full hover:border-white/15 transition-colors">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#db7d30] text-[#db7d30]" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8 bg-gradient-to-br from-[#cd3f2c] to-[#db7d30]">
                      <AvatarFallback className="text-white text-xs">{t.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white text-sm font-medium">{t.name}</p>
                      <p className="text-gray-500 text-xs">{t.project}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
