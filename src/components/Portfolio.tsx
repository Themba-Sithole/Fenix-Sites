import { ExternalLink, TrendingUp, Star, Award, Clock } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { usePublicProjects } from "../hooks/usePublicProjects";

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { projects, loading } = usePublicProjects();

  const categories = [
    { id: "all", label: "All Projects", count: projects.length },
    { id: "ecommerce", label: "E-Commerce", count: projects.filter((p) => p.filter === "ecommerce").length },
    { id: "webapp", label: "Web Apps", count: projects.filter((p) => p.filter === "webapp").length },
    { id: "mobile", label: "Mobile", count: projects.filter((p) => p.filter === "mobile").length },
    { id: "design", label: "Design", count: projects.filter((p) => p.filter === "design").length },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.filter === activeFilter);

  const achievements = [
    { icon: Award, value: `${projects.length}+`, label: "Projects Delivered" },
    { icon: Star, value: "5/5", label: "Client Rating" },
    { icon: TrendingUp, value: "100%", label: "Satisfaction" },
    { icon: Clock, value: "On-Time", label: "Delivery" },
  ];

  if (loading) {
    return (
      <section className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-8 h-8 border-2 border-[#db7d30] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#edcca5] uppercase tracking-wider mb-4 block">Portfolio</span>
          <h2 className="text-white mb-4">Our Recent Work</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore projects we&apos;ve built for businesses across South Africa.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {achievements.map((achievement, index) => (
            <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-xl p-6 text-center">
              <achievement.icon className="w-8 h-8 text-[#edcca5] mx-auto mb-3" />
              <div className="text-2xl font-bold bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] bg-clip-text text-transparent mb-1">
                {achievement.value}
              </div>
              <p className="text-gray-400 text-sm">{achievement.label}</p>
            </Card>
          ))}
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              variant={activeFilter === category.id ? "default" : "outline"}
              className={
                activeFilter === category.id
                  ? "bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]"
                  : "border-white/20 text-white hover:bg-white/10"
              }
            >
              {category.label}
              <Badge className="ml-2 bg-white/20">{category.count}</Badge>
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500 text-lg mb-2">No projects to show yet</p>
              <p className="text-gray-600 text-sm">
                Projects marked &quot;Show in Portfolio&quot; in the admin will appear here.
              </p>
            </div>
          ) : (
            filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <Card className="bg-white/5 border-white/10 overflow-hidden group hover:border-[#db7d30]/50 transition-all h-full flex flex-col">
                <div className="relative aspect-video overflow-hidden bg-gray-800">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {project.result && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]">
                        {project.result}
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <span className="text-sm text-[#edcca5] mb-2 block">{project.category}</span>
                  <h3 className="text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">{project.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-4 pb-4 border-b border-white/10">
                    <span>Client: {project.client}</span>
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-[#edcca5]/20 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm text-[#edcca5] hover:underline"
                    >
                      Visit site <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
            ))
          )}
        </div>

        <Card className="bg-gradient-to-br from-[#cd3f2c]/10 to-[#db7d30]/10 border-[#db7d30]/50 p-12 text-center">
          <h3 className="text-white mb-4">Have a Project in Mind?</h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Let&apos;s collaborate to create something extraordinary for your business.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]">
              Start Your Project
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </Card>
      </div>
    </section>
  );
}
