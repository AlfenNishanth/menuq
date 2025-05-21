import React, { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Toggle visibility when scrolling beyond 300px
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    // Add scroll event listener
    window.addEventListener('scroll', toggleVisibility);
    
    // Clean up the event listener on component unmount
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Function to scroll back to top with smooth animation
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return visible ? (
    <button
      onClick={scrollToTop}
      className="fixed z-50 rounded-full shadow-lg transition-colors duration-300
        /* Base styles */
        bg-gray-200 text-gray-700 hover:bg-amber-600 hover:text-white
        
        /* Mobile styles */
        bottom-3 right-3 p-2 text-lg
        
        /* Tablet and desktop styles */
        md:bottom-5 md:right-5 md:p-3 md:text-xl"
      aria-label="Scroll to top"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 md:h-6 md:w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
    </button>
  ) : null;
};

export default ScrollToTopButton;