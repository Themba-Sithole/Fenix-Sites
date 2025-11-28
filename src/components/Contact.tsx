import { Mail, MapPin, Phone, Send, MessageSquare, Calendar, Clock, Globe2, Linkedin, Twitter, Github, Instagram } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { useState } from "react";

export function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    try {
      // Using EmailJS to send the form data
      const response = await fetch('https://formspree.io/f/mgvqqopy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _replyto: formData.email,
          _subject: `New Contact Form Submission from ${formData.name}`,
          _to: 'tjsgamerspro1@gmail.com'
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          budget: '',
          service: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending form:', error);
      setFormStatus('error');
    }

    // Reset status after 3 seconds
    setTimeout(() => setFormStatus('idle'), 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "tjsgamerspro1@gmail.com",
      link: "mailto:tjsgamerspro1@gmail.com",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+27 62 334 7216",
      link: "tel:+27623347216",
      description: "Mon-Fri, 9AM-6PM SAST"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Cape Town, Hout Bay",
      link: null,
      description: "South Africa"
    },
    {
      icon: Globe2,
      title: "Global Reach",
      value: "Worldwide Service",
      link: null,
      description: "Serving clients globally"
    },
  ];

  const faqs = [
    {
      question: "What is your typical project timeline?",
      answer: "Project timelines vary based on complexity. A simple website typically takes 4-6 weeks, while complex web applications can take 3-6 months. We'll provide a detailed timeline during our initial consultation."
    },
    {
      question: "Do you offer ongoing support after launch?",
      answer: "Yes! We offer various support packages including maintenance, updates, hosting management, and technical support. Our team is always available to ensure your website continues to perform optimally."
    },
    {
      question: "What technologies do you work with?",
      answer: "We specialize in modern web technologies including React, Next.js, TypeScript, Tailwind CSS, Node.js, and various CMS platforms. We choose the best technology stack for each project's specific needs."
    },
    {
      question: "Can you help with website redesigns?",
      answer: "Absolutely! We excel at modernizing existing websites. We'll analyze your current site, identify improvement opportunities, and create a stunning new design that enhances user experience and drives better results."
    },
    {
      question: "What's included in your pricing?",
      answer: "Our pricing includes design, development, testing, deployment, and initial training. We provide transparent quotes with no hidden fees. Additional services like SEO, content creation, and ongoing maintenance are available separately."
    },
    {
      question: "Do you work with international clients?",
      answer: "Yes! We serve clients across 25+ countries. We're experienced in working across different time zones and use modern collaboration tools to ensure seamless communication regardless of location."
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const workingHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#cd3f2c]/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #cd3f2c 1px, transparent 1px),
              linear-gradient(to bottom, #cd3f2c 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Data stream effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-[#db7d30] to-transparent"
            style={{
              left: `${25 + i * 25}%`,
            }}
            animate={{
              y: ['-100%', '200%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#edcca5] uppercase tracking-wider mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-white mb-4">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear about it. Fill out the form below or reach out through any of our contact channels.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Full Name *</Label>
                    <Input 
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Alex Sibanda"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email Address *</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="alex@example.com"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input 
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+27 62 334 7216"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-white">Project Budget (ZAR)</Label>
                    <Select onValueChange={(value) => handleSelectChange('budget', value)} value={formData.budget}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="landing">R1,400 - R3,000 (Landing/Basic)</SelectItem>
                        <SelectItem value="business">R3,000 - R5,000 (Business)</SelectItem>
                        <SelectItem value="professional">R5,000 - R9,000 (Professional)</SelectItem>
                        <SelectItem value="ecommerce">R9,000 - R15,000 (E-commerce)</SelectItem>
                        <SelectItem value="custom">R15,000+ (Custom/Advanced)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service" className="text-white">Service Interested In</Label>
                  <Select onValueChange={(value) => handleSelectChange('service', value)} value={formData.service}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-design">Web Design</SelectItem>
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="ecommerce">E-Commerce</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="seo">SEO Optimization</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">Project Details *</Label>
                  <Textarea 
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project, goals, and timeline..."
                    rows={6}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] hover:from-[#b33624] hover:to-[#c56d28]"
                >
                  {formStatus === 'idle' && (
                    <>
                      Send Message
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                  {formStatus === 'sending' && 'Sending...'}
                  {formStatus === 'success' && 'Message Sent!'}
                  {formStatus === 'error' && 'Error - Try Again'}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  We'll respond within 24 hours during business days
                </p>
              </form>
            </Card>
          </motion.div>

          {/* Contact Information Sidebar */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6 hover:bg-white/10 transition-all duration-300">
                    {info.link ? (
                      <a href={info.link} className="block">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#cd3f2c]/20 to-[#db7d30]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <info.icon className="w-5 h-5 text-[#edcca5]" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm mb-1">{info.title}</p>
                            <p className="text-white">{info.value}</p>
                            <p className="text-gray-500 text-xs mt-1">{info.description}</p>
                          </div>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#cd3f2c]/20 to-[#db7d30]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-5 h-5 text-[#edcca5]" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm mb-1">{info.title}</p>
                          <p className="text-white">{info.value}</p>
                          <p className="text-gray-500 text-xs mt-1">{info.description}</p>
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Working Hours */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-[#edcca5]" />
                <h3 className="text-white">Working Hours</h3>
              </div>
              <div className="space-y-3">
                {workingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-400">{schedule.day}</span>
                    <span className="text-white">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Social Links */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6">
              <h3 className="text-white mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#edcca5] hover:bg-white/10 hover:border-[#db7d30]/50 transition-all duration-300"
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </Card>

            {/* Quick Response Badge */}
            <Card className="bg-gradient-to-br from-[#cd3f2c]/10 to-[#db7d30]/10 border-[#db7d30]/50 p-6">
              <div className="text-center">
                <MessageSquare className="w-8 h-8 text-[#edcca5] mx-auto mb-3" />
                <Badge className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] mb-2">
                  24hr Response Time
                </Badge>
                <p className="text-gray-400 text-sm mt-2">
                  We typically respond to all inquiries within one business day
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <span className="text-[#edcca5] uppercase tracking-wider mb-4 block">
              FAQ
            </span>
            <h2 className="text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400">
              Find answers to common questions about our services and process
            </p>
          </div>

          <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-white/10"
                >
                  <AccordionTrigger className="text-white hover:text-[#edcca5] text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </motion.div>

        {/* Alternative Contact Methods */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 backdrop-blur-2xl p-8 max-w-3xl mx-auto">
            <Calendar className="w-12 h-12 text-[#edcca5] mx-auto mb-4" />
            <h3 className="text-white mb-2">Prefer a Direct Conversation?</h3>
            <p className="text-gray-400 mb-6">
              Schedule a free 30-minute consultation call with our team to discuss your project in detail
            </p>
            <Button className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] hover:from-[#b33624] hover:to-[#c56d28]">
              Schedule a Call
              <Calendar className="ml-2 w-4 h-4" />
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}