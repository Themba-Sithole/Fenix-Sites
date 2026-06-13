import { Hero } from "../components/Hero";
import { MarqueeBar } from "../components/MarqueeBar";
import { WorkPreview } from "../components/WorkPreview";
import { ServicesPreview } from "../components/ServicesPreview";
import { HowItWorks } from "../components/HowItWorks";
import { Testimonials } from "../components/Testimonials";
import { CTASection } from "../components/CTASection";

export function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBar />
      <WorkPreview />
      <ServicesPreview />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </>
  );
}
