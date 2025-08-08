
// Navigation bar with logo, links, and call-to-action button
import React, { useState } from 'react';
import '../navbar-mobile.css';
import logoMark from '../assets/navbar/aangan-logo-mark.svg';
import textLogo from '../assets/navbar/aangan-text-logo.png';

const navItems = ['Home', 'Community', 'Pricing', 'About us', 'Contact'];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
  <nav className="py-6 bg-transparent relative navbar-mobile-small">
      {/* Decorative bottom glow for visual separation */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/30 to-transparent pointer-events-none"></div>
      <div className="container mx-auto flex items-center justify-between px-6 relative z-10">
        {/* Brand logo (icon and text) */}
        <div className="flex items-center space-x-3">
          <img src={logoMark} alt="Aangan logo mark" className="h-12 w-auto navbar-mobile-logo" />
          <img src={textLogo} alt="Aangan text logo" className="h-8 w-auto mt-2 navbar-mobile-textlogo" style={{marginTop: '0.5rem'}} />
        </div>

        {/* Hamburger icon for mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
          aria-label="Open menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="block w-7 h-0.5 bg-gray-700 mb-1 rounded transition-all" style={{backgroundColor: menuOpen ? '#f472b6' : '#222'}}></span>
          <span className="block w-7 h-0.5 bg-gray-700 mb-1 rounded transition-all" style={{backgroundColor: menuOpen ? '#f472b6' : '#222'}}></span>
          <span className="block w-7 h-0.5 bg-gray-700 rounded transition-all" style={{backgroundColor: menuOpen ? '#f472b6' : '#222'}}></span>
        </button>

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

        {/* Call-to-action button for joining the waitlist (desktop only) */}
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

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 z-40 flex flex-col items-center justify-center md:hidden transition-all">
          <ul className="space-y-8">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className={`text-2xl font-thin transition-all duration-300 ease-in-out hover:scale-105 hover:text-pink-400 transform ${
                    item === 'Home' ? 'text-gray-700' : 'text-gray-700'
                  }`}
                  style={{
                    fontFamily: '"Helvetica Neue", "Arial", sans-serif',
                    fontWeight: '200',
                    ...(item === 'Home' ? { color: '#f472b6' } : {})
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <button
            className="mt-10 text-black px-6 py-3 rounded-lg hover:opacity-80 transition text-lg"
            style={{ backgroundColor: '#ff9cc5' }}
            onClick={() => setMenuOpen(false)}
          >
            Join the Waitlist
            <svg className="ml-2 w-5 h-5 inline" fill="none" stroke="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
