import { ExternalLink, Filter, TrendingUp, Star, Award, Clock } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "A modern e-commerce solution with seamless checkout and inventory management",
      image: "https://images.unsplash.com/photo-1680499661732-3cfae4690e1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ258ZW58MXx8fHwxNzYyODc5NDQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["React", "Node.js", "Stripe"],
      client: "TechStore Inc.",
      duration: "3 months",
      result: "+250% Sales",
      filter: "ecommerce"
    },
    {
      title: "Creative Agency Website",
      category: "Design & Development",
      description: "Award-winning portfolio site with stunning animations and interactive elements",
      image: "https://images.unsplash.com/photo-1519217651866-847339e674d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjI4OTQyMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["UI/UX", "Tailwind", "Motion"],
      client: "Design Studio Co.",
      duration: "2 months",
      result: "+180% Traffic",
      filter: "design"
    },
    {
      title: "SaaS Dashboard",
      category: "Web Application",
      description: "Comprehensive analytics platform with real-time data visualization",
      image: "https://images.unsplash.com/photo-1597534458220-9fb4969f2df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd2Vic2l0ZXxlbnwxfHx8fDE3NjI4ODc5ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Next.js", "TypeScript", "Charts"],
      client: "DataMetrics",
      duration: "4 months",
      result: "10k+ Users",
      filter: "webapp"
    },
    {
      title: "Restaurant Booking System",
      category: "Web Development",
      description: "Online reservation platform with table management and menu showcase",
      image: "https://images.unsplash.com/photo-1682778418768-16081e4470a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwd2Vic2l0ZSUyMGRlc2lnbnxlbnwxfHx8fDE3NjI5NTc5ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["React", "Firebase", "Payments"],
      client: "Bella Cucina",
      duration: "2.5 months",
      result: "+300% Bookings",
      filter: "ecommerce"
    },
    {
      title: "Fitness Mobile App",
      category: "Mobile Development",
      description: "Cross-platform fitness tracking app with workout plans and progress analytics",
      image: "https://images.unsplash.com/photo-1591311630200-ffa9120a540f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYXBwJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2Mjg3OTc0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["React Native", "API", "Analytics"],
      client: "FitLife Pro",
      duration: "5 months",
      result: "50k Downloads",
      filter: "mobile"
    },
    {
      title: "Real Estate Portal",
      category: "Web Application",
      description: "Property listing platform with advanced search and virtual tours",
      image: "https://images.unsplash.com/photo-1687075430355-ed8df51c1670?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwd2Vic2l0ZXxlbnwxfHx8fDE3NjI5NDkyMzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Next.js", "Maps API", "CMS"],
      client: "Prime Properties",
      duration: "4 months",
      result: "+220% Leads",
      filter: "webapp"
    },
    {
      title: "Designer Portfolio",
      category: "Portfolio Website",
      description: "Minimalist portfolio showcasing creative work with smooth transitions",
      image: "https://images.unsplash.com/photo-1659841064804-5f507b1b488a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjB3ZWJzaXRlJTIwbW9ja3VwfGVufDF8fHx8MTc2Mjk1Nzk4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Webflow", "Animation", "SEO"],
      client: "Sarah Martinez",
      duration: "1.5 months",
      result: "+400% Inquiries",
      filter: "design"
    },
    {
      title: "Mobile Banking App",
      category: "Mobile Development",
      description: "Secure banking application with biometric authentication and instant transfers",
      image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzYyODg2Njk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Flutter", "Security", "Cloud"],
      client: "FinTech Solutions",
      duration: "6 months",
      result: "100k+ Users",
      filter: "mobile"
    },
    {
      title: "Corporate Website Redesign",
      category: "Web Development",
      description: "Modern corporate site with integrated CRM and lead generation tools",
      image: "https://images.unsplash.com/photo-1621857093087-7daa85ab14a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB3ZWJzaXRlfGVufDF8fHx8MTc2Mjg5Nzg3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["WordPress", "PHP", "Marketing"],
      client: "Global Enterprises",
      duration: "3 months",
      result: "+150% Conversions",
      filter: "design"
    }
  ];

  const categories = [
    { id: "all", label: "All Projects", count: projects.length },
    { id: "ecommerce", label: "E-Commerce", count: projects.filter(p => p.filter === "ecommerce").length },
    { id: "webapp", label: "Web Apps", count: projects.filter(p => p.filter === "webapp").length },
    { id: "mobile", label: "Mobile", count: projects.filter(p => p.filter === "mobile").length },
    { id: "design", label: "Design", count: projects.filter(p => p.filter === "design").length },
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(p => p.filter === activeFilter);

  const achievements = [
    { icon: Award, value: "45+", label: "Awards Won" },
    { icon: Star, value: "4.9/5", label: "Client Rating" },
    { icon: TrendingUp, value: "200%", label: "Avg. ROI" },
    { icon: Clock, value: "On-Time", label: "Delivery Rate" },
  ];

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Animated tech lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#cd3f2c]/30 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[#cd3f2c]/30" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-[#cd3f2c]/30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-[#cd3f2c]/30" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#cd3f2c]/30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#edcca5] uppercase tracking-wider mb-4 block">
            Portfolio
          </span>
          <h2 className="text-white mb-4">
            Our Recent Masterpieces
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our diverse portfolio of successful projects across industries. Each project represents our commitment to excellence and innovation.
          </p>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6 text-center">
                <achievement.icon className="w-8 h-8 text-[#edcca5] mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] bg-clip-text text-transparent mb-1">
                  {achievement.value}
                </div>
                <p className="text-gray-400 text-sm">{achievement.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                variant={activeFilter === category.id ? "default" : "outline"}
                className={`${
                  activeFilter === category.id
                    ? "bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] hover:from-[#b33624] hover:to-[#c56d28]"
                    : "border-white/20 text-white hover:bg-white/10"
                }`}
              >
                {category.label}
                <Badge className="ml-2 bg-white/20">{category.count}</Badge>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Portfolio grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              layout
            >
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-white/5 border-white/10 overflow-hidden group cursor-pointer hover:border-[#db7d30]/50 transition-all duration-300 h-full flex flex-col">
                  {/* Project image */}
                  <div className="relative aspect-video overflow-hidden bg-gray-800">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <div className="flex items-center gap-2 text-white">
                        <span>View Project</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                    
                    {/* Result badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]">
                        {project.result}
                      </Badge>
                    </div>
                  </div>

                  {/* Project info */}
                  <div className="p-6 flex-grow flex flex-col">
                    <span className="text-sm text-[#edcca5] mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 flex-grow">
                      {project.description}
                    </p>
                    
                    {/* Client & Duration */}
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-4 pb-4 border-b border-white/10">
                      <span>Client: {project.client}</span>
                      <span>{project.duration}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
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
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-[#cd3f2c]/10 to-[#db7d30]/10 border-[#db7d30]/50 p-12">
            <h3 className="text-white mb-4">Have a Project in Mind?</h3>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Let's collaborate to create something extraordinary. Our team is ready to turn your vision into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] hover:from-[#b33624] hover:to-[#c56d28]">
                  Start Your Project
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  View Our Services
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
