import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { BrowserFrame } from "./ui/BrowserFrame";
import { SectionHeader } from "./ui/SectionHeader";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { usePublicProjects } from "../hooks/usePublicProjects";
import { fadeInUp, scaleIn, staggerContainer, viewportOnce } from "../lib/motion";

export function WorkPreview() {
  const { projects, loading } = usePublicProjects({ featuredOnly: true });
  const [featured, ...rest] = projects;

  return (
    <section className="py-24 md:py-32 bg-[#030303] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#cd3f2c]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <SectionHeader
            eyebrow="Selected Work"
            title="Craft you'd expect from a top studio"
            description="Every project is custom-built — no templates, no shortcuts."
            align="left"
            large
          />
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-2 text-[#edcca5] hover:text-white transition-colors shrink-0 md:mb-20"
          >
            <span className="text-sm font-medium">View all projects</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#db7d30] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.12)}
            className="grid lg:grid-cols-12 gap-6"
          >
            {/* Featured large project */}
            {featured && (
              <motion.div variants={scaleIn} className="lg:col-span-7">
                <Link to="/portfolio" className="block group">
                  <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.02]">
                    <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[480px] overflow-hidden">
                      <ImageWithFallback
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <span className="text-[#edcca5] text-xs uppercase tracking-wider mb-2 block">
                          {featured.category}
                        </span>
                        <h3 className="text-white text-2xl md:text-3xl font-semibold mb-2">
                          {featured.title}
                        </h3>
                        <p className="text-gray-400 text-sm max-w-md">{featured.description}</p>
                      </div>
                      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Secondary projects in browser frames */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {rest.map((project, i) => (
                <motion.div key={project.id} variants={fadeInUp}>
                  <Link to="/portfolio" className="block group">
                    <BrowserFrame
                      image={project.image}
                      title={project.title}
                      url={project.title.toLowerCase().replace(/\s+/g, "-") + ".co.za"}
                      delay={i * 0.1}
                      className="group-hover:border-[#db7d30]/30 transition-colors duration-500"
                    />
                    <div className="mt-3 px-1">
                      <p className="text-white text-sm font-medium group-hover:text-[#edcca5] transition-colors">
                        {project.title}
                      </p>
                      <p className="text-gray-500 text-xs">{project.category}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}

              {projects.length === 1 && (
                <motion.div variants={fadeInUp}>
                  <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center h-full flex flex-col items-center justify-center min-h-[200px]">
                    <p className="text-gray-500 text-sm mb-4">More projects coming soon</p>
                    <Link to="/portfolio" className="text-[#edcca5] text-sm hover:text-white transition-colors">
                      View portfolio →
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
