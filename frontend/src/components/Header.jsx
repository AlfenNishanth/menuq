import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const menuButton = document.getElementById('menu-button');
      
      if (isMenuOpen && mobileMenu && !mobileMenu.contains(event.target) && 
          menuButton && !menuButton.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Close menu when a link is clicked (better mobile UX)
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const getLinkProps = (sectionId) => {
    return isHomePage 
      ? { href: `#${sectionId}` }
      : { as: Link, to: `/#${sectionId}` };
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/short_logo-removebg.png" alt="Menu Q Logo" className="h-12 sm:h-16 w-auto" />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isHomePage ? (
              <>
                <a href="#how-it-works" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Core Elements</a>
                {/* <a href="#how-it-works" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Seamless Flow</a> */}
                {/* <a href="#Reach Us" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Reach Us</a> */}
                <Link to="/aboutus" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Who Are We</Link>
                <Link to="/contactus" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Reach Us</Link>
              </>
            ) : (
              <>
                <Link to="/how-it-works" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Core Elements</Link>
                <Link to="/aboutus" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Who Are We</Link>
                {/* <Link to="/#testimonials" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Real Stories</Link> */}
                <Link to="/contactus" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Reach Us</Link>
              </>
            )}
            <Link to="/login" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Login</Link>
            <Link to="/signup" className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-5 py-2 rounded-full font-medium hover:shadow-lg transition-all">
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="md:hidden">
            <button 
              id="menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none rounded-md p-2 hover:bg-gray-100"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
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

        {/* Mobile navigation menu */}
        {isMenuOpen && (
          <div 
            id="mobile-menu" 
            className="md:hidden py-4 mt-2 bg-white rounded-lg shadow-xl animate-fadeIn"
          >
            {isHomePage ? (
              <>
                <a href="#how-it-works" onClick={handleLinkClick} className="block px-4 py-3 text-gray-700 hover:bg-amber-50 active:bg-amber-100">Core Elements</a>
                {/* <a href="#how-it-works" onClick={handleLinkClick} className="block px-4 py-3 text-gray-700 hover:bg-amber-50 active:bg-amber-100">Who Are We</a>
                <a href="#Reach Us" onClick={handleLinkClick} className="block px-4 py-3 text-gray-700 hover:bg-amber-50 active:bg-amber-100">Reach Us</a> */}
                <Link to="/aboutus" onClick={handleLinkClick} className="block px-4 py-3 text-gray-700 hover:bg-amber-50 active:bg-amber-100">Who Are We</Link>
                <Link to="/contactus" onClick={handleLinkClick} className="block px-4 py-3 text-gray-700 hover:bg-amber-50 active:bg-amber-100">Reach Us</Link>
              </>
            ) : (
              <>
                <Link to="/how-it-works" onClick={handleLinkClick} className="block px-4 py-3 text-gray-700 hover:bg-amber-50 active:bg-amber-100">Core Elements</Link>
                <Link to="/aboutus" onClick={handleLinkClick} className="block px-4 py-3 text-gray-700 hover:bg-amber-50 active:bg-amber-100">Who Are We</Link>
                <Link to="/contactus" onClick={handleLinkClick} className="block px-4 py-3 text-gray-700 hover:bg-amber-50 active:bg-amber-100">Reach Us</Link>
              </>
            )}
            <div className="border-t border-gray-200 my-2"></div>
            <Link to="/login" onClick={handleLinkClick} className="block px-4 py-3 text-gray-700 hover:bg-amber-50 active:bg-amber-100">Login</Link>
            <div className="px-4 pt-2 pb-4">
              <Link 
                to="/signup" 
                onClick={handleLinkClick}
                className="block w-full py-3 text-center text-white bg-gradient-to-r from-amber-600 to-amber-700 rounded-md hover:shadow-md active:from-amber-700 active:to-amber-800"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;