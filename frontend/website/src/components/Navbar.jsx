import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import cart from '../photos/cart.png';
import logo from '../photos/logo.png';
import home from '../photos/home.png';
import shoppingBag from '../photos/shopping-bag.png';
import userImage from '../photos/userImage.png';
import { UserContext } from '../UserContext';
import { useContext, useState, useEffect } from 'react';

function Navbar() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");

  // Handle live navigation based on query string
  useEffect(() => {
    const trimmed = search.trim();
    if (trimmed.length > 0) {
      navigate(`/products/search?query=${encodeURIComponent(trimmed)}`);
    } else if (location.pathname.startsWith("/products/search")) {
      // Clear the query and remain on the search page
      navigate(`/products/search`);
    }
  }, [search]);

  return (
    <div className='navbar sticky top-0 z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-10 shadow-md text-lg flex justify-between items-center backdrop-blur-sm'>
      <div className="flex items-center gap-3">
        <img src={logo} alt="logo" className='w-10 h-10 rounded-full shadow-md' />
        <span className="font-bold text-xl tracking-wide">ShopVerse</span>
      </div>

      <div className="flex items-center gap-8 ml-10">
        <div className='flex items-center gap-1.5'>
          <img src={home} alt="logo" className='w-7 h-6 rounded' />
        <NavLink to="/home" className='hover:text-yellow-300 transition font-medium'>
          Home
        </NavLink>
        </div>

        <form>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='px-3 py-1 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-inner'
          />
        </form>

        <div className='flex items-center gap-0.5 hover:text-yellow-300 transition'>
          <img src={userImage} alt="user" className='w-7 h-6 rounded ' />
          <NavLink to={user ? "/login/userInfo" : "/login"} className='font-medium'>
            {user ? "Profile" : "User"}
          </NavLink>
        </div>

        
        <div className='flex items-center gap-0.5'>
          <img src={shoppingBag} alt="orders" className='w-7 h-6 rounded ' />
        <NavLink to='/orders' className='hover:text-yellow-300 transition font-medium'>
          Orders
        </NavLink>
        </div>

        <div className='flex items-center gap-0.5  hover:text-yellow-300 transition'>
          <img src={cart} alt="cart" className='w-7 h-6 ' />
          <NavLink to='/cart' className='font-medium'>
            Cart
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
