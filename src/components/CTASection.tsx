import { ArrowRight, Calendar, MessageSquare, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#cd3f2c]/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#db7d30]/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Animated diagonal stripes */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-[#db7d30] to-transparent"
            style={{
              top: `${i * 7}%`,
            }}
            animate={{
              transform: [`rotate(-3deg)`, `rotate(-1deg)`, `rotate(-3deg)`],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{
              duration: 3 + i * 0.1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#edcca5] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-gradient-to-br from-white/10 to-white/5 border-[#db7d30]/50 backdrop-blur-2xl overflow-hidden relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#cd3f2c]/10 via-[#db7d30]/10 to-[#edcca5]/10" />
              
              <div className="relative z-10 p-8 md:p-12">
                {/* Main content */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  >
                    <motion.div 
                      className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#cd3f2c] to-[#db7d30] rounded-full mb-6"
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(205, 63, 44, 0.3)',
                          '0 0 40px rgba(219, 125, 48, 0.5)',
                          '0 0 20px rgba(205, 63, 44, 0.3)',
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 360]
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <MessageSquare className="w-10 h-10 text-white" />
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  <motion.h2 
                    className="text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    Ready to Transform Your <span className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] bg-clip-text text-transparent">Digital Presence?</span>
                  </motion.h2>

                  <motion.p 
                    className="text-gray-300 max-w-2xl mx-auto mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    Let's collaborate to create something extraordinary. Whether you're starting from scratch or looking to revamp your existing site, we're here to bring your vision to life.
                  </motion.p>

                  {/* CTA buttons */}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link to="/contact">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          size="lg"
                          className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] hover:from-[#b33624] hover:to-[#c56d28] min-w-[200px]"
                        >
                          Start Your Project
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </motion.div>
                    </Link>
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        size="lg"
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10 min-w-[200px]"
                      >
                        Schedule a Call
                        <Calendar className="ml-2 w-4 h-4" />
                      </Button>
                    </motion.div>
                  </motion.div>

                  <motion.p 
                    className="text-sm text-gray-500"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    Free consultation • No obligation • Quick response within 24 hours
                  </motion.p>
                </div>

                {/* Additional options */}
                <motion.div 
                  className="grid md:grid-cols-3 gap-6 pt-8 border-t border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <MessageSquare className="w-6 h-6 text-[#edcca5]" />
                    </div>
                    <h4 className="text-white text-sm mb-1">Live Chat</h4>
                    <p className="text-gray-400 text-xs">Available 24/7</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Calendar className="w-6 h-6 text-[#edcca5]" />
                    </div>
                    <h4 className="text-white text-sm mb-1">Book a Meeting</h4>
                    <p className="text-gray-400 text-xs">30 min consultation</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Download className="w-6 h-6 text-[#edcca5]" />
                    </div>
                    <h4 className="text-white text-sm mb-1">Get Our Guide</h4>
                    <p className="text-gray-400 text-xs">Free resources</p>
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-gray-500 text-sm mb-4">Ready to serve businesses of all sizes</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
              {["Small Business", "Startups", "E-Commerce", "Local Services"].map((badge, index) => (
                <div key={index} className="text-gray-400 text-sm px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                  {badge}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
