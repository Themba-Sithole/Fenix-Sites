import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { Code2, Palette, Server, Smartphone, Database, Cloud, Zap, Shield } from "lucide-react";

export function TechStack() {
  const categories = [
    {
      title: "Frontend",
      icon: Code2,
      color: "from-[#cd3f2c] to-[#db7d30]",
      technologies: [
        { name: "React", expertise: 95 },
        { name: "Next.js", expertise: 90 },
        { name: "TypeScript", expertise: 92 },
        { name: "Tailwind CSS", expertise: 98 },
        { name: "Vue.js", expertise: 85 },
        { name: "Motion/Framer", expertise: 88 }
      ]
    },
    {
      title: "Design",
      icon: Palette,
      color: "from-[#db7d30] to-[#edcca5]",
      technologies: [
        { name: "Figma", expertise: 95 },
        { name: "Adobe XD", expertise: 88 },
        { name: "Sketch", expertise: 85 },
        { name: "Photoshop", expertise: 90 },
        { name: "Illustrator", expertise: 87 },
        { name: "After Effects", expertise: 82 }
      ]
    },
    {
      title: "Backend",
      icon: Server,
      color: "from-[#cd3f2c] to-[#edcca5]",
      technologies: [
        { name: "Node.js", expertise: 93 },
        { name: "Python", expertise: 88 },
        { name: "PHP", expertise: 85 },
        { name: "Express", expertise: 90 },
        { name: "GraphQL", expertise: 87 },
        { name: "REST APIs", expertise: 95 }
      ]
    },
    {
      title: "Mobile",
      icon: Smartphone,
      color: "from-[#db7d30] to-[#cd3f2c]",
      technologies: [
        { name: "React Native", expertise: 90 },
        { name: "Flutter", expertise: 85 },
        { name: "Swift", expertise: 80 },
        { name: "Kotlin", expertise: 82 },
        { name: "PWA", expertise: 92 },
        { name: "Ionic", expertise: 78 }
      ]
    },
    {
      title: "Database",
      icon: Database,
      color: "from-[#edcca5] to-[#db7d30]",
      technologies: [
        { name: "MongoDB", expertise: 90 },
        { name: "PostgreSQL", expertise: 92 },
        { name: "MySQL", expertise: 88 },
        { name: "Firebase", expertise: 93 },
        { name: "Redis", expertise: 85 },
        { name: "Supabase", expertise: 87 }
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      color: "from-[#cd3f2c] to-[#db7d30]",
      technologies: [
        { name: "AWS", expertise: 88 },
        { name: "Vercel", expertise: 95 },
        { name: "Docker", expertise: 85 },
        { name: "GitHub Actions", expertise: 90 },
        { name: "Netlify", expertise: 92 },
        { name: "DigitalOcean", expertise: 87 }
      ]
    }
  ];

  const certifications = [
    { name: "AWS Certified", icon: Cloud },
    { name: "Google Analytics", icon: Zap },
    { name: "Security First", icon: Shield },
    { name: "Agile Certified", icon: Code2 }
  ];

  return (
    <section className="py-20 md:py-32 bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#cd3f2c]/50 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#db7d30]/50 to-transparent"
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #cd3f2c 1px, transparent 1px),
              linear-gradient(to bottom, #cd3f2c 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#edcca5] uppercase tracking-wider mb-4 block">
            Technology Stack
          </span>
          <h2 className="text-white mb-4">
            Powered by Cutting-Edge Technology
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We leverage the latest and most powerful technologies to build scalable, performant, and future-proof solutions
          </p>
        </motion.div>

        {/* Tech categories grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-2xl p-6 h-full hover:bg-white/10 hover:border-[#db7d30]/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${category.color} opacity-20 rounded-lg flex items-center justify-center`}>
                    <category.icon className="w-6 h-6 text-[#edcca5]" />
                  </div>
                  <h3 className="text-white">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.technologies.map((tech, techIndex) => (
                    <div key={techIndex}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-300">{tech.name}</span>
                        <span className="text-xs text-[#edcca5]">{tech.expertise}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tech.expertise}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: techIndex * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 backdrop-blur-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-white mb-2">Certified & Trusted</h3>
              <p className="text-gray-400">Industry-recognized certifications and expertise</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center gap-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#cd3f2c]/20 to-[#db7d30]/20 rounded-full flex items-center justify-center">
                    <cert.icon className="w-8 h-8 text-[#edcca5]" />
                  </div>
                  <Badge className="bg-white/5 text-gray-300 border-white/10">
                    {cert.name}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Additional info */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-400 max-w-3xl mx-auto">
            Our team continuously updates their skills and stays ahead of industry trends. We invest in ongoing education and certification to ensure we're always using the best tools for your project.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
