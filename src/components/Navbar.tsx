
// Navigation bar with logo, links, and call-to-action button
import React from 'react';
import logoMark from '../assets/navbar/aangan-logo-mark.svg';
import textLogo from '../assets/navbar/aangan-text-logo.png';

const navItems = ['Home', 'Community', 'Pricing', 'About us', 'Contact'];

const Navbar: React.FC = () => {
  return (
    <nav className="py-6 bg-transparent relative">
      {/* Decorative bottom glow for visual separation */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/30 to-transparent pointer-events-none"></div>
      <div className="container mx-auto flex items-center justify-between px-6 relative z-10">
        {/* Brand logo (icon and text) */}
        <div className="flex items-center space-x-3">
          <img src={logoMark} alt="Aangan logo mark" className="h-12 w-auto" />
          <img src={textLogo} alt="Aangan text logo" className="h-8 w-auto mt-2" style={{marginTop: '0.5rem'}} />
        </div>

        {/* Navigation links for desktop */}
        <ul className="hidden md:flex space-x-20">
          {navItems.map((item) => (
            <li key={item}>
              <a
                href="#"
                className={`text-lg font-thin transition-all duration-300 ease-in-out hover:scale-105 hover:text-pink-400 transform ${
                  item === 'Home' ? 'text-gray-700' : 'text-gray-700'
                }`}
                style={{
                  fontFamily: '"Helvetica Neue", "Arial", sans-serif',
                  fontWeight: '200',
                  ...(item === 'Home' ? { color: '#f472b6' } : {})
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Call-to-action button for joining the waitlist */}
        <button 
          className="hidden md:inline-flex items-center text-black px-4 py-2.5 rounded-lg hover:opacity-80 transition"
          style={{ backgroundColor: '#ff9cc5' }}
        >
          Join the Waitlist
          <svg className="ml-2 w-5 h-5" fill="none" stroke="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
