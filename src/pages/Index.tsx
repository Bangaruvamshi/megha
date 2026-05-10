import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";

import HighlightsStrip from "@/components/HighlightsStrip";
import CategorySection from "@/components/CategorySection";
import HomeCatalogSection from "@/components/HomeCatalogSection";
import WhyChooseUsGrid from "@/components/WhyChooseUsGrid";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactStrip from "@/components/ContactStrip";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import WelcomePopup from "@/components/WelcomePopup";

const Index = () => (
  <div className="min-h-screen">
    <WelcomePopup />
    <Navbar />
    <HeroSection />
    <TrustStrip />
    
    <HighlightsStrip />
    <CategorySection />
    <HomeCatalogSection />
    <WhyChooseUsGrid />
    <ProcessSection />
    <TestimonialsSection />
    <ContactStrip />
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Index;
