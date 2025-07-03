// src/components/FAQSection.jsx
import React, { useState } from 'react';

const FAQs = [
  {
    question: 'How long does delivery take?',
    answer: 'Delivery usually takes 3–5 business days depending on your location.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 7-day easy return policy. No questions asked!',
  },
  {
    question: 'Which payment methods do you accept?',
    answer: 'We accept UPI, credit/debit cards, net banking, and COD (Cash on Delivery).',
  },
  {
    question: 'Can I track my order?',
    answer: 'Yes, once shipped, you’ll receive a tracking ID via email and SMS.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto my-16 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-2xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">❓ Frequently Asked Questions</h2>
      {FAQs.map((faq, index) => (
        <div key={index} className="mb-4 border-b border-blue-200">
          <button
            onClick={() => toggle(index)}
            className="w-full text-left text-lg font-medium text-blue-700 flex justify-between items-center py-3 focus:outline-none cursor-pointer"
          >
            {faq.question}
            <span className="text-xl">{openIndex === index ? '-' : '+'}</span>
          </button>
          {openIndex === index && (
            <div className="text-gray-700 pb-4 px-2 transition-all duration-300">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
