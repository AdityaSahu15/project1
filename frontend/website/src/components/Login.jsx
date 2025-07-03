import React, { useState, useEffect, useContext } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../UserContext';
import login from '../photos/login.jpeg';

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const navigate = useNavigate();
  const location = useLocation();
  const message = location?.state?.message;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/login/userInfo');
    }
  }, [isAuthenticated, navigate, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      alert(data.message);
      if (data.message === "User logged in Successfully") {
        setUser(data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const registerButtonClickHandle = () => {
    navigate('/login/register');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-white px-4 py-10">

      {/* Message */}
      {message && (
        <div className="text-red-600 text-xl font-medium text-center mb-8 max-w-md animate-pulse">
          {message}
        </div>
      )}

      {/* Login Card */}
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-blue-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Welcome to ShopVerse</h2>
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
            Log In
          </button>
        </form>
      </div>

      {/* Register CTA */}
      {!message && (
        <div className="mt-8 text-center">
          <h1 className="text-gray-700 mb-2 font-medium">Don't have an account?</h1>
          <button
            onClick={registerButtonClickHandle}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 px-6 rounded-lg font-medium transition duration-200 shadow-sm cursor-pointer"
          >
            Create Account
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
