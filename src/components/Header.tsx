import { Menu, X, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import logo from "figma:asset/72cd47685ca282f943a2cb9cf2edc125788fc105.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 relative"
    >
      {/* Holographic background with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl border-b border-white/20">
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(205, 63, 44, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 0%, rgba(219, 125, 48, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(205, 63, 44, 0.1) 0%, transparent 50%)',
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Top glowing accent line */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#cd3f2c] to-transparent"
        animate={{
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ width: '100%' }}
      />

      {/* Animated cyber accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
        <motion.div
          className="absolute h-full bg-gradient-to-r from-[#cd3f2c] via-[#db7d30] to-[#edcca5]"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ width: '50%' }}
        />
        <motion.div
          className="absolute h-full w-full bg-gradient-to-r from-transparent via-[#db7d30]/30 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#cd3f2c]/30" />
      <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#db7d30]/30" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#edcca5]"
            style={{
              left: `${10 + i * 12}%`,
              top: '50%',
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with holographic effect */}
          <motion.div 
            className="flex-shrink-0 relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/" className="flex items-center gap-3 relative">
              {/* Glow effect behind logo */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-[#cd3f2c]/20 to-[#db7d30]/20 rounded-full blur-lg"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <motion.div
                className="relative"
                whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={logo} 
                  alt="FenixSites Logo" 
                  className="h-10 w-auto relative z-10"
                />
                {/* Holographic overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#edcca5]/20 to-transparent rounded-lg"
                  animate={{
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
              <motion.span 
                className="text-white relative"
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
            </Link>
          </motion.div>

          {/* Desktop Navigation with cyber style */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <Link
                  to={item.href}
                  className="relative px-4 py-2 block group"
                >
                  {/* Background on hover */}
                  <motion.div
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.2 }}
                  />
                  
                  {/* Active state background */}
                  {location.pathname === item.href && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#cd3f2c]/20 to-[#db7d30]/20 border border-[#db7d30]/50 rounded-lg"
                      layoutId="activeNav"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <span className={`relative z-10 transition-colors ${
                    location.pathname === item.href 
                      ? 'text-[#edcca5]' 
                      : 'text-gray-300 group-hover:text-[#edcca5]'
                  }`}>
                    {item.label}
                  </span>

                  {/* Animated underline */}
                  <motion.span 
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    animate={{ 
                      width: location.pathname === item.href ? '100%' : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA Button with glow effect */}
          <motion.div 
            className="hidden md:block relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {/* Animated glow */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] rounded-lg blur opacity-50"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <Link to="/contact" className="relative">
              <Button className="relative bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] hover:from-[#b33624] hover:to-[#c56d28] border border-[#edcca5]/20">
                <Zap className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white p-2 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-white/5 border border-white/10 rounded-lg"
              animate={{
                borderColor: isMenuOpen ? 'rgba(219, 125, 48, 0.5)' : 'rgba(255, 255, 255, 0.1)',
              }}
            />
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-white/10 overflow-hidden relative"
            >
              {/* Mobile menu background */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
              
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Link
                    to={item.href}
                    className={`block py-3 px-4 rounded-lg transition-colors relative ${
                      location.pathname === item.href ? 'text-[#edcca5]' : 'text-gray-300'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {location.pathname === item.href && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#cd3f2c]/20 to-[#db7d30]/20 border-l-2 border-[#db7d30] rounded-lg"
                        layoutId="activeMobileNav"
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 px-4">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] hover:from-[#b33624] hover:to-[#c56d28] border border-[#edcca5]/20">
                    <Zap className="w-4 h-4 mr-2" />
                    Get Started
                  </Button>
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
