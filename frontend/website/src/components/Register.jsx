import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Register = () => {
  const navigate = useNavigate();  // useNavigate hook
  const { user, setUser } = useContext(UserContext); // usage of useContext

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/login'); // after registering we will redirect the user to login and thus proceed further 
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
        //  console.log('User:', user);
        }, [user]);

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
    e.preventDefault();// Stops the page from reloading
    console.log('Login data:', formData);
    // sending data from front end to backend and doing various validations 



    try {
      const res = await fetch('/api/login/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      const data = await res.json();
      console.log('Response from backend:', data);

      alert(data.message)
      if (data.message === "User registered successfully") {
        setUser(data)
        setIsAuthenticated(true)
      }

    } catch (err) {
      console.error('Error sending data:', err);
    }


  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4 flex-col">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
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
              Register
            </button>

          </form>


        </div>



      </div>



    </>

  );
};

export default Register;