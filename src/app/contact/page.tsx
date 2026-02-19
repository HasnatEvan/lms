import HeaderWrapper from "@/components/HeaderWrapper";
import Footer from "../components/Footer";
import ContactHero from "../components/Contact/ContactHero";



export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* নেভিগেশন বার */}
      <HeaderWrapper />
      
      <main className="flex-grow">
        
        <ContactHero />
        
        
      </main>

      {/* ফুটার সেকশন */}
      <Footer />
    </div>
  );
}