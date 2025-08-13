import React from 'react';
import Navbar from './components/1.Navbar';
import Hero from './components/2.Hero';
import WhyAangan from './components/3.WhyAangan';
import Testimonials from './components/6.Testimonials';
import FAQ from './components/5.FAQ';
import WaitlistSection from './components/7.WaitlistSection';
import FooterSection from './components/8.FooterSection';
import MissionVision from './components/4.MissionVision';


const App: React.FC = () => (
  <div style={{ paddingTop: '5.5rem' }}>
    <Navbar />
    <Hero />
    <WhyAangan />
    <MissionVision />
    <Testimonials />
    <FAQ />
    <WaitlistSection />
    <FooterSection />
  </div>
);

export default App;
