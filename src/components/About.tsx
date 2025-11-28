import { ArrowRight, Zap, Users, Target, Lightbulb, Heart, CheckCircle2, Award, TrendingUp, Globe2, Rocket, Shield, Sparkles, Star, Cpu } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import founderPhoto from "figma:asset/c8212e5935a1bd6d32d38a5dbec874a17965bd09.png";

export function About() {
  const coreValues = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We constantly push boundaries and embrace cutting-edge technologies to deliver groundbreaking solutions."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Every project is crafted with dedication and enthusiasm, ensuring exceptional quality in everything we do."
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "We build trust through transparency, honesty, and ethical practices in all our client relationships."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for perfection in every detail, delivering results that exceed expectations consistently."
    }
  ];

  const teamMembers = [
    {
      name: "Themba Sithole",
      role: "Founder & Full-Stack Developer",
      initials: "AS",
      expertise: "Web Development & Digital Innovation",
      photo: "figma:asset/c8212e5935a1bd6d32d38a5dbec874a17965bd09.png"
    }
  ];

  const milestones = [
  {
    year: "2024",
    title: "FenixSites Launched",
    description: "Started the agency to provide modern, high-quality digital solutions."
  },
  {
    year: "2024",
    title: "First Client Project",
    description: "Successfully completed our first official client website — the beginning of many."
  },
  {
    year: "2024",
    title: "Brand Identity Finalised",
    description: "Created our visual identity, mission, and long-term vision."
  },
  {
    year: "2025",
    title: "Expanding Services",
    description: "Introduced UI/UX design, branding, and SEO as part of our offering."
  },
  {
    year: "2025",
    title: "Growing Client Base",
    description: "Reached our first 20 active clients and built long-term partnerships."
  }
];


  const stats = [
    { icon: Users, value: "2", label: "Happy Clients" },
    { icon: Globe2, value: "Fresh", label: "New Agency" },
    { icon: Award, value: "100%", label: "Dedication" },
    { icon: Rocket, value: "Growing", label: "Fast & Innovative" }
  ];

  const expertise = [
    "Custom Web Development",
    "E-Commerce Solutions",
    "Mobile App Development",
    "UI/UX Design",
    "SEO & Marketing",
    "Cloud Solutions",
    "API Integration",
    "Performance Optimization"
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-black relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #cd3f2c 1px, transparent 1px),
              linear-gradient(to bottom, #cd3f2c 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'center top'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Glowing orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#cd3f2c]/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#db7d30]/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ULTIMATE FUTURISTIC HERO SECTION */}
        <motion.div
          className="mb-20 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* 3D Glass Card Container */}
          <div className="relative">
            {/* Main glass morphism card */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl -z-10">
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#cd3f2c]/10 via-transparent to-[#db7d30]/10 rounded-3xl" />
              
              {/* Animated holographic overlay */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-30"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 20%, rgba(205, 63, 44, 0.2) 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 80%, rgba(219, 125, 48, 0.2) 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 20%, rgba(205, 63, 44, 0.2) 0%, transparent 50%)',
                  ]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Multiple scanning lines */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 overflow-hidden rounded-3xl"
                  style={{ pointerEvents: 'none' }}
                >
                  <motion.div
                    className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#edcca5]/60 to-transparent blur-sm"
                    animate={{
                      y: ['0%', '100%'],
                    }}
                    transition={{
                      duration: 5 + i,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 1.5,
                    }}
                  />
                </motion.div>
              ))}

              {/* Corner accent lights */}
              <motion.div 
                className="absolute top-0 left-0 w-40 h-40 border-t-[3px] border-l-[3px] border-[#cd3f2c]/60 rounded-tl-3xl"
                animate={{
                  opacity: [0.4, 1, 0.4],
                  boxShadow: [
                    '0 0 20px rgba(205, 63, 44, 0)',
                    '0 0 40px rgba(205, 63, 44, 0.5)',
                    '0 0 20px rgba(205, 63, 44, 0)',
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <motion.div 
                className="absolute top-0 right-0 w-40 h-40 border-t-[3px] border-r-[3px] border-[#db7d30]/60 rounded-tr-3xl"
                animate={{
                  opacity: [0.4, 1, 0.4],
                  boxShadow: [
                    '0 0 20px rgba(219, 125, 48, 0)',
                    '0 0 40px rgba(219, 125, 48, 0.5)',
                    '0 0 20px rgba(219, 125, 48, 0)',
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 w-40 h-40 border-b-[3px] border-l-[3px] border-[#edcca5]/60 rounded-bl-3xl"
                animate={{
                  opacity: [0.4, 1, 0.4],
                  boxShadow: [
                    '0 0 20px rgba(237, 204, 165, 0)',
                    '0 0 40px rgba(237, 204, 165, 0.5)',
                    '0 0 20px rgba(237, 204, 165, 0)',
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1,
                }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 w-40 h-40 border-b-[3px] border-r-[3px] border-[#cd3f2c]/60 rounded-br-3xl"
                animate={{
                  opacity: [0.4, 1, 0.4],
                  boxShadow: [
                    '0 0 20px rgba(205, 63, 44, 0)',
                    '0 0 40px rgba(205, 63, 44, 0.5)',
                    '0 0 20px rgba(205, 63, 44, 0)',
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1.5,
                }}
              />

              {/* Floating energy orbs */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`orb-${i}`}
                  className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-[#edcca5] to-[#db7d30]"
                  style={{
                    left: `${15 + i * 15}%`,
                    top: `${10 + (i % 2) * 70}%`,
                    boxShadow: '0 0 20px rgba(237, 204, 165, 0.6)',
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.sin(i) * 20, 0],
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}

              {/* Digital rain particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-px h-8 bg-gradient-to-b from-[#edcca5]/50 to-transparent"
                  style={{
                    left: `${5 + i * 5}%`,
                  }}
                  animate={{
                    y: ['-10%', '110%'],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "linear"
                  }}
                />
              ))}

              {/* Hexagon pattern overlay */}
              <div className="absolute inset-0 opacity-10 rounded-3xl overflow-hidden">
                <motion.div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23cd3f2c' stroke-width='0.5'/%3E%3C/svg%3E")`,
                  }}
                  animate={{
                    backgroundPosition: ['0px 0px', '60px 60px'],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl p-10 md:p-16 relative">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left content */}
                <div className="space-y-6">
                  <motion.div 
                    className="inline-block relative"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Cyber badge */}
                    <div className="relative inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-[#cd3f2c]/20 to-[#db7d30]/20 backdrop-blur-xl rounded-full border border-white/30">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#cd3f2c]/30 to-[#db7d30]/30 rounded-full blur-xl"
                        animate={{
                          opacity: [0.5, 1, 0.5],
                          scale: [0.95, 1.05, 0.95],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                      <motion.div
                        className="w-2.5 h-2.5 bg-[#cd3f2c] rounded-full relative z-10"
                        animate={{
                          opacity: [1, 0.3, 1],
                          boxShadow: [
                            '0 0 10px rgba(205, 63, 44, 0.5)',
                            '0 0 20px rgba(205, 63, 44, 1)',
                            '0 0 10px rgba(205, 63, 44, 0.5)',
                          ]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      />
                      <span className="text-[#edcca5] uppercase tracking-[0.25em] relative z-10 flex items-center gap-2">
                        <Cpu className="w-4 h-4" />
                        Who We Are
                      </span>
                    </div>
                  </motion.div>
                  
                  <motion.h2 
                    className="text-white leading-tight relative"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    We're{" "}
                    <motion.span 
                      className="relative inline-block"
                      animate={{
                        textShadow: [
                          '0 0 20px rgba(205, 63, 44, 0)',
                          '0 0 30px rgba(205, 63, 44, 0.8), 0 0 60px rgba(205, 63, 44, 0.4)',
                          '0 0 20px rgba(205, 63, 44, 0)',
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    >
                      <span className="bg-gradient-to-r from-[#cd3f2c] via-[#db7d30] to-[#edcca5] bg-clip-text text-transparent">
                        Digital Innovators
                      </span>
                      {/* Animated underline */}
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#cd3f2c] via-[#db7d30] to-[#edcca5] rounded-full"
                        animate={{
                          opacity: [0.5, 1, 0.5],
                          scaleX: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    </motion.span>
                    <br />
                    Transforming Ideas Into{" "}
                    <motion.span
                      className="relative inline-block"
                      animate={{
                        textShadow: [
                          '0 0 20px rgba(219, 125, 48, 0)',
                          '0 0 30px rgba(219, 125, 48, 0.8), 0 0 60px rgba(219, 125, 48, 0.4)',
                          '0 0 20px rgba(219, 125, 48, 0)',
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: 1.5,
                      }}
                    >
                      <span className="bg-gradient-to-r from-[#db7d30] via-[#edcca5] to-[#cd3f2c] bg-clip-text text-transparent">
                        Digital Reality
                      </span>
                    </motion.span>
                  </motion.h2>
                  
                  <motion.p 
                    className="text-gray-300 text-lg leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    At FenixSites, we blend cutting-edge technology with creative excellence to deliver 
                    <span className="text-[#edcca5]"> transformative digital experiences</span>. From concept to reality, 
                    we're your partners in digital innovation.
                  </motion.p>

                  {/* Feature highlights */}
                  <motion.div 
                    className="grid grid-cols-2 gap-4 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    {[
                      { icon: Sparkles, text: "Future-Ready Tech" },
                      { icon: Zap, text: "Lightning Fast" },
                      { icon: Shield, text: "Secure & Reliable" },
                      { icon: Star, text: "100% Dedicated" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-xl rounded-lg border border-white/10"
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          borderColor: 'rgba(219, 125, 48, 0.5)',
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-[#cd3f2c]/20 to-[#db7d30]/20 rounded-lg flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-[#edcca5]" />
                        </div>
                        <span className="text-sm text-gray-300">{item.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <Link to="/contact">
                    <motion.div
                      className="inline-flex items-center gap-3 group mt-4"
                      whileHover={{ x: 5 }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="relative">
                        <motion.div
                          className="absolute -inset-2 bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] rounded-lg blur-lg"
                          animate={{
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                        <div className="relative px-6 py-3 bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] rounded-lg text-white flex items-center gap-2">
                          <span>Start Your Journey</span>
                          <motion.div
                            animate={{
                              x: [0, 5, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                            }}
                          >
                            <ArrowRight className="w-5 h-5" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </div>

                {/* Right visual elements */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {/* Floating stats cards */}
                  <div className="relative h-96">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        className="absolute w-40 p-4 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-xl"
                        style={{
                          left: `${(index % 2) * 50}%`,
                          top: `${Math.floor(index / 2) * 50}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          rotate: [0, 5, 0, -5, 0],
                        }}
                        transition={{
                          duration: 5 + index,
                          repeat: Infinity,
                          delay: index * 0.5,
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          borderColor: 'rgba(237, 204, 165, 0.5)',
                        }}
                      >
                        <motion.div
                          animate={{
                            rotate: 360,
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        >
                          <stat.icon className="w-8 h-8 text-[#edcca5] mb-2" />
                        </motion.div>
                        <div className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] bg-clip-text text-transparent mb-1">
                          {stat.value}
                        </div>
                        <p className="text-gray-400 text-xs">{stat.label}</p>
                      </motion.div>
                    ))}

                    {/* Center glowing core */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32"
                      animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: {
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear"
                        },
                        scale: {
                          duration: 3,
                          repeat: Infinity,
                        }
                      }}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-[#cd3f2c]/30 to-[#db7d30]/30 rounded-full blur-2xl" />
                      <motion.div
                        className="absolute inset-4 bg-gradient-to-br from-[#cd3f2c] to-[#db7d30] rounded-full"
                        animate={{
                          boxShadow: [
                            '0 0 40px rgba(205, 63, 44, 0.5)',
                            '0 0 80px rgba(219, 125, 48, 0.8)',
                            '0 0 40px rgba(205, 63, 44, 0.5)',
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid - with glass effect */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6 text-center">
                <stat.icon className="w-8 h-8 text-[#edcca5] mx-auto mb-3" />
                <div className="text-3xl font-bold bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Pioneers Section */}
        <motion.div
          className="grid lg:grid-cols-2 gap-12 mb-20 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#cd3f2c]/20 to-[#db7d30]/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758876203342-fc14c0bba67c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NjI5NDA3NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Digital Transformation"
              className="rounded-lg w-full h-auto relative z-10"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-white">
              Pioneers of <span className="text-[#cd3f2c]">Digital Transformation</span>
            </h3>
            <div className="space-y-4 text-gray-400">
              <p>
                <span className="text-[#edcca5]">We lead the forefront of digital innovation,</span> crafting solutions that 
                redefine how businesses operate online.
              </p>
              <p>
                From startups to enterprises, we architect digital ecosystems that scale, perform, and deliver measurable results.
              </p>
              <p>
                <span className="text-[#edcca5]">Our expertise integrates cutting-edge technologies</span> to create 
                seamless experiences that drive unprecedented growth.
              </p>
            </div>

            {/* Expertise List */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              {expertise.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#db7d30] flex-shrink-0" />
                  <span className="text-sm text-gray-400">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Core Values - with glass effect */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <span className="text-[#edcca5] uppercase tracking-wider mb-4 block">
              Our Values
            </span>
            <h2 className="text-white mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our core values shape every decision we make and every solution we deliver
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6 h-full hover:bg-white/10 hover:border-[#db7d30]/50 transition-all duration-300">
                  <value.icon className="w-10 h-10 text-[#edcca5] mb-4" />
                  <h3 className="text-white mb-2 text-xl">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Journey Timeline */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <span className="text-[#edcca5] uppercase tracking-wider mb-4 block">
              Our Journey
            </span>
            <h2 className="text-white mb-4">
              Milestones of Excellence
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A timeline of growth, innovation, and achievement
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#cd3f2c] via-[#db7d30] to-[#edcca5] hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-1">
                    <Card className={`bg-white/5 border-white/10 backdrop-blur-xl p-6 ${
                      index % 2 === 0 ? 'md:text-right' : ''
                    }`}>
                      <Badge className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] mb-3">
                        {milestone.year}
                      </Badge>
                      <h3 className="text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-400 text-sm">{milestone.description}</p>
                    </Card>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:block w-4 h-4 bg-gradient-to-br from-[#cd3f2c] to-[#db7d30] rounded-full border-4 border-black shadow-lg shadow-[#cd3f2c]/50" />

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team Section - with glass effect */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <span className="text-[#edcca5] uppercase tracking-wider mb-4 block">
              The Founder
            </span>
            <h2 className="text-white mb-4">
              Meet the Visionary
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Passionate developer dedicated to bringing your digital vision to life
            </p>
          </div>

          <div className="flex justify-center">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="max-w-sm"
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8 text-center hover:bg-white/10 hover:border-[#db7d30]/50 transition-all duration-300 relative overflow-hidden group">
                  {/* Glow effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-[#cd3f2c]/10 to-[#db7d30]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  <div className="relative z-10">
                    <motion.div
                      className="relative mb-6 inline-block"
                      whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Animated ring around avatar */}
                      <motion.div 
                        className="absolute -inset-2 bg-gradient-to-br from-[#cd3f2c] to-[#db7d30] rounded-full blur-lg"
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                        }}
                      />
                      <Avatar className="w-32 h-32 border-4 border-white/20 relative z-10">
                        <AvatarImage src={founderPhoto} alt={member.name} className="object-cover" />
                        <AvatarFallback className="text-white text-2xl bg-gradient-to-br from-[#cd3f2c] to-[#db7d30]">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    
                    <h3 className="text-white text-2xl mb-2">{member.name}</h3>
                    <p className="text-[#edcca5] mb-3">{member.role}</p>
                    <p className="text-gray-400">{member.expertise}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action - with glass effect */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-[#cd3f2c]/10 to-[#db7d30]/10 border-[#db7d30]/50 backdrop-blur-xl p-12">
            <Zap className="w-16 h-16 text-[#edcca5] mx-auto mb-6" />
            <h2 className="text-white mb-4">Ready to Start Your Digital Journey?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Join hundreds of successful businesses who trust us with their digital transformation. Let's create something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] rounded-lg text-white hover:from-[#b33624] hover:to-[#c56d28] transition-all inline-flex items-center gap-2"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link to="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border border-white/20 rounded-lg text-white hover:bg-white/10 backdrop-blur-xl transition-all"
                >
                  View Our Work
                </motion.button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
