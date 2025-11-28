import { Code2, Palette, Smartphone, Search, ShoppingCart, Wrench, Sparkles, Camera, Video, TrendingUp, Mail, BarChart3, Bot, Zap, Package, CheckCircle2, ArrowRight, Globe, Monitor, Server, Megaphone } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export function Services() {
  const serviceCategories = [
    {
      title: "Website & App Services",
      icon: Globe,
      color: "from-[#cd3f2c] to-[#db7d30]",
      services: [
        {
          icon: Code2,
          title: "Custom Website Design & Development",
          description: "Modern, responsive websites for businesses, portfolios, and brands.",
        },
        {
          icon: ShoppingCart,
          title: "E-Commerce Store Setup",
          description: "Online stores with product management, payment integration, and delivery setup.",
        },
        {
          icon: Sparkles,
          title: "Landing Pages & Funnels",
          description: "High-converting pages for product launches, events, or campaigns.",
        },
        {
          icon: Wrench,
          title: "Web Maintenance & Updates",
          description: "Monthly or once-off maintenance, updates, and security checks.",
        },
        {
          icon: Smartphone,
          title: "Basic Mobile App Development",
          description: "Simple business apps, booking systems, or company companion apps.",
        },
        {
          icon: Server,
          title: "Web Hosting & Domain Management",
          description: "Handle domain registration, SSL setup, and hosting for clients.",
        },
      ]
    },
    {
      title: "Design & Branding",
      icon: Palette,
      color: "from-[#db7d30] to-[#edcca5]",
      services: [
        {
          icon: Palette,
          title: "Logo & Brand Identity Design",
          description: "Logo, color scheme, and brand kit to give clients a consistent image.",
        },
        {
          icon: Monitor,
          title: "UI/UX Design",
          description: "Modern interface design for websites and apps (using Figma or Adobe XD).",
        },
        {
          icon: Sparkles,
          title: "Graphic Design",
          description: "Banners, posters, and marketing materials for social media or print.",
        },
      ]
    },
    {
      title: "Creative Media",
      icon: Camera,
      color: "from-[#edcca5] to-[#db7d30]",
      badge: "Powered by BTC Production",
      services: [
        {
          icon: Camera,
          title: "Business Photography",
          description: "Professional photos for team profiles, offices, or products.",
        },
        {
          icon: Camera,
          title: "Product Photography",
          description: "High-quality product shots for online stores and menus.",
        },
        {
          icon: Video,
          title: "Business Videography",
          description: "Promo videos, brand stories, or event highlights.",
        },
        {
          icon: Megaphone,
          title: "Website & Social Media Content Shoots",
          description: "Photos & short clips designed for web and social use.",
        },
      ]
    },
    {
      title: "Marketing & Growth",
      icon: TrendingUp,
      color: "from-[#cd3f2c] to-[#edcca5]",
      services: [
        {
          icon: Search,
          title: "SEO Optimization",
          description: "Improve visibility on Google with proper meta tags, keywords, and indexing.",
        },
        {
          icon: Globe,
          title: "Google Business Setup",
          description: "Create and optimize clients' Google Business Profiles.",
        },
        {
          icon: Megaphone,
          title: "Social Media Integration",
          description: "Link site actions to social media, or embed live feeds.",
        },
        {
          icon: Mail,
          title: "Email & Newsletter Setup",
          description: "Help clients collect emails and send newsletters (Mailchimp, Brevo, etc.).",
        },
        {
          icon: BarChart3,
          title: "Analytics & Reports",
          description: "Show clients how many visitors, clicks, and conversions they're getting.",
        },
      ]
    },
    {
      title: "Tech & Innovation",
      icon: Bot,
      color: "from-[#db7d30] to-[#cd3f2c]",
      services: [
        {
          icon: Bot,
          title: "AI Chatbot Integration (Basic)",
          description: "Add simple AI chat assistants to websites.",
        },
        {
          icon: Zap,
          title: "Automation & Form Integrations",
          description: "Connect websites with Google Sheets, CRMs, or email alerts.",
        },
        {
          icon: Monitor,
          title: "Custom Admin Dashboards",
          description: "Simple backends for managing users, posts, or orders.",
        },
      ]
    },
  ];

  const pricingTiers = [
    {
      name: "Landing Page",
      price: "R 1,400",
      description: "Perfect for single-page sites & campaigns",
      pages: "1 Page",
      features: [
        "Single Page Design",
        "Mobile Responsive",
        "Contact Form",
        "Basic SEO",
        "Social Media Links",
        "1 Month Support"
      ],
      popular: false
    },
    {
      name: "Basic",
      price: "R 3,000",
      description: "Great for small businesses",
      pages: "3 Pages",
      features: [
        "Up to 3 Pages",
        "Custom Design",
        "Mobile Optimization",
        "Contact Forms",
        "Google Maps Integration",
        "Basic SEO Setup",
        "2 Months Support"
      ],
      popular: false
    },
    {
      name: "Business",
      price: "R 5,000",
      description: "Ideal for established businesses",
      pages: "5 Pages",
      features: [
        "Up to 5 Pages",
        "Premium Design",
        "Mobile Optimization",
        "Contact & Quote Forms",
        "Google Business Integration",
        "Enhanced SEO",
        "3 Months Support"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "R 9,000",
      description: "For advanced business needs",
      pages: "5+ Pages",
      features: [
        "5+ Pages",
        "Premium Custom Design",
        "CMS Integration",
        "Blog Functionality",
        "Advanced SEO",
        "Analytics Setup",
        "Newsletter Integration",
        "6 Months Support"
      ],
      popular: true
    },
    {
      name: "E-commerce",
      price: "R 15,000",
      description: "Full online store solution",
      pages: "Store",
      features: [
        "Product Catalog",
        "Shopping Cart",
        "Payment Gateway",
        "Inventory Management",
        "Order Management",
        "Customer Accounts",
        "SEO Optimization",
        "12 Months Support"
      ],
      popular: false
    },
    {
      name: "Custom",
      price: "Let's Talk",
      description: "Advanced features & 3D design",
      pages: "Custom",
      features: [
        "3D Features & Animations",
        "Advanced Interactions",
        "Custom Functionality",
        "API Integrations",
        "Complex E-commerce",
        "Custom Admin Panel",
        "Dedicated Support",
        "Priority Development"
      ],
      popular: false,
      highlight: true
    }
  ];

  const businessPackages = [
    {
      name: "Startup Package",
      description: "Everything you need to launch",
      includes: ["Website", "Logo", "Google Business Setup"],
      icon: Sparkles,
    },
    {
      name: "Business Pro Package",
      description: "Complete professional presence",
      includes: ["Website", "Photoshoot", "SEO", "Hosting"],
      icon: TrendingUp,
    },
    {
      name: "E-Commerce Package",
      description: "Full online store solution",
      includes: ["Online Store", "Product Photos", "Basic Training"],
      icon: ShoppingCart,
    },
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-[#cd3f2c]/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#db7d30]/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Animated grid */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: `
            linear-gradient(to right, #cd3f2c 1px, transparent 1px),
            linear-gradient(to bottom, #cd3f2c 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#edcca5] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="text-[#edcca5] uppercase tracking-wider mb-4 block"
            animate={{
              textShadow: [
                '0 0 10px rgba(237, 204, 165, 0.5)',
                '0 0 20px rgba(237, 204, 165, 0.8)',
                '0 0 10px rgba(237, 204, 165, 0.5)',
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            Our Services
          </motion.span>
          <h2 className="text-white mb-4">
            Complete Digital Solutions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From design to development, marketing to media — everything you need to succeed online
          </p>
        </motion.div>

        {/* Service Categories */}
        <div className="space-y-20 mb-32">
          {serviceCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div 
                  className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <category.icon className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-white">{category.title}</h3>
                  {category.badge && (
                    <Badge className="mt-1 bg-[#db7d30]/20 text-[#edcca5] border-[#db7d30]">
                      {category.badge}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, serviceIndex) => (
                  <motion.div
                    key={serviceIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: serviceIndex * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="bg-white/5 border-white/10 backdrop-blur-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:border-[#db7d30]/50 group h-full relative overflow-hidden">
                      {/* Gradient overlay on hover */}
                      <motion.div 
                        className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5`}
                        transition={{ duration: 0.3 }}
                      />
                      
                      <div className="relative z-10">
                        <motion.div 
                          className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4"
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <service.icon className="w-5 h-5 text-[#edcca5]" />
                        </motion.div>
                        <h4 className="text-white mb-2">{service.title}</h4>
                        <p className="text-gray-400 text-sm">
                          {service.description}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Business Packages */}
        <motion.div
          className="mb-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <span className="text-[#edcca5] uppercase tracking-wider mb-4 block">
              Business Packages
            </span>
            <h2 className="text-white mb-4">
              Complete Solutions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Bundled services designed to get you started quickly
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {businessPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 backdrop-blur-2xl p-6 hover:border-[#db7d30]/50 transition-all duration-300 h-full">
                  <pkg.icon className="w-12 h-12 text-[#edcca5] mb-4" />
                  <h3 className="text-white mb-2">{pkg.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>
                  <ul className="space-y-2">
                    {pkg.includes.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-[#db7d30] flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <motion.span 
              className="text-[#edcca5] uppercase tracking-wider mb-4 block"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              Pricing Plans
            </motion.span>
            <h2 className="text-white mb-4">
              Affordable Pricing for Everyone
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Transparent pricing with no hidden fees. Choose what works for your budget
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className={`relative p-8 h-full flex flex-col ${
                  tier.highlight 
                    ? 'bg-gradient-to-br from-[#cd3f2c]/20 to-[#db7d30]/20 border-[#edcca5]' 
                    : tier.popular 
                    ? 'bg-gradient-to-br from-[#cd3f2c]/10 to-[#db7d30]/10 border-[#db7d30]' 
                    : 'bg-white/5 border-white/10'
                } backdrop-blur-2xl`}>
                  {tier.popular && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]">
                      Most Popular
                    </Badge>
                  )}
                  {tier.highlight && (
                    <motion.div
                      className="absolute top-4 right-4"
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <Badge className="bg-gradient-to-r from-[#edcca5] to-[#db7d30] text-black">
                        ✨ Premium
                      </Badge>
                    </motion.div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-white text-2xl mb-1">{tier.name}</h3>
                    <p className="text-[#edcca5] text-sm mb-2">{tier.pages}</p>
                    <p className="text-gray-400 text-sm mb-4">{tier.description}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-white">{tier.price}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {tier.features.map((feature, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#db7d30] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <Link to="/contact">
                    <Button 
                      className={`w-full ${
                        tier.highlight || tier.popular
                          ? 'bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] hover:from-[#b33624] hover:to-[#c56d28]'
                          : 'bg-white/10 hover:bg-white/20 border border-white/20'
                      }`}
                    >
                      Get Started
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-[#cd3f2c]/10 to-[#db7d30]/10 border-[#db7d30]/50 p-12 relative overflow-hidden">
            {/* Animated background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#cd3f2c]/5 to-[#db7d30]/5"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            />
            
            <div className="relative z-10">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Sparkles className="w-16 h-16 text-[#edcca5] mx-auto mb-6" />
              </motion.div>
              <h2 className="text-white mb-4">Ready to Start Your Project?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                Let's discuss your needs and create something amazing together. Get a free consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] hover:from-[#b33624] hover:to-[#c56d28]">
                    Get Free Consultation
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    View Our Work
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
