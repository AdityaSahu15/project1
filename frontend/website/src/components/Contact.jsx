import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useEffect } from "react";



const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

   useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-10 px-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-10">Contact Us</h1>

      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="space-y-6 text-blue-700 text-base">
          <div className="flex items-start gap-4">
            <FaEnvelope className="text-xl mt-1" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <p>support@shopverse.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-xl mt-1" />
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p>+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-xl mt-1" />
            <div>
              <h3 className="font-semibold">Address</h3>
              <p>ShopVerse HQ, Sector 21, Bangalore, India</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
