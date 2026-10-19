import Swoosh from "@/components/site/swoosh";
import Header from "@/components/site/header";
import ContactModal from "@/components/site/contact-modal";

import Hero from "@/components/sections/hero";
import Trusted from "@/components/sections/trusted";
import About from "@/components/sections/about";
import Services from "@/components/sections/services";
import Solutions from "@/components/sections/solutions";
import Process from "@/components/sections/process";
import WhyKramora from "@/components/sections/why-kramora";
import Industries from "@/components/sections/industries";
import TechStack from "@/components/sections/tech-stack";
import Engagement from "@/components/sections/engagement";
import CaseStudies from "@/components/sections/case-studies";
import GlobalPresence from "@/components/sections/global-presence";
import Testimonials from "@/components/sections/testimonials";
import Faq from "@/components/sections/faq";
import Insights from "@/components/sections/insights";
import ConsultationCta from "@/components/sections/consultation-cta";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Global film-grain overlay (Superdesign theme) */}
      <div className="noise-overlay" aria-hidden />
      <Swoosh />
      <Header />
      <main className="flex-1">
        {/* 01 Hero */}
        <Hero />
        {/* 02 Trusted */}
        <Trusted />
        {/* 03 About */}
        <About />
        {/* 04 Services */}
        <Services />
        {/* 05 Solutions */}
        <Solutions />
        {/* 06 Process */}
        <Process />
        {/* 07 Why Kramora */}
        <WhyKramora />
        {/* 08 Industries */}
        <Industries />
        {/* 09 Tech Stack */}
        <TechStack />
        {/* 10 Engagement */}
        <Engagement />
        {/* 11 Case Studies */}
        <CaseStudies />
        {/* 12 Global Presence */}
        <GlobalPresence />
        {/* 13 Testimonials */}
        <Testimonials />
        {/* 14 FAQ */}
        <Faq />
        {/* 15 Insights */}
        <Insights />
        {/* 16 Consultation CTA */}
        <ConsultationCta />
        {/* 17 Contact */}
        <Contact />
      </main>
      {/* 18 Footer */}
      <Footer />
      <ContactModal />
    </div>
  );
}
