import { motion } from "motion/react";
import { fadeInUp, viewportOnce } from "../../lib/motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  large?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  large = false,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

  return (
    <motion.div
      className={`flex flex-col max-w-3xl mb-16 md:mb-20 ${alignClass}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeInUp}
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="w-8 h-px bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]" />
        <span className="text-[#edcca5] uppercase tracking-[0.2em] text-xs font-medium">
          {eyebrow}
        </span>
      </div>
      <h2
        className={`text-white font-semibold leading-[1.1] tracking-tight mb-4 ${
          large ? "text-3xl sm:text-4xl md:text-5xl" : "text-2xl sm:text-3xl md:text-4xl"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </motion.div>
  );
}
