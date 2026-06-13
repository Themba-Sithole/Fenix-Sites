import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { SectionHeader } from "./ui/SectionHeader";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { usePublicProjects } from "../hooks/usePublicProjects";
import { fadeInUp, staggerContainer, viewportOnce } from "../lib/motion";

export function WorkPreview() {
  const { projects, loading } = usePublicProjects({ featuredOnly: true });

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Portfolio"
          title="Work that speaks for itself"
          description="A selection of projects we've delivered for real businesses."
          align="center"
        />

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-[#db7d30] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.12)}
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={fadeInUp}>
                <Card className="bg-white/5 border-white/10 overflow-hidden group hover:border-[#db7d30]/40 transition-all duration-300 h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute bottom-4 left-4 text-[#edcca5] text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-white font-medium mb-2">{project.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="text-center mt-12">
          <Link to="/portfolio">
            <Button className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] hover:from-[#b33624] hover:to-[#c56d28]">
              View Full Portfolio
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
