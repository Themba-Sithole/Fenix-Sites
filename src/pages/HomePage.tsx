import { Hero } from "../components/Hero";
import { MarqueeBar } from "../components/MarqueeBar";
import { ServicesPreview } from "../components/ServicesPreview";
import { HowItWorks } from "../components/HowItWorks";
import { WorkPreview } from "../components/WorkPreview";
import { Testimonials } from "../components/Testimonials";
import { CTASection } from "../components/CTASection";

export function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBar />
      <ServicesPreview />
      <WorkPreview />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </>
  );
}
