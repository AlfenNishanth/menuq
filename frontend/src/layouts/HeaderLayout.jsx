import React from 'react';
import Header from '../components/Header'; // Path to your Header component

function HeaderLayout({ children }) {
  return (
    <>
      <Header />
      <main className="pt-20"> {/* Add padding top to account for fixed header */}
        {children}
      </main>
    </>
  );
}

export default HeaderLayout;