import React from 'react';
import { useEffect } from 'react';

const PrivacyPolicy = () => {

    useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <div className="bg-gradient-to-b from-blue-100 to-purple-100 text-blue-900 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Privacy Policy
        </h1>

        <p className="mb-6 text-base leading-relaxed">
          At <span className="font-semibold text-blue-700">ShopVerse</span>, we value your privacy and are committed to protecting your personal data. This privacy policy outlines how we collect, use, and protect your information when you use our services.
        </p>

        <h2 className="text-xl font-semibold text-blue-700 mb-2">1. Information We Collect</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Your name, email, and contact details</li>
          <li>Order history and shopping preferences</li>
        </ul>

        <h2 className="text-xl font-semibold text-blue-700 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>To personalize your shopping experience</li>
          <li>To process orders and send confirmations</li>
          <li>To provide customer support</li>
        </ul>

        <h2 className="text-xl font-semibold text-blue-700 mb-2">3. Data Protection</h2>
        <p className="mb-6">
          We use industry-standard encryption and security measures to keep your data safe. We never sell your personal data to third parties.
        </p>

        <h2 className="text-xl font-semibold text-blue-700 mb-2">4. Cookies</h2>
        <p className="mb-6">
          We use cookies to improve your browsing experience, remember your preferences, and track usage for analytics. You can manage cookie settings in your browser at any time.
        </p>

        <h2 className="text-xl font-semibold text-blue-700 mb-2">5. Your Rights</h2>
        <p className="mb-6">
          You have the right to access, modify, or delete your data. To make any privacy-related requests, contact our support team at <span className="text-blue-600 font-medium">support@shopverse.com</span>.
        </p>

        <p className="text-sm text-gray-600 mt-8 text-center">
          Last updated: July 3, 2025
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
