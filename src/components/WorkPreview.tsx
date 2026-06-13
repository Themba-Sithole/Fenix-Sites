import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { SectionHeader } from "./ui/SectionHeader";
import { SectionBackground } from "./ui/SectionBackground";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { usePublicProjects } from "../hooks/usePublicProjects";
import { fadeInUp, staggerContainer, viewportOnce } from "../lib/motion";

export function WorkPreview() {
  const { projects, loading } = usePublicProjects({ featuredOnly: true });

  return (
    <section className="py-20 md:py-28 bg-gray-950 relative overflow-hidden">
      <SectionBackground variant="cool" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Recent Work"
          title="Sites we've built for real businesses"
          description="A sample of the kind of work we deliver — see the full portfolio for more."
        />

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#db7d30] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.15)}
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={fadeInUp}>
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl overflow-hidden group hover:border-[#db7d30]/40 transition-colors h-full">
                  <motion.div
                    className="relative aspect-[16/10] overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.35 }}
                  >
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 text-[#edcca5] text-sm">
                      {project.category}
                    </span>
                  </motion.div>
                  <div className="p-6">
                    <h3 className="text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400 text-sm">{project.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
        >
          <Link to="/portfolio">
            <Button className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] hover:from-[#b33624] hover:to-[#c56d28]">
              View Full Portfolio
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
