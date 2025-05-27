import React from 'react';
import ScrollToTopButton from './ScrollToTopButton';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-20 pb-20 sm:pb-32 bg-gradient-to-br from-amber-50 via-white to-gray-50 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
          <div className="absolute -top-16 sm:-top-32 -left-16 sm:-left-32 w-48 sm:w-96 h-48 sm:h-96 rounded-full bg-amber-400 mix-blend-multiply"></div>
          <div className="absolute top-1/4 right-1/3 w-40 sm:w-80 h-40 sm:h-80 rounded-full bg-amber-300 mix-blend-multiply"></div>
          <div className="absolute bottom-1/4 left-1/4 w-32 sm:w-64 h-32 sm:h-64 rounded-full bg-amber-200 mix-blend-multiply"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Elegant Intro */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-amber-400 rounded-full"></div>
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-amber-500 rounded-full"></div>
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-amber-400 rounded-full"></div>
                </div>
                <div className="mx-4 sm:mx-6 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 bg-clip-text text-transparent">
                  MenuQ
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-amber-400 rounded-full"></div>
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-amber-500 rounded-full"></div>
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-amber-400 rounded-full"></div>
                </div>
              </div>
              <p className="text-amber-700 font-medium text-base sm:text-lg tracking-wider uppercase mb-3 sm:mb-4">
                Our Story
              </p>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight text-gray-900 mb-6 sm:mb-8">
              <span className="block mb-1 sm:mb-2">Where</span>
              <span className="block text-amber-700 italic">Culinary Art</span>
              <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-600 font-light mt-3 sm:mt-4">
                meets Digital Grace
              </span>
            </h1>
            
            <div className="w-16 sm:w-24 h-1 bg-amber-500 mx-auto mb-6 sm:mb-8"></div>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-light leading-relaxed italic max-w-3xl mx-auto px-2">
              "In a world of noise, MenuQ is the quiet innovation that speaks volumes."
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4 sm:mb-6">
                Our Philosophy
              </h2>
              <div className="w-12 sm:w-16 h-1 bg-amber-500 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 text-6xl sm:text-8xl text-amber-200 font-serif leading-none opacity-30 select-none">"</div>
                <blockquote className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed italic font-light pl-6 sm:pl-8">
                  At MenuQ, we believe that food is not just nourishment—it's an experience, a moment of connection, and a silent storyteller of cultures and memories. In an age where speed often overshadows depth, we set out to build something that preserves the soul of dining while embracing the elegance of modern technology.
                </blockquote>
                <div className="absolute -bottom-4 sm:-bottom-6 -right-2 sm:-right-4 text-6xl sm:text-8xl text-amber-200 font-serif leading-none opacity-30 transform rotate-180 select-none">"</div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-white p-6 sm:p-8 rounded-2xl shadow-lg border border-amber-100 order-1 lg:order-2">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-800 mb-3 sm:mb-4">
                  The Genesis
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                  The journey of MenuQ began not in a boardroom, but in everyday observations—long waiting times, outdated printed menus, and the inefficiency that quietly affected both diners and restaurant staff.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  We saw the missed opportunities: moments where technology could have stepped in—not to replace human warmth, but to enhance it.
                </p>
                <div className="flex items-center flex-col sm:flex-row gap-3 sm:gap-0">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                    <svg className="w-5 sm:w-6 h-5 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                  </div>
                  <span className="sm:ml-4 text-amber-700 font-semibold text-center sm:text-left">MenuQ is our answer to that gap.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4 sm:mb-6">
                What We Create
              </h2>
              <div className="w-12 sm:w-16 h-1 bg-amber-500 mx-auto mb-4 sm:mb-6"></div>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
                MenuQ is a smart, intuitive, and customizable QR menu system designed to simplify the dining experience for both guests and restaurant teams.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4 sm:mb-6 border border-amber-200">
                  <svg className="w-6 sm:w-8 h-6 sm:h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-3 sm:mb-4">For Your Guests</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  With just a scan, customers access a live, beautifully presented menu that reflects not only the food on offer, but the brand's unique identity. An experience that honors both tradition and innovation.
                </p>
              </div>
              
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4 sm:mb-6 border border-amber-200">
                  <svg className="w-6 sm:w-8 h-6 sm:h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-3 sm:mb-4">For Your Business</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Instant updates, seamless management, and the ability to adapt in real-time—without compromising on presentation or service. Technology that works for you, not against you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4 sm:mb-6">
                From the Founder
              </h2>
              <div className="w-12 sm:w-16 h-1 bg-amber-500 mx-auto"></div>
            </div>
            
            <div className="relative bg-gradient-to-br from-amber-50 via-white to-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-amber-100">
              {/* Decorative quotes */}
              <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 text-4xl sm:text-6xl text-amber-300 font-serif leading-none opacity-40 select-none">"</div>
              <div className="absolute -bottom-4 sm:-bottom-8 -right-2 sm:-right-4 text-4xl sm:text-6xl text-amber-300 font-serif leading-none opacity-40 transform rotate-180 select-none">"</div>
              
              <blockquote className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed italic font-light text-center relative z-10 px-2 sm:px-0">
                MenuQ wasn't just a product idea—it was a purpose-driven creation. As someone who's grown up valuing the little things—sharing meals, understanding how local businesses operate, and the importance of genuine human experience—I wanted to build something that respects time, enhances service, and brings dignity to both sides of the table.
                <br /><br />
                I saw technology as a tool, not a takeover. MenuQ is that tool—crafted not for attention, but for intention.
              </blockquote>
              
              <div className="text-center mt-6 sm:mt-8">
                <div className="inline-flex items-center gap-3 sm:gap-4 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-base sm:text-lg">M</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">Founder, MenuQ</p>
                    <p className="text-xs sm:text-sm text-amber-700">Crafting Digital Experiences</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4 sm:mb-6">
                Our Vision
              </h2>
              <div className="w-12 sm:w-16 h-1 bg-amber-500 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="lg:col-span-2 order-2 lg:order-1">
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg h-full">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-800 mb-4 sm:mb-6">
                    Quiet Innovation That Speaks Volumes
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                    We're not here to follow trends—we're here to create tools that <strong>quietly empower</strong>. Tools that don't demand the spotlight but elevate the experience.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                    MenuQ is built for restaurants, cafés, food trucks, boutique diners, and hospitality spaces that care about their craft and want to offer something <strong>seamless, modern, and human</strong>.
                  </p>
                  <div className="bg-gradient-to-r from-amber-100 to-amber-50 p-4 sm:p-6 rounded-xl border-l-4 border-amber-500">
                    <p className="text-base sm:text-lg font-medium text-amber-800 text-center italic">
                      "This is not just a QR code. This is The Warmth of a Meal, The Ease of a Scan."
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-amber-50 rounded-full flex items-center justify-center mb-3 sm:mb-4 border border-amber-200">
                    <svg className="w-5 sm:w-6 h-5 sm:h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-semibold text-gray-900 mb-2">Purpose-Driven</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Every feature crafted with intention, not just innovation.</p>
                </div>
                
                <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-amber-50 rounded-full flex items-center justify-center mb-3 sm:mb-4 border border-amber-200">
                    <svg className="w-5 sm:w-6 h-5 sm:h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-semibold text-gray-900 mb-2">Human-Centered</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Technology that enhances, never replaces, the human connection.</p>
                </div>
                
                <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-amber-50 rounded-full flex items-center justify-center mb-3 sm:mb-4 border border-amber-200">
                    <svg className="w-5 sm:w-6 h-5 sm:h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                    </svg>
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-semibold text-gray-900 mb-2">Excellence</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Crafted for those who value quality in every detail.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-4 sm:mb-6">
            Ready to Transform Your Dining Experience?
          </h2>
          <p className="text-lg sm:text-xl text-amber-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Join the quiet revolution that's redefining hospitality, one scan at a time.
          </p>
          <Link to="/contactus">
            <button className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-amber-700 font-semibold rounded-full hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base">
                Begin Your Journey
                <svg className="ml-2 w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
            </button>
            </Link>
        </div>
      </section>
      <ScrollToTopButton />
    </div>
  );
};

export default AboutPage;