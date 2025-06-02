import React from 'react';
import { ArrowLeft, Shield, Heart, Users, Scale, Sparkles, Mail, Phone, MapPin } from 'lucide-react';
import ScrollToTopButton from './ScrollToTopButton';

const TermsOfService = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute -top-12 sm:-top-24 -left-12 sm:-left-24 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-amber-300 mix-blend-multiply"></div>
        <div className="absolute top-1/4 sm:top-1/3 right-1/6 sm:right-1/4 w-32 h-32 sm:w-64 sm:h-64 rounded-full bg-amber-200 mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-80 sm:h-80 rounded-full bg-amber-100 mix-blend-multiply"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-amber-100 text-amber-800 font-medium text-xs sm:text-sm mb-4 sm:mb-6">
            <Scale className="w-3 h-3 sm:w-4 sm:h-4" />
            Legal Framework
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-gray-900 mb-4 sm:mb-6 px-2">
            <span className="block text-amber-700">Terms of Service</span>
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl italic text-gray-600 font-light mt-2 block">
              Our Foundation of Trust
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-light px-4">
            Where transparency meets elegance. These terms establish the foundation for our shared culinary journey.
          </p>
          <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-amber-700 font-medium">
            Last updated: {currentDate}
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto">
          {/* Introduction Card */}
          <div className="bg-gradient-to-br from-white via-amber-25 to-white rounded-2xl sm:rounded-3xl shadow-xl border border-amber-100 p-6 sm:p-8 mb-8 sm:mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full -translate-y-10 translate-x-10 sm:-translate-y-16 sm:translate-x-16 opacity-30"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 flex-shrink-0" />
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">Welcome to MenuQ</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                Welcome to MenuQ – where convenience meets care, and every interaction is crafted with intention. 
                These Terms of Service represent more than legal requirements; they embody our commitment to 
                fostering a community built on mutual respect, culinary excellence, and technological innovation.
              </p>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-6 sm:space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-xs sm:text-sm">1</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-3 sm:mb-4">Our Mutual Understanding</h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    By engaging with MenuQ, you become part of a carefully curated ecosystem where dining transcends 
                    the ordinary. Whether you're a distinguished restaurant partner, an adventurous diner, or a curious 
                    explorer of culinary landscapes, you agree to engage with MenuQ responsibly, ethically, and with 
                    the same passion for excellence that drives our platform.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-xs sm:text-sm">2</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-3 sm:mb-4">What We Offer</h3>
                  <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                    MenuQ serves as an elegant bridge between culinary artisans and discerning guests. Our sophisticated 
                    digital platform enables users to:
                  </p>
                  <ul className="text-gray-700 space-y-2 ml-2 sm:ml-4 text-sm sm:text-base">
                    <li>• Explore thoughtfully curated menus with rich, immersive detail</li>
                    <li>• Discover culinary narratives that honor tradition while embracing innovation</li>
                    <li>• Connect with restaurants through seamless, intuitive interactions</li>
                    <li>• Experience dining discovery elevated to an art form</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3 sm:mt-4 italic text-sm sm:text-base">
                    We are not food providers ourselves, but rather the curators of exceptional dining experiences.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-xs sm:text-sm">3</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-3 sm:mb-4">Your Responsibilities as a Guest</h3>
                  <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                    To maintain the integrity and elegance of our shared experience:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 text-sm sm:text-base">Provide accurate and authentic information when creating your MenuQ profile</p>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 text-sm sm:text-base">Respect the technological boundaries of our platform—no unauthorized access or system manipulation</p>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 text-sm sm:text-base">Use MenuQ exclusively for personal dining discovery or authorized commercial purposes</p>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 text-sm sm:text-base">Maintain the same level of courtesy and respect you would expect in a fine dining establishment</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-xs sm:text-sm">4</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-3 sm:mb-4">Our Commitment to Integrity</h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    Every element of MenuQ—from our sophisticated interface design to our proprietary algorithms—represents 
                    countless hours of passionate craftsmanship. All trademarks, logos, content, and intellectual property 
                    are protected by law and belong to MenuQ or our esteemed partners. We ask that you honor creative work 
                    by not reproducing or reusing our assets without explicit permission. Excellence deserves protection.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-xs sm:text-sm">5</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-3 sm:mb-4">Third-Party Collaborations</h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    Your MenuQ journey may seamlessly connect you with carefully selected third-party services and restaurant 
                    partners. While we maintain rigorous standards in choosing our collaborators, we don't control external 
                    platforms and cannot be held liable for their independent actions. We encourage mindful engagement with 
                    all digital experiences.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-xs sm:text-sm">6</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-3 sm:mb-4">Technology, Evolving Gracefully</h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    We strive for seamless, uninterrupted service, but like any sophisticated system, occasional updates 
                    or refinements may be necessary. MenuQ is offered with dedication and care, though we cannot guarantee 
                    absolute perfection. What we can promise is our unwavering commitment to continuous improvement and 
                    graceful evolution.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-xs sm:text-sm">7</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-3 sm:mb-4">Limitation of Liability</h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    While we care deeply about your MenuQ experience and invest considerable resources in maintaining 
                    excellence, we cannot be held liable for indirect or consequential losses arising from the use or 
                    inability to use our services. We encourage mindful digital practices and safe browsing habits. 
                    Your digital well-being matters to us.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-xs sm:text-sm">8</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-3 sm:mb-4">When Paths Diverge</h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    While we hope you'll remain part of our MenuQ community for years to come, we reserve the right to 
                    suspend access if any usage violates these Terms or compromises the integrity of our platform. 
                    Mutual respect remains our golden standard. All decisions are made thoughtfully and with consideration 
                    for our entire community.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 9 */}
            <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-xs sm:text-sm">9</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-3 sm:mb-4">Evolution of Understanding</h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    These Terms may evolve to reflect our growth, technological advances, or changes in legal requirements. 
                    When updates occur, we'll notify you through appropriate channels. Your continued use of MenuQ indicates 
                    your alignment with the latest version. Change, when thoughtful, leads to improvement.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 10 */}
            <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-xs sm:text-sm">10</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-3 sm:mb-4">Legal Foundation</h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    These Terms are governed by the laws of Delaware, United States. Any disagreements will be handled 
                    respectfully through appropriate legal channels within that jurisdiction. We believe in resolution 
                    through understanding rather than conflict.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Contact Section */}
          <div className="mt-12 sm:mt-16 bg-gradient-to-br from-amber-50 via-white to-amber-50 rounded-2xl sm:rounded-3xl shadow-xl border border-amber-100 p-6 sm:p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">Always Here for You</h2>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
            </div>
            <p className="text-gray-700 leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base px-2">
              Questions, suggestions, or simply want to share your MenuQ story? We're here to listen. 
              Every conversation helps us craft better experiences.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-amber-100 hover:shadow-xl transition-shadow duration-300">
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Email Support</h3>
                <a href="mailto:support@menuq.com" className="text-amber-700 hover:text-amber-800 transition-colors duration-300 text-sm sm:text-base break-all">
                  info@menuq.in
                </a>
              </div>
              
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-amber-100 hover:shadow-xl transition-shadow duration-300">
                <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Phone Support</h3>
                <a href="tel:+1-888-MENUQ-01" className="text-amber-700 hover:text-amber-800 transition-colors duration-300 text-sm sm:text-base">
                  +91 94823 83691
                </a>
              </div>
              
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-amber-100 hover:shadow-xl transition-shadow duration-300 sm:col-span-2 md:col-span-1">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Headquarters</h3>
                <p className="text-amber-700 text-xs sm:text-sm">
                  MenuQ Innovation Center<br />
                  Karnataka
                </p>
              </div>
            </div>
          </div>

          {/* Final Quote */}
          <div className="mt-8 sm:mt-12 text-center px-4">
            <blockquote className="text-lg sm:text-xl font-serif italic text-gray-600 max-w-3xl mx-auto leading-relaxed">
              "At MenuQ, we don't just serve technology—we serve relationships, experiences, and the timeless art of bringing people together around exceptional food."
            </blockquote>
            <div className="mt-3 sm:mt-4 text-amber-700 font-medium text-sm sm:text-base">— The MenuQ Team</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-6 sm:py-8 mt-12 sm:mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">M</span>
            </div>
            <span className="font-serif font-bold text-lg sm:text-xl">MenuQ</span>
          </div>
          <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base px-4">
            Redefining the art of dining through technology and care.
          </p>
          <div className="text-xs sm:text-sm text-gray-500 px-4">
            © 2025 MenuQ. All rights reserved. | Terms of Service | Privacy Policy
          </div>
        </div>
      </footer>
      <ScrollToTopButton />
    </div>
  );
};

export default TermsOfService;