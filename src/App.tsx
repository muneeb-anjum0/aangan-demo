
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyAangan from './components/WhyAangan';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import WaitlistSection from './components/WaitlistSection';
import FooterSection from './components/FooterSection';

// Main application component that renders the full landing page
const App: React.FC = () => (
  <>
    {/* Top navigation bar for site-wide links and branding */}
    <Navbar />
    {/* Hero section with main headline and visuals */}
    <Hero />
    {/* Section explaining why users should choose Aangan */}
    <WhyAangan />
    {/* User testimonials and reviews section */}
    <Testimonials />
    {/* Frequently asked questions section */}
    <FAQ />
    {/* Waitlist signup call-to-action section */}
    <WaitlistSection />
    {/* Footer with links and copyright */}
    <FooterSection />
  </>
);

export default App;
