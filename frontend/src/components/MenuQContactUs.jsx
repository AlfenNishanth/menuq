import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, Heart, Coffee, Users, Lightbulb, Menu, X } from 'lucide-react';
import ScrollToTopButton from './ScrollToTopButton';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    contactType: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    
    // Get contact type label
    const contactTypeLabel = contactTypes.find(type => type.value === formData.contactType)?.label || 'General Inquiry';
    
    // Create email content
    const emailSubject = `[${contactTypeLabel}] ${formData.subject}`;
    const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Contact Type: ${contactTypeLabel}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from MenuQ Contact Form
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:info@menuq.in?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Show success message and reset form
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        contactType: 'general'
      });
    }, 1000);
  };

  const contactTypes = [
    { value: 'general', label: 'General Inquiry', icon: MessageCircle },
    { value: 'business', label: 'Business Partnership', icon: Users },
    { value: 'feedback', label: 'Share Your Story', icon: Heart },
    { value: 'ideas', label: 'Product Ideas', icon: Lightbulb }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Enhanced mobile responsiveness */}
      <section className="relative pt-16 sm:pt-20 pb-12 sm:pb-16 bg-gradient-to-br from-amber-50 via-white to-gray-50 overflow-hidden">
        {/* Decorative Elements - Adjusted for mobile */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-8 pointer-events-none">
          <div className="absolute -top-16 sm:-top-32 -left-16 sm:-left-32 w-48 sm:w-96 h-48 sm:h-96 rounded-full bg-amber-200 mix-blend-multiply"></div>
          <div className="absolute top-1/4 right-1/3 w-40 sm:w-80 h-40 sm:h-80 rounded-full bg-amber-100 mix-blend-multiply"></div>
          <div className="absolute bottom-0 right-0 w-32 sm:w-64 h-32 sm:h-64 rounded-full bg-amber-150 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm mb-6 sm:mb-8 text-amber-800 font-medium text-sm sm:text-base">
              <Coffee className="w-4 h-4" />
              <span>Let's Start a Conversation</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight text-gray-900 mb-4 sm:mb-6">
              <span className="block text-amber-700 mb-1 sm:mb-2">We Don't Just</span>
              <span className="italic text-gray-700">Respond</span>
              <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl mt-3 sm:mt-4 text-gray-600 font-light">
                We Listen, We Care, We Connect
              </p>
            </h1>
            
            <p className="text-base sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto font-light leading-relaxed px-2 sm:px-0">
              At MenuQ, every message opens a door to meaningful conversation. You're not reaching a brand - you're connecting with people who genuinely care about your experience.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Enhanced mobile layout */}
      <section id="contact" className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24">
            
            {/* Left Side - Contact Information - Mobile optimized */}
            <div className="space-y-8 sm:space-y-12 order-2 lg:order-1">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 sm:mb-8">
                  Beyond the Form
                </h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8">
                  We're here for insights, stories, and your thoughts on how we can grow together. Whether it's sharing how MenuQ transformed your restaurant, proposing ideas that could enhance our platform, or exploring partnerships that align with our vision—we're genuinely interested in what you have to say.
                </p>
              </div>

              {/* Contact Methods - Mobile optimized */}
              <div className="space-y-6 sm:space-y-8">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-gray-900 mb-2">Visit Us</h3>
                    <p className="text-gray-600 mb-3 text-sm sm:text-base">Join us for coffee and conversation in our welcoming space</p>
                    <p className="text-amber-700 font-medium text-sm sm:text-base">Karnataka<br />Bengaluru | Mysuru</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-gray-900 mb-2">Write to Us</h3>
                    <p className="text-gray-600 mb-3 text-sm sm:text-base">Detailed queries deserve thoughtful responses, not templates</p>
                    <p className="text-amber-700 font-medium text-sm sm:text-base">
                      <a href="mailto:info@menuq.in" className="hover:underline break-all">
                        info@menuq.in
                      </a>
                      <br />
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-gray-900 mb-2">Speak to Real Humans</h3>
                    <p className="text-gray-600 mb-3 text-sm sm:text-base">No bots, no scripts—just genuine conversations</p>
                    <p className="text-amber-700 font-medium text-sm sm:text-base">
                      <a href="tel:+919482383691" className="hover:underline">
                        +91 94823 83691
                      </a>
                      <br />
                      <span className="text-xs sm:text-sm">Mon – Fri, 9AM – 6PM IST</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-gray-900 mb-2">Social Connection</h3>
                    <p className="text-gray-600 mb-3 text-sm sm:text-base">Quick questions? We're active and love our community</p>
                    <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                        {/* Social Media Links with Icons - Mobile optimized */}
                        {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform) => {
                          const iconPath = {
                            facebook:
                              'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
                            twitter:
                              'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
                            instagram:
                              'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z',
                            linkedin:
                              'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
                          };

                          const profileUrls = {
                            facebook: 'https://www.facebook.com/_menuq',
                            twitter: 'https://twitter.com/_menuq',
                            instagram: 'https://www.instagram.com/_menuq',
                            linkedin: 'https://www.linkedin.com/in/_menuq', // or /company/_menuq for business profile
                          };

                          return (
                            <a
                              key={platform}
                              href={profileUrls[platform]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                              <span className="sr-only">{platform}</span>
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d={iconPath[platform]} />
                              </svg>
                            </a>
                          );
                        })}
                      </div>
                  </div>
                </div>
              </div>

              {/* Why We Care Section - Mobile optimized */}
              <div className="bg-gradient-to-br from-amber-50 to-white p-6 sm:p-8 rounded-2xl border border-amber-100">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                  Because You Matter
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  Our journey is built on the people who use, support, and believe in MenuQ. If you've made it this far, there's a reason. Every connection we make becomes part of our story, and we're excited to hear yours.
                </p>
              </div>
            </div>

            {/* Right Side - Contact Form with Amber Theme - Mobile optimized */}
            <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 lg:p-12 border border-gray-100 relative overflow-hidden order-1 lg:order-2">
              {/* Decorative elements matching reach us page */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-amber-100/30 blur-xl"></div>
              <div className="absolute bottom-8 left-8 w-16 h-16 rounded-full bg-amber-100/20 blur-lg"></div>
              
              {/* Decorative side border */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-amber-600 via-amber-500 to-amber-700"></div>
              
              <div className="relative z-10">
                <div className="mb-6 sm:mb-8">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                    <span className="relative inline-block text-amber-700">
                      Start
                      <svg className="absolute w-full h-1 bottom-1 left-0 text-amber-300" viewBox="0 0 100 4" preserveAspectRatio="none">
                        <path d="M0,1 C30,4 70,4 100,1" stroke="currentColor" fill="none" strokeWidth="2"></path>
                      </svg>
                    </span> <span className="text-gray-700">the Conversation</span>
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Great things often begin with a simple hello. What's on your mind?
                  </p>
                </div>

                {submitStatus === 'success' && (
                  <div className="mb-6 sm:mb-8 p-4 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-lg">
                    <p className="text-amber-800 text-center font-medium text-sm sm:text-base">
                      Thank you! We'll get back to you within 24 hours.
                    </p>
                  </div>
                )}

                <div className="space-y-5 sm:space-y-6">
                  {/* Contact Type Selection - Mobile optimized */}
                  <div>
                    <label className="block text-sm font-medium text-amber-700 mb-3 sm:mb-4">
                      What brings you here today? <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {contactTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <label key={type.value} className="relative">
                            <input
                              type="radio"
                              name="contactType"
                              value={type.value}
                              checked={formData.contactType === type.value}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                              formData.contactType === type.value
                                ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-amber-100/50 shadow-sm'
                                : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/30'
                            }`}>
                              <Icon className={`w-4 h-4 flex-shrink-0 ${
                                formData.contactType === type.value ? 'text-amber-600' : 'text-gray-400'
                              }`} />
                              <span className={`text-xs sm:text-sm font-medium ${
                                formData.contactType === type.value ? 'text-amber-700' : 'text-gray-600'
                              }`}>
                                {type.label}
                              </span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name and Email - Mobile stacked layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        placeholder="How should we address you?"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                      placeholder="What's this about?"
                    />
                  </div>

                  {/* Message - Adjusted height for mobile */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
                      placeholder="Tell us your story, share your ideas, or ask your questions. We're here to listen..."
                    ></textarea>
                  </div>

                  {/* Submit Button - Mobile optimized */}
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 overflow-hidden bg-amber-600 rounded-lg w-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-amber-700 rounded-full group-hover:w-full group-hover:h-56 group-disabled:w-0 group-disabled:h-0"></span>
                    <span className="relative flex items-center gap-3 text-white font-medium text-base sm:text-lg">
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm sm:text-base">Sending your message...</span>
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        </>
                      )}
                    </span>
                  </button>
                </div>

                {/* Bottom Message - Mobile optimized */}
                <div className="mt-6 sm:mt-8 pt-6 border-t border-amber-100 text-center">
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    <strong className="text-amber-700">We promise:</strong> Real responses from real people, usually within 24 hours. Your privacy is protected, and we never share your information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Mobile optimized */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-amber-700 to-amber-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-4 sm:mb-6">
            Ready to Transform Your Restaurant?
          </h2>
          <p className="text-lg sm:text-xl text-amber-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Don't just take our word for it. Experience MenuQ for yourself and see how we're revolutionizing the dining experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/signup" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-amber-700 rounded-lg font-semibold hover:bg-amber-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base">
                Start Your Free Trial
              </button>
            </a>
            <a
              href="#contact" 
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-amber-700 transition-all duration-300 text-sm sm:text-base text-center">
              Schedule a Demo
            </a>
          </div>
        </div>
      </section>
      <ScrollToTopButton />
    </div>
  );
};

export default ContactPage;