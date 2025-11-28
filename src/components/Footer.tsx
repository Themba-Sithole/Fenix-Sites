import { Facebook, Twitter, Instagram, Linkedin, Github, ArrowUp, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import logo from "figma:asset/72cd47685ca282f943a2cb9cf2edc125788fc105.png";

export function Footer() {
  const footerLinks = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/about" },
      { label: "Careers", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    services: [
      { label: "Web Design", href: "/services" },
      { label: "Web Development", href: "/services" },
      { label: "SEO", href: "/services" },
      { label: "Support", href: "/contact" },
    ],
    resources: [
      { label: "Blog", href: "/portfolio" },
      { label: "Case Studies", href: "/portfolio" },
      { label: "Documentation", href: "/services" },
      { label: "FAQs", href: "/contact" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61584104951139", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "https://www.instagram.com/fenixsite/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/fenix-sites/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B7%2FerNP%2BCTBOvtgqNphugLw%3D%3D", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/Themba-Sithole", label: "GitHub" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/10 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div 
          className="absolute -top-40 -left-40 w-96 h-96 bg-[#cd3f2c]/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#db7d30]/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Animated grid */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `
              linear-gradient(to right, #cd3f2c 1px, transparent 1px),
              linear-gradient(to bottom, #cd3f2c 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#edcca5] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -30, 0],
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

        {/* Scan lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`scan-${i}`}
            className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-[#cd3f2c]/20 to-transparent"
            style={{
              top: `${i * 25}%`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scaleX: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
        <motion.div
          className="absolute h-full bg-gradient-to-r from-[#cd3f2c] via-[#db7d30] to-[#edcca5]"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ width: '50%' }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand column with holographic effect */}
          <motion.div 
            className="lg:col-span-2 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Holographic card background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-lg backdrop-blur-xl" />
            
            <div className="relative p-6">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-[#cd3f2c]/30 to-[#db7d30]/30 rounded-full blur-lg"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <img src={logo} alt="FenixSites Logo" className="h-8 w-auto relative z-10" />
                </motion.div>
                <motion.span 
                  className="text-white"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(237, 204, 165, 0)',
                      '0 0 20px rgba(237, 204, 165, 0.3)',
                      '0 0 10px rgba(237, 204, 165, 0)',
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  FenixSites
                </motion.span>
              </div>
              
              <p className="text-gray-400 mb-6 max-w-sm">
                Transforming visions into stunning digital experiences. Your trusted partner for web design and development excellence.
              </p>
              
              {/* Social links with futuristic style */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="relative w-10 h-10 flex items-center justify-center group"
                  >
                    {/* Animated border */}
                    <motion.div
                      className="absolute inset-0 bg-white/5 border border-white/20 rounded-lg"
                      whileHover={{
                        borderColor: 'rgba(219, 125, 48, 0.5)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      }}
                    />
                    
                    {/* Glow on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#cd3f2c]/0 to-[#db7d30]/0 rounded-lg blur"
                      whileHover={{
                        background: 'radial-gradient(circle, rgba(219, 125, 48, 0.3) 0%, transparent 70%)',
                      }}
                    />
                    
                    <social.icon className="w-4 h-4 text-gray-400 group-hover:text-[#edcca5] transition-colors relative z-10" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Links columns with stagger animation */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (categoryIndex + 1) }}
              className="relative"
            >
              {/* Category title with accent */}
              <div className="relative mb-4">
                <h4 className="text-white capitalize relative inline-block">
                  {category}
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#cd3f2c] to-transparent"
                    initial={{ width: 0 }}
                    whileInView={{ width: '60%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + categoryIndex * 0.1 }}
                  />
                </h4>
              </div>
              
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + linkIndex * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-[#edcca5] transition-all duration-300 inline-flex items-center gap-2 group"
                    >
                      <motion.span
                        className="w-1 h-1 bg-[#db7d30] rounded-full opacity-0 group-hover:opacity-100"
                        whileHover={{ scale: 1.5 }}
                      />
                      <span className="relative">
                        {link.label}
                        <motion.span 
                          className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] w-0 group-hover:w-full transition-all duration-300"
                        />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar with enhanced styling */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Divider with glow */}
          <div className="relative mb-8">
            <div className="h-[1px] bg-white/10" />
            <motion.div 
              className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-[#cd3f2c] via-[#db7d30] to-[#edcca5]"
              animate={{
                width: ['0%', '100%', '0%'],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p 
              className="text-gray-400 text-sm flex items-center gap-2"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              <Sparkles className="w-4 h-4 text-[#edcca5]" />
              © {new Date().getFullYear()} FenixSites. All rights reserved.
            </motion.p>
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-400 hover:text-[#edcca5] text-sm transition-colors relative group">
                Privacy Policy
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#db7d30] group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#edcca5] text-sm transition-colors relative group">
                Terms of Service
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#db7d30] group-hover:w-full transition-all duration-300" />
              </a>

              {/* Scroll to top button */}
              <motion.button
                onClick={scrollToTop}
                className="relative w-8 h-8 flex items-center justify-center group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 border border-white/20 rounded-lg"
                  whileHover={{
                    borderColor: 'rgba(219, 125, 48, 0.5)',
                    boxShadow: '0 0 20px rgba(219, 125, 48, 0.3)',
                  }}
                />
                
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#cd3f2c]/0 to-[#db7d30]/0 rounded-lg blur"
                  whileHover={{
                    background: 'radial-gradient(circle, rgba(219, 125, 48, 0.3) 0%, transparent 70%)',
                  }}
                />
                
                <ArrowUp className="w-4 h-4 text-gray-400 group-hover:text-[#edcca5] transition-colors relative z-10" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom accent corners */}
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#cd3f2c]/20" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#db7d30]/20" />
    </footer>
  );
}
