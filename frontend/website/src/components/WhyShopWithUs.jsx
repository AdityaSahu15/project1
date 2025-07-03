import React from 'react';
import { FaShippingFast, FaShieldAlt, FaTags, FaSmile } from 'react-icons/fa';

const WhyShopWithUs = () => {
  const features = [
    {
      icon: <FaShippingFast className="text-blue-600 text-3xl" />,
      title: 'Fast Delivery',
      desc: 'Lightning-fast delivery across India with real-time tracking.',
    },
    {
      icon: <FaShieldAlt className="text-blue-600 text-3xl" />,
      title: 'Secure Payments',
      desc: 'Pay safely with 256-bit encryption and trusted gateways.',
    },
    {
      icon: <FaTags className="text-blue-600 text-3xl" />,
      title: 'Unbeatable Deals',
      desc: 'Top deals and discounts across all categories, every day.',
    },
    {
      icon: <FaSmile className="text-blue-600 text-3xl " />,
      title: 'Happy Customers',
      desc : 'Loved by thousands. Rated 4.9/5 across the platform.',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100  flex py-16 px-4 ">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-10">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyShopWithUs;
