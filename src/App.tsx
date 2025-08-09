import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyAangan from './components/WhyAangan';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import WaitlistSection from './components/WaitlistSection';
import FooterSection from './components/FooterSection';

const App: React.FC = () => (
  <>
    <Navbar />
    <Hero />
    <WhyAangan />
    <Testimonials />
    <FAQ />
    <WaitlistSection />
    <FooterSection />
  </>
);

export default App;
