import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { toast } from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  toast.dismiss();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    toast.error("Please enter a valid email address");
    return;
  }

  if (formData.password.length < 8) {
    toast.error("Password must be 8+ characters");
    return;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    toast[data.message === "User registered successfully" ? "success" : "error"](data.message);
    if (data.message === "User registered successfully") {
      setUser(data);
      setIsAuthenticated(true);
    }
  } catch (err) {
    console.error('Error sending data:', err);
    toast.error("Something went wrong. Please try again.");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-white px-4 py-10">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-blue-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Create your account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 shadow-md cursor-pointer"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
