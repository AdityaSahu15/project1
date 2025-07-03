import React from "react";
import { Link } from "react-router-dom";
import { FaShippingFast, FaTags, FaShieldAlt } from "react-icons/fa";
import FAQSection from "./FAQSection";
import WhyShopWithUs from "./WhyShopWithUs";
import CustomerTestimonials from "./CustomerTestimonials";
import StatsBanner from "./StatsBanner";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-10 flex-col ">
      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 max-w-4xl w-full text-center border border-blue-200 transition-all duration-300 ">
        
        {/* Animated Heading */}
        <h1 className="text-5xl font-extrabold text-blue-800 mb-4 animate-bounce">
          Welcome to <span className="text-purple-600">ShopVerse</span> 🛒
        </h1>

        <p className="text-gray-800 text-xl mb-8">
          Discover amazing deals on your favorite products. From electronics to fashion – we have it all, just a click away.
        </p>

        {/* Features */}
        <div className="flex justify-center gap-10 mb-10 flex-wrap">
          <div className="flex flex-col items-center">
            <FaShippingFast className="text-3xl text-blue-500 mb-2" />
            <span className="text-gray-700 font-medium">Fast Delivery</span>
          </div>
          <div className="flex flex-col items-center">
            <FaTags className="text-3xl text-green-500 mb-2" />
            <span className="text-gray-700 font-medium">Best Offers</span>
          </div>
          <div className="flex flex-col items-center">
            <FaShieldAlt className="text-3xl text-yellow-500 mb-2" />
            <span className="text-gray-700 font-medium">Secure Checkout</span>
          </div>
        </div>

        {/* Call to Action */}
        <Link to="/products">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full text-lg shadow-md transition duration-300 transform hover:scale-105 cursor-pointer">
            Browse Products
          </button>
        </Link>
      </div>
      <WhyShopWithUs/>
      <StatsBanner/>
      <CustomerTestimonials/>
      <FAQSection/>
      

      
    </div>
  );
};

export default Home;
