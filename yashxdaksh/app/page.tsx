import Script from "next/script";
import { Shell } from "@/components/Shell";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { FAQS } from "@/lib/data";
import { faqSchema } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:text-base"
      >
        Skip to content
      </a>

      <Script
        id="ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(FAQS)),
        }}
      />

      <Shell>
        <Hero />
        <Marquee />
        <Work />
        <Services />
        <Process />
        <WhyUs />
        <Testimonials />
        <Faq />
        <Contact />
        <Footer />
      </Shell>
    </>
  );
}
