import { motion } from "motion/react";
import { fadeInUp, viewportOnce } from "../../lib/motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      className={`max-w-2xl mb-14 md:mb-16 ${alignClass}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeInUp}
    >
      <span className="text-[#edcca5] uppercase tracking-wider text-sm mb-3 block">
        {eyebrow}
      </span>
      <h2 className="text-white text-2xl md:text-3xl mb-3">{title}</h2>
      {description && <p className="text-gray-400">{description}</p>}
    </motion.div>
  );
}
