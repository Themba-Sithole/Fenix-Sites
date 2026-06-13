import { Star, Quote } from "lucide-react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { motion } from "motion/react";
import { SectionHeader } from "./ui/SectionHeader";
import { testimonials } from "../lib/content";
import { fadeInUp, staggerContainer, viewportOnce } from "../lib/motion";

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Client Stories"
          title="Trusted by businesses who care about quality"
          align="center"
        />

        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.12)}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6 h-full hover:border-[#db7d30]/40 transition-colors relative">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-[#cd3f2c]/20" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#db7d30] text-[#db7d30]" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <Avatar className="bg-gradient-to-br from-[#cd3f2c] to-[#db7d30]">
                    <AvatarFallback className="text-white text-sm">{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-medium text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-400">{testimonial.role}</p>
                    <p className="text-xs text-[#edcca5]">{testimonial.project}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
