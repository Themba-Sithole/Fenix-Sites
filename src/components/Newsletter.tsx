import { Mail, Send, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { motion } from "motion/react";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    setEmail("");
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#cd3f2c]/5 to-[#db7d30]/5"
          animate={{ 
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Tech lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-[#cd3f2c]/30 to-transparent"
            style={{ top: `${25 * i}%` }}
            animate={{
              x: i % 2 === 0 ? ['-100%', '100%'] : ['100%', '-100%'],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-white/10 to-white/5 border-[#db7d30]/50 backdrop-blur-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-[1fr,auto] gap-8 items-center">
              {/* Content */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#cd3f2c] to-[#db7d30] rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white">Stay in the Loop</h3>
                    <p className="text-gray-400 text-sm">Get the latest web design trends & tips</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-6">
                  Join 5,000+ subscribers receiving exclusive insights, case studies, and industry updates delivered monthly to your inbox.
                </p>

                {/* Benefits */}
                <div className="grid md:grid-cols-2 gap-3 mb-6">
                  {[
                    "Expert design tips & tricks",
                    "Industry trends & insights",
                    "Exclusive project showcases",
                    "Special offers & discounts"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#db7d30] flex-shrink-0" />
                      <span className="text-sm text-gray-400">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-grow">
                    <Input 
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12"
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] hover:from-[#b33624] hover:to-[#c56d28] h-12 px-8"
                  >
                    {status === 'success' ? (
                      <>
                        <CheckCircle2 className="mr-2 w-4 h-4" />
                        Subscribed!
                      </>
                    ) : (
                      <>
                        Subscribe
                        <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-xs text-gray-500 mt-3">
                  No spam, unsubscribe anytime. We respect your privacy.
                </p>
              </div>

              {/* Stats */}
              <div className="md:border-l border-white/10 md:pl-8 space-y-6">
                <div className="text-center md:text-left">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] bg-clip-text text-transparent mb-1">
                    5,000+
                  </div>
                  <p className="text-gray-400 text-sm">Subscribers</p>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] bg-clip-text text-transparent mb-1">
                    98%
                  </div>
                  <p className="text-gray-400 text-sm">Open Rate</p>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] bg-clip-text text-transparent mb-1">
                    Monthly
                  </div>
                  <p className="text-gray-400 text-sm">Frequency</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
