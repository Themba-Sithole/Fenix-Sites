import { ArrowRight, ExternalLink, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export function FeaturedProjects() {
  const featuredProjects = [
    {
      title: "TechStore E-Commerce Revolution",
      category: "E-Commerce Platform",
      description: "Transformed a traditional retail business into a thriving online marketplace with seamless checkout, inventory management, and personalized recommendations.",
      image: "https://images.unsplash.com/photo-1680499661732-3cfae4690e1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ258ZW58MXx8fHwxNzYyODc5NDQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      metrics: [
        { label: "Sales Increase", value: "+250%" },
        { label: "Page Speed", value: "98/100" },
        { label: "Conversion Rate", value: "+180%" }
      ],
      tags: ["React", "Node.js", "Stripe", "AWS"],
      featured: true
    },
    {
      title: "DataMetrics Analytics Platform",
      category: "SaaS Dashboard",
      description: "Built a comprehensive analytics platform with real-time data visualization, custom reporting, and advanced filtering capabilities for enterprise clients.",
      image: "https://images.unsplash.com/photo-1597534458220-9fb4969f2df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd2Vic2l0ZXxlbnwxfHx8fDE3NjI4ODc5ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      metrics: [
        { label: "Active Users", value: "10,000+" },
        { label: "Data Processed", value: "5TB/day" },
        { label: "Uptime", value: "99.9%" }
      ],
      tags: ["Next.js", "TypeScript", "PostgreSQL", "D3.js"],
      featured: true
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#cd3f2c]/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Scanning lines */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#db7d30]/30 to-transparent"
          style={{ top: `${30 + i * 20}%` }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scaleX: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5
          }}
        />
      ))}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#edcca5] uppercase tracking-wider mb-4 block">
            Featured Work
          </span>
          <h2 className="text-white mb-4">
            Case Studies That Speak for Themselves
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Dive deep into some of our most impactful projects and see the measurable results we've achieved for our clients
          </p>
        </motion.div>

        <div className="space-y-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className={`bg-white/5 border-white/10 backdrop-blur-2xl overflow-hidden hover:border-[#db7d30]/50 transition-all duration-300 ${
                index % 2 === 0 ? '' : ''
              }`}>
                <div className={`grid lg:grid-cols-2 gap-8 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  {/* Image */}
                  <motion.div 
                    className={`relative aspect-video lg:aspect-auto overflow-hidden ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Featured badge */}
                    {project.featured && (
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]">
                        Featured Project
                      </Badge>
                    )}
                  </motion.div>

                  {/* Content */}
                  <div className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <span className="text-[#edcca5] text-sm mb-3 block">
                      {project.category}
                    </span>
                    <h3 className="text-white mb-4">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-6">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-white/10">
                      {project.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex}>
                          <div className="flex items-center gap-1 mb-1">
                            <TrendingUp className="w-3 h-3 text-[#db7d30]" />
                            <span className="text-xl font-bold bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] bg-clip-text text-transparent">
                              {metric.value}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">{metric.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="outline"
                          className="border-[#edcca5]/20 text-gray-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex gap-3">
                      <Button 
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        View Case Study
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA to portfolio */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/portfolio">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] hover:from-[#b33624] hover:to-[#c56d28]"
            >
              View All Projects
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
