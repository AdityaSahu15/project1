// CustomerTestimonials.jsx
import React from 'react';

const testimonials = [
  {
    name: "Priya Sharma",
    feedback: "Absolutely love ShopVerse! Fast delivery and the product quality is amazing.",
    location: "Mumbai, India",
  },
  {
    name: "Ravi Verma",
    feedback: "Very reliable. I found great deals and the checkout process was seamless.",
    location: "Delhi, India",
  },
  {
    name: "Sneha Mehta",
    feedback: "Excellent customer support and easy returns. Highly recommend!",
    location: "Bangalore, India",
  },
];

const CustomerTestimonials = () => {
  return (
    <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100  py-12 px-6 ">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">What Our Customers Say</h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition duration-300"
          >
            <p className="text-gray-700 mb-4 italic">“{t.feedback}”</p>
            <hr className="border-blue-200 mb-3" />
            <h4 className="text-blue-700 font-semibold text-lg">{t.name}</h4>
            <span className="text-sm text-gray-500">{t.location}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerTestimonials;
