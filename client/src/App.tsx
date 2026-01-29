import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import AIAssistant from "./components/AIAssistant";
import Membership from "./components/Membership";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Location from "./components/Location";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-gym-black min-h-screen text-white">
      <Navbar />
      <Hero />
      <Features />
      <AIAssistant />
      <Membership />
      <Gallery />
      <Testimonials />
      <Location />
      <Footer />
    </div>
  );
}

export default App;
