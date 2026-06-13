import { motion } from "motion/react";
import { SectionHeader } from "./ui/SectionHeader";
import { SectionBackground } from "./ui/SectionBackground";
import { processSteps } from "../lib/content";
import { fadeInUp, staggerContainer, viewportOnce } from "../lib/motion";

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
      <SectionBackground variant="warm" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="How It Works"
          title="From idea to live website in three steps"
          description="A simple, transparent process — no surprises."
        />

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.12)}
        >
          {processSteps.map((item, index) => (
            <motion.div key={item.step} variants={fadeInUp} className="relative">
              {index < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] right-[calc(-50%+2rem)] h-px bg-gradient-to-r from-[#db7d30]/40 to-transparent" />
              )}
              <div className="text-center md:text-left">
                <motion.span
                  className="inline-block text-4xl font-bold bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] bg-clip-text text-transparent mb-4"
                  whileInView={{ opacity: [0, 1], y: [12, 0] }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {item.step}
                </motion.span>
                <h3 className="text-white text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
