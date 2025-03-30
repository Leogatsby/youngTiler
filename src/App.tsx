import HNB from "./components/HNB";
import MainVideoSection from "./components/MainVideoSection";
import FloatSection from "./components/FloatSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";
import ReviewSection from "./components/ReviewSection";

export default function App() {
  return (
    <div className="min-h-screen">
      <HNB />
      <MainVideoSection />
      <AboutSection id="about" />
      <ServicesSection id="services" />
      <ReviewSection id="reviews" />
      <ContactSection id="contact" />
      <FooterSection />
      <FloatSection />
    </div>
  );
}
