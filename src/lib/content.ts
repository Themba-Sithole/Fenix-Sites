export const brand = {
  name: "FenixSites",
  tagline: "Premium Web Design Agency",
  headline: "We craft digital experiences that",
  headlineAccent: "convert.",
  description:
    "Stunning design, flawless code, and lightning-fast performance — built for South African businesses ready to stand out online.",
  cta: {
    primary: "Start Your Project",
    secondary: "View Our Work",
  },
  contactNote: "Free consultation · Response within 24 hours",
} as const;

export const qualitySignals = [
  "Custom Design",
  "Mobile-First",
  "SEO Ready",
  "Fast Loading",
  "E-Commerce",
  "Brand Identity",
] as const;

export const valueProps = [
  { value: "100%", label: "Custom Built", detail: "No templates" },
  { value: "<2s", label: "Load Time", detail: "Optimized" },
  { value: "5★", label: "Rated", detail: "By clients" },
] as const;

export const coreServices = [
  {
    icon: "Code2" as const,
    title: "Websites & Landing Pages",
    description: "Bespoke sites engineered for speed, clarity, and conversion.",
  },
  {
    icon: "ShoppingCart" as const,
    title: "E-Commerce Stores",
    description: "Beautiful online shops with seamless checkout experiences.",
  },
  {
    icon: "Palette" as const,
    title: "Branding & Design",
    description: "Visual identity that makes your business unforgettable.",
  },
  {
    icon: "TrendingUp" as const,
    title: "SEO & Growth",
    description: "Get discovered on Google and turn visitors into customers.",
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "We learn your brand, goals, and audience — then map the perfect solution.",
  },
  {
    step: "02",
    title: "Design & Build",
    description: "Every pixel and interaction refined until the experience feels premium.",
  },
  {
    step: "03",
    title: "Launch",
    description: "We go live, optimize performance, and support you from day one.",
  },
] as const;

export const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Owner, Local Boutique",
    project: "E-Commerce Website",
    avatar: "SM",
    rating: 5,
    text: "FenixSites created a beautiful online store for my boutique. The design is modern and easy for customers to use — I'm already seeing sales come through online.",
  },
  {
    name: "Michael Chen",
    role: "Founder, Tech Startup",
    project: "Landing Page",
    avatar: "MC",
    rating: 5,
    text: "They delivered my startup's landing page quickly and it looks fantastic. The team understood what I needed and brought my vision to life.",
  },
] as const;
