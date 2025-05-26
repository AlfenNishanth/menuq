import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Cookie, Shield, Eye, Settings, Users, RefreshCw, Mail, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ScrollToTopButton from './ScrollToTopButton';


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
      icon: <Shield className="w-5 h-5" />,
      description: 'Required for the basic functions of the site',
      details: 'These cookies are necessary for MenuQ to function properly. They enable core features like navigation, user authentication, and security. Without these cookies, our service cannot be provided effectively.',
      examples: ['Session management', 'Security tokens', 'Load balancing', 'Form submissions'],
      required: true
    },
    {
      id: 'performance',
      name: 'Performance Cookies',
      icon: <Eye className="w-5 h-5" />,
      description: 'Help us analyze usage and improve our platform',
      details: 'These cookies collect information about how visitors use MenuQ, helping us understand user behavior and improve our service quality. All data is aggregated and anonymous.',
      examples: ['Google Analytics', 'Page load times', 'Error tracking', 'User journey analysis'],
      required: false
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      icon: <Settings className="w-5 h-5" />,
      description: 'Remember your preferences and settings',
      details: 'These cookies enhance your experience by remembering your choices and preferences, making your interactions with MenuQ more personalized and efficient.',
      examples: ['Language preferences', 'Theme settings', 'Location data', 'Recently viewed items'],
      required: false
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      icon: <Users className="w-5 h-5" />,
      description: 'Enable relevant promotions and content',
      details: 'These cookies help us deliver relevant advertisements and promotional content based on your interests and browsing behavior, both on MenuQ and across the web.',
      examples: ['Social media integration', 'Targeted advertisements', 'Campaign tracking', 'Cross-platform analytics'],
      required: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-amber-300 mix-blend-multiply"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-amber-200 mix-blend-multiply"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm mb-8">
              <Cookie className="w-6 h-6 text-amber-600" />
              <span className="text-amber-800 font-medium">Cookie Policy</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
              <span className="block mb-2">Transparency</span>
              <span className="italic text-amber-700">Served Fresh</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              At MenuQ, we believe in serving experiences with integrity. Just as our culinary partners craft their menus with care, we handle your data with the same thoughtfulness and transparency.
            </p>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-100 max-w-2xl mx-auto">
              <p className="text-amber-800 font-medium text-lg italic">
                "No hidden ingredients, no hidden tracking — only the clarity you deserve."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* What Are Cookies */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-amber-100">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Cookie className="w-8 h-8 text-amber-600" />
                What Are Cookies?
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                Cookies are small text files stored on your device when you visit a website. Think of them as your restaurant's way of remembering your usual order — they help us provide a more personalized and efficient experience each time you visit MenuQ.
              </p>
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <p className="text-amber-800 font-medium italic">
                  Just like a master chef remembers your preferences, cookies help MenuQ remember yours — creating a seamless digital dining experience tailored just for you.
                </p>
              </div>
            </div>

            {/* Cookie Types */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-amber-100">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                {cookieTypes.map((cookie) => (
                  <div key={cookie.id} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div 
                      className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleSection(cookie.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-full ${cookie.required ? 'bg-amber-100' : 'bg-gray-100'}`}>
                            <span className={cookie.required ? 'text-amber-600' : 'text-gray-600'}>
                              {cookie.icon}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                              {cookie.name}
                              {cookie.required && (
                                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">
                                  Required
                                </span>
                              )}
                            </h3>
                            <p className="text-gray-600">{cookie.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={cookiePreferences[cookie.id]}
                              onChange={() => handlePreferenceChange(cookie.id)}
                              disabled={cookie.required}
                              className="sr-only peer"
                            />
                            <div className={`relative w-11 h-6 rounded-full transition-colors ${
                              cookiePreferences[cookie.id] 
                                ? 'bg-amber-600' 
                                : 'bg-gray-300'
                            } ${cookie.required ? 'opacity-50' : ''}`}>
                              <div className={`absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full transition-transform ${
                                cookiePreferences[cookie.id] ? 'translate-x-5' : ''
                              }`}></div>
                            </div>
                          </label>
                          {expandedSections[cookie.id] ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {expandedSections[cookie.id] && (
                      <div className="px-6 pb-6 bg-gray-50">
                        <div className="pl-16">
                          <p className="text-gray-600 mb-4">{cookie.details}</p>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Examples include:</h4>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
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
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-amber-100">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Your Choices Matter</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                Just as you choose your dining experience, you're always in control of your digital experience with MenuQ. Here's how you can manage your cookie preferences:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Browser Settings</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Accept or reject cookies</li>
                    <li>• Delete existing cookies</li>
                    <li>• Set notifications before cookies are stored</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-3">MenuQ Settings</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Use the toggle switches above</li>
                    <li>• Customize your preferences anytime</li>
                    <li>• Essential cookies remain active for functionality</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <p className="text-yellow-800 font-medium">
                  <strong>Note:</strong> Disabling essential cookies may affect the performance and functionality of MenuQ, like trying to cook without basic ingredients.
                </p>
              </div>
            </div>

            {/* Third Party & Updates */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Users className="w-6 h-6 text-amber-600" />
                  Third-Party Services
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Some cookies may be set by third-party services integrated into our platform — like payment gateways, maps, or analytics tools.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  These services have their own cookie policies, which we encourage you to review for complete transparency.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <RefreshCw className="w-6 h-6 text-amber-600" />
                  Policy Updates
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Just like our culinary partners evolve their menus, this Cookie Policy may evolve too.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We'll notify you of significant changes and always keep this page current — transparency is always on the menu.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow-lg p-8 border border-amber-200 text-center">
              <Mail className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Questions? We're Here to Help</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                If you have questions about how we use cookies or want to learn more about our privacy practices, we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="mailto:privacy@menuq.com" 
                  className="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-full font-medium hover:bg-amber-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info@menuq.in
                </a>
                <span className="text-gray-500">or</span>
                <a 
                  href="#Reach Us" 
                  className="text-amber-700 font-medium hover:text-amber-800 transition-colors"
                >
                  Visit our Contact Page
                </a>
              </div>
            </div>

            {/* Footer Message */}
            <div className="mt-12 text-center">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
                <p className="text-xl font-serif text-gray-800 italic mb-2">
                  "At MenuQ, your privacy is not just a checkbox — it's part of the experience."
                </p>
                <p className="text-gray-600">
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
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <button 
              className="bg-amber-600 text-white px-8 py-3 rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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