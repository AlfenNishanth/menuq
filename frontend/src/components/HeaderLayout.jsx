// Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="/short_logo-removebg.png" alt="Menu Q Logo" className="h-16 w-auto" />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Core Elements</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Seamless Flow</a>
            <a href="#testimonials" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Real Stories</a>
            <a href="#Reach Us" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Reach Us</a>
            <Link to="/login" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Login</Link>
            <Link to="/signup" className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-5 py-2 rounded-full font-medium hover:shadow-lg transition-all">
              Get Started
            </Link>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? 
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> :
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden py-4 mt-2 bg-white rounded-lg shadow-xl">
            <a href="#features" className="block px-4 py-2 text-gray-700 hover:bg-amber-50">Core Elements</a>
            <a href="#how-it-works" className="block px-4 py-2 text-gray-700 hover:bg-amber-50">Seamless Flow</a>
            <a href="#testimonials" className="block px-4 py-2 text-gray-700 hover:bg-amber-50">Real Stories</a>
            <a href="#Reach Us" className="block px-4 py-2 text-gray-700 hover:bg-amber-50">Reach Us</a>
            <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-amber-50">Login</Link>
            <Link to="/signup" className="block px-4 py-2 text-white bg-gradient-to-r from-amber-600 to-amber-700 rounded-md mt-2 mx-4">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;