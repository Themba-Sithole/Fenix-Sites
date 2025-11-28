import { Star, Quote } from "lucide-react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Owner, Local Boutique",
      company: "E-Commerce Website",
      avatar: "SM",
      rating: 5,
      text: "FenixSites created a beautiful online store for my boutique. The design is modern and the website is so easy for my customers to navigate. I'm already seeing sales come through online! Highly recommend their work.",
      highlight: "Professional & responsive"
    },
    {
      name: "Michael Chen",
      role: "Founder, Tech Startup",
      company: "Landing Page",
      avatar: "MC",
      rating: 5,
      text: "Working with FenixSites was great. They delivered my startup's landing page quickly and it looks fantastic. The team really understood what I needed and brought my vision to life. Excited to work with them again!",
      highlight: "Quick turnaround"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background effects with enhanced motion */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-[#db7d30]/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-80 h-80 bg-[#cd3f2c]/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, -40, 0],
            y: [0, -20, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Animated diagonal lines */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#cd3f2c] to-transparent"
            style={{
              top: `${i * 5}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              transform: [`rotate(-5deg)`, `rotate(-3deg)`, `rotate(-5deg)`],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{
              duration: 3 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#edcca5] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
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
            Testimonials
          </span>
          <h2 className="text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Hear what our clients have to say about their experience working with us.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-2xl p-6 h-full hover:bg-white/10 hover:border-[#db7d30]/50 transition-all duration-300 relative">
                {/* Quote icon */}
                <Quote className="absolute top-4 right-4 w-8 h-8 text-[#cd3f2c]/20" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#db7d30] text-[#db7d30]" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-gray-300 mb-6 relative z-10">
                  "{testimonial.text}"
                </p>

                {/* Highlight badge */}
                <Badge className="bg-gradient-to-r from-[#cd3f2c]/20 to-[#db7d30]/20 text-[#edcca5] border border-[#edcca5]/20 mb-6">
                  {testimonial.highlight}
                </Badge>

                {/* Author info */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <Avatar className="bg-gradient-to-br from-[#cd3f2c] to-[#db7d30]">
                    <AvatarFallback className="text-white">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                    <p className="text-xs text-[#edcca5]">{testimonial.company}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] bg-clip-text text-transparent mb-2">
                5/5
              </div>
              <p className="text-gray-400 text-sm">Client Rating</p>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] bg-clip-text text-transparent mb-2">
                2
              </div>
              <p className="text-gray-400 text-sm">Happy Clients</p>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] bg-clip-text text-transparent mb-2">
                100%
              </div>
              <p className="text-gray-400 text-sm">Satisfaction Rate</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
