import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext";
import cart from "../photos/cart.png";
import logo from "../photos/logo.png";
import home from "../photos/home.png";
import shoppingBag from "../photos/shopping-bag.png";
import userImage from "../photos/userImage.png";
import wishlist from "../photos/wishlist.png";
import product from "../photos/product.png";
import { Menu, X } from "lucide-react"; // Optional: for clean hamburger icons

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-10 h-10 rounded-full shadow-md" />
          <span className="font-bold text-xl tracking-wide">ShopVerse</span>
        </div>

        {/* Hamburger Button on Small Screens */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 ml-10">
          <div className="flex items-center gap-1.5">
            <img src={home} alt="home" className="w-7 h-6 rounded" />
            <NavLink to="/home" className="hover:text-yellow-300 transition font-medium">Home</NavLink>
          </div>

          <div className="flex items-center gap-1.5">
            <img src={product} alt="product" className="w-7 h-6 rounded" />
            <NavLink to="/products" className="hover:text-yellow-300 transition font-medium">Products</NavLink>
          </div>

          <form>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-1 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-inner"
            />
          </form>

          <div className="flex items-center gap-0.5 hover:text-yellow-300 transition">
            <img src={userImage} alt="user" className="w-7 h-6 rounded" />
            <NavLink to={user ? "/login/userInfo" : "/login"} className="font-medium">
              {user ? "Profile" : "User"}
            </NavLink>
          </div>

          <div className="flex items-center gap-0.5">
            <img src={shoppingBag} alt="orders" className="w-7 h-6" />
            <NavLink to="/orders" className="hover:text-yellow-300 transition font-medium">Orders</NavLink>
          </div>

          <div className="flex items-center gap-0.5">
            <img src={cart} alt="cart" className="w-7 h-6" />
            <NavLink to="/cart" className="font-medium hover:text-yellow-300 transition">Cart</NavLink>
          </div>

          <div className="flex items-center gap-0.5">
            <img src={wishlist} alt="wishlist" className="w-7 h-6" />
            <NavLink to="/wishlist" className="font-medium hover:text-yellow-300 transition">Wishlist</NavLink>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
        <div className="flex flex-col gap-5 mt-4 md:hidden text-sm font-medium">
          <NavLink to="/home" onClick={toggleMenu}>🏠 Home</NavLink>
          <NavLink to="/products" onClick={toggleMenu}>🛍 Products</NavLink>
          <NavLink to={user ? "/login/userInfo" : "/login"} onClick={toggleMenu}>
            {user ? "👤 Profile" : "👤 User"}
          </NavLink>
          <NavLink to="/orders" onClick={toggleMenu}>📦 Orders</NavLink>
          <NavLink to="/cart" onClick={toggleMenu}>🛒 Cart</NavLink>
          <NavLink to="/wishlist" onClick={toggleMenu}>❤️ Wishlist</NavLink>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-inner"
          />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
