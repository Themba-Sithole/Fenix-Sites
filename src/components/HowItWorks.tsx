import { motion } from "motion/react";
import { SectionHeader } from "./ui/SectionHeader";
import { processSteps } from "../lib/content";
import { fadeInUp, staggerContainer, viewportOnce } from "../lib/motion";

export function HowItWorks() {
  return (
    <section className="py-24 md:py-32 bg-[#030303] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(219,125,48,0.06),transparent)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Our Process"
          title="Precision at every stage"
          description="A refined workflow that keeps you informed and delivers on time."
          align="center"
          large
        />

        <motion.div
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto relative"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.15)}
        >
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[2.75rem] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-[#db7d30]/30 to-transparent" />

          {processSteps.map((item) => (
            <motion.div key={item.step} variants={fadeInUp} className="relative">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 text-center hover:border-[#db7d30]/25 hover:bg-white/[0.04] transition-all duration-500 h-full">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#cd3f2c]/20 to-[#db7d30]/20 border border-[#db7d30]/20 mb-6 relative z-10">
                  <span className="text-[#edcca5] font-bold text-sm">{item.step}</span>
                </div>
                <h3 className="text-white text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
