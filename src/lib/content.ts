export const brand = {
  name: "FenixSites",
  tagline: "Web design & development for South African businesses",
  description:
    "We build fast, modern websites that help your business look professional online — from landing pages to full e-commerce stores.",
  cta: {
    primary: "Get a Free Consultation",
    secondary: "View Our Work",
  },
  contactNote: "Free consultation · Response within 24 hours",
} as const;

export const valueProps = [
  { label: "Custom Design", detail: "Tailored to your brand" },
  { label: "Mobile-First", detail: "Looks great on every device" },
  { label: "From R 2,500", detail: "Clear, transparent pricing" },
] as const;

export const coreServices = [
  {
    icon: "Code2" as const,
    title: "Websites & Landing Pages",
    description: "Custom sites built for speed, clarity, and conversions.",
  },
  {
    icon: "ShoppingCart" as const,
    title: "E-Commerce Stores",
    description: "Online shops with payments, products, and order management.",
  },
  {
    icon: "Palette" as const,
    title: "Branding & Design",
    description: "Logos, UI/UX, and visuals that match your business.",
  },
  {
    icon: "TrendingUp" as const,
    title: "SEO & Growth",
    description: "Get found on Google and connect with more customers.",
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Consult",
    description: "Tell us about your business, goals, and budget. We'll recommend the right package.",
  },
  {
    step: "02",
    title: "Design & Build",
    description: "We design, develop, and refine your site until you're happy with every detail.",
  },
  {
    step: "03",
    title: "Launch",
    description: "We go live, set up hosting, and provide support so you're ready from day one.",
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

export const featuredWork = [
  {
    title: "Boutique E-Commerce Store",
    category: "E-Commerce",
    description: "A clean online store with product catalog, checkout, and mobile-friendly shopping.",
    image:
      "https://images.unsplash.com/photo-1680499661732-3cfae4690e1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ258ZW58MXx8fHwxNzYyODc5NDQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Startup Landing Page",
    category: "Landing Page",
    description: "A high-converting single-page site built for a fast-moving tech startup launch.",
    image:
      "https://images.unsplash.com/photo-1597534458220-9fb4969f2df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd2Vic2l0ZXxlbnwxfHx8fDE3NjI4ODc5ODd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
] as const;
