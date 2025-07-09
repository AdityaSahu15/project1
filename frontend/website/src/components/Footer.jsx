import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {


  return (
    <footer className="bg-gradient-to-r from-blue-800 to-purple-800 text-white py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm">

        {/* Left: Copyright */}
        <p className="mb-4 md:mb-0 text-center md:text-left">
          &copy; {new Date().getFullYear()} <span className="font-semibold">ShopVerse</span>. All rights reserved.
        </p>

        {/* Right: Links */}
        <div className="flex space-x-6">
          <a href="/home" className="hover:text-yellow-300 transition duration-200">About</a>
          <NavLink to="/contact"><p className='hover:text-yellow-300 transition duration-200'>Contact</p></NavLink>
          <NavLink  to="/privacyPolicy"><p className='hover:text-yellow-300 transition duration-200'>Privacy Policy</p></NavLink>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
