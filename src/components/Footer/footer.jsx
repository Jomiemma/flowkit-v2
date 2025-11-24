import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear();
    return (
      <footer className="w-full bg-gray-100 text-gray-600 text-sm py-4 px-6 mt-auto border-t border-gray-200">
        <div className="text-center">
          © {year} BoilerDash. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  