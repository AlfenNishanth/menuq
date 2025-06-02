import React, { useState } from 'react';
import { ArrowRight, Heart, Users, Lightbulb, Target, Quote, Mail, MapPin, Clock, Award, ChevronUp } from 'lucide-react';

// ScrollToTopButton Component
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`fixed bottom-6 right-6 z-50 p-3 bg-amber-600 text-white rounded-full shadow-lg hover:bg-amber-700 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
};

const CareersPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const openPositions = [
    {
      id: 1,
      title: "Full Stack Developer",
      department: "Engineering",
      type: "Full-time",
      location: "Remote/Hybrid",
      description: "Craft elegant digital experiences that bridge culinary artistry with cutting-edge technology.",
      skills: ["React", "Node.js", "MongoDB", "TypeScript", "UI/UX Design"]
    },
    {
      id: 2,
      title: "Product Designer",
      department: "Design",
      type: "Full-time",
      location: "Remote/Hybrid",
      description: "Shape the visual narrative of dining experiences through thoughtful, user-centered design.",
      skills: ["Figma", "Design Systems", "User Research", "Prototyping", "Brand Design"]
    },
    {
      id: 3,
      title: "Growth Marketing Specialist",
      department: "Marketing",
      type: "Full-time/Part-time",
      location: "Remote",
      description: "Tell our story to the world and connect with restaurants ready to embrace digital transformation.",
      skills: ["Content Strategy", "SEO", "Social Media", "Analytics", "Storytelling"]
    },
    {
      id: 4,
      title: "Business Development Associate",
      department: "Sales",
      type: "Full-time",
      location: "Remote/Field",
      description: "Build meaningful relationships with restaurateurs and help them discover the MenuQ difference.",
      skills: ["Relationship Building", "Sales Strategy", "Market Research", "Communication", "CRM"]
    }
  ];

  const values = [
    {
      icon: <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Curiosity Over Conformity",
      description: "We value questions more than answers, exploration more than execution of the obvious."
    },
    {
      icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Purpose-Driven Work",
      description: "Every line of code, every design choice, every conversation matters in shaping the future of dining."
    },
    {
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Collective Growth",
      description: "We rise together. Your success is our success, and our success is meaningless without yours."
    },
    {
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Impact, Not Just Input",
      description: "Your contributions won't disappear into bureaucracy—they'll shape experiences used by thousands."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-20 pb-20 sm:pb-32 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-12 sm:-top-24 -left-12 sm:-left-24 w-48 sm:w-96 h-48 sm:h-96 rounded-full bg-amber-300 mix-blend-multiply"></div>
          <div className="absolute top-1/3 right-1/4 w-32 sm:w-64 h-32 sm:h-64 rounded-full bg-amber-200 mix-blend-multiply"></div>
          <div className="absolute bottom-0 right-0 w-40 sm:w-80 h-40 sm:h-80 rounded-full bg-amber-100 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-3 sm:px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm mb-6 sm:mb-8 text-amber-800 font-medium text-sm sm:text-base">
              Join the MenuQ Family
            </span>
            
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold leading-tight text-gray-900 mb-6 sm:mb-8">
              <span className="block mb-2 sm:mb-4 text-amber-700">Careers at</span>
              <span className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 bg-clip-text text-transparent">
                MenuQ
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 font-light italic leading-relaxed px-4 sm:px-0">
              Where passion meets purpose, and every individual contribution shapes the future of dining experiences.
            </p>
            
            <div className="w-16 sm:w-24 h-1 bg-amber-500 mx-auto mb-8 sm:mb-12"></div>
            
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              We're not just building digital tools—we're crafting a movement that believes in meaningful work, 
              authentic growth, and the power of curiosity over convention.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 sm:mb-8">
                Our Philosophy
              </h2>
              <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed">
                <p className="text-base sm:text-lg">
                  We don't chase titles. We don't get swayed by just scores or certificates. 
                  We look for <strong className="text-amber-700">people who think, question, and create.</strong>
                </p>
                <p className="text-base sm:text-lg">
                  For us, <strong className="text-amber-700">knowledge and ambition</strong> outweigh conventional grades. 
                  We believe the best talent often hides between the lines—those who've taught themselves, 
                  failed forward, and kept showing up with curiosity.
                </p>
                <p className="text-base sm:text-lg">
                  Whether you're from a prestigious university or self-taught under starlit nights, 
                  if you bring integrity, ideas, and the fire to build something real—
                  <strong className="text-amber-700"> we want you here.</strong>
                </p>
              </div>
            </div>
            
            <div className="relative order-1 lg:order-2">
              <div className="bg-gradient-to-br from-amber-50 to-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border border-amber-100">
                <Quote className="w-10 sm:w-12 h-10 sm:h-12 text-amber-400 mb-4 sm:mb-6" />
                <blockquote className="text-lg sm:text-xl text-gray-700 italic mb-4 sm:mb-6 leading-relaxed">
                  "I've seen brilliant minds overlooked just because they didn't fit into a standard mold. 
                  At MenuQ, I wanted to change that. We don't hire paper—we hire potential."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                    <span className="text-white font-bold text-base sm:text-lg">M</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">Founder, MenuQ</p>
                    <p className="text-gray-600 text-xs sm:text-sm">Visionary & Chief Architect</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 sm:mb-6">
              Why Work With Us?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto italic px-4 sm:px-0">
              Four pillars that define our culture and guide every decision we make.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-start mb-4 sm:mb-6">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-amber-50 rounded-lg sm:rounded-xl flex items-center justify-center text-amber-600 mr-4 sm:mr-6 border border-amber-200 flex-shrink-0">
                    {value.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-2 sm:mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 sm:mb-6">
              What We Offer
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-amber-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-amber-200">
                <Lightbulb className="w-8 sm:w-10 h-8 sm:h-10 text-amber-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-3 sm:mb-4">Freedom to Think</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                We don't put people in boxes. You're free to bring ideas to the table, question the norm, 
                and lead initiatives—even if you're just starting out.
              </p>
            </div>
            
            <div className="text-center p-4 sm:p-6">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-amber-200">
                <Award className="w-8 sm:w-10 h-8 sm:h-10 text-amber-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-3 sm:mb-4">Learn as You Grow</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                This is a space where learning never stops. From interns to leads, 
                we believe everyone is both a student and a teacher.
              </p>
            </div>
            
            <div className="text-center p-4 sm:p-6">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-amber-200">
                <Target className="w-8 sm:w-10 h-8 sm:h-10 text-amber-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-3 sm:mb-4">Real Impact</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Your work won't be lost in layers. You'll see your contribution shaping the product, 
                the experience, and our future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 sm:mb-6">
              Open Opportunities
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto italic px-4 sm:px-0">
              Ready to make your mark? Explore roles where your unique perspective can flourish.
            </p>
            <div className="w-16 sm:w-24 h-1 bg-amber-500 mx-auto mt-6 sm:mt-8"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {openPositions.map((position) => (
              <div key={position.id} className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                      <span className="px-2 sm:px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs sm:text-sm font-medium">
                        {position.department}
                      </span>
                      <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm">
                        {position.type}
                      </span>
                      <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm">
                        {position.location}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 text-amber-600 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0 ml-2" />
                </div>
                
                <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {position.description}
                </p>
                
                <div className="mb-4 sm:mb-6">
                  <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">Key Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {position.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs sm:text-sm border">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full px-4 sm:px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors duration-300 group-hover:shadow-lg text-sm sm:text-base">
                  Apply for this Role
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 sm:mt-16">
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 px-4 sm:px-0">
              Don't see the perfect fit? We're always open to exceptional talent.
            </p>
            <a href="mailto:info@menuq.in">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-amber-600 text-amber-700 rounded-full font-medium hover:bg-amber-600 hover:text-white transition-all duration-300 text-sm sm:text-base">
                Send Us Your Story
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6 sm:mb-8">
            Open to All, Closed to None
          </h2>
          <p className="text-lg sm:text-xl mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            Whether you're a student looking to intern, a professional seeking a more purpose-driven path, 
            or a self-learner carving your niche—<strong>you belong here if you believe in the work you do.</strong>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12">
            <a href="mailto:info@menuq.in" className="flex items-center text-base sm:text-lg">
              <Mail className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3" />
              info@menuq.in
            </a>
            <div className="flex items-center text-base sm:text-lg">
              <MapPin className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3" />
              Remote-First Culture
            </div>
            <div className="flex items-center text-base sm:text-lg">
              <Clock className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3" />
              Applications Open Year-Round
            </div>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <p className="text-xl sm:text-2xl font-serif italic px-4 sm:px-0">
              Join us—not just to work. Join us to grow, challenge, contribute, and reimagine the ordinary.
            </p>
            <a href="mailto:info@menuq.in">
              <button className="px-8 sm:px-12 py-3 sm:py-4 bg-white text-amber-700 rounded-full font-bold text-base sm:text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Start Your Journey Today
              </button>
            </a>
          </div>
          
          <div className="mt-12 sm:mt-16 text-center">
            <p className="text-2xl sm:text-3xl font-serif font-bold opacity-90">
              This is MenuQ.
            </p>
          </div>
        </div>
      </section>
      <ScrollToTopButton />
    </div>
  );
};

export default CareersPage;