import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DemoExplainer from "./components/DemoExplainer";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import AutomationFlow from "./components/AutomationFlow";
import LeadForm from "./components/LeadForm";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import ChatbotWidget from "./components/ChatbotWidget";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <DemoExplainer />
        <Problem />
        <Solution />
        <Services />
        <HowItWorks />
        <AutomationFlow />
        <Testimonials />
        <LeadForm />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
