import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

type BrowserFrameProps = {
  image: string;
  title: string;
  url?: string;
  className?: string;
  delay?: number;
};

export function BrowserFrame({
  image,
  title,
  url = "fenixsites.co.za",
  className = "",
  delay = 0,
}: BrowserFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-black/50 ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#cd3f2c]/80" />
          <span className="w-3 h-3 rounded-full bg-[#db7d30]/80" />
          <span className="w-3 h-3 rounded-full bg-[#edcca5]/60" />
        </div>
        <div className="flex-1 mx-2">
          <div className="bg-white/5 rounded-md px-3 py-1 text-[10px] text-gray-500 text-center truncate">
            {url}
          </div>
        </div>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}
