import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { FaMobileAlt, FaUtensils, FaShoppingCart, FaChartBar, FaLanguage, FaPaintBrush } from "react-icons/fa";

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Helmet>
      <title>Menu Q | Elevate Dining Through Digital Discovery</title>
      <meta name="description" content="Beyond mere digitization, Menu Q curates an elegant bridge between your culinary vision and guest experience. One sophisticated scan reveals your gastronomic narrative." />
      <meta name="keywords" content="curated dining experience, bespoke digital menus, restaurant innovation, upscale contactless solutions, immersive menu technology" />
        
        {/* Open Graph tags for social media sharing */}
        <meta property="og:title" content="Menu Q - Digitize Your Restaurant Menu with QR Codes" />
        <meta property="og:description" content="Transform your restaurant menu into an interactive digital experience with Menu Q. Our QR code solution makes ordering seamless for your customers." />
        <meta property="og:image" content="https://menuq.com/og-image.jpg" />
        <meta property="og:url" content="https://menuq.com" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Menu Q - Digitize Your Restaurant Menu with QR Codes" />
        <meta name="twitter:description" content="Transform your restaurant menu into an interactive digital experience with Menu Q. Our QR code solution makes ordering seamless for your customers." />
        <meta name="twitter:image" content="https://menuq.com/twitter-image.jpg" />
        
        {/* Other important meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <link rel="canonical" href="https://menuq.com" />
      </Helmet>
      
      {/* Nav */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            <div className="flex items-center">
            <div className="flex items-center">
              <img src="frontend/public/short logo.png" alt="Menu Q Logo" className="h-10 w-auto" />
            </div>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Core Elements</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Seamless Flow</a>
              {/* <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Tailored Plans</a> */}
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Real Stories</a>
              <a href="#Reach Us" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Reach Us</a>
              <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Login</Link>
              <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full font-medium hover:shadow-lg transition-all">
                Get Started
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {isMenuOpen ? 
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path> :
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  }
                </svg>
              </button>
            </div>
          </nav>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 mt-2 bg-white rounded-lg shadow-xl">
              <a href="#features" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Core Elements</a>
              <a href="#how-it-works" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Seamless Flow</a>
              {/* <a href="#pricing" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Tailored Plans</a> */}
              <a href="#testimonials" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Real Stories</a>
              <a href="#Reach Us" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Reach Us</a>
              <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Login</Link>
              <Link to="/signup" className="block px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md mt-2 mx-4">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </header>
      
      {/* Hero Section */}
<section className="relative pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col lg:flex-row items-center">
      {/* Left Side - Text Content */}
      <div className="lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 mb-6 font-serif tracking-wide drop-shadow-md">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Revolutionizing Dining  
          </span>  
          <br /> One Scan, Endless Possibilities.
        </h1>
        {/* CTA Button */}
        <div>
          <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl hover:scale-105 hover:ring-4 hover:ring-blue-300 transition-all">
            Get Started for Free
          </Link>
        </div>
      </div>
      {/* Right Side - Image and Description */}
      <div className="lg:w-1/2 flex flex-col items-center lg:items-end relative">
        <div className="relative">
          {/* Floating Glow Effect */}
          <div className="absolute inset-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>
          {/* Main Image */}
          <img 
            src="/api/placeholder/300/600" 
            alt="QR code menu demonstration" 
            className="relative z-10 rounded-xl shadow-2xl transform hover:scale-105 transition-transform"
          />
          {/* Floating QR Code Card */}
          <div className="absolute -right-6 -bottom-6 bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-xl z-20 flex items-center space-x-3">
            <img src="/api/placeholder/80/80" alt="QR code" className="w-12 h-12" />
            <div className="text-sm font-medium text-gray-800">Scan to see demo</div>
          </div>
        </div>
        {/* Description Positioned Lower with "Know More" */}
        <div className="mt-16 text-center lg:text-right max-w-md">
          <h2 className="text-2xl font-serif font-bold text-gray-900">Menu Q</h2>
          <p className="text-lg text-gray-700 mt-2 leading-relaxed tracking-wide">
          "Elevate the way you serve and savor. With a simple scan, MenuQ transforms dining into a seamless, interactive experience - bridging tradition with innovation. 
          Enhance customer engagement, streamline operations, and redefine convenience, all while preserving the warmth of a great meal."
          </p>
          {/* Know More Button */}
          <div className="mt-6">
            <a href="#features" className="text-blue-600 font-semibold text-lg hover:underline hover:text-blue-800 transition-all">
              Know More →
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      
      {/* Trusted By */}
      {/* <section className="py-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 mb-8">Trusted by restaurants worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            <div className="w-32 h-12 bg-gray-200 rounded flex items-center justify-center">Logo 1</div>
            <div className="w-32 h-12 bg-gray-200 rounded flex items-center justify-center">Logo 2</div>
            <div className="w-32 h-12 bg-gray-200 rounded flex items-center justify-center">Logo 3</div>
            <div className="w-32 h-12 bg-gray-200 rounded flex items-center justify-center">Logo 4</div>
            <div className="w-32 h-12 bg-gray-200 rounded flex items-center justify-center">Logo 5</div>
          </div>
        </div>
      </section> */}
      
      {/* Features */}
      <section id="features" className="py-24 bg-gradient-to-b from-gray-50 to-white">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Where Technology Meets Taste</h2>
      <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto italic">Your culinary vision, seamlessly woven into the digital era.</p>
      <div className="w-24 h-1 bg-amber-500 mx-auto mt-8"></div>
    </div>
    
    <div className="grid grid-cols-12 gap-8">
      {/* Left Column - 3 Features */}
      <div className="col-span-12 lg:col-span-6 space-y-12">
        <div className="flex items-start p-6 bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:translate-y-[-8px]">
          <div className="h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mr-6 border border-amber-200">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-medium text-gray-900 mb-3">Elegant Mobile Experience</h3>
            <p className="text-gray-600 leading-relaxed">Artfully crafted for every device, ensuring your menu presents beautifully across all screens—from smartphones to tablets.</p>
          </div>
        </div>
        
        <div className="flex items-start p-6 bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:translate-y-[-8px]">
          <div className="h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mr-6 border border-amber-200">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
            </svg>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-medium text-gray-900 mb-3">Menu Evolution</h3>
            <p className="text-gray-600 leading-relaxed">Adapt your offerings in real-time. Seasonal changes, chef's specials, and price adjustments appear instantly without reprinting.</p>
          </div>
        </div>
        
        <div className="flex items-start p-6 bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:translate-y-[-8px]">
          <div className="h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mr-6 border border-amber-200">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-medium text-gray-900 mb-3">Seamless Ordering</h3>
            <p className="text-gray-600 leading-relaxed">Transform browsing into buying with integrated ordering that connects directly to your kitchen operations.</p>
          </div>
        </div>
      </div>
      
      {/* Center Image Column */}
      <div className="hidden lg:block lg:col-span-1">
        <div className="h-full w-px bg-amber-200 mx-auto"></div>
      </div>
      
      {/* Right Column - 3 Features */}
      <div className="col-span-12 lg:col-span-5 space-y-12 lg:pt-16">
        <div className="flex items-start p-6 bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:translate-y-[-8px]">
          <div className="h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mr-6 border border-amber-200">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-medium text-gray-900 mb-3">Curated Insights</h3>
            <p className="text-gray-600 leading-relaxed">Discover your clientele's preferences through elegant analytics that reveal trending dishes and guest patterns.</p>
          </div>
        </div>
        
        <div className="flex items-start p-6 bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:translate-y-[-8px]">
          <div className="h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mr-6 border border-amber-200">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
            </svg>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-medium text-gray-900 mb-3">Global Palate</h3>
            <p className="text-gray-600 leading-relaxed">Welcome international guests with automatic menu translation, preserving your culinary vision in any language.</p>
          </div>
        </div>
        
        <div className="flex items-start p-6 bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:translate-y-[-8px]">
          <div className="h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mr-6 border border-amber-200">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
            </svg>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-medium text-gray-900 mb-3">Bespoke Aesthetic</h3>
            <p className="text-gray-600 leading-relaxed">Infuse your brand's essence through customized visuals - our intuitive tools craft an experience as distinctive as your cuisine.</p>
          </div>
        </div>
      </div>
    </div>
    
    <div className="mt-20 text-center">
      <button className="px-8 py-3 bg-amber-600 text-white rounded-full font-medium tracking-wide hover:bg-amber-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
      Elevate Your Dining Experience Today
      </button>
    </div>
  </div>
</section>
      
      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-gray-50 to-white">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">The Journey to Digital Elegance</h2>
      <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto italic">Three refined steps to transform your dining experience</p>
      <div className="w-24 h-1 bg-amber-500 mx-auto mt-8"></div>
    </div>
    
    <div className="grid grid-cols-12 gap-8">
      {/* Step 1 */}
      <div className="col-span-12 lg:col-span-4">
        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:translate-y-[-8px] h-full">
          <div className="h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mb-6 border border-amber-200">
            <span className="font-serif text-2xl font-medium text-amber-600">01</span>
          </div>
          <div className="text-center">
            <h3 className="font-serif text-2xl font-medium text-gray-900 mb-3">Curate Your Collection</h3>
            <p className="text-gray-600 leading-relaxed">Import your culinary masterpieces or craft a bespoke menu using our elegant design studio. Every dish deserves meticulous presentation.</p>
          </div>
        </div>
      </div>
      
      {/* Step 2 */}
      <div className="col-span-12 lg:col-span-4">
        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:translate-y-[-8px] h-full">
          <div className="h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mb-6 border border-amber-200">
            <span className="font-serif text-2xl font-medium text-amber-600">02</span>
          </div>
          <div className="text-center">
            <h3 className="font-serif text-2xl font-medium text-gray-900 mb-3">Personalize & Enchant</h3>
            <p className="text-gray-600 leading-relaxed">Imbue your menu with your distinctive aesthetic and generate an artfully designed QR code that reflects your establishment's unique character.</p>
          </div>
        </div>
      </div>
      
      {/* Step 3 */}
      <div className="col-span-12 lg:col-span-4">
        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:translate-y-[-8px] h-full">
          <div className="h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mb-6 border border-amber-200">
            <span className="font-serif text-2xl font-medium text-amber-600">03</span>
          </div>
          <div className="text-center">
            <h3 className="font-serif text-2xl font-medium text-gray-900 mb-3">Unveil the Experience</h3>
            <p className="text-gray-600 leading-relaxed">Present your QR codes in elegant table displays and invite your guests to explore your offerings through a seamless, sophisticated digital journey.</p>
          </div>
        </div>
      </div>
    </div>
    
    {/* Detailed Steps */}
    <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex items-start mb-6">
          <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mr-4 border border-amber-200">
            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h4 className="font-serif text-xl font-medium text-gray-900">Seamless Menu Creation</h4>
        </div>
        <p className="text-gray-600 leading-relaxed ml-16">Effortlessly upload existing menus or design from scratch with our intuitive tools. Showcase dishes with high-resolution images and compelling descriptions that entice the senses.</p>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex items-start mb-6">
          <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mr-4 border border-amber-200">
            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
            </svg>
          </div>
          <h4 className="font-serif text-xl font-medium text-gray-900">Distinctive Branding</h4>
        </div>
        <p className="text-gray-600 leading-relaxed ml-16">Apply your establishment's unique aesthetic through customizable templates, typography, and color schemes that complement your culinary vision and physical space.</p>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex items-start mb-6">
          <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mr-4 border border-amber-200">
            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
            </svg>
          </div>
          <h4 className="font-serif text-xl font-medium text-gray-900">Sophisticated QR Generation</h4>
        </div>
        <p className="text-gray-600 leading-relaxed ml-16">Create elegant QR codes that blend seamlessly with your décor. Choose from various styles, add your logo, and customize colors to maintain visual harmony.</p>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex items-start mb-6">
          <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mr-4 border border-amber-200">
            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <h4 className="font-serif text-xl font-medium text-gray-900">Secure & Contactless</h4>
        </div>
        <p className="text-gray-600 leading-relaxed ml-16">Provide guests with a hygienic, modern dining experience while maintaining the intimate connection between your culinary artistry and their appreciation.</p>
      </div>
    </div>
    
    <div className="mt-20 text-center">
      <button className="px-8 py-3 bg-amber-600 text-white rounded-full font-medium tracking-wide hover:bg-amber-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
        Transform Your Experience
      </button>
    </div>
  </div>
</section>
      
      {/* have to un comment each section seperately */}
      {/* Pricing */}
      {/* <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-xl text-gray-600">Choose the plan that works best for your business</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"> */}
            {/* Starter Plan */}
            {/* <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                <p className="text-gray-600 mb-6">Perfect for small businesses</p>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold text-gray-900">$19</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-600">1 QR Code Menu</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-600">Up to 50 menu items</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-600">Basic analytics</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-600">Email support</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <Link to="/signup" className="block w-full bg-gray-100 text-gray-800 text-center py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  Get Started
                </Link>
              </div>
            </div> */}
            
            {/* Business Plan */}
            {/* <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform scale-105 border-2 border-blue-600">
              <div className="bg-blue-600 text-white text-center py-2 text-sm font-semibold">
                MOST POPULAR
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Business</h3>
                <p className="text-gray-600 mb-6">Ideal for growing restaurants</p>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold text-gray-900">$49</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-600">5 QR Code Menus</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-600">Unlimited menu items</span>
                  </li>
                  <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-600">Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-600">Online ordering integration</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-600">Priority support</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <Link to="/signup" className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-lg font-medium hover:shadow-lg transition-all">
                  Get Started
                </Link>
              </div>
            </div> */}
            
            {/* Enterprise Plan */}
            {/* <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-6">For restaurant chains</p>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold text-gray-900">$99</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-600">Unlimited QR Code Menus</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-600">Multi-location management</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-600">White-label solution</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-600">API access</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-600">24/7 dedicated support</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <Link to="/signup" className="block w-full bg-gray-100 text-gray-800 text-center py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-6">All plans include a 14-day free trial. No credit card required.</p>
            <Link to="/pricing" className="text-blue-600 font-medium hover:underline inline-flex items-center">
              View full pricing details
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section> */}
      
      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
            <p className="mt-4 text-xl text-gray-600">Trusted by restaurants around the world</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Owner, The Local Diner</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Menu Q transformed our restaurant experience. Our customers love the convenience, and we've seen a 15% increase in orders since implementation."
              </p>
              <div className="flex text-yellow-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Michael Chen</h4>
                  <p className="text-sm text-gray-600">Manager, Fusion Bistro</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "The analytics provided by Menu Q helped us optimize our menu offerings. We now know exactly which dishes to promote and when."
              </p>
              <div className="flex text-yellow-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Elena Rodriguez</h4>
                  <p className="text-sm text-gray-600">Owner, Coastal Eats</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "The setup was incredibly easy, and the support team was always available to help. Our customers appreciate the contactless menu option."
              </p>
              <div className="flex text-yellow-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/testimonials" className="text-blue-600 font-medium hover:underline">
              Read all customer stories
            </Link>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-24 bg-white overflow-hidden relative">
  {/* Abstract background pattern */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-blue-500 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-600 blur-3xl translate-x-1/3 translate-y-1/4"></div>
    <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-emerald-500 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
  </div>

  <div className="container mx-auto px-6 relative z-10">
    {/* Asymmetrical header */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <div className="md:col-span-1">
        <span className="text-emerald-600 text-lg font-mono">Menu Q</span>
        <h2 className="text-5xl font-bold text-gray-900 mt-2 tracking-tight">Curious Minds Inquire</h2>
      </div>
      <div className="md:col-span-2 flex items-end">
        <p className="text-gray-600 text-xl max-w-xl">Discover the intricacies of our digital menu experience through these carefully curated inquiries.</p>
      </div>
    </div>

    {/* Accordion-style FAQ items */}
    <div className="space-y-1">
      {/* FAQ Item 1 */}
      <div className="group cursor-pointer">
        <div className="flex items-center justify-between border-t border-gray-200 py-6 transition-all">
          <div className="flex items-center">
            <span className="text-emerald-600 text-sm mr-6 transition-all group-hover:mr-10">01</span>
            <h3 className="text-2xl font-medium text-gray-900">Activation Timeline</h3>
          </div>
          <span className="text-emerald-600 text-2xl transform transition-transform group-hover:rotate-45">+</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 pb-8 transition-all max-h-0 group-hover:max-h-96 overflow-hidden group-hover:overflow-visible">
          <div className="md:col-span-1"></div>
          <p className="text-gray-600 md:col-span-4 pr-12 transition-opacity opacity-0 group-hover:opacity-100">
            From concept to reality in 15 minutes. Our streamlined platform lets you rapidly deploy your menu, whether by importing existing content or crafting something entirely new through our designer interface.
          </p>
        </div>
      </div>

      {/* FAQ Item 2 */}
      <div className="group cursor-pointer">
        <div className="flex items-center justify-between border-t border-gray-200 py-6 transition-all">
          <div className="flex items-center">
            <span className="text-emerald-600 text-sm mr-6 transition-all group-hover:mr-10">02</span>
            <h3 className="text-2xl font-medium text-gray-900">Brand Embodiment</h3>
          </div>
          <span className="text-emerald-600 text-2xl transform transition-transform group-hover:rotate-45">+</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 pb-8 transition-all max-h-0 group-hover:max-h-96 overflow-hidden group-hover:overflow-visible">
          <div className="md:col-span-1"></div>
          <p className="text-gray-600 md:col-span-4 pr-12 transition-opacity opacity-0 group-hover:opacity-100">
            Your menu is your canvas. Customization extends to every aspect—color schemes that match your brand identity, logo placement, structural templates, and complete freedom in menu organization.
          </p>
        </div>
      </div>

      {/* FAQ Item 3 */}
      <div className="group cursor-pointer">
        <div className="flex items-center justify-between border-t border-gray-200 py-6 transition-all">
          <div className="flex items-center">
            <span className="text-emerald-600 text-sm mr-6 transition-all group-hover:mr-10">03</span>
            <h3 className="text-2xl font-medium text-gray-900">Frictionless Discovery</h3>
          </div>
          <span className="text-emerald-600 text-2xl transform transition-transform group-hover:rotate-45">+</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 pb-8 transition-all max-h-0 group-hover:max-h-96 overflow-hidden group-hover:overflow-visible">
          <div className="md:col-span-1"></div>
          <p className="text-gray-600 md:col-span-4 pr-12 transition-opacity opacity-0 group-hover:opacity-100">
            No barriers between customers and your offerings. A simple QR scan launches your menu instantly in their browser—no downloads, no accounts, no friction. Just pure culinary exploration.
          </p>
        </div>
      </div>

      {/* FAQ Item 4 */}
      <div className="group cursor-pointer">
        <div className="flex items-center justify-between border-t border-gray-200 py-6 transition-all">
          <div className="flex items-center">
            <span className="text-emerald-600 text-sm mr-6 transition-all group-hover:mr-10">04</span>
            <h3 className="text-2xl font-medium text-gray-900">Dynamic Content Management</h3>
          </div>
          <span className="text-emerald-600 text-2xl transform transition-transform group-hover:rotate-45">+</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 pb-8 transition-all max-h-0 group-hover:max-h-96 overflow-hidden group-hover:overflow-visible">
          <div className="md:col-span-1"></div>
          <p className="text-gray-600 md:col-span-4 pr-12 transition-opacity opacity-0 group-hover:opacity-100">
            Your menu evolves in real time. Update items, prices, and availability instantly through our intuitive dashboard. Changes propagate immediately, keeping your menu perpetually current.
          </p>
        </div>
      </div>

      {/* FAQ Item 5 */}
      <div className="group cursor-pointer">
        <div className="flex items-center justify-between border-t border-t-gray-200 border-b border-b-gray-200 py-6 transition-all">
          <div className="flex items-center">
            <span className="text-emerald-600 text-sm mr-6 transition-all group-hover:mr-10">05</span>
            <h3 className="text-2xl font-medium text-gray-900">System Integration</h3>
          </div>
          <span className="text-emerald-600 text-2xl transform transition-transform group-hover:rotate-45">+</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 pb-8 transition-all max-h-0 group-hover:max-h-96 overflow-hidden group-hover:overflow-visible">
          <div className="md:col-span-1"></div>
          <p className="text-gray-600 md:col-span-4 pr-12 transition-opacity opacity-0 group-hover:opacity-100">
            Seamless connectivity with your operational infrastructure. Our Premium and Enterprise tiers facilitate integration with leading POS systems, creating a unified technological ecosystem for your establishment.
          </p>
        </div>
      </div>
    </div>

    <div className="mt-20 flex justify-center">
      <Link to="/faq" className="group relative">
        <span className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></span>
        <span className="relative flex items-center space-x-2 bg-white px-8 py-4 rounded-full border border-emerald-600">
          <span className="text-gray-900 font-medium">Complete Intelligence Archive</span>
          <svg className="w-5 h-5 text-emerald-600 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      </Link>
    </div>
  </div>
</section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
  {/* Background elements */}
  <div className="absolute inset-0 bg-slate-900"></div>
  
  {/* Diagonal slice */}
  <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 to-violet-700 skew-y-6 transform origin-top-right"></div>
  
  {/* Decorative elements */}
  <div className="absolute right-0 top-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
  <div className="absolute left-0 bottom-0 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/3"></div>
  
  {/* Pattern overlay */}
  <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:40px_40px]"></div>
  
  {/* Dotted pattern */}
  <div className="absolute top-12 right-12 hidden lg:block">
    <div className="grid grid-cols-3 gap-2">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="w-3 h-3 rounded-full bg-white opacity-20"></div>
      ))}
    </div>
  </div>
  
  {/* Content container */}
  <div className="container mx-auto px-6 relative z-10">
    <div className="max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-5 gap-16 items-center">
        {/* Left content */}
        <div className="lg:col-span-3 text-white">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center py-1 px-3 rounded-full text-xs font-medium tracking-wider bg-white/10 text-white/90 backdrop-blur-sm">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
              ELEVATE YOUR DINING EXPERIENCE
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
            <span className="block">Craft the</span>
            <span className="font-bold italic">perfect digital menu</span>
            <span className="block mt-1">your patrons deserve</span>
          </h2>
          
          <div className="flex flex-wrap mt-10 mb-8 space-x-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="ml-3 text-white/80">14-day complimentary access</p>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <p className="ml-3 text-white/80">No payment credentials required</p>
            </div>
          </div>
        </div>
        
        {/* Right content - Form/CTA card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm relative overflow-hidden">
            {/* Card decorative element */}
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full opacity-10"></div>
            
            <h3 className="text-slate-800 text-xl font-medium mb-6">Join thousands of innovative restaurants</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-600">Beautiful, interactive digital menus</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-600">Real-time menu updates</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-600">Enhanced customer experience</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Link to="/signup" className="block w-full py-3 px-4 text-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5">
                Begin Your Transformation
              </Link>
              
              <Link to="/demo" className="block w-full py-3 px-4 text-center rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all duration-300">
                Schedule Personalized Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Reach Us page */}
<section id="Reach Us" className="relative py-24 overflow-hidden">
  {/* Decorative background elements */}
  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 to-white z-0"></div>
  <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-indigo-100/50 blur-2xl"></div>
  <div className="absolute bottom-12 left-12 w-32 h-32 rounded-full bg-blue-100/40 blur-xl"></div>
  
  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent"></div>
  
  {/* Main content container */}
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Section header with elegant styling */}
    <div className="max-w-xl mx-auto text-center mb-16">
      <span className="inline-block px-3 py-1 text-xs font-medium tracking-widest uppercase bg-indigo-100 text-indigo-800 rounded-full mb-4">Correspondence</span>
      <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">
        <span className="relative inline-block">
          Reach
          <svg className="absolute w-full h-1 bottom-1 left-0 text-indigo-300" viewBox="0 0 100 4" preserveAspectRatio="none">
            <path d="M0,1 C30,4 70,4 100,1" stroke="currentColor" fill="none" strokeWidth="2"></path>
          </svg>
        </span> Out
      </h2>
      <p className="text-gray-600 leading-relaxed">We believe in the art of conversation. Share your thoughts, inquiries, or simply say hello.</p>
    </div>
    
    {/* Contact card with sophisticated design */}
    <div className="max-w-6xl mx-auto">
      <div className="relative bg-white rounded-xl overflow-hidden shadow-xl">
        {/* Decorative side border */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-600 via-blue-500 to-violet-600"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* Contact information panel */}
          <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900 to-blue-800 text-white p-8 lg:p-12 relative">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-5 mix-blend-overlay">
              <svg width="100%" height="100%">
                <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                  <circle id="pattern-circle" cx="10" cy="10" r="1.5" fill="#fff"></circle>
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
              </svg>
            </div>
            
            <div className="relative z-10">
              <h3 className="font-serif text-2xl font-bold mb-6">Let's Connect</h3>
              <p className="mb-8 font-light opacity-90">We're available to assist you with any inquiries about MenuQ and how we can elevate your dining establishment.</p>
              
              <div className="space-y-6">
                {/* Contact method items */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                    <svg className="h-5 w-5 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-200">Call Us</p>
                    <p className="mt-1">+91 94823 83691</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                    <svg className="h-5 w-5 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-200">Email</p>
                    <p className="mt-1">info@menuq.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                    <svg className="h-5 w-5 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-200">Location</p>
                    <p className="mt-1">Mysore<br />Karnataka</p>
                  </div>
                </div>
              </div>
              
              {/* Social media links */}
              <div className="mt-12">
                <p className="text-sm font-medium text-blue-200 mb-4">Connect With Us</p>
                <div className="flex space-x-4">
                  {['instagram', 'twitter', 'facebook', 'linkedin'].map(platform => (
                    <a key={platform} href={`#${platform}`} className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <span className="sr-only">{platform}</span>
                      <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact form panel */}
          <div className="lg:col-span-3 p-8 lg:p-12">
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">Send a Message</h3>
            <p className="text-gray-600 mb-8">We'd love to hear from you. Please fill out the form below.</p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select
                  id="subject"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
                >
                  <option value="">Please select</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="demo">Request a Demo</option>
                  <option value="partnership">Partnership Opportunities</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  placeholder="How can we assist you today?"
                ></textarea>
              </div>
              
              <div className="flex items-start">
                <input
                  id="privacy"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="privacy" className="ml-2 block text-sm text-gray-600">
                  I agree to the <a href="#privacy" className="text-indigo-600 hover:text-indigo-800">privacy policy</a> and consent to being contacted regarding my inquiry.
                </label>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden bg-indigo-800 rounded-md"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-violet-700 rounded-full group-hover:w-full group-hover:h-56"></span>
                  <span className="relative flex items-center text-white font-medium">
                    Send Message
                    <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Additional service banner */}
      <div className="mt-12 bg-gradient-to-r from-indigo-100 to-blue-50 rounded-lg p-6 shadow-sm flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h4 className="font-serif text-lg font-bold text-gray-900">Need immediate assistance?</h4>
          <p className="text-gray-600">Our dedicated support team is available via live chat during business hours.</p>
        </div>
        <a href="#chat" className="inline-flex items-center px-6 py-3 bg-white text-indigo-700 rounded-md shadow-sm font-medium hover:bg-indigo-50 transition-colors">
          <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Start Live Chat
        </a>
      </div>
    </div>
  </div>
</section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Menu Q</h3>
              <p className="text-gray-400 mb-4">Modern QR code menus for forward-thinking restaurants.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Links 1 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/integrations" className="text-gray-400 hover:text-white transition-colors">Integrations</Link></li>
                <li><Link to="/demo" className="text-gray-400 hover:text-white transition-colors">Request a Demo</Link></li>
              </ul>
            </div>
            
            {/* Links 2 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            {/* Links 3 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/guides" className="text-gray-400 hover:text-white transition-colors">Guides</Link></li>
                <li><Link to="/partners" className="text-gray-400 hover:text-white transition-colors">Partner Program</Link></li>
                <li><Link to="/api" className="text-gray-400 hover:text-white transition-colors">API Documentation</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Menu Q. All rights reserved.</p>
              </div>
              <div className="flex space-x-6">
                <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
                <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;