import { Target, Users, Zap, Award, Clock, Shield, Rocket, TrendingUp, CheckCircle2 } from "lucide-react";
import { Card } from "./ui/card";
import { motion } from "motion/react";

export function WhyChooseUs() {
  const reasons = [
    {
      icon: Target,
      title: "Results-Driven Approach",
      description: "We focus on delivering measurable outcomes that directly impact your bottom line. Every decision is backed by data and aligned with your business goals.",
      stats: "200% avg. ROI increase"
    },
    {
      icon: Users,
      title: "Dedicated Expert Team",
      description: "Work with a team of seasoned professionals who bring diverse expertise in design, development, and digital strategy to every project.",
      stats: "50+ specialists on staff"
    },
    {
      icon: Zap,
      title: "Lightning-Fast Delivery",
      description: "Our agile methodology and efficient workflows ensure rapid project completion without compromising on quality or attention to detail.",
      stats: "30% faster than industry avg."
    },
    {
      icon: Award,
      title: "Award-Winning Quality",
      description: "Our work has been recognized with 45+ industry awards, showcasing our commitment to excellence and innovative design solutions.",
      stats: "45+ awards won"
    },
    {
      icon: Clock,
      title: "Always On Support",
      description: "Get 24/7 access to our support team and enjoy ongoing maintenance, updates, and technical assistance long after launch.",
      stats: "24/7 support available"
    },
    {
      icon: Shield,
      title: "Security First",
      description: "We implement industry-leading security practices and compliance standards to protect your data and ensure peace of mind.",
      stats: "Zero security breaches"
    }
  ];

  const differentiators = [
    "Transparent pricing with no hidden fees",
    "Agile development methodology",
    "Regular progress updates and demos",
    "Post-launch training and documentation",
    "Scalable architecture for future growth",
    "Mobile-first responsive design",
    "SEO optimization included",
    "Performance monitoring and analytics"
  ];

  const processSteps = [
    { step: "01", title: "Discover", description: "We dive deep into your business, goals, and target audience" },
    { step: "02", title: "Design", description: "Create stunning visuals and interactive prototypes" },
    { step: "03", title: "Develop", description: "Build with clean code and best practices" },
    { step: "04", title: "Deploy", description: "Launch and optimize for peak performance" }
  ];

  return (
    <section className="py-20 md:py-32 bg-black relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #cd3f2c 1px, transparent 1px),
              linear-gradient(to bottom, #cd3f2c 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Glowing orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute -top-48 -left-48 w-96 h-96 bg-[#cd3f2c]/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-48 -right-48 w-96 h-96 bg-[#db7d30]/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, -100, 0],
            y: [0, -50, 0]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
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
            Why Choose Us
          </span>
          <h2 className="text-white mb-4">
            Your Success Is Our Mission
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We're not just another web agency. We're your strategic partner in digital transformation, committed to delivering exceptional results.
          </p>
        </motion.div>

        {/* Main reasons grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-2xl p-8 h-full hover:bg-white/10 hover:border-[#db7d30]/50 transition-all duration-300 relative overflow-hidden group">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#cd3f2c]/5 to-[#db7d30]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-br from-[#cd3f2c]/20 to-[#db7d30]/20 rounded-lg flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <reason.icon className="w-7 h-7 text-[#edcca5]" />
                  </motion.div>
                  
                  <h3 className="text-white mb-3">{reason.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm">
                    {reason.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-[#db7d30]" />
                    <span className="text-[#edcca5]">{reason.stats}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Process overview */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-white mb-2">Our Proven Process</h3>
            <p className="text-gray-400">A streamlined approach that delivers results</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connection line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#db7d30] to-transparent -z-10" />
                )}
                
                <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 backdrop-blur-2xl p-6 text-center hover:border-[#db7d30]/50 transition-all duration-300">
                  <div className="text-5xl font-bold bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] bg-clip-text text-transparent mb-3">
                    {item.step}
                  </div>
                  <h4 className="text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Differentiators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-[#cd3f2c]/10 to-[#db7d30]/10 border-[#db7d30]/50 backdrop-blur-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <Rocket className="w-12 h-12 text-[#edcca5] mx-auto mb-4" />
              <h3 className="text-white mb-2">What Sets Us Apart</h3>
              <p className="text-gray-400">Comprehensive solutions that go beyond just design and development</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {differentiators.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#db7d30] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { value: "98%", label: "On-Time Delivery" },
            { value: "4.9/5", label: "Client Rating" },
            { value: "500+", label: "Projects Launched" },
            { value: "100%", label: "Satisfaction Guarantee" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
