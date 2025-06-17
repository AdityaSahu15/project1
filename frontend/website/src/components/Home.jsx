import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl text-center border border-blue-200">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Welcome to ShopVerse	 🛒
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Discover amazing deals on your favorite products! Explore a wide range of categories and enjoy seamless shopping.
        </p>

        <Link to="/products">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition duration-200 cursor-pointer">
            Browse Products
          </button>
        </Link>

        
      </div>
    </div>
  );
};

export default Home;
