import React from 'react';
import { NavLink } from 'react-router-dom';
import cart from '../photos/cart.png';
import login from '../photos/login.jpeg';
import logo from '../photos/logo.png';
import { UserContext } from '../UserContext';
import { useContext } from 'react';

function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <div className='navbar sticky top-0 z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-10 shadow-md text-lg flex justify-between items-center backdrop-blur-sm'>


      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="logo" className='w-10 h-10 rounded-full shadow-md' />
        <span className="font-bold text-xl tracking-wide">ShopVerse</span>
      </div>

      {/* Right: Nav Items */}
      <div className="flex items-center gap-8 ml-10">
        <NavLink to="/home" className='hover:text-yellow-300 transition font-medium'>
          Home
        </NavLink>

        <form>
          <input
            type="text"
            placeholder="Search products..."
            className='px-3 py-1 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-inner'
          />
        </form>

        <div className='flex items-center gap-2 hover:text-yellow-300 transition'>
          <img src={login} alt="login" className='w-8 h-8 rounded-full shadow' />
          <NavLink to={user ? "/login/userInfo" : "/login"} className='font-medium'>
            {user ? "Profile" : "User"}
          </NavLink>
        </div>

        <NavLink to='/orders' className='hover:text-yellow-300 transition font-medium'>
          Orders
        </NavLink>

        <div className='flex items-center gap-2 hover:text-yellow-300 transition'>
          <NavLink to='/cart' className='font-medium'>
            Cart
          </NavLink>
          <img src={cart} alt="cart" className='w-8 h-8' />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
