// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\pages\LandingPage.jsx
import Navbar from '../components/common/Navbar.jsx';
import Footer from '../components/common/Footer.jsx';
import Hero from '../components/sections/Hero.jsx';
import About from '../components/sections/About.jsx';
import Impact from '../components/sections/Impact.jsx';
import WhyChooseUs from '../components/sections/WhyChooseUs.jsx';
import ContactSection from '../components/sections/ContactSection.jsx';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Impact />
        <WhyChooseUs />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
