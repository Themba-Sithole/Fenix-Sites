import { motion } from "motion/react";
import { SectionHeader } from "./ui/SectionHeader";
import { processSteps } from "../lib/content";
import { fadeInUp, staggerContainer, viewportOnce } from "../lib/motion";

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="How It Works"
          title="From idea to live site in three steps"
          description="A clear, transparent process — no surprises."
          align="center"
        />

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.12)}
        >
          {processSteps.map((item) => (
            <motion.div key={item.step} variants={fadeInUp}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 h-full hover:border-[#db7d30]/30 transition-colors text-center md:text-left">
                <span className="inline-block text-3xl font-bold bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] bg-clip-text text-transparent mb-4">
                  {item.step}
                </span>
                <h3 className="text-white text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
