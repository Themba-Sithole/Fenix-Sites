export const brand = {
  name: "FenixSites",
  tagline: "Premium web design studio",
  headline: "We build websites that feel",
  headlineAccent: "expensive.",
  description:
    "Pixel-perfect design, buttery-smooth interactions, and code that performs. Every site we ship is built to impress your customers and convert.",
  cta: {
    primary: "Start Your Project",
    secondary: "See Our Work",
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
  "UI/UX",
  "24/7 Support",
] as const;

export const valueProps = [
  { value: "100%", label: "Custom built", detail: "No templates" },
  { value: "<2s", label: "Load time", detail: "Performance first" },
  { value: "5★", label: "Client rating", detail: "Every project" },
] as const;

export const coreServices = [
  {
    icon: "Code2" as const,
    title: "Websites & Landing Pages",
    description: "Bespoke sites engineered for speed, clarity, and conversion.",
    featured: true,
  },
  {
    icon: "ShoppingCart" as const,
    title: "E-Commerce",
    description: "Beautiful stores with seamless checkout experiences.",
    featured: false,
  },
  {
    icon: "Palette" as const,
    title: "Brand & Design",
    description: "Visual identity that makes your business unforgettable.",
    featured: false,
  },
  {
    icon: "TrendingUp" as const,
    title: "SEO & Growth",
    description: "Get discovered and turn visitors into paying customers.",
    featured: false,
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "We learn your brand, audience, and goals — then map the perfect solution.",
  },
  {
    step: "02",
    title: "Design & Craft",
    description: "Every pixel, animation, and interaction is refined until it's flawless.",
  },
  {
    step: "03",
    title: "Launch & Support",
    description: "We deploy, optimize, and stay with you so your site keeps performing.",
  },
] as const;

export const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Owner, Local Boutique",
    project: "E-Commerce Website",
    avatar: "SM",
    rating: 5,
    text: "FenixSites didn't just build us a website — they built us a brand experience. Our online store looks incredible and sales are already coming through.",
    featured: true,
  },
  {
    name: "Michael Chen",
    role: "Founder, Tech Startup",
    project: "Landing Page",
    avatar: "MC",
    rating: 5,
    text: "The attention to detail is unreal. Animations, mobile experience, load speed — everything feels premium. Exactly what our startup needed.",
    featured: false,
  },
] as const;
