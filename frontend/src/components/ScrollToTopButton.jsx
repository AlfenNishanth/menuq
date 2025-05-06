import React, { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return visible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-5 right-5 z-50 bg-gray-200 text-gray-700 p-3 rounded-full shadow-lg hover:bg-amber-600 hover:text-white transition-colors"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  ) : null;
};

export default ScrollToTopButton;