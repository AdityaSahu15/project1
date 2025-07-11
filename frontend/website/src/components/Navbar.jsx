import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../UserContext';
import cart from '../photos/cart.png';
import logo from '../photos/logo.png';
import home from '../photos/home.png';
import shoppingBag from '../photos/shopping-bag.png';
import userImage from '../photos/userImage.png';
import wishlist from '../photos/wishlist.png';
import product from '../photos/product.png';

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
    <div className="navbar sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 shadow-md">
      
      {/* Top section: Logo + Hamburger */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-10 h-10 rounded-full shadow-md" />
          <span className="font-bold text-xl tracking-wide">ShopVerse</span>
        </div>

        {/* Hamburger menu (mobile only) */}
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => setMenuOpen(prev => !prev)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Links section */}
      <div className={`mt-4 sm:mt-0 ${menuOpen ? 'block' : 'hidden'} sm:flex sm:items-center sm:justify-between`}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-4 sm:mt-0">
          <NavItem icon={home} to="/home" label="Home" />
          <NavItem icon={product} to="/products" label="Products" />
          <NavItem icon={userImage} to={user ? "/login/userInfo" : "/login"} label={user ? "Profile" : "User"} />
          <NavItem icon={shoppingBag} to="/orders" label="Orders" />
          <NavItem icon={cart} to="/cart" label="Cart" />
          <NavItem icon={wishlist} to="/wishlist" label="Wishlist" />
        </div>

        {/* Search Bar */}
        <form className="mt-4 sm:mt-0">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-inner w-full sm:w-auto"
          />
        </form>
      </div>
    </div>
  );
}

const NavItem = ({ icon, to, label }) => (
  <div className="flex items-center gap-2">
    <img src={icon} alt={label} className="w-6 h-6" />
    <NavLink
      to={to}
      className="hover:text-yellow-300 font-medium transition"
    >
      {label}
    </NavLink>
  </div>
);

export default Navbar;
