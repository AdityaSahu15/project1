import React, { useState } from 'react';
import login from '../photos/login.jpeg';
import { Outlet, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); // ✅ Correct usage inside component


  const [isAuthenticated, setIsAuthenticated] = useState(false);
  if (isAuthenticated) {
    navigate('/login/userInfo')
  }

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
    console.log('Login data:', formData);
    // Add login validation / API call here

    try {

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data as JSON
      })
      const data = await res.json();
      console.log('Response from backend:', data);
      alert(data.message)
      if (data.message === "User logged in Successfully")
        setIsAuthenticated(true)


    } catch (error) {
      console.log(error)
    }
  };

  const registerButtonClickHandle = () => {
    navigate('/login/register'); // ✅ Navigates to nested route
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4 flex-col">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md cursor-pointer"
          >
            Log In
          </button>
        </form>
      </div>

      <div className='mt-20 gap-2 text-center'>
        <h1 className='font-semibold text-md mb-2'>Not a user already?</h1>
        <button
          onClick={registerButtonClickHandle}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md cursor-pointer"
        >
          Register
        </button>
      </div>

      <Outlet />
    </div>
  );
};

export default Login;
