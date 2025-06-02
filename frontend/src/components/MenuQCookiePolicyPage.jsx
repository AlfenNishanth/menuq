import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Cookie, Shield, Eye, Settings, Users, RefreshCw, Mail, ArrowLeft } from 'lucide-react';

// Mock ScrollToTopButton component since it's not available in this environment
const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-4 bg-amber-600 text-white p-3 rounded-full shadow-lg hover:bg-amber-700 transition-colors z-50"
      aria-label="Scroll to top"
    >
      <ArrowLeft className="w-5 h-5 rotate-90" />
    </button>
  );
};


const CookiePolicyPage = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    performance: false,
    functional: false,
    marketing: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePreferenceChange = (type) => {
    if (type === 'essential') return; // Essential cookies cannot be disabled
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const cookieTypes = [
    {
      id: 'essential',
      name: 'Essential Cookies',
      icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: 'Required for the basic functions of the site',
      details: 'These cookies are necessary for MenuQ to function properly. They enable core features like navigation, user authentication, and security. Without these cookies, our service cannot be provided effectively.',
      examples: ['Session management', 'Security tokens', 'Load balancing', 'Form submissions'],
      required: true
    },
    {
      id: 'performance',
      name: 'Performance Cookies',
      icon: <Eye className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: 'Help us analyze usage and improve our platform',
      details: 'These cookies collect information about how visitors use MenuQ, helping us understand user behavior and improve our service quality. All data is aggregated and anonymous.',
      examples: ['Google Analytics', 'Page load times', 'Error tracking', 'User journey analysis'],
      required: false
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: 'Remember your preferences and settings',
      details: 'These cookies enhance your experience by remembering your choices and preferences, making your interactions with MenuQ more personalized and efficient.',
      examples: ['Language preferences', 'Theme settings', 'Location data', 'Recently viewed items'],
      required: false
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: 'Enable relevant promotions and content',
      details: 'These cookies help us deliver relevant advertisements and promotional content based on your interests and browsing behavior, both on MenuQ and across the web.',
      examples: ['Social media integration', 'Targeted advertisements', 'Campaign tracking', 'Cross-platform analytics'],
      required: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-32 h-32 sm:w-64 sm:h-64 rounded-full bg-amber-300 mix-blend-multiply"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-24 h-24 sm:w-48 sm:h-48 rounded-full bg-amber-200 mix-blend-multiply"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-sm mb-6 sm:mb-8">
              <Cookie className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
              <span className="text-amber-800 font-medium text-sm sm:text-base">Cookie Policy</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-4 sm:mb-6">
              <span className="block mb-1 sm:mb-2">Transparency</span>
              <span className="italic text-amber-700">Served Fresh</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2">
              At MenuQ, we believe in serving experiences with integrity. Just as our culinary partners craft their menus with care, we handle your data with the same thoughtfulness and transparency.
            </p>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-amber-100 max-w-2xl mx-auto">
              <p className="text-amber-800 font-medium text-base sm:text-lg italic">
                "No hidden ingredients, no hidden tracking — only the clarity you deserve."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* What Are Cookies */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-amber-100">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <Cookie className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" />
                <span className="text-xl sm:text-3xl">What Are Cookies?</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg mb-4">
                Cookies are small text files stored on your device when you visit a website. Think of them as your restaurant's way of remembering your usual order — they help us provide a more personalized and efficient experience each time you visit MenuQ.
              </p>
              <div className="bg-amber-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-amber-200">
                <p className="text-amber-800 font-medium italic text-sm sm:text-base">
                  Just like a master chef remembers your preferences, cookies help MenuQ remember yours — creating a seamless digital dining experience tailored just for you.
                </p>
              </div>
            </div>

            {/* Cookie Types */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-amber-100">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-6 sm:mb-8">Types of Cookies We Use</h2>
              
              <div className="space-y-4 sm:space-y-6">
                {cookieTypes.map((cookie) => (
                  <div key={cookie.id} className="border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden">
                    <div 
                      className="p-3 sm:p-4 lg:p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleSection(cookie.id)}
                    >
                      <div className="flex items-start sm:items-center justify-between gap-3">
                        <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                          <div className={`p-2 sm:p-3 rounded-full flex-shrink-0 ${cookie.required ? 'bg-amber-100' : 'bg-gray-100'}`}>
                            <span className={cookie.required ? 'text-amber-600' : 'text-gray-600'}>
                              {cookie.icon}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                              <span className="break-words">{cookie.name}</span>
                              {cookie.required && (
                                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium inline-block w-fit">
                                  Required
                                </span>
                              )}
                            </h3>
                            <p className="text-gray-600 text-sm sm:text-base">{cookie.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={cookiePreferences[cookie.id]}
                              onChange={() => handlePreferenceChange(cookie.id)}
                              disabled={cookie.required}
                              className="sr-only peer"
                            />
                            <div className={`relative w-9 h-5 sm:w-11 sm:h-6 rounded-full transition-colors ${
                              cookiePreferences[cookie.id] 
                                ? 'bg-amber-600' 
                                : 'bg-gray-300'
                            } ${cookie.required ? 'opacity-50' : ''}`}>
                              <div className={`absolute top-[2px] left-[2px] bg-white w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-transform ${
                                cookiePreferences[cookie.id] ? 'translate-x-4 sm:translate-x-5' : ''
                              }`}></div>
                            </div>
                          </label>
                          {expandedSections[cookie.id] ? (
                            <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {expandedSections[cookie.id] && (
                      <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6 bg-gray-50">
                        <div className="pl-8 sm:pl-12 lg:pl-16">
                          <p className="text-gray-600 mb-4 text-sm sm:text-base">{cookie.details}</p>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Examples include:</h4>
                            <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                              {cookie.examples.map((example, index) => (
                                <li key={index}>{example}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Your Choices */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-amber-100">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-4 sm:mb-6">Your Choices Matter</h2>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg mb-4 sm:mb-6">
                Just as you choose your dining experience, you're always in control of your digital experience with MenuQ. Here's how you can manage your cookie preferences:
              </p>
              
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                <div className="bg-amber-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-amber-200">
                  <h3 className="font-semibold text-gray-900 mb-3 text-base sm:text-lg">Browser Settings</h3>
                  <ul className="text-gray-600 space-y-2 text-sm sm:text-base">
                    <li>• Accept or reject cookies</li>
                    <li>• Delete existing cookies</li>
                    <li>• Set notifications before cookies are stored</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-3 text-base sm:text-lg">MenuQ Settings</h3>
                  <ul className="text-gray-600 space-y-2 text-sm sm:text-base">
                    <li>• Use the toggle switches above</li>
                    <li>• Customize your preferences anytime</li>
                    <li>• Essential cookies remain active for functionality</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg sm:rounded-xl">
                <p className="text-yellow-800 font-medium text-sm sm:text-base">
                  <strong>Note:</strong> Disabling essential cookies may affect the performance and functionality of MenuQ, like trying to cook without basic ingredients.
                </p>
              </div>
            </div>

            {/* Third Party & Updates */}
            <div className="grid gap-6 sm:gap-8 mb-6 sm:mb-8 md:grid-cols-2">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-amber-100">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                  <span className="text-lg sm:text-2xl">Third-Party Services</span>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                  Some cookies may be set by third-party services integrated into our platform — like payment gateways, maps, or analytics tools.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  These services have their own cookie policies, which we encourage you to review for complete transparency.
                </p>
              </div>
              
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-amber-100">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                  <span className="text-lg sm:text-2xl">Policy Updates</span>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                  Just like our culinary partners evolve their menus, this Cookie Policy may evolve too.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  We'll notify you of significant changes and always keep this page current — transparency is always on the menu.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-amber-200 text-center">
              <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600 mx-auto mb-3 sm:mb-4" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-3 sm:mb-4">Questions? We're Here to Help</h2>
              <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                If you have questions about how we use cookies or want to learn more about our privacy practices, we'd love to hear from you.
              </p>
              <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center">
                <a 
                  href="mailto:privacy@menuq.com" 
                  className="inline-flex items-center gap-2 bg-amber-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-amber-700 transition-colors text-sm sm:text-base"
                >
                  <Mail className="w-4 h-4" />
                  info@menuq.in
                </a>
                <span className="text-gray-500 text-sm sm:text-base">or</span>
                <a 
                  href="/contactus" 
                  className="text-amber-700 font-medium hover:text-amber-800 transition-colors text-sm sm:text-base"
                >
                  Visit our Contact Page
                </a>
              </div>
            </div>

            {/* Footer Message */}
            <div className="mt-8 sm:mt-12 text-center">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-amber-100">
                <p className="text-lg sm:text-xl font-serif text-gray-800 italic mb-2">
                  "At MenuQ, your privacy is not just a checkbox — it's part of the experience."
                </p>
                <p className="text-gray-600 text-sm sm:text-base">
                  Last Updated: {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Save Preferences Button */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3 sm:p-4 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <button 
              className="bg-amber-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
              onClick={() => {
                // Handle saving preferences
                alert('Cookie preferences saved successfully!');
              }}
            >
              Save Cookie Preferences
            </button>
          </div>
        </div>
      </div>
<ScrollToTopButton />
    </div>
  );
};

export default CookiePolicyPage;