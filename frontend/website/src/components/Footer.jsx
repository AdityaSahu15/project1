import React from 'react';

const Footer = () => {
  return (
    <footer className=" bg-blue-300 text-black py-6 ">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Ecommerce. All rights reserved.</p>
        
        <div className="flex space-x-4">
          <a href="/about" className="hover:underline hover:font-semibold">About</a>
          <a href="/contact" className="hover:underline hover:font-semibold">Contact</a>
          <a href="/privacy" className="hover:underline hover:font-semibold">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
