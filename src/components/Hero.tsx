import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import Spline from '@splinetool/react-spline';
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 w-full h-full opacity-50">
        <Spline scene="https://prod.spline.design/LxhntEvU9daSOxfF/scene.splinecode" />
      </div>

      {/* Gradient fade overlay to blend with content below */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-[5]" />

      {/* Background gradient effects with enhanced motion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#cd3f2c]/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#db7d30]/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
            x: [0, -80, 0],
            y: [0, -60, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#edcca5]/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
      </div>

      {/* Grid pattern overlay with animation */}
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000,transparent)] pointer-events-none"
        animate={{
          backgroundPosition: ['0px 0px', '100px 100px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      ></motion.div>

      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(205, 63, 44, 0.05) 50%, transparent 100%)',
          height: '200px',
        }}
        animate={{
          y: ['0vh', '100vh'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-[#edcca5]/40 backdrop-blur-xl mb-6 shadow-2xl"
            style={{
              boxShadow: '0 0 30px rgba(237, 204, 165, 0.3), 0 10px 40px rgba(0, 0, 0, 0.5)'
            }}
          >
            <Sparkles className="w-4 h-4 text-[#edcca5]" />
            <span className="text-sm text-white font-medium">Premium Web Design Agency</span>
          </motion.div>

          {/* Main heading with animated gradient */}
          <motion.h1 
            className="text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.6), 0 2px 10px rgba(0, 0, 0, 0.9)'
            }}
          >
            <span className="block mb-2 drop-shadow-2xl">Transform Your Vision Into</span>
            <motion.span 
              className="block bg-gradient-to-r from-[#cd3f2c] via-[#db7d30] to-[#edcca5] bg-clip-text text-transparent"
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
                filter: 'drop-shadow(0 4px 20px rgba(205, 63, 44, 0.5)) drop-shadow(0 0 40px rgba(219, 125, 48, 0.3))',
              }}
            >
              Stunning Websites
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            className="text-gray-100 mb-8 max-w-2xl mx-auto text-lg backdrop-blur-sm bg-black/30 py-4 px-6 rounded-2xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.5)',
              boxShadow: '0 0 30px rgba(0, 0, 0, 0.5), 0 10px 40px rgba(0, 0, 0, 0.4)'
            }}
          >
            We craft exceptional digital experiences that captivate your audience and drive results. 
            From concept to launch, we bring your ideas to life with cutting-edge design and development.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              style={{
                filter: 'drop-shadow(0 0 20px rgba(205, 63, 44, 0.5)) drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))'
              }}
            >
              <Link to="/contact">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] hover:from-[#b33624] hover:to-[#c56d28] min-w-[200px] shadow-2xl"
                  style={{
                    boxShadow: '0 0 30px rgba(205, 63, 44, 0.4), 0 10px 40px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              style={{
                filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))'
              }}
            >
              <Link to="/portfolio">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-[#edcca5]/40 text-white hover:bg-white/20 min-w-[200px] backdrop-blur-xl bg-white/10"
                  style={{
                    boxShadow: '0 0 20px rgba(237, 204, 165, 0.2), 0 10px 30px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  View Our Work
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20 backdrop-blur-md bg-white/5 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              boxShadow: '0 0 40px rgba(0, 0, 0, 0.5), 0 10px 50px rgba(0, 0, 0, 0.4)'
            }}
          >
            <motion.div whileHover={{ scale: 1.05 }}>
              <div 
                className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] bg-clip-text text-transparent mb-2"
                style={{
                  filter: 'drop-shadow(0 2px 10px rgba(205, 63, 44, 0.4))'
                }}
              >
                Fresh
              </div>
              <p className="text-sm text-gray-200" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>New & Innovative</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <div 
                className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] bg-clip-text text-transparent mb-2"
                style={{
                  filter: 'drop-shadow(0 2px 10px rgba(219, 125, 48, 0.4))'
                }}
              >
                100%
              </div>
              <p className="text-sm text-gray-200" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>Client Satisfaction</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <div 
                className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] bg-clip-text text-transparent mb-2"
                style={{
                  filter: 'drop-shadow(0 2px 10px rgba(237, 204, 165, 0.4))'
                }}
              >
                Fast
              </div>
              <p className="text-sm text-gray-200" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>Quick Turnaround</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
