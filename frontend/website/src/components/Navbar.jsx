import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import cart from '../photos/cart.png';
import logo from '../photos/logo.png';
import home from '../photos/home.png';
import shoppingBag from '../photos/shopping-bag.png';
import userImage from '../photos/userImage.png';
import wishlist from '../photos/wishlist.png';
import product from '../photos/product.png';
import { UserContext } from '../UserContext';

function Navbar() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const trimmed = search.trim();
    if (trimmed.length > 0) {
      navigate(`/products/search?query=${encodeURIComponent(trimmed)}`);
    } else if (location.pathname.startsWith("/products/search")) {
      navigate(`/products/search`);
    }
  }, [search]);

  return (
    <div className="navbar sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 md:px-10 shadow-md text-lg backdrop-blur-sm">
      <div className="flex justify-between items-center">
        {/* Logo and title */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className='w-10 h-10 rounded-full shadow-md' />
          <span className="font-bold text-xl tracking-wide">ShopVerse</span>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Menu */}
      <div className={`mt-4 md:mt-0 ${menuOpen ? 'block' : 'hidden'} md:flex md:flex-row md:items-center md:justify-end md:gap-8`}>
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div className='flex items-center gap-1.5'>
            <img src={home} alt="home" className='w-6 h-6 rounded' />
            <NavLink to="/home" className='hover:text-yellow-300 font-medium'>
              Home
            </NavLink>
          </div>

          <div className='flex items-center gap-1.5'>
            <img src={product} alt="products" className='w-6 h-6 rounded' />
            <NavLink to="/products" className='hover:text-yellow-300 font-medium'>
              Products
            </NavLink>
          </div>

          <form>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='px-3 py-1 rounded-full text-black w-32 sm:w-40 md:w-52 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-inner'
            />
          </form>

          <div className='flex items-center gap-1'>
            <img src={userImage} alt="user" className='w-6 h-6 rounded' />
            <NavLink to={user ? "/login/userInfo" : "/login"} className='font-medium hover:text-yellow-300'>
              {user ? "Profile" : "User"}
            </NavLink>
          </div>

          <div className='flex items-center gap-1'>
            <img src={shoppingBag} alt="orders" className='w-6 h-6 rounded' />
            <NavLink to='/orders' className='font-medium hover:text-yellow-300'>
              Orders
            </NavLink>
          </div>

          <div className='flex items-center gap-1'>
            <img src={cart} alt="cart" className='w-6 h-6' />
            <NavLink to='/cart' className='font-medium hover:text-yellow-300'>
              Cart
            </NavLink>
          </div>

          <div className='flex items-center gap-1'>
            <img src={wishlist} alt="wishlist" className='w-6 h-6' />
            <NavLink to="/wishlist" className='font-medium hover:text-yellow-300'>
              Wishlist
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
