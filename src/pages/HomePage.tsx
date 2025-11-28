import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Testimonials } from "../components/Testimonials";
import { CTASection } from "../components/CTASection";

export function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Testimonials />
      <CTASection />
    </>
  );
}
