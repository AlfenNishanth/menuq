import React, { useState } from 'react';
import { ArrowLeft, Shield, Eye, Lock, Users, FileText, Settings, Mail, Heart, CheckCircle, Menu, X } from 'lucide-react';

// Mock ScrollToTopButton component for demonstration
const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 bg-amber-600 text-white p-3 rounded-full shadow-lg hover:bg-amber-700 transition-colors z-50"
      aria-label="Scroll to top"
    >
      <ArrowLeft className="w-5 h-5 rotate-90" />
    </button>
  );
};

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    {
      id: 'collection',
      title: 'What We Collect',
      icon: <Eye className="w-5 h-5" />,
      content: {
        intro: "We collect only what enhances your culinary journey — nothing more, nothing less.",
        items: [
          {
            title: "Essential Information",
            desc: "When you engage with MenuQ, we may collect your name, email address, and device details to craft a personalized dining experience that remembers your preferences."
          },
          {
            title: "Usage Insights",
            desc: "We gather anonymized data like browser type, visit duration, and navigation patterns to understand how MenuQ is being used — enabling us to refine the experience continuously."
          },
          {
            title: "Location Data (Optional)",
            desc: "With your explicit consent, we may use location data to showcase nearby culinary establishments and curated menu experiences in your vicinity."
          }
        ]
      }
    },
    {
      id: 'usage',
      title: 'How We Use Your Information',
      icon: <Settings className="w-5 h-5" />,
      content: {
        intro: "Your data serves one purpose: elevating your dining experience.",
        items: [
          {
            title: "Personalized Experience",
            desc: "Tailoring menu recommendations and interface preferences based on your culinary interests and dining habits."
          },
          {
            title: "Service Excellence",
            desc: "Providing responsive support and seamless functionality across all your devices and interactions."
          },
          {
            title: "Continuous Innovation",
            desc: "Analyzing usage patterns to develop new features that anticipate your needs and exceed your expectations."
          }
        ]
      }
    },
    {
      id: 'protection',
      title: 'How We Protect Your Data',
      icon: <Shield className="w-5 h-5" />,
      content: {
        intro: "Your information deserves the highest level of protection — and that's exactly what it receives.",
        items: [
          {
            title: "Enterprise-Grade Security",
            desc: "Advanced encryption protocols (AES-256) and secure HTTPS communications protect your data both in transit and at rest."
          },
          {
            title: "Access Control",
            desc: "Strict authentication measures and role-based access ensure only authorized personnel can access sensitive information."
          },
          {
            title: "Continuous Monitoring",
            desc: "24/7 system monitoring, regular security audits, and proactive threat detection keep your data safe from emerging risks."
          }
        ]
      }
    },
    {
      id: 'sharing',
      title: 'Data Sharing Philosophy',
      icon: <Users className="w-5 h-5" />,
      content: {
        intro: "We share your data only when it directly benefits your experience — never for profit.",
        items: [
          {
            title: "Service Delivery",
            desc: "Essential sharing with restaurant partners to display menus, process orders, and facilitate seamless dining experiences."
          },
          {
            title: "Trusted Partners",
            desc: "Limited collaboration with carefully vetted service providers under strict confidentiality agreements and data protection standards."
          },
          {
            title: "Legal Compliance",
            desc: "Disclosure only when legally required by court orders or regulatory authorities — and only to the extent necessary."
          }
        ]
      }
    }
  ];

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false); // Close mobile menu when section is selected
    
    // Scroll to section on mobile
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-amber-50">

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Decorative Elements - Hidden on mobile for better performance */}
            <div className="relative hidden sm:block">
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-amber-100 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -top-4 -right-12 w-24 h-24 bg-amber-200 rounded-full opacity-30 blur-xl"></div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6 relative">
                Privacy Policy
              </h1>
            </div>
            
            {/* Mobile-optimized title */}
            <h1 className="text-3xl sm:hidden font-serif font-bold text-gray-900 mb-6 px-2">
              Privacy Policy
            </h1>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 xl:p-12 shadow-xl border border-amber-100 mb-6 sm:mb-8">
              <p className="text-lg sm:text-xl lg:text-2xl text-amber-800 font-medium italic mb-4 sm:mb-6 leading-relaxed px-2">
                "The Warmth of a Meal, The Ease of a Scan — and the Respect of Your Privacy."
              </p>
              
              <div className="w-16 sm:w-20 h-1 bg-amber-500 mx-auto mb-6 sm:mb-8"></div>
              
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto px-2">
                At <strong className="text-amber-800">MenuQ</strong>, we believe technology should serve people — not the other way around. 
                Your privacy isn't just a formality; it's a fundamental part of our promise to you. This policy outlines what we collect, 
                why we collect it, and how we treat your information with the care it deserves.
              </p>
            </div>
            
            <div className="text-xs sm:text-sm text-gray-500 bg-white/60 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 inline-block">
              Last updated: January 26, 2025
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Navigation Toggle */}
      <div className="lg:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-amber-100 px-4 py-3">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center gap-2 text-amber-700 font-medium"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          <span>Navigation</span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-white w-80 max-w-[85vw] h-full shadow-xl p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-lg font-bold text-gray-900">Contents</h3>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === section.id 
                      ? 'bg-amber-100 text-amber-800 shadow-sm' 
                      : 'text-gray-600 hover:bg-amber-50 hover:text-amber-700'
                  }`}
                >
                  {section.icon}
                  <span className="font-medium">{section.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="pb-16 sm:pb-20">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
              
              {/* Desktop Navigation Sidebar */}
              <div className="hidden lg:block lg:col-span-3">
                <div className="sticky top-8">
                  <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
                    <h3 className="font-serif text-lg font-bold text-gray-900 mb-4">Contents</h3>
                    <nav className="space-y-2">
                      {sections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => handleSectionClick(section.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${
                            activeSection === section.id 
                              ? 'bg-amber-100 text-amber-800 shadow-sm' 
                              : 'text-gray-600 hover:bg-amber-50 hover:text-amber-700'
                          }`}
                        >
                          {section.icon}
                          <span className="font-medium text-sm">{section.title}</span>
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="lg:col-span-9">
                <div className="space-y-6 sm:space-y-8">
                  
                  {/* Key Principles */}
                  <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-amber-200">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 flex-shrink-0" />
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">Our Privacy Principles</h2>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">No Data Sales</h3>
                          <p className="text-gray-600 text-xs sm:text-sm">We never sell your personal data. Ever. Your information is not a commodity.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 sm:gap-4">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Minimal Collection</h3>
                          <p className="text-gray-600 text-xs sm:text-sm">We collect only what's necessary to enhance your dining experience.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 sm:gap-4">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Full Transparency</h3>
                          <p className="text-gray-600 text-xs sm:text-sm">Clear communication about what we do and why we do it.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 sm:gap-4">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Your Control</h3>
                          <p className="text-gray-600 text-xs sm:text-sm">You decide what to share and can modify your preferences anytime.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Sections */}
                  {sections.map((section) => (
                    <div 
                      key={section.id}
                      id={section.id}
                      className={`bg-white rounded-2xl shadow-lg border transition-all duration-300 ${
                        activeSection === section.id ? 'border-amber-300 shadow-xl' : 'border-gray-200'
                      }`}
                    >
                      <div className="p-4 sm:p-6 lg:p-8">
                        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                            {React.cloneElement(section.icon, { className: "w-5 h-5 sm:w-6 sm:h-6 text-amber-600" })}
                          </div>
                          <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-gray-900">{section.title}</h2>
                        </div>
                        
                        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed italic">
                          {section.content.intro}
                        </p>
                        
                        <div className="space-y-4 sm:space-y-6">
                          {section.content.items.map((item, idx) => (
                            <div key={idx} className="border-l-4 border-amber-200 pl-4 sm:pl-6 py-2">
                              <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">{item.title}</h3>
                              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Your Rights Section */}
                  <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-amber-200">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 flex-shrink-0" />
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">Your Rights & Choices</h2>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-3 sm:space-y-4">
                        <div className="bg-white/80 rounded-lg p-3 sm:p-4 border border-amber-100">
                          <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Access & Portability</h3>
                          <p className="text-gray-600 text-xs sm:text-sm">Request a copy of your personal data in a portable format at any time.</p>
                        </div>
                        
                        <div className="bg-white/80 rounded-lg p-3 sm:p-4 border border-amber-100">
                          <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Correction & Updates</h3>
                          <p className="text-gray-600 text-xs sm:text-sm">Update or correct your personal information whenever necessary.</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3 sm:space-y-4">
                        <div className="bg-white/80 rounded-lg p-3 sm:p-4 border border-amber-100">
                          <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Deletion Rights</h3>
                          <p className="text-gray-600 text-xs sm:text-sm">Request deletion of your personal data, subject to legal and operational requirements.</p>
                        </div>
                        
                        <div className="bg-white/80 rounded-lg p-3 sm:p-4 border border-amber-100">
                          <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Communication Preferences</h3>
                          <p className="text-gray-600 text-xs sm:text-sm">Opt out of non-essential communications while maintaining service functionality.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Special Sections */}
                  <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Cookies & Tracking</h3>
                      <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                        We use minimal, essential cookies to ensure MenuQ functions smoothly and remembers your preferences. 
                        No invasive tracking — just the essentials for a seamless experience.
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        You can control cookie settings from your browser at any time.
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Restaurant Partners</h3>
                      <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                        If you're a restaurant using MenuQ, we may collect additional business-related information. 
                        We treat this with the same level of confidentiality and care as all personal data.
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Business data is protected under the same security standards.
                      </p>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
                    <div className="text-center">
                      <Mail className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-amber-100" />
                      <h2 className="text-xl sm:text-2xl font-serif font-bold mb-4">Questions? We're Here to Help</h2>
                      <p className="text-amber-100 mb-6 leading-relaxed text-sm sm:text-base max-w-2xl mx-auto">
                        Transparency isn't just our policy — it's our promise. Reach out with questions, concerns, or compliments.
                      </p>
                      <a 
                        href="mailto:privacy@menuq.com" 
                        className="inline-flex items-center gap-3 bg-white text-amber-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-amber-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
                      >
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                        info@menuq.in
                      </a>
                    </div>
                  </div>

                  {/* Final Message */}
                  <div className="text-center py-8 sm:py-12">
                    <div className="max-w-3xl mx-auto">
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-amber-100">
                        <h3 className="text-lg sm:text-2xl font-serif font-bold text-gray-900 mb-4">
                          At MenuQ, your trust is more than a checkbox — it's the table we build everything on.
                        </h3>
                        <p className="text-base sm:text-lg text-gray-700 italic">
                          Thank you for dining with peace of mind.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ScrollToTopButton />
    </div>
  );
};

export default PrivacyPolicy;