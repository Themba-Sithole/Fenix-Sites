import { motion } from "motion/react";
import { qualitySignals } from "../lib/content";

export function MarqueeBar() {
  const items = [...qualitySignals, ...qualitySignals];

  return (
    <section className="py-6 border-y border-white/[0.06] bg-black overflow-hidden">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-12 text-sm text-gray-500 tracking-wide uppercase"
            >
              <span>{item}</span>
              <span className="w-1 h-1 rounded-full bg-[#db7d30]/60" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
