import { motion } from "motion/react";
import { qualitySignals } from "../lib/content";

export function MarqueeBar() {
  const items = [...qualitySignals, ...qualitySignals];

  return (
    <section className="relative py-5 sm:py-6 border-y border-white/[0.06] bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />
      <div className="relative">
        <motion.div
          className="flex gap-10 sm:gap-14 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-10 sm:gap-14 shrink-0"
            >
              <span className="font-display text-sm sm:text-base font-semibold tracking-[0.18em] uppercase text-gray-500 hover:text-[#db7d30]/80 transition-colors">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#cd3f2c] to-[#db7d30] shadow-[0_0_8px_rgba(219,125,48,0.5)]" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
