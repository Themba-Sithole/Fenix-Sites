import { motion } from "motion/react";

type SectionBackgroundProps = {
  variant?: "default" | "warm" | "cool";
};

export function SectionBackground({ variant = "default" }: SectionBackgroundProps) {
  const primary =
    variant === "warm"
      ? "bg-[#db7d30]/10"
      : variant === "cool"
        ? "bg-[#edcca5]/10"
        : "bg-[#cd3f2c]/10";

  const secondary =
    variant === "warm"
      ? "bg-[#cd3f2c]/10"
      : variant === "cool"
        ? "bg-[#db7d30]/10"
        : "bg-[#db7d30]/10";

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className={`absolute -top-20 -left-20 w-80 h-80 ${primary} rounded-full blur-3xl`}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`absolute -bottom-20 -right-20 w-80 h-80 ${secondary} rounded-full blur-3xl`}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.35, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
