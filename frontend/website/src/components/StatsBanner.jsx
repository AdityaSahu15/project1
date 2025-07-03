import React from "react";
import { FaUsers, FaBoxOpen, FaStar, FaHeadset } from "react-icons/fa";

const StatsBanner = () => {
  return (
    <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-14 px-4 mb-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <FaUsers className="text-blue-600 text-4xl mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-blue-700">100K+</h3>
          <p className="text-gray-700 mt-1">Happy Customers</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <FaBoxOpen className="text-purple-600 text-4xl mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-purple-700">10K+</h3>
          <p className="text-gray-700 mt-1">Products Available</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <FaStar className="text-yellow-500 text-4xl mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-yellow-500">4.9⭐</h3>
          <p className="text-gray-700 mt-1">Average Rating</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <FaHeadset className="text-green-600 text-4xl mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-green-600">24/7</h3>
          <p className="text-gray-700 mt-1">Customer Support</p>
        </div>
      </div>
    </div>
  );
};

export default StatsBanner;
