import React from 'react';
import Navbar from './components/1.Navbar';
import Hero from './components/2.Hero';
import WhyAangan from './components/3.WhyAangan';
import Testimonials from './components/6.Testimonials';
import FAQ from './components/5.FAQ';
import WaitlistSection from './components/7.WaitlistSection';
import FooterSection from './components/8.FooterSection';
import MissionVision from './components/4.MissionVision';
import Pricing from './components/9.Pricing';
import { ContactUs } from './components/10.ContactUs';


const App: React.FC = () => (
  <div style={{ paddingTop: '5.5rem' }}>
    <Navbar />
    <section id="home">
      <Hero />
    </section>
    <section id="community">
      <WhyAangan />
    </section>
    <section>
      <MissionVision />
    </section>
    <section>
      <Testimonials />
    </section>
    <section>
      <FAQ />
    </section>
    <section id="pricing">
      <Pricing />
    </section>
    <section id="about-us">
      <ContactUs />
    </section>
    <section id="waitlist" style={{ scrollMarginTop: '90px' }}>
      <WaitlistSection />
    </section>
    <section>
      <FooterSection />
    </section>
  </div>
);

export default App;
